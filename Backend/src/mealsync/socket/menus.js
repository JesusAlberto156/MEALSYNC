//____________IMPORT/EXPORT____________
// Consultas de sql
import { getMenusService,getMenuTypesService,getDeletedMenuTypesService,getMenuTypeUbicationsService,getMenuUbicationsService } from "../services/menus.js";
import { insertMenuTypeService,insertDeletedMenuTypeService,insertMenuTypeUbicationService } from "../services/menus.js";
import { updateMenuTypeService } from "../services/menus.js";
import { deleteDeletedMenuTypeService,deleteMenuTypeUbicationService } from "../services/menus.js";
import { getLogsService } from "../services/logs.js";
import { insertLogMenuTypeService,insertLogDeletedMenuTypeService,insertLogMenuTypeUbicationService } from "../services/menus.js";
import { updateLogMenuTypeService } from "../services/menus.js";
import { deleteLogDeletedMenuTypeService,deleteLogMenuTypeUbicationService } from "../services/menus.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Menus_GET = (socket) => {
    // ---------- MENUS ✔️
    socket.on('Get-Menus', async () => {
        try {
          const result = await getMenusService();
          console.log('Menús obtenidos...');
          io.emit('Get-Menus', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- TIPOS DE MENUS ✔️
    socket.on('Get-Menu-Types', async () => {
        try {
          const result = await getMenuTypesService();
          console.log('Tipos de menú obtenidos...');
          io.emit('Get-Menu-Types', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- TIPOS DE MENUS ELIMINADOS ✔️
    socket.on('Get-Deleted-Menu-Types', async () => {
        try {
          const result = await getDeletedMenuTypesService();
          console.log('Tipos de menú eliminados obtenidos...');
          io.emit('Get-Deleted-Menu-Types', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- TIPOS DE MENUS UBICACION ✔️
    socket.on('Get-Menu-Type-Ubications', async () => {
        try {
            const result = await getMenuTypeUbicationsService();
            console.log('Tipos de menú ubicación de menú obtenidos...');
            io.emit('Get-Menu-Type-Ubications', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- MENUS UBICACION ✔️
    socket.on('Get-Menu-Ubications', async () => {
        try {
            const result = await getMenuUbicationsService();
            console.log('Ubicación de menús obtenidos...');
            io.emit('Get-Menu-Ubications', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Menus_INSERT = (socket) => {
    // ---------- TIPOS DE MENUS ✔️
    socket.on('Insert-Menu-Type',async (idusuario,nombre,ubicacion1,ubicacion2,ubicacion3) => {
        try{
            await insertMenuTypeService(nombre);
            const resultMenuTypes = await getMenuTypesService();
            const decryptedData = decryptData(resultMenuTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogMenuTypeService(parsedData.find(data => data.nombre === nombre)?.idtipo,idusuario,nombre);

            let resultMenuTypeUbications;

            if(ubicacion1){
                await insertMenuTypeUbicationService(parsedData.find(data => data.nombre === nombre)?.idtipo,1);
                resultMenuTypeUbications = await getMenuTypeUbicationsService();
                const decryptedData = decryptData(resultMenuTypeUbications);
                const parsedData1 = JSON.parse(decryptedData);
                await insertLogMenuTypeUbicationService(idusuario,String(parsedData1.find(data => data.nombre === nombre)?.idtipo),'1');
            }
            if(ubicacion2){
                await insertMenuTypeUbicationService(parsedData.find(data => data.nombre === nombre)?.idtipo,2);
                resultMenuTypeUbications = await getMenuTypeUbicationsService();
                const decryptedData = decryptData(resultMenuTypeUbications);
                const parsedData2 = JSON.parse(decryptedData);
                await insertLogMenuTypeUbicationService(idusuario,String(parsedData2.find(data => data.nombre === nombre)?.idtipo),'2');
            }
            if(ubicacion3){
                await insertMenuTypeUbicationService(parsedData.find(data => data.nombre === nombre)?.idtipo,3);
                resultMenuTypeUbications = await getMenuTypeUbicationsService();
                const decryptedData = decryptData(resultMenuTypeUbications);
                const parsedData3 = JSON.parse(decryptedData);
                await insertLogMenuTypeUbicationService(idusuario,String(parsedData3.find(data => data.nombre === nombre)?.idtipo),'3');
            }

            const resultLogs = await getLogsService();
            io.emit('Get-Menu-Types',resultMenuTypes);
            io.emit('Get-Logs',resultLogs);
            if(resultMenuTypeUbications !== undefined){
                io.emit('Get-Menu-Type-Ubications',resultMenuTypeUbications);
            }  
        }catch(error){
            console.error('Error al agregar al tipo de menú: ',error);
            return error;
        }
    });
    // ---------- TIPOS DE MENUS ELIMINADOS ✔️
    socket.on('Insert-Deleted-Menu-Type',async (idusuario,idtipo) => {
        try{
            await insertDeletedMenuTypeService(idtipo);
            const resultDeletedMenuTypes = await getDeletedMenuTypesService();
            const decryptedData = decryptData(resultDeletedMenuTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedMenuTypeService(parsedData.find(data => data.idtipo === idtipo)?.ideliminado,idusuario,String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Menu-Types',resultDeletedMenuTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar al tipo de menú: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Menus_UPDATE = (socket) => {
    // ---------- TIPOS DE MENUS ✔️
    socket.on('Update-Menu-Type',async (idusuario,idtipo,nombre,ubicacion1,ubicacion2,ubicacion3) => {
        try{
            await updateMenuTypeService(idtipo,nombre);
            const resultMenuTypes = await getMenuTypesService();
            await updateLogMenuTypeService(idtipo,idusuario,nombre);
            
            let resultMenuTypeUbications;

            resultMenuTypeUbications = await getMenuTypeUbicationsService();
            const decryptedData = decryptData(resultMenuTypeUbications);
            const parsedData = JSON.parse(decryptedData);

            if(!ubicacion1){
                if(parsedData.some(type => type.idtipo === idtipo && type.idubicacion === 1)){
                    await deleteMenuTypeUbicationService(idtipo,1);
                    resultMenuTypeUbications = await getMenuTypeUbicationsService();
                    await deleteLogMenuTypeUbicationService(idusuario,String(idtipo),'1');
                }
            }else{
                if(!parsedData.some(type => type.idtipo === idtipo && type.idubicacion === 1)){
                    await insertMenuTypeUbicationService(idtipo,1);
                    resultMenuTypeUbications = await getMenuTypeUbicationsService();
                    await insertLogMenuTypeUbicationService(idusuario,String(idtipo),'1');
                }
            }
            if(!ubicacion2){
                if(parsedData.some(type => type.idtipo === idtipo && type.idubicacion === 2)){
                    await deleteMenuTypeUbicationService(idtipo,2);
                    resultMenuTypeUbications = await getMenuTypeUbicationsService();
                    await deleteLogMenuTypeUbicationService(idusuario,String(idtipo),'2');
                }
            }else{
                if(!parsedData.some(type => type.idtipo === idtipo && type.idubicacion === 2)){
                    await insertMenuTypeUbicationService(idtipo,2);
                    resultMenuTypeUbications = await getMenuTypeUbicationsService();
                    await insertLogMenuTypeUbicationService(idusuario,String(idtipo),'2');
                }   
            }
            if(!ubicacion3){
                if(parsedData.some(type => type.idtipo === idtipo && type.idubicacion === 3)){
                    await deleteMenuTypeUbicationService(idtipo,3);
                    resultMenuTypeUbications = await getMenuTypeUbicationsService();
                    await deleteLogMenuTypeUbicationService(idusuario,String(idtipo),'3');
                }
            }else{
                if(!parsedData.some(type => type.idtipo === idtipo && type.idubicacion === 3)){
                    await insertMenuTypeUbicationService(idtipo,3);
                    resultMenuTypeUbications = await getMenuTypeUbicationsService();
                    await insertLogMenuTypeUbicationService(idusuario,String(idtipo),'3');
                }
            }

            const resultLogs = await getLogsService();
            io.emit('Get-Menu-Types',resultMenuTypes);
            io.emit('Get-Logs',resultLogs);
            io.emit('Get-Menu-Type-Ubications',resultMenuTypeUbications);
        }catch(error){
            console.error('Error al editar al tipo de menú: ',error);
            callback({ error: error.message });
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Menus_DELETE = (socket) => {
    // ---------- TIPOS DE MENUS ELIMINADOS ✔️
    socket.on('Delete-Deleted-Menu-Type',async (idusuario,ideliminado,idtipo) => {
        try{
            await deleteDeletedMenuTypeService(idtipo);
            const resultDeletedSuppliers = await getDeletedMenuTypesService();
            await deleteLogDeletedMenuTypeService(ideliminado,idusuario,String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Menu-Types',resultDeletedSuppliers)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar al tipo de menú: ',error);
            return error;
        }
    });
}
//______________DELETE______________