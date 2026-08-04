import { Socket } from "socket.io";
import { TerminalSession } from "./TerminalSession";
import { getWorkspaceTerminalCommand } from "../services/workspaceService";

export class TerminalManager {
  private sessions = new Map<string, TerminalSession>();

  async attachSocket(
  workspaceId: string,
  socket: Socket
) {
  let session = this.sessions.get(workspaceId);

  if (!session) {
    console.log(
      `Creating terminal for ${workspaceId}`
    );

    const terminal = await getWorkspaceTerminalCommand(workspaceId);

    session = new TerminalSession(
      terminal.command,
      terminal.args
    );

    this.sessions.set(
      workspaceId,
      session
    );
  }

  session.attach(socket);
}

  detachSocket(
    workspaceId: string,
    socketId: string
  ) {
    const session = this.sessions.get(workspaceId);

    if (!session) {
      return;
    }

    session.detach(socketId);

    if (session.isEmpty()) {
      console.log(`Disposing terminal for ${workspaceId}`); 
      
      session.dispose();
      
      this.sessions.delete(workspaceId);
    }
  }

  getSession(workspaceId: string) {
    return this.sessions.get(workspaceId);
  }
}

export const terminalManager =
  new TerminalManager();