import { getPermissionsAllService } from "../services/permissions.service.js";

export const permissions = (socket) => {
    socket.on('permissions', async () => {
        try{
            const result = await getPermissionsAllService();
            console.log('Permisos de Usuarios Obtenidos...');
            socket.emit('permissions',result);
        }catch(error){
            console.error('Error al obtener los datos: ',error)
            return error;
        }
    });
};