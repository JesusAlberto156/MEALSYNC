//____________IMPORT/EXPORT____________
// Eventos socket
import { Logs_GET,Logs_INSERT } from './logs.js';
import { Users_GET,Users_INSERT,Users_UPDATE,Users_DELETE } from './users.js';
import { Suppliers_GET,Suppliers_INSERT,Suppliers_UPDATE,Suppliers_DELETE } from './suppliers.js';
import { Warehouse_GET,Warehouse_INSERT,Warehouse_UPDATE } from './warehouse.js';
// Servidor socket
import { io } from '../../index.js';
//____________IMPORT/EXPORT____________

// Exportación de los eventos socket
export const socketEvents = () => {
  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    // Mensajes
    socket.on('Message-Permission', (user) => {
        io.emit('Message-Permission', '¡Permiso de super administrador actualizado a!...', user);
    });
    socket.on('Message-Permissions', (user) => {
        io.emit('Message-Permissions', '¡Permisos actualizados a!...', user);
    });
    // Registros
    Logs_GET(socket)
    Logs_INSERT(socket)
    // Usuarios
    Users_GET(socket);
    Users_INSERT(socket);
    Users_UPDATE(socket);
    Users_DELETE(socket);
    // Proveedores
    Suppliers_GET(socket);
    Suppliers_INSERT(socket);
    Suppliers_UPDATE(socket);
    Suppliers_DELETE(socket);
    // Almacén
    Warehouse_GET(socket);
    Warehouse_INSERT(socket);
    Warehouse_UPDATE(socket);
    
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};