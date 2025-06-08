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
    socket.on('Insert-Log-User',async (usuario,fecha,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6) => {
        try{
            await insertLogService('Usuarios',fecha,operacion,idtabla,idusuario,'',campo2,campo3,campo4,campo5,campo6,'','','','');
            io.emit('Insert-Log-User',`${usuario} realizó un ${operacion} a la tabla de Usuarios`);
        }catch(error){
            console.error('Error al realizar la operación: ',error);
            return error;
        }
    });
    socket.on('Insert-Log-Permissions',async (usuario,fecha,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9) => {
        try{
            await insertLogService('Permisos',fecha,operacion,idtabla,idusuario,'',campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9,'');
            io.emit('Insert-Log-Permissions',`${usuario} realizó un ${operacion} a la tabla de Permisos`);
        }catch(error){
            console.error('Error al realizar la operación: ',error);
            return error;
        }
    });
    socket.on('Insert-Log-Status',async (usuario,fecha,operacion,idtabla,idusuario,campo2,campo3,campo4) => {
        try{
            await insertLogService('Estatus',fecha,operacion,idtabla,idusuario,'',campo2,campo3,campo4,'','','','','','');
            io.emit('Insert-Log-Status',`${usuario} realizó un ${operacion} a la tabla de Estatus`);
        }catch(error){
            console.error('Error al realizar la operación: ',error);
            return error;
        }
    });
    socket.on('Insert-Log-Deleted-User',async (usuario,fecha,operacion,idtabla,idusuario,campo2) => {
        try{
            await insertLogService('Usuarios Eliminados',fecha,operacion,idtabla,idusuario,'',campo2,'','','','','','','','');
            io.emit('Insert-Log-Deleted-User',`${usuario} realizó un ${operacion} a la tabla de Usuarios Eliminados`);
        }catch(error){
            console.error('Error al realizar la operación: ',error);
            return error;
        }
    });
    socket.on('Insert-Log',async (usuario,fecha,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9,campo10) => {
        try{
            await insertLogService('',fecha,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9,campo10);
            io.emit('Insert-Log',`${usuario} realizó un ${operacion} a la tabla de `);
        }catch(error){
            console.error('Error al realizar la operación: ',error);
            return error;
        }
    });
    //---------- LOGS
}
//______________INSERT______________