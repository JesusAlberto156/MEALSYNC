import { getUsersAllService } from "../services/users.service.js";

export const users = (socket) => {
    socket.on('users', async () => {
        try {
          const result = await getUsersAllService();
          console.log('Usuarios obtenidos...');
          socket.emit('users', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
};