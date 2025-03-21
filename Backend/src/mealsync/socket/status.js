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
    socket.on('statusLogin', async (id) => {
        try{
            await updateStatusLoginService(id);
            console.log('Usuario Login... ');
            const result = await getStatusAllService();
            io.emit('statusLogin',result);
        }catch(error){
            console.error('Error al actualizar: ',error)
            return error;
        }
    });
    socket.on('statusLogout', async (id) => {
        try{
            await updateStatusLogoutService(id);
            console.log('Usuario Logout...');
            const result = await getStatusAllService();
            io.emit('statusLogout',result);
        }catch(error){
            console.error('Error al actualizar: ',error)
            return error;
        }
    });
};