//____________IMPORT/EXPORT____________
// Consultas de sql
import { getUsersService,getDeleteUsersService,getPermissionsService,getStatusService,getUserTypesService } from "../services/users.js";
import { insertUsersService,insertDeleteUsersService,insertPermissionsService,insertStatusService } from "../services/users.js";
import { updateUsersService,updatePermissionsService,updatePermissionService,updateStatusLogService,updateStatusEnableService } from "../services/users.js";
// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//____________GET____________
export const Users_GET = (socket) => {
    //---------- USUARIOS
    socket.on('Users', async () => {
        try {
            const result = await getUsersService();
            console.log('Usuarios obtenidos...');
            io.emit('Users', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- USUARIOS
    //---------- USUARIOS ELIMINADOS
    socket.on('Delete-Users', async () => {
        try {
            const result = await getDeleteUsersService();
            console.log('Usuarios Eliminados obtenidos...');
            io.emit('Delete-Users', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- USUARIOS ELIMINADOS
    //---------- PERMISOS
    socket.on('Permissions', async () => {
        try {
            const result = await getPermissionsService();
            console.log('Permisos de usuarios obtenidos...');
            io.emit('Permissions', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Status', async () => {
        try {
            const result = await getStatusService();
            console.log('Estatus de usuarios obtenidos...');
            io.emit('Status', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ESTATUS
    //---------- TIPOS DE USUARIOS
    socket.on('User-Types', async () => {
        try {
            const result = await getUserTypesService();
            console.log('Tipos de usuarios obtenidos...');
            io.emit('User-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE USUARIOS
};
//____________GET____________
//______________INSERT______________
export const Users_INSERT = (socket) => {
    //---------- USUARIOS
    socket.on('User-Insert',async (id,nombre,nombrecorto,usuario,contrasena) => {
        try{
            await insertUsersService(id,nombre,nombrecorto,usuario,contrasena);
            io.emit('User-Insert','Se inserto el usuario ',usuario);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    //---------- USUARIOS
    //---------- USUARIOS ELIMINADOS
    socket.on('User-Delete-Insert',async (id,usuario) => {
        try{
            await insertDeleteUsersService(id);
            io.emit('User-Delete-Insert','Se elimino el usuario ',usuario);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- USUARIOS ELIMINADOS
    //---------- PERMISOS
    socket.on('Permissions-Insert',async (id,user,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
        try{
            await insertPermissionsService(id,administrador,chef,almacenista,cocinero,nutriologo,medico);
            io.emit('Permissions-Insert','Se inserto los permisos a ',user);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Status-Insert',async (id,habilitado,user) => {
        try{
            await insertStatusService(id,habilitado);
            io.emit('Status-Insert','Se inserto el estatus a ',user);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    //---------- ESTATUS
}
//______________INSERT______________
//______________UPDATE______________
export const Users_UPDATE = (socket) => {
    //---------- USUARIOS
    socket.on('User-Update',async (id,idusuario,nombre,nombrecorto,usuario,contrasena) => {
        try{
            await updateUsersService(id,idusuario,nombre,nombrecorto,usuario,contrasena);
            io.emit('User-Update','Se actualizo el usuario ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    //---------- USUARIOS
    //---------- PERMISOS
    socket.on('Permissions-Update', async (id,user,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
        try{
            await updatePermissionsService(id,administrador,chef,almacenista,cocinero,nutriologo,medico);
            io.emit('Permissions-Update','Se actualizarón los permisos a ',user);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    socket.on('Permission-Update', async (id,user,superadministrador) => {
        try{
            await updatePermissionService(id,superadministrador);
            io.emit('Permission-Update','Se actualizo el permiso a ',user);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    //---------- PERMISOS
    //---------- ESTATUS
    socket.on('Status-Log-Update', async (id,user,activo) => {
        try{
            await updateStatusLogService(id,activo);
            if(activo){
                io.emit('Status-Log-Update','Inicio sesión ',user);
            }else{
                io.emit('Status-Log-Update','Cerró sesión ',user);
            }
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    socket.on('Status-Enable-Update', async (id,user,habilitado) => {
        try{
            await updateStatusEnableService(id,habilitado);
            if(habilitado){
                io.emit('Status-Enable-Update','Se habilito a ',user);
            }else{
                io.emit('Status-Enable-Update','Se deshabilito a ',user);
            }
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    //---------- ESTATUS
}
//______________UPDATE______________