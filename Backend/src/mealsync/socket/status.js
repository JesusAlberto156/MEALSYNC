import { getStatusAllService,updateStatusLoginService,updateStatusLogoutService } from "../services/status.service.js";

export const status = (socket) => {
    socket.on('status', async () => {
        try{
            const result = await getStatusAllService();
            console.log('Estatus de Usuarios Obtenidos...');
            socket.emit('status',result);
        }catch(error){
            console.error('Error al obtener los datos: ',error)
            return error;
        }
    });
    socket.on('statusLogin', async (id,bolean) => {
        try{
            const updateResult = await updateStatusLoginService(id,bolean);
            console.log('Usuario Activo...');
            socket.emit('statusLogin',updateResult);
        }catch(error){
            console.error('Error al actualizar: ',error)
            return error;
        }
    });
    socket.on('statusLogout', async (id,bolean) => {
        try{
            const updateResult = await updateStatusLogoutService(id,bolean);
            console.log('Usuario Inactivo...');
            socket.emit('statusLogout',updateResult);
        }catch(error){
            console.error('Error al actualizar: ',error)
            return error;
        }
    });
};