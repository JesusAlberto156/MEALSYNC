import { getStatusAllService,updateStatusLoginService,updateStatusLogoutService } from "../services/status.service.js";
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
            io.emit('statusLogin','Cerró sesión ',usuario);
        }catch(error){
            console.error('Error al actualizar: ',error)
            return error;
        }
    });
};