//____________IMPORT/EXPORT____________
// Consultas de sql
import { getLogsService } from "../services/logs.js";
// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Logs_GET = (socket) => {
    //---------- LOGS ✔️
    socket.on('Get-Logs', async () => {
        try {
          const result = await getLogsService();
          console.log('Registros obtenidos...');
          io.emit('Get-Logs', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________