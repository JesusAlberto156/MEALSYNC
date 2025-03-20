import { users } from './users';
import { permissions} from './permissions';
import { status } from './status';

export const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    users(socket);
    permissions(socket);
    status(socket);

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};