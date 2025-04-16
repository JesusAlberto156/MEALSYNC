import { users } from './users.js';
import { permissions} from './permissions.js';
import { status } from './status.js';
import { suppliers } from './suppliers.js';
import { io } from '../../index.js';

export const socketEvents = () => {
  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    users(socket);
    permissions(socket);
    status(socket);
    suppliers(socket);
    
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};