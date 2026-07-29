import { Server } from "socket.io";
import * as pty from "node-pty";

export function registerTerminalSocket(
  io: Server
) {
  io.on("connection", (socket) => {

    console.log(
      "Terminal connected",
      socket.id
    );

    const shell =
      process.platform === "win32"
        ? "powershell.exe"
        : "bash";

    const terminal = pty.spawn(shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: process.env.HOME,
      env: process.env as Record<string, string>,
    });

    terminal.onData((data: string) => {
        console.log("PTY OUTPUT:", JSON.stringify(data));
        socket.emit("terminal-output", data);
    });

        socket.on("terminal-input", (data: string) => {
        console.log("INPUT:", JSON.stringify(data));
        terminal.write(data);
    });

    socket.on("disconnect", () => {

      terminal.kill();

      console.log(
        "Disconnected",
        socket.id
      );

    });

  });
}