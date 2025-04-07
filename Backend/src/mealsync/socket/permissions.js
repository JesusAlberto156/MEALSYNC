import { insertPermissionsService,getPermissionsAllService,updatePermissionsAllService,updatePermissionsSuperAdmonService } from "../services/permissions.service.js";
import { io } from "../../index.js";

export const permissions = (socket) => {
    socket.on('permissionsInsert',async (id,user,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
        try{
            await insertPermissionsService(id,administrador,chef,almacenista,cocinero,nutriologo,medico);
            io.emit('statusInsert','Se inserto los permisos a ',user);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    socket.on('permissions', async () => {
        try{
            const result = await getPermissionsAllService();
            console.log('Permisos de Usuarios Obtenidos...');
            io.emit('permissions',result);
        }catch(error){
            console.error('Error al obtener los datos: ',error)
            return error;
        }
    });
    socket.on('permissionsUpdateAll', async (id,user,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
        try{
            await updatePermissionsAllService(id,administrador,chef,almacenista,cocinero,nutriologo,medico);
            io.emit('permissionsUpdateAll','Se actualizarón los permisos a ',user);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    socket.on('permissionsUpdateSuperAdmon', async (id,user,superAdmon) => {
        try{
            await updatePermissionsSuperAdmonService(id,superAdmon);
            io.emit('permissionsUpdateSuperAdmon','Se actualizo el permiso de super administrador a ',user);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
};