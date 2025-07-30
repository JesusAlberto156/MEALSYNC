//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSideDishesService,getSideDishSpecificationsService,getDeletedSideDishesService,getWarehouseSideDishesService,getMenuTypeSideDishesService } from "../services/sideDishes.js";
import { insertSideDishService,insertSideDishSpecificationsService,insertDeletedSideDishService,insertWarehouseSideDishService,insertMenuTypeSideDishService } from "../services/sideDishes.js";

import { deleteMenuTypeSideDishService,deleteWarehouseSideDishService } from "../services/sideDishes.js";
import { getLogsService } from "../services/logs.js";
import { insertLogSideDishService,insertLogSideDishSpecificationsService,insertLogDeletedSideDishService,insertLogWarehouseSideDishService,insertLogMenuTypeSideDishService } from "../services/sideDishes.js";

import { deleteLogMenuTypeSideDishService,deleteLogWarehouseSideDishService } from "../services/sideDishes.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Side_Dishes_GET = (socket) => {
    // ---------- GUARNICIONES ✔️
    socket.on('Get-Side-Dishes', async () => {
        try {
          const result = await getSideDishesService();
          console.log('Guarniciones obtenidas...');
          io.emit('Get-Side-Dishes', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- ESPECIFICACIONES DE GUARNICIONES ✔️
    socket.on('Get-Side-Dish-Specifications', async () => {
        try {
          const result = await getSideDishSpecificationsService();
          console.log('Especificaciones de guarniciones obtenidas...');
          io.emit('Get-Side-Dish-Specifications', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- GUARNICIONES ELIMINADAS ✔️
    socket.on('Get-Deleted-Side-Dishes', async () => {
        try {
          const result = await getDeletedSideDishesService();
          console.log('Guarniciones eliminadas obtenidas...');
          io.emit('Get-Deleted-Side-Dishes', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- ALMACÉN DE GUARNICIONES ✔️
    socket.on('Get-Warehouse-Side-Dishes', async () => {
        try {
            const result = await getWarehouseSideDishesService();
            console.log('Almacen de las guarnicones obtenido...');
            io.emit('Get-Warehouse-Side-Dishes', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- TIPO DE MENU GUARNICIONES  ✔️
    socket.on('Get-Menu-Type-Side-Dishes', async () => {
        try {
            const result = await getMenuTypeSideDishesService();
            console.log('Tipos de menú de las guarniciones obtenidos...');
            io.emit('Get-Menu-Type-Side-Dishes', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Side_Dishes_INSERT = (socket) => {
    // ---------- GUARNICIONES ✔️
    socket.on('Insert-Side-Dish',async (idusuario,nombre,idmenu,descripcion,precio,preparacion,imagen,tipos,ingredientes) => {
        try{
            await insertSideDishService(nombre,idmenu);
            const resultSideDishes = await getSideDishesService();
            const decryptedDataSideDishes = decryptData(resultSideDishes);
            const parsedDataSideDishes = JSON.parse(decryptedDataSideDishes);
            const idguarnicion = parsedDataSideDishes.find(data => data.nombre === nombre)?.idguarnicion;
            await insertLogSideDishService(idguarnicion,idusuario,nombre,String(idmenu));         

            await insertSideDishSpecificationsService(descripcion,precio,preparacion,idguarnicion,imagen);
            const resultSideDishSpecifications = await getSideDishSpecificationsService();
            const decryptedDataSideDishSpecifications = decryptData(resultSideDishSpecifications);
            const parseDataSideDishSpecifications = JSON.parse(decryptedDataSideDishSpecifications);
            await insertLogSideDishSpecificationsService(parseDataSideDishSpecifications.find(data => data.idguarnicion === idguarnicion)?.idespecificacion,idusuario,descripcion,String(precio),String(preparacion),String(idplatillo),imagen);
            
            let resultMenuTypeSideDishes;
            let resultWarehouseSideDishes;

            if(Array.isArray(tipos) && tipos.length > 0){
                for (const tipo of tipos) {
                    await insertMenuTypeSideDishService(tipo.idtipo, idguarnicion);
                    await insertLogMenuTypeSideDishService(idusuario,String(tipo.idtipo),String(idguarnicion));
                }
                resultMenuTypeSideDishes = await getMenuTypeSideDishesService();
            }

            if(Array.isArray(ingredientes) && ingredientes.length > 0){
                for (const ingrediente of ingredientes) {
                    await insertWarehouseSideDishService(ingrediente.idalmacen,idguarnicion,ingrediente.cantidad);
                    await insertLogWarehouseSideDishService(idusuario,String(ingrediente.idalmacen),String(idguarnicion),String(ingrediente.cantidad));
                }
                resultWarehouseSideDishes = await getWarehouseSideDishesService();
            }

            const resultLogs = await getLogsService();
            
            io.emit('Get-Side-Dishes',resultSideDishes);
            io.emit('Get-Side-Dish-Specifications',resultSideDishSpecifications);
            if(resultMenuTypeSideDishes !== undefined){
                io.emit('Get-Menu-Type-Side-Dishes',resultMenuTypeSideDishes);
            }
            if(resultWarehouseSideDishes !== undefined){
                io.emit('Get-Warehouse-Side-Dishes',resultWarehouseSideDishes);
            }
            io.emit('Get-Logs',resultLogs); 
        }catch(error){
            console.error('Error al agregar la guarnición: ',error);
            return error;
        }
    });
    // ---------- GUARNICIONES ELIMINADAS ✔️
    socket.on('Insert-Deleted-Side-Dish',async (idusuario,idguarnicion,tipos,ingredientes) => {
        try{
            await insertDeletedSideDishService(idguarnicion);
            const resultDeletedSideDishes = await getDeletedSideDishesService();
            const decryptedData = decryptData(resultDeletedSideDishes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedSideDishService(parsedData.find(data => data.idguarnicion === idguarnicion)?.ideliminado,idusuario,String(idguarnicion));
            
            let resultMenuTypeSideDishes;
            let resultWarehouseSideDishes;

            if(Array.isArray(tipos) && tipos.length > 0){
                for (const tipo of tipos) {
                    await deleteMenuTypeSideDishService(tipo.idtipo, idguarnicion);
                    await deleteLogMenuTypeSideDishService(idusuario,String(tipo.idtipo),String(idguarnicion));
                }
                resultMenuTypeSideDishes = await getMenuTypeSideDishesService();
            }

            if(Array.isArray(ingredientes) && ingredientes.length > 0){
                for (const ingrediente of ingredientes) {
                    await deleteWarehouseSideDishService(ingrediente.idalmacen,idguarnicion);
                    await deleteLogWarehouseSideDishService(idusuario,String(ingrediente.idalmacen),String(idguarnicion));
                }
                resultWarehouseSideDishes = await getWarehouseSideDishesService();
            }
            
            const resultLogs = await getLogsService();
            
            io.emit('Get-Deleted-Side-Dishes',resultDeletedSideDishes)
            if(resultMenuTypeSideDishes !== undefined){
                io.emit('Get-Menu-Type-Side-Dishes',resultMenuTypeSideDishes);
            }
            if(resultWarehouseSideDishes !== undefined){
                io.emit('Get-Warehouse-Side-Dishes',resultWarehouseSideDishes);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar la guarnición: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Side_Dishes_UPDATE = (socket) => {
    // ---------- GUARNICIONES

    // ---------- ALMACÉN DE GUARNICIONES

}
//______________UPDATE______________
//______________DELETE______________
export const Side_Dishes_DELETE = (socket) => {
    // ---------- GUARNICIONES ELIMINADAS ✔️

}
//______________DELETE______________