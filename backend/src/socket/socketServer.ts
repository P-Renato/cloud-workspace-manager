import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  return io;
}

export function getIO() {
  return io;
}