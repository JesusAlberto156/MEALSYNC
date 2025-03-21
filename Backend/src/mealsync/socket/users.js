import { getUsersAllService } from "../services/users.service.js";
import { io } from "../../index.js";

export const users = (socket) => {
    socket.on('users', async () => {
        try {
          const result = await getUsersAllService();
          console.log('Usuarios obtenidos...');
          io.emit('users', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
};