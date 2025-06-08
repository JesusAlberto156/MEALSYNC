//____________IMPORT/EXPORT____________
// Eventos socket
import { Logs_GET,Logs_INSERT } from './logs.js';
import { Users_GET,Users_INSERT,Users_UPDATE,Users_DELETE } from './users.js';
import { Suppliers_GET,Suppliers_INSERT,Suppliers_UPDATE,Suppliers_DELETE } from './suppliers.js';
import { Warehouse_GET,Warehouse_INSERT,Warehouse_UPDATE,Warehouse_DELETE } from './warehouse.js';
// Servidor socket
import { io } from '../../index.js';
//____________IMPORT/EXPORT____________

// Exportación de los eventos socket
export const socketEvents = () => {
    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);
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
        Warehouse_DELETE(socket);
        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
};