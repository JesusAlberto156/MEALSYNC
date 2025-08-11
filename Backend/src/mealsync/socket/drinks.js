//____________IMPORT/EXPORT____________
// Consultas de sql
import { getDrinksService,getDrinkSpecificationsService,getDeletedDrinksService,getWarehouseDrinksService,getMenuTypeDrinksService } from "../services/drinks.js";
import { insertDrinkService,insertDrinkSpecificationsService,insertDeletedDrinkService,insertWarehouseDrinkService,insertMenuTypeDrinkService } from "../services/drinks.js";
import { updateDrinkService,updateDrinkSpecificationsService,updateWarehouseDrinkService } from "../services/drinks.js";
import { deleteMenuTypeDrinkService,deleteWarehouseDrinkService,deleteDeletedDrinkService } from "../services/drinks.js";
import { getLogsService } from "../services/logs.js";
import { insertLogDrinkService,insertLogDrinkSpecificationsService,insertLogDeletedDrinkService,insertLogWarehouseDrinkService,insertLogMenuTypeDrinkService } from "../services/drinks.js";
import { updateLogDrinkService,updateLogDrinkSpecificationsService,updateLogWarehouseDrinkService } from "../services/drinks.js";
import { deleteLogMenuTypeDrinkService,deleteLogWarehouseDrinkService,deleteLogDeletedDrinkService } from "../services/drinks.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Drinks_GET = (socket) => {
    // ---------- BEBIDAS ✔️
    socket.on('Get-Drinks', async () => {
        try {
          const result = await getDrinksService();
          console.log('Bebidas obtenidas...');
          io.emit('Get-Drinks', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- ESPECIFICACIONES DE BEBIDAS ✔️
    socket.on('Get-Drink-Specifications', async () => {
        try {
          const result = await getDrinkSpecificationsService();
          console.log('Especificaciones de bebidas obtenidas...');
          io.emit('Get-Drink-Specifications', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- BEBIDAS ELIMINADAS ✔️
    socket.on('Get-Deleted-Drinks', async () => {
        try {
          const result = await getDeletedDrinksService();
          console.log('Bebidas eliminadas obtenidas...');
          io.emit('Get-Deleted-Drinks', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- ALMACÉN DE BEBIDAS ✔️
    socket.on('Get-Warehouse-Drinks', async () => {
        try {
            const result = await getWarehouseDrinksService();
            console.log('Almacen de las bebidas obtenido...');
            io.emit('Get-Warehouse-Drinks', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- TIPO DE MENU BEBIDAS  ✔️
    socket.on('Get-Menu-Type-Drinks', async () => {
        try {
            const result = await getMenuTypeDrinksService();
            console.log('Tipos de menú de las bebidas obtenidos...');
            io.emit('Get-Menu-Type-Drinks', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Drinks_INSERT = (socket) => {
    // ---------- BEBIDAS ✔️
    socket.on('Insert-Drink',async (idusuario,nombre,idmenu,descripcion,precio,preparacion,imagen,tipos,ingredientes) => {
        try{
            await insertDrinkService(nombre,idmenu);
            const resultDrinks = await getDrinksService();
            const decryptedDataDrinks = decryptData(resultDrinks);
            const parsedDataDrinks = JSON.parse(decryptedDataDrinks);
            const idbebida = parsedDataDrinks.find(data => data.nombre === nombre)?.idbebida;
            await insertLogDrinkService(idbebida,idusuario,nombre,String(idmenu));         

            await insertDrinkSpecificationsService(descripcion,precio,preparacion,idbebida,imagen);
            const resultDrinkSpecifications = await getDrinkSpecificationsService();
            const decryptedDataDrinkSpecifications = decryptData(resultDrinkSpecifications);
            const parseDataDrinkSpecifications = JSON.parse(decryptedDataDrinkSpecifications);
            await insertLogDrinkSpecificationsService(parseDataDrinkSpecifications.find(data => data.idbebida === idbebida)?.idespecificacion,idusuario,descripcion,String(precio),String(preparacion),String(idbebida),imagen);
            
            let resultMenuTypeDrinks;
            let resultWarehouseDrinks;

            if(Array.isArray(tipos) && tipos.length > 0){
                for (const tipo of tipos) {
                    await insertMenuTypeDrinkService(tipo.idtipo, idbebida);
                    await insertLogMenuTypeDrinkService(idusuario,String(tipo.idtipo),String(idbebida));
                }
                resultMenuTypeDrinks = await getMenuTypeDrinksService();
            }

            if(Array.isArray(ingredientes) && ingredientes.length > 0){
                for (const ingrediente of ingredientes) {
                    await insertWarehouseDrinkService(ingrediente.idalmacen,idbebida,ingrediente.cantidad);
                    await insertLogWarehouseDrinkService(idusuario,String(ingrediente.idalmacen),String(idbebida),String(ingrediente.cantidad));
                }
                resultWarehouseDrinks = await getWarehouseDrinksService();
            }

            const resultLogs = await getLogsService();
            
            io.emit('Get-Drinks',resultDrinks);
            io.emit('Get-Drink-Specifications',resultDrinkSpecifications);
            if(resultMenuTypeDrinks !== undefined){
                io.emit('Get-Menu-Type-Drinks',resultMenuTypeDrinks);
            }
            if(resultWarehouseDrinks !== undefined){
                io.emit('Get-Warehouse-Drinks',resultWarehouseDrinks);
            }
            io.emit('Get-Logs',resultLogs); 
        }catch(error){
            console.error('Error al agregar la bebida: ',error);
            return error;
        }
    });
    // ---------- BEBIDAS ELIMINADAS ✔️
    socket.on('Insert-Deleted-Drink',async (idusuario,idbebida,tipos,ingredientes) => {
        try{
            await insertDeletedDrinkService(idbebida);
            const resultDeletedDrinks = await getDeletedDrinksService();
            const decryptedData = decryptData(resultDeletedDrinks);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedDrinkService(parsedData.find(data => data.idbebida === idbebida)?.ideliminado,idusuario,String(idbebida));
            
            let resultMenuTypeDrinks;
            let resultWarehouseDrinks;

            if(Array.isArray(tipos) && tipos.length > 0){
                for (const tipo of tipos) {
                    await deleteMenuTypeDrinkService(tipo.idtipo, idbebida);
                    await deleteLogMenuTypeDrinkService(idusuario,String(tipo.idtipo),String(idbebida));
                }
                resultMenuTypeDrinks = await getMenuTypeDrinksService();
            }

            if(Array.isArray(ingredientes) && ingredientes.length > 0){
                for (const ingrediente of ingredientes) {
                    await deleteWarehouseDrinkService(ingrediente.idalmacen,idbebida);
                    await deleteLogWarehouseDrinkService(idusuario,String(ingrediente.idalmacen),String(idbebida));
                }
                resultWarehouseDrinks = await getWarehouseDrinksService();
            }
            
            const resultLogs = await getLogsService();
            
            io.emit('Get-Deleted-Drinks',resultDeletedDrinks)
            if(resultMenuTypeDrinks !== undefined){
                io.emit('Get-Menu-Type-Drinks',resultMenuTypeDrinks);
            }
            if(resultWarehouseDrinks !== undefined){
                io.emit('Get-Warehouse-Drinks',resultWarehouseDrinks);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar la bebida: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Drinks_UPDATE = (socket) => {
    // ---------- BEBIDAS ✔️
    socket.on('Update-Drink',async (idusuario,idbebida,idespecificacion,nombre,idmenu,descripcion,precio,preparacion,imagen,tiposOriginales,tiposNuevos,ingredientesOriginales,ingredientesNuevos) => {
        try{
            await updateDrinkService(idbebida,nombre,idmenu);
            const resultDrinks = await getDrinksService();
            await updateLogDrinkService(idbebida,idusuario,nombre,String(idmenu));         

            let resultDrinkSpecifications
            if(idespecificacion === 0){
                await insertDrinkSpecificationsService(descripcion,precio,preparacion,idbebida,imagen);
                resultDrinkSpecifications = await getDrinkSpecificationsService();
                const decryptedDataDrinkSpecifications = decryptData(resultDrinkSpecifications);
                const parseDataDrinkSpecifications = JSON.parse(decryptedDataDrinkSpecifications);
                await insertLogDrinkSpecificationsService(parseDataDrinkSpecifications.find(data => data.idbebida === idbebida)?.idespecificacion,idusuario,descripcion,String(precio),String(preparacion),String(idbebida),imagen);
            }else{
                await updateDrinkSpecificationsService(idespecificacion,descripcion,precio,preparacion,imagen);
                resultDrinkSpecifications = await getDrinkSpecificationsService();
                await updateLogDrinkSpecificationsService(idespecificacion,idusuario,descripcion,String(precio),String(preparacion),String(idbebida),imagen);
            }
            
            let resultMenuTypeDrinks;
            let resultWarehouseDrinks;

            if(Array.isArray(tiposOriginales) && tiposOriginales.length > 0){
                if(Array.isArray(tiposNuevos) && tiposNuevos.length > 0){
                    for (const tipo of tiposNuevos) {
                        const existe = tiposOriginales.some(t => t.idtipo === tipo.idtipo);

                        if (!existe) {
                            await insertMenuTypeDrinkService(tipo.idtipo, idbebida);
                            await insertLogMenuTypeDrinkService(idusuario,String(tipo.idtipo),String(idbebida));
                        }
                    }
                    for (const tipo of tiposOriginales) {
                        const existe = tiposNuevos.some(t => t.idtipo === tipo.idtipo);

                        if (!existe) {
                            await deleteMenuTypeDrinkService(tipo.idtipo, idbebida);
                            await deleteLogMenuTypeDrinkService(idusuario,String(tipo.idtipo),String(idbebida));
                        }
                    }
                    resultMenuTypeDrinks = await getMenuTypeDrinksService();
                }else{
                    for (const tipo of tiposOriginales) {
                        await deleteMenuTypeDrinkService(tipo.idtipo, idbebida);
                        await deleteLogMenuTypeDrinkService(idusuario,String(tipo.idtipo),String(idbebida));
                    }
                    resultMenuTypeDrinks = await getMenuTypeDrinksService();
                }
            }else{
                if(Array.isArray(tiposNuevos) && tiposNuevos.length > 0){
                    for (const tipo of tiposNuevos) {
                        await insertMenuTypeDrinkService(tipo.idtipo, idbebida);
                        await insertLogMenuTypeDrinkService(idusuario,String(tipo.idtipo),String(idbebida));
                    }
                    resultMenuTypeDrinks = await getMenuTypeDrinksService();
                }
            }

            if(Array.isArray(ingredientesOriginales) && ingredientesOriginales.length > 0){
                if(Array.isArray(ingredientesNuevos) && ingredientesNuevos.length > 0){
                    for (const ingrediente of ingredientesNuevos) {
                        const existe = ingredientesOriginales.some(i => i.idalmacen === ingrediente.idalmacen && i.idbebida === idbebida);

                        if(existe){
                            await updateWarehouseDrinkService(ingrediente.idalmacen,idbebida,ingrediente.cantidad);
                            await updateLogWarehouseDrinkService(idusuario,String(ingrediente.idalmacen),String(idbebida),String(ingrediente.cantidad));
                        }else{
                            await insertWarehouseDrinkService(ingrediente.idalmacen,idbebida,ingrediente.cantidad);
                            await insertLogWarehouseDrinkService(idusuario,String(ingrediente.idalmacen),String(idbebida),String(ingrediente.cantidad));
                        }
                    }
                    for (const ingrediente of ingredientesOriginales) {
                        const existe = ingredientesNuevos.some(i => i.idalmacen === ingrediente.idalmacen && i.idbebida === idbebida);
                        
                        if(!existe){
                            await deleteWarehouseDrinkService(ingrediente.idalmacen,idbebida);
                            await deleteLogWarehouseDrinkService(idusuario,String(ingrediente.idalmacen),String(idbebida));
                        }
                    }
                    resultWarehouseDrinks = await getWarehouseDrinksService();
                }
            }else{
                if(Array.isArray(ingredientesNuevos) && ingredientesNuevos.length > 0){
                    for (const ingrediente of ingredientesNuevos) {
                        await insertWarehouseDrinkService(ingrediente.idalmacen,idbebida,ingrediente.cantidad);
                        await insertLogWarehouseDrinkService(idusuario,String(ingrediente.idalmacen),String(idbebida),String(ingrediente.cantidad));
                    }
                    resultWarehouseDrinks = await getWarehouseDrinksService();
                }
            }

            const resultLogs = await getLogsService();
            
            io.emit('Get-Drinks',resultDrinks);
            io.emit('Get-Drink-Specifications',resultDrinkSpecifications);
            if(resultMenuTypeDrinks !== undefined){
                io.emit('Get-Menu-Type-Drinks',resultMenuTypeDrinks);
            }
            if(resultWarehouseDrinks !== undefined){
                io.emit('Get-Warehouse-Drinks',resultWarehouseDrinks);
            }
            io.emit('Get-Logs',resultLogs); 
        }catch(error){
            console.error('Error al editar la bebida: ',error);
            return error;
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Drinks_DELETE = (socket) => {
    // ---------- BEBIDAS ELIMINADAS ✔️
    socket.on('Delete-Deleted-Drink',async (idusuario,ideliminado,idbebida) => {
        try{
            await deleteDeletedDrinkService(idbebida);
            const resultDeletedDrinks = await getDeletedDrinksService();
            await deleteLogDeletedDrinkService(ideliminado,idusuario,String(idbebida));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Drinks',resultDeletedDrinks)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar la bebida: ',error);
            return error;
        }
    });
}
//______________DELETE______________