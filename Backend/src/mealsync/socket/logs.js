//____________IMPORT/EXPORT____________
// Consultas de sql
import { getLogsService } from "../services/logs.js";
import { insertLogService } from "../services/logs.js";
// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Logs_GET = (socket) => {
    //---------- LOGS  
    socket.on('Get-Logs', async () => {
        try {
          const result = await getLogsService();
          console.log('Registros obtenidos...');
          io.emit('Get-Logs', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- LOGS
};
//______________GET______________
//______________INSERT______________
export const Logs_INSERT = (socket) => {
    //---------- LOGS
    socket.on('Insert-Log',async (tabla,fecha,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9,campo10) => {
        try{
            await insertLogService(tabla,fecha,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9,campo10);
            io.emit('Insert-Log',`Se agregó la operación al registro de `,tabla);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- LOGS
}
//______________INSERT______________