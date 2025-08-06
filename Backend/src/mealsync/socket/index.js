//____________IMPORT/EXPORT____________
// Eventos socket
import { Logs_GET } from './logs.js';
import { Notifications_GET,Notifications_INSERT,Notifications_UPDATE } from './notifications.js';
import { Users_GET,Users_INSERT,Users_UPDATE,Users_DELETE } from './users.js';
import { Suppliers_GET,Suppliers_INSERT,Suppliers_UPDATE,Suppliers_DELETE } from './suppliers.js';
import { Supplies_GET,Supplies_INSERT,Supplies_UPDATE,Supplies_DELETE } from './supplies.js';
import { Extras_GET,Extras_INSERT,Extras_UPDATE,Extras_DELETE } from './extras.js';
import { Warehouse_GET,Warehouse_INSERT,Warehouse_UPDATE,Warehouse_DELETE } from './warehouse.js';
import { Menus_GET,Menus_INSERT,Menus_UPDATE,Menus_DELETE } from './menus.js';
import { Dishes_GET,Dishes_INSERT,Dishes_UPDATE,Dishes_DELETE } from './dishes.js';
import { Side_Dishes_GET,Side_Dishes_INSERT,Side_Dishes_UPDATE,Side_Dishes_DELETE } from './sideDishes.js';
import { Drinks_GET,Drinks_INSERT,Drinks_UPDATE,Drinks_DELETE } from './drinks.js';
// Servidor socket
import { io } from '../../index.js';
//____________IMPORT/EXPORT____________

// Exportación de los eventos socket
export const socketEvents = () => {
    const sessions = new Map();
    const expired = new Map();
    io.on('connection', (socket) => {
        const clientSessionId = socket.handshake.auth.clientSessionId;
        const existing = sessions.get(clientSessionId);
        const existingExpired = expired.get(clientSessionId);

        if(existingExpired){
            console.log(`Reconexión de sesión fallida: ${clientSessionId}, la sesión ha expirado`);
            socket.emit('Session-Expired',clientSessionId);
            sessions.delete(clientSessionId);
            expired.delete(clientSessionId);
        }else{
            if(!existing){
                sessions.set(clientSessionId, { socketId: socket.id });
                console.log(`Nueva sesión creada: ${clientSessionId}`);
            }else{
                if (existing.timeOutId) clearTimeout(existing.timeOutId);
                sessions.set(clientSessionId, { socketId: socket.id });
                console.log(`Reconexión de sesión: ${clientSessionId}`);
            }
        }
        // Registros ✔️
        Logs_GET(socket)
        // Notificaciones ✔️
        Notifications_GET(socket);
        Notifications_INSERT(socket);
        Notifications_UPDATE(socket);
        // Usuarios ✔️
        Users_GET(socket);
        Users_INSERT(socket);
        Users_UPDATE(socket);
        Users_DELETE(socket);
        // Proveedores ✔️
        Suppliers_GET(socket);
        Suppliers_INSERT(socket);
        Suppliers_UPDATE(socket);
        Suppliers_DELETE(socket);
        // Insumos ✔️
        Supplies_GET(socket);
        Supplies_INSERT(socket);
        Supplies_UPDATE(socket);
        Supplies_DELETE(socket);
        // Extras
        Extras_GET(socket);
        Extras_INSERT(socket);
        Extras_UPDATE(socket);
        Extras_DELETE(socket);
        // Almacén ✔️
        Warehouse_GET(socket);
        Warehouse_INSERT(socket);
        Warehouse_UPDATE(socket);
        Warehouse_DELETE(socket);
        // Menús ✔️
        Menus_GET(socket);
        Menus_INSERT(socket);
        Menus_UPDATE(socket);
        Menus_DELETE(socket);
        // Platillos ✔️
        Dishes_GET(socket);
        Dishes_INSERT(socket);
        Dishes_UPDATE(socket);
        Dishes_DELETE(socket);
        // Guarniciones ✔️
        Side_Dishes_GET(socket);
        Side_Dishes_INSERT(socket);
        Side_Dishes_UPDATE(socket);
        Side_Dishes_DELETE(socket);
        // Bebidas ✔️
        Drinks_GET(socket);
        Drinks_INSERT(socket);
        Drinks_UPDATE(socket);
        Drinks_DELETE(socket);
        socket.on('disconnect', () => {
            console.log(`Sesión desconectada: ${clientSessionId}`);

            const timeOutId = setTimeout(() => {
                console.log(`Sesión expirada: ${clientSessionId} no se logro reconectar`);
                expired.set(clientSessionId, { socketId: socket.id });
            },2_000);
            sessions.set(clientSessionId, {timeOutId, socketId: socket.id});
        });
    });
};