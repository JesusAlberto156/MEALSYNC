//____________IMPORT/EXPORT____________
// Consultas de sql
import { getUsersService,getPermissionsService,getStatusService,getUserTypesService,getDeletedUsersService } from "../services/users.js";
import { insertUserService,insertPermissionsService,insertStatusService,insertDeletedUserService } from "../services/users.js";
import { updateUserService,updatePermissionsService,updatePermissionService,updateStatusLogService,updateStatusEnableService } from "../services/users.js";
import { deleteDeletedUserService } from "../services/users.js";
import { getLogsService } from "../services/logs.js";
import { insertLogUserService,insertLogPermissionsService,insertLogStatusService,insertLogDeletedUserService } from "../services/users.js";
import { updateLogUserService,updateLogPermissionsService,updateLogPermissionService,updateLogStatusLogService,updateLogStatusEnableService } from "../services/users.js";
import { deleteLogDeletedUserService } from "../services/users.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Users_GET = (socket) => {
    //---------- USUARIOS ✔️
    socket.on('Get-Users', async () => {
        try {
            const result = await getUsersService();
            console.log('Usuarios obtenidos...');
            io.emit('Get-Users', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PERMISOS ✔️
    socket.on('Get-Permissions', async () => {
        try {
            const result = await getPermissionsService();
            console.log('Permisos de los usuarios obtenidos...');
            io.emit('Get-Permissions', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ESTATUS ✔️
    socket.on('Get-Status', async () => {
        try {
            const result = await getStatusService();
            console.log('Estatus de los usuarios obtenidos...');
            io.emit('Get-Status', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE USUARIOS ✔️
    socket.on('Get-User-Types', async () => {
        try {
            const result = await getUserTypesService();
            console.log('Tipos de usuario obtenidos...');
            io.emit('Get-User-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- USUARIOS ELIMINADOS ✔️
    socket.on('Get-Deleted-Users', async () => {
        try {
            const result = await getDeletedUsersService();
            console.log('Usuarios Eliminados obtenidos...');
            io.emit('Get-Deleted-Users', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Users_INSERT = (socket) => {
    //---------- USUARIOS ✔️
    socket.on('Insert-User',async (idusuario,nombre,nombrecorto,usuario,contrasena,idtipo,permisos,administrador,chef,almacenista,cocinero,nutriologo,medico,estatus) => {
        try{
            await insertUserService(nombre,nombrecorto,usuario,contrasena,idtipo);
            const resultUsers = await getUsersService();
            const decryptedData = decryptData(resultUsers);
            const parsedData = JSON.parse(decryptedData);
            
            let resultPermissions;
            let resultStatus;

            if(permisos === 'Default' || permisos === 'Personalizado'){
                await insertPermissionsService(administrador,chef,almacenista,cocinero,nutriologo,medico,parsedData.find(data => data.usuario === usuario)?.idusuario);
                resultPermissions = await getPermissionsService();
                const decryptedData = decryptData(resultPermissions);
                const parsedDataPermission = JSON.parse(decryptedData);
                await insertLogPermissionsService(parsedDataPermission.find(data => data.idusuario === idusuario)?.idpermiso,idusuario,String(administrador),String(chef),String(almacenista),String(cocinero),String(nutriologo),String(medico),String(parsedData.find(data => data.usuario === usuario)?.idusuario));
            }
            if(estatus === 'Habilitado' || estatus === 'Deshabilitado'){
                await insertStatusService(estatus === 'Habilitado' ? 1 : 0,parsedData.find(data => data.usuario === usuario)?.idusuario);
                resultStatus = await getStatusService();
                const decryptedData = decryptData(resultStatus);
                const parsedDataStatus = JSON.parse(decryptedData);
                await insertLogStatusService(parsedDataStatus.find(data => data.idusuario === idusuario)?.idestatus,idusuario,String(estatus === 'Habilitado' ? 1 : 0),String(parsedData.find(data => data.usuario === usuario)?.idusuario));
            }

            await insertLogUserService(parsedData.find(data => data.usuario === usuario)?.idusuario,idusuario,nombre,nombrecorto,usuario,contrasena,String(idtipo));
            const resultLogs = await getLogsService()
            io.emit('Get-Users',resultUsers);
            io.emit('Get-Logs',resultLogs);
            if(resultPermissions !== undefined){
                io.emit('Get-Permissions',resultPermissions);
            }
            if(resultStatus !== undefined){
                io.emit('Get-Status',resultStatus);
            }
        }catch(error){
            console.error('Error al agregar un usuario: ',error);
            return error;
        }
    });
    //---------- PERMISOS ✔️
    socket.on('Insert-Permissions',async (usuario,administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario) => {
        try{
            await insertPermissionsService(administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario);
            const resultPermissions = await getPermissionsService();
            const decryptedData = decryptData(resultPermissions);
            const parsedData = JSON.parse(decryptedData);
            await insertLogPermissionsService(parsedData.find(data => data.idusuario === idusuario)?.idpermiso,usuario,String(administrador),String(chef),String(almacenista),String(cocinero),String(nutriologo),String(medico),String(idusuario));
            const resultLogs = await getLogsService()
            io.emit('Get-Permissions',resultPermissions);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar los permisos: ',error);
            return error;
        }
    });
    //---------- ESTATUS ✔️
    socket.on('Insert-Status',async (usuario,habilitado,idusuario) => {
        try{
            await insertStatusService(habilitado,idusuario);
            const resultStatus = await getStatusService();
            const decryptedData = decryptData(resultStatus);
            const parsedData = JSON.parse(decryptedData);
            await insertLogStatusService(parsedData.find(data => data.idusuario === idusuario)?.idestatus,usuario,String(habilitado),String(idusuario));
            const resultLogs = await getLogsService()
            io.emit('Get-Status',resultStatus);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar el estatus: ',error);
            return error;
        }
    });
    //---------- USUARIOS ELIMINADOS ✔️
    socket.on('Insert-Deleted-User',async (usuario,idusuario) => {
        try{
            await insertDeletedUserService(idusuario);
            const resultDeletedUsers = await getDeletedUsersService();
            const decryptedData = decryptData(resultDeletedUsers);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedUserService(parsedData.find(data => data.idusuario === idusuario)?.ideliminado,usuario,String(idusuario));
            const resultLogs = await getLogsService()
            io.emit('Get-Deleted-Users',resultDeletedUsers);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar un usuario: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Users_UPDATE = (socket) => {
    //---------- USUARIOS ✔️
    socket.on('Update-User',async (sesion,idusuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
        try{
            await updateUserService(idusuario,nombre,nombrecorto,usuario,contrasena,idtipo);
            const resultUsers = await getUsersService();
            await updateLogUserService(idusuario,sesion,nombre,nombrecorto,usuario,contrasena,String(idtipo));
            const resultLogs = await getLogsService()
            io.emit('Get-Users',resultUsers);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un usuario: ',error);
            return error;
        }
    });
    //---------- PERMISOS ✔️
    socket.on('Update-Permissions',async (Usuario,usuario,idpermiso,administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario) => {
        try{
            await updatePermissionsService(idusuario,administrador,chef,almacenista,cocinero,nutriologo,medico);
            const resultPermissions = await getPermissionsService();
            await updateLogPermissionsService(idpermiso,usuario,String(administrador),String(chef),String(almacenista),String(cocinero),String(nutriologo),String(medico));
            const resultLogs = await getLogsService()
            const permisson = 'permisos'
            io.emit('Get-Permissions',resultPermissions);
            io.emit('Update-Permissions',`Se editó los `,permisson,` al usuario `,Usuario);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar los permisos: ',error);
            return error;
        }
    });
    socket.on('Update-Permission',async (Usuario,usuario,idpermiso,superadministrador,idusuario) => {
        try{
            await updatePermissionService(idusuario,superadministrador);
            const resultPermissions = await getPermissionsService();
            await updateLogPermissionService(idpermiso,usuario,String(superadministrador));
            const resultLogs = await getLogsService()
            const permisson = 'super administrador'
            io.emit('Get-Permissions',resultPermissions);
            io.emit('Update-Permission',`Se editó al usuario `,Usuario,'el permiso de ',permisson);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar el permiso de super administrador: ',error);
            return error;
        }
    });
    //---------- ESTATUS ✔️
    socket.on('Update-Status-Log',async (idusuario,idestatus,activo,callback) => {
        try{
            await updateStatusLogService(idusuario,activo);
            const resultStatus = await getStatusService();
            await updateLogStatusLogService(idestatus,idusuario,String(activo));
            const resultLogs = await getLogsService()
            io.emit('Get-Status',resultStatus);
            io.emit('Get-Logs',resultLogs);

            if (typeof callback === 'function') {
                callback({ success: true });
            }
        }catch(error){
            console.error(`Error al ${activo ? 'iniciar sesión':'cerrar sesión'} el usuario: `,error);
            if (typeof callback === 'function') {
                callback({ success: false });
            }
            return error;
        }
    });
    socket.on('Update-Status-Enable',async (usuario,idestatus,habilitado,idusuario) => {
        try{
            await updateStatusEnableService(idusuario,habilitado);
            const resultStatus = await getStatusService();
            await updateLogStatusEnableService(idestatus,usuario,String(habilitado));
            const resultLogs = await getLogsService()
            io.emit('Get-Status',resultStatus);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error(`Error al ${habilitado ? 'habilitar':'deshabilitar'} el usuario: `,error);
            return error;
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Users_DELETE = (socket) => {
    //---------- USUARIOS ELIMINADOS ✔️
    socket.on('Delete-Deleted-User',async (usuario,ideliminado,idusuario) => {
        try{
            await deleteDeletedUserService(idusuario);
            const resultDeletedUsers = await getDeletedUsersService();
            await deleteLogDeletedUserService(ideliminado,usuario,String(idusuario));
            const resultLogs = await getLogsService()
            io.emit('Get-Deleted-Users',resultDeletedUsers);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar un usuario: ',error);
            return error;
        }
    });
}
//______________DELETE______________