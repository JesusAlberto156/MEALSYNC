import { insertStatusService,getStatusAllService,updateStatusLoginService,updateStatusLogoutService,updateStatusEnableService,updateStatusDisableService } from "../services/status.service.js";
import { io } from "../../index.js";

export const status = (socket) => {
    socket.on('statusInsert',async (id,habilitado,user) => {
        try{
            await insertStatusService(id,habilitado);
            io.emit('statusInsert','Se inserto el estatus a ',user);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    socket.on('status', async () => {
        try{
            const result = await getStatusAllService();
            console.log('Estatus de Usuarios Obtenidos...');
            io.emit('status',result);
        }catch(error){
            console.error('Error al obtener los datos: ',error);
            return error;
        }
    });
    socket.on('statusLogin', async (id,usuario) => {
        try{
            await updateStatusLoginService(id);
            io.emit('statusLogin','Inicio sesión ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    socket.on('statusLogout', async (id,usuario) => {
        try{
            await updateStatusLogoutService(id);
            io.emit('statusLogout','Cerró sesión ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    socket.on('statusEnable', async (id,user) => {
        try{
            await updateStatusEnableService(id);
            io.emit('statusEnable','Se habilito a ',user);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    socket.on('statusDisable', async (id,user) => {
        try{
            await updateStatusDisableService(id);
            io.emit('statusDisable','Se deshabilito a ',user);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
};