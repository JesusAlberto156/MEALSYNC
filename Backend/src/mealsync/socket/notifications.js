//____________IMPORT/EXPORT____________
// Consultas de sql
import { getNotificationsService,getUserNotificationsService } from "../services/notifications.js";
import { insertNotificationService,insertUserNotificationService } from "../services/notifications.js";
import { updateNotificationService,updateUserNotificationService } from "../services/notifications.js";
import { getLogsService } from "../services/logs.js";
import { insertLogNotificactionService,insertLogUserNotificactionService } from "../services/notifications.js";
import { updateLogNotificationService,updateLogUserNotificationService } from "../services/notifications.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Notifications_GET = (socket) => {
    //---------- NOTIFICACIONES ✔️
    socket.on('Get-Notifications', async () => {
        try {
            const result = await getNotificationsService();
            console.log('Notificaciones obtenidas...');
            io.emit('Get-Notifications', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- NOTIFICACIONES DE USUARIOS ✔️
    socket.on('Get-User-Notifications', async () => {
        try {
            const result = await getUserNotificationsService();
            console.log('Notificaciones de usuarios obtenidas...');
            io.emit('Get-User-Notifications', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
}
//______________GET______________
//______________INSERT______________
export const Notifications_INSERT = (socket) => {
    //---------- NOTIFICACIONES ✔️
    socket.on('Insert-Notification',async (tipo,mensaje,duracion,idusuario,usuarios) => {
        try{
            await insertNotificationService(tipo,mensaje,duracion,idusuario);
            const resultNotificacions = await getNotificationsService();
            const decryptedData = decryptData(resultNotificacions);
            const parseData = JSON.parse(decryptedData);
            const notification = parseData.find(data => data.mensaje === mensaje && data.idusuario === idusuario)?.idnotificacion
            await insertLogNotificactionService(idusuario,notification,tipo,mensaje,String(duracion),String(idusuario));

            let resultUserNotifications;

            if(Array.isArray(usuarios) && usuarios.length > 0){
                for (const usuario of usuarios) {
                    await insertUserNotificationService(notification,usuario.idusuario,suministro.cantidad,suministro.idpedido);
                    resultUserNotifications = await getUserNotificationsService();
                    await insertLogUserNotificactionService(idusuario,notification,String(usuario.idusuario));
                }
                resultUserNotifications = await getUserNotificationsService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Notifications',resultNotificacions);
            if(resultUserNotifications !== undefined){
                io.emit('Get-User-Notifications',resultUserNotifications);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar una notificación: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Notifications_UPDATE = (socket) => {
    //---------- NOTIFICACIONES ✔️
    socket.on('Update-Notification',async (idusuario,idnotificacion) => {
        try{
            await updateNotificationService(idnotificacion);
            const resultNotifications = await getNotificationsService();
            await updateLogNotificationService(idnotificacion,idusuario);
            const resultLogs = await getLogsService();
            io.emit('Get-Notifications',resultNotifications);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar la notificación: ',error);
            return error;
        }
    });
    //---------- NOTIFICACIONES DE USUARIOS ✔️
    socket.on('Update-User-Notification',async (idusuario,idnotificacion) => {
        try{
            await updateUserNotificationService(idnotificacion,idusuario);
            const resultUserNotifications = await getUserNotificationsService();
            await updateLogUserNotificationService(idusuario,String(idnotificacion),String(idusuario));
            const resultLogs = await getLogsService();
            io.emit('Get-User-Notifications',resultUserNotifications);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar la notificación de usuario: ',error);
            return error;
        }
    });
}
//______________UPDATE______________