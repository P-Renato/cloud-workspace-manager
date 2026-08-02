import * as pty from "node-pty";
import { Socket } from "socket.io";

type SocketHandlers = {
  input: (data: string) => void;
  resize: (size: { cols: number; rows: number }) => void;
};

export class TerminalSession {
  private terminal: pty.IPty;

  private sockets = new Map<string, Socket>();

  private handlers = new Map<string, SocketHandlers>();

  constructor(command: string, args: string[]) {
    this.terminal = pty.spawn(command, args, {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: process.env.HOME,
      env: process.env as Record<string, string>,
    });

    this.terminal.onData((data) => {
      for (const socket of this.sockets.values()) {
        socket.emit("terminal-output", data);
      }
    });
  }

  attach(socket: Socket) {
    if (this.sockets.has(socket.id)) {
      return;
    }

    this.sockets.set(socket.id, socket);

    const inputHandler = (data: string) => {
      this.terminal.write(data);
    };

    const resizeHandler = ({
      cols,
      rows,
    }: {
      cols: number;
      rows: number;
    }) => {
      this.terminal.resize(cols, rows);
    };

    socket.on("terminal-input", inputHandler);
    socket.on("terminal-resize", resizeHandler);

    this.handlers.set(socket.id, {
      input: inputHandler,
      resize: resizeHandler,
    });

    console.log(
      "Attached",
      socket.id,
      "Active sockets:",
      this.sockets.size
    );
  }

  detach(socketId: string) {
    const socket = this.sockets.get(socketId);
    const handlers = this.handlers.get(socketId);

    if (socket && handlers) {
      socket.off("terminal-input", handlers.input);
      socket.off("terminal-resize", handlers.resize);
    }

    this.handlers.delete(socketId);
    this.sockets.delete(socketId);

    console.log(
      "Detached",
      socketId,
      "Remaining:",
      this.sockets.size
    );
  }

  isEmpty() {
    return this.sockets.size === 0;
  }

  dispose() {
    this.terminal.kill();
  }
}