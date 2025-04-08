import { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

interface SocketSetup {
  server: HTTPServer;
  io: SocketIOServer;
}

const initializeSocketServer = (app: Application): SocketSetup => {
  const server = createServer(app);

  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return { server, io };
};

export default initializeSocketServer;
