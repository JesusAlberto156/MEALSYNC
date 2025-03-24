import { getStatusAllService,updateStatusLoginService,updateStatusLogoutService,updateStatusEnableService,updateStatusDisableService } from "../services/status.service.js";
import { io } from "../../index.js";

export const status = (socket) => {
    socket.on('status', async () => {
        try{
            const result = await getStatusAllService();
            console.log('Estatus de Usuarios Obtenidos...');
            io.emit('status',result);
        }catch(error){
            console.error('Error al obtener los datos: ',error)
            return error;
        }
    });
    socket.on('statusLogin', async (id,usuario) => {
        try{
            await updateStatusLoginService(id);
            io.emit('statusLogin','Inicio sesión ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error)
            return error;
        }
    });
    socket.on('statusLogout', async (id,usuario) => {
        try{
            await updateStatusLogoutService(id);
            io.emit('statusLogout','Cerró sesión ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error)
            return error;
        }
    });
    socket.on('statusEnable', async () => {
        try{
            await updateStatusEnableService(id);
            io.emit('statusDisable','Se habilito a ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    socket.on('statusDisable', async (id,usuario) => {
        try{
            await updateStatusDisableService(id);
            io.emit('statusDisable','Se deshabilito a ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
};