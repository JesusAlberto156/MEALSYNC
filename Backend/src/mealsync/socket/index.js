import { users } from './users.js';
import { permissions} from './permissions.js';
import { status } from './status.js';
import { io } from '../../index.js';

export const socketEvents = () => {
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