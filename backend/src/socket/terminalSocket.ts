import { Server } from "socket.io";
import { terminalManager } from "../terminal/TerminalManager";

export function registerTerminalSocket(
  io: Server
) {
  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    let workspaceId: string | null = null;

    socket.on(
      "terminal-connect",
      async (id: string) => {
        try {
          // If this socket is already attached somewhere else,
          // detach it before attaching to the new workspace.
          if (workspaceId && workspaceId !== id) {
            terminalManager.detachSocket(
              workspaceId,
              socket.id
            );
          }

          workspaceId = id;

          await terminalManager.attachSocket(
            workspaceId,
            socket
          );

          console.log(
            `Socket attached to workspace ${workspaceId}`
          );
        } catch (error) {
          socket.emit(
            "terminal-output",
            "\r\nUnable to connect to workspace terminal.\r\n"
          );

          console.error(error);
        }
      }
    );

    socket.on("terminal-disconnect", () => {
      console.log(
        "Terminal disconnected",
        socket.id
      );

      if (!workspaceId) {
        return;
      }

      terminalManager.detachSocket(
        workspaceId,
        socket.id
      );

      // <-- important
      workspaceId = null;
    });

    socket.on("disconnect", () => {
      console.log(
        "Socket disconnected",
        socket.id
      );

      if (!workspaceId) {
        return;
      }

      terminalManager.detachSocket(
        workspaceId,
        socket.id
      );

      workspaceId = null;
    });
  });
}