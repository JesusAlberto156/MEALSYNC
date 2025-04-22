//____________IMPORT/EXPORT____________
// Eventos socket
import { Users_GET,Users_INSERT,Users_UPDATE } from './users.js';
import { Suppliers_GET,Suppliers_INSERT,Suppliers_UPDATE } from './suppliers.js';
// Servidor socket
import { io } from '../../index.js';
//____________IMPORT/EXPORT____________

// Exportación de los eventos socket
export const socketEvents = () => {
  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    // Usuarios
    Users_GET(socket);
    Users_INSERT(socket);
    Users_UPDATE(socket);
    // Proveedores
    Suppliers_GET(socket);
    Suppliers_INSERT(socket);
    Suppliers_UPDATE(socket);
    
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};