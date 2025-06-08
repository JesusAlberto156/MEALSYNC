//____________IMPORT/EXPORT____________
// Consultas de sql
import { getUsersService,getPermissionsService,getStatusService,getUserTypesService,getDeletedUsersService } from "../services/users.js";
import { insertUserService,insertPermissionsService,insertStatusService,insertDeletedUserService } from "../services/users.js";
import { updateUserService,updatePermissionsService,updatePermissionService,updateStatusLogService,updateStatusEnableService } from "../services/users.js";
import { deleteDeletedUserService } from "../services/users.js";
// Servidor socket
import { io } from "../../index.js";
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
    socket.on('Insert-User',async (Usuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
        try{
            await insertUserService(nombre,nombrecorto,usuario,contrasena,idtipo);
            io.emit('Insert-User',`${Usuario} agregó al usuario ${usuario}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- USUARIOS
    //---------- PERMISOS
    socket.on('Insert-Permissions',async (Usuario,usuario,administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario) => {
        try{
            await insertPermissionsService(administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario);
            io.emit('Insert-Permissions',`${Usuario} agregó permisos al usuario ${usuario}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Insert-Status',async (Usuario,usuario,habilitado,idusuario) => {
        try{
            await insertStatusService(habilitado,idusuario);
            io.emit('Insert-Status',`${Usuario} agregó un estatus al usuario ${usuario}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- ESTATUS
    //---------- USUARIOS ELIMINADOS
    socket.on('Insert-Deleted-User',async (Usuario,usuario,idusuario) => {
        try{
            await insertDeletedUserService(idusuario);
            io.emit('Insert-Deleted-User',`${Usuario} eliminó al usuario ${usuario}`);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- USUARIOS ELIMINADOS
}
//______________INSERT______________
//______________UPDATE______________
export const Users_UPDATE = (socket) => {
    //---------- USUARIOS
    socket.on('Update-User',async (Usuario,idusuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
        try{
            await updateUserService(idusuario,nombre,nombrecorto,usuario,contrasena,idtipo);
            io.emit('Update-User',`${Usuario} editó al usuario ${usuario}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- USUARIOS
    //---------- PERMISOS
    socket.on('Update-Permissions', async (Usuario,usuario,idusuario,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
        try{
            await updatePermissionsService(idusuario,administrador,chef,almacenista,cocinero,nutriologo,medico);
            io.emit('Update-Permissions',`${Usuario} editó los permisos al usuario `,usuario);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    socket.on('Update-Permission', async (Usuario,usuario,idusuario,superadministrador) => {
        try{
            await updatePermissionService(idusuario,superadministrador);
            io.emit('Update-Permission',`${Usuario} editó el permiso de super administrador al usuario `,usuario);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Update-Status-Log', async (usuario,idusuario,activo) => {
        try{
            await updateStatusLogService(idusuario,activo);
            if(activo){
                io.emit('Update-Status-Log',`${usuario} inició sesión`);
            }else{
                io.emit('Update-Status-Log',`${usuario} cerró sesión`);
            }
        }catch(error){
            console.error(`Error al ${activo ? 'iniciar sesión':'cerrar sesión'} el usuario: `,error);
            return error;
        }
    });
    socket.on('Update-Status-Enable', async (usuario,idusuario,habilitado) => {
        try{
            await updateStatusEnableService(idusuario,habilitado);
            if(habilitado){
                io.emit('Update-Status-Enable',`${usuario} habilitado`);
            }else{
                io.emit('Update-Status-Enable',`${usuario} deshabilitado`);
            }
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
    socket.on('Delete-Deleted-User',async (Usuario,usuario,idusuario) => {
        try{
            await deleteDeletedUserService(idusuario);
            io.emit('Delete-Deleted-User',`${Usuario} recuperó al usuario ${usuario}`);
        }catch(error){
            console.error('Error al recuperar: ',error);
            return error;
        }
    });
    //---------- USUARIOS ELIMINADOS
}
//______________DELETE______________