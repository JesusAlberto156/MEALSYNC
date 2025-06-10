//____________IMPORT/EXPORT____________
// Consultas de sql
import { getUsersService,getPermissionsService,getStatusService,getUserTypesService,getDeletedUsersService } from "../services/users.js";
import { insertUserService,insertPermissionsService,insertStatusService,insertDeletedUserService } from "../services/users.js";
import { updateUserService,updatePermissionsService,updatePermissionService,updateStatusLogService,updateStatusEnableService } from "../services/users.js";
import { deleteDeletedUserService } from "../services/users.js";
import { getLogsService,insertLogService } from "../services/logs.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Users_GET = (socket) => {
    //---------- USUARIOS
    socket.on('Get-Users', async () => {
        try {
            const result = await getUsersService();
            console.log('Usuarios obtenidos...');
            io.emit('Get-Users', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- USUARIOS
    //---------- PERMISOS
    socket.on('Get-Permissions', async () => {
        try {
            const result = await getPermissionsService();
            console.log('Permisos de los usuarios obtenidos...');
            io.emit('Get-Permissions', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Get-Status', async () => {
        try {
            const result = await getStatusService();
            console.log('Estatus de los usuarios obtenidos...');
            io.emit('Get-Status', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ESTATUS
    //---------- TIPOS DE USUARIOS
    socket.on('Get-User-Types', async () => {
        try {
            const result = await getUserTypesService();
            console.log('Tipos de usuario obtenidos...');
            io.emit('Get-User-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE USUARIOS
    //---------- USUARIOS ELIMINADOS
    socket.on('Get-Deleted-Users', async () => {
        try {
            const result = await getDeletedUsersService();
            console.log('Usuarios Eliminados obtenidos...');
            io.emit('Get-Deleted-Users', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- USUARIOS ELIMINADOS
};
//______________GET______________
//______________INSERT______________
export const Users_INSERT = (socket) => {
    //---------- USUARIOS
    socket.on('Insert-User',async (fecha,idusuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
        try{
            await insertUserService(nombre,nombrecorto,usuario,contrasena,idtipo);
            const resultUsers = await getUsersService();
            const decryptedData = decryptData(resultUsers);
            const parsedData = JSON.parse(decryptedData);
            await insertLogService('Usuarios',fecha,'INSERT',parsedData.find(data => data.usuario === usuario)?.idusuario,idusuario,'',nombre,nombrecorto,usuario,contrasena,String(idtipo),'','','','');
            const resultLogs = await getLogsService()
            io.emit('Get-Users',resultUsers);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un usuario: ',error);
            return error;
        }
    });
    //---------- USUARIOS
    //---------- PERMISOS
    socket.on('Insert-Permissions',async (administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario) => {
        try{
            await insertPermissionsService(administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario);
            const result = await getPermissionsService();
            io.emit('Get-Permissions',result);
        }catch(error){
            console.error('Error al agregar los permisos: ',error);
            return error;
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Insert-Status',async (habilitado,idusuario) => {
        try{
            await insertStatusService(habilitado,idusuario);
            const result = await getStatusService();
            io.emit('Get-Status',result);
        }catch(error){
            console.error('Error al agregar el estatus: ',error);
            return error;
        }
    });
    //---------- ESTATUS
    //---------- USUARIOS ELIMINADOS
    socket.on('Insert-Deleted-User',async (idusuario) => {
        try{
            await insertDeletedUserService(idusuario);
            const result = await getDeletedUsersService();
            io.emit('Get-Deleted-Users',result);
        }catch(error){
            console.error('Error al eliminar un usuario: ',error);
            return error;
        }
    });
    //---------- USUARIOS ELIMINADOS
}
//______________INSERT______________
//______________UPDATE______________
export const Users_UPDATE = (socket) => {
    //---------- USUARIOS
    socket.on('Update-User',async (fecha,idusuariosesion,idusuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
        try{
            await updateUserService(idusuario,nombre,nombrecorto,usuario,contrasena,idtipo);
            const resultUsers = await getUsersService();
            await insertLogService('Usuarios',fecha,'UPDATE',idusuario,idusuariosesion,'',nombre,nombrecorto,usuario,contrasena,String(idtipo),'','','','');
            const resultLogs = await getLogsService();
            io.emit('Get-Users',resultUsers);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un usuario: ',error);
            return error;
        }
    });
    //---------- USUARIOS
    //---------- PERMISOS
    socket.on('Update-Permissions', async (idusuario,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
        try{
            await updatePermissionsService(idusuario,administrador,chef,almacenista,cocinero,nutriologo,medico);
            const result = await getPermissionsService();
            io.emit('Get-Permissions',result);
        }catch(error){
            console.error('Error al editar los permisos: ',error);
            return error;
        }
    });
    socket.on('Update-Permission', async (idusuario,superadministrador) => {
        try{
            await updatePermissionService(idusuario,superadministrador);
            const result = await getPermissionsService();
            io.emit('Get-Permissions',result);
        }catch(error){
            console.error('Error al editar el permiso de super administrador: ',error);
            return error;
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Update-Status-Log', async (idusuario,activo) => {
        try{
            await updateStatusLogService(idusuario,activo);
            const result = await getStatusService();
            io.emit('Get-Status',result);
        }catch(error){
            console.error(`Error al ${activo ? 'iniciar sesión':'cerrar sesión'} el usuario: `,error);
            return error;
        }
    });
    socket.on('Update-Status-Enable', async (idusuario,habilitado) => {
        try{
            await updateStatusEnableService(idusuario,habilitado);
            const result = await getStatusService();
            io.emit('Get-Status',result);
        }catch(error){
            console.error(`Error al ${habilitado ? 'habilitar':'deshabilitar'} el usuario: `,error);
            return error;
        }
    });
    //---------- ESTATUS
}
//______________UPDATE______________
//______________DELETE______________
export const Users_DELETE = (socket) => {
    //---------- USUARIOS ELIMINADOS
    socket.on('Delete-Deleted-User',async (idusuario) => {
        try{
            await deleteDeletedUserService(idusuario);
            const result = await getDeletedUsersService();
            io.emit('Get-Deleted-Users',result);
        }catch(error){
            console.error('Error al recuperar un usuario: ',error);
            return error;
        }
    });
    //---------- USUARIOS ELIMINADOS
}
//______________DELETE______________