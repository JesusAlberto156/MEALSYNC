//____________IMPORT/EXPORT____________
// Consultas de sql
import { getKeyService } from "../services/Key.js";
import { insertKeyService } from "../services/Key.js";
import { updateKeyService } from "../services/Key.js";
import { insertLogKeyService } from "../services/Key.js";
import { updateLogKeyService } from "../services/Key.js";
import { getLogsService } from "../services/logs.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Key_GET = (socket) => {
    // ---------- CLAVE ✔️
    socket.on('Get-Key', async () => {
        try {
            const result = await getKeyService();
            console.log('Clave obtenida...');
            io.emit('Get-Key', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
}
//______________GET______________
//______________INSERT______________
export const Key_INSERT = (socket) => {
    // ---------- CLAVE ✔️
    socket.on('Insert-Key',async (idusuario,clave) => {
        try{
            await insertKeyService(clave);
            const resultKey = await getKeyService();
            const decryptedData = decryptData(resultKey);
            const parsedData = JSON.parse(decryptedData);
            await insertLogKeyService(parsedData.find(data => data.clave === clave)?.idclave,idusuario,clave);
            const resultLogs = await getLogsService();
            io.emit('Get-Key',resultKey);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar la clave de autorización: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Key_UPDATE = (socket) => {
    // ---------- CLAVE ✔️
    socket.on('Update-Key',async (idusuario,idclave,clave) => {
        try{
            await updateKeyService(idclave,clave);
            const resultKey = await getKeyService();
            await updateLogKeyService(idclave,idusuario,clave);
            const resultLogs = await getLogsService();
            io.emit('Get-Key',resultKey);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar la clave de autorización: ',error);
            return error;
        }
    });
}
//______________UPDATE______________