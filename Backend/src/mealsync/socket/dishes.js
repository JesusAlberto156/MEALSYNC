//____________IMPORT/EXPORT____________
// Consultas de sql
import { getDishesService,getDishSpecificationsService,getDeletedDishesService,getWarehouseDishesService,getMenuTypeDishesService } from "../services/dishes.js";
import { insertDishService,insertDishSpecificationsService,insertDeletedDishService,insertWarehouseDishService,insertMenuTypeDishService } from "../services/dishes.js";
import { updateDishService,updateDishSpecificationsService,updateWarehouseDishService } from "../services/dishes.js";
import { deleteMenuTypeDishService,deleteWarehouseDishService,deleteDeletedDishService } from "../services/dishes.js";
import { getLogsService } from "../services/logs.js";
import { insertLogDishService,insertLogDishSpecificationsService,insertLogDeletedDishService,insertLogWarehouseDishService,insertLogMenuTypeDishService } from "../services/dishes.js";
import { updateLogDishService,updateLogDishSpecificationsService,updateLogWarehouseDishService } from "../services/dishes.js";
import { deleteLogMenuTypeDishService,deleteLogWarehouseDishService,deleteLogDeletedDishService } from "../services/dishes.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Dishes_GET = (socket) => {
    // ---------- PLATILLOS ✔️
    socket.on('Get-Dishes', async () => {
        try {
          const result = await getDishesService();
          console.log('Platillos obtenidos...');
          io.emit('Get-Dishes', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- ESPECIFICACIONES DE PLATILLOS ✔️
    socket.on('Get-Dish-Specifications', async () => {
        try {
          const result = await getDishSpecificationsService();
          console.log('Especificaciones de platillo obtenidas...');
          io.emit('Get-Dish-Specifications', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- PLATILLOS ELIMINADOS ✔️
    socket.on('Get-Deleted-Dishes', async () => {
        try {
          const result = await getDeletedDishesService();
          console.log('Platillos eliminados obtenidos...');
          io.emit('Get-Deleted-Dishes', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- ALMACÉN DE PLATILLOS ✔️
    socket.on('Get-Warehouse-Dishes', async () => {
        try {
            const result = await getWarehouseDishesService();
            console.log('Almacen de los platillos obtenido...');
            io.emit('Get-Warehouse-Dishes', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- TIPO DE MENU PLATILLOS  ✔️
    socket.on('Get-Menu-Type-Dishes', async () => {
        try {
            const result = await getMenuTypeDishesService();
            console.log('Tipos de menú de los platillos obtenidos...');
            io.emit('Get-Menu-Type-Dishes', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Dishes_INSERT = (socket) => {
    // ---------- PLATILLOS ✔️
    socket.on('Insert-Dish',async (idusuario,nombre,idmenu,descripcion,precio,preparacion,imagen,tipos,ingredientes) => {
        try{
            await insertDishService(nombre,idmenu);
            const resultDishes = await getDishesService();
            const decryptedDataDishes = decryptData(resultDishes);
            const parsedDataDishes = JSON.parse(decryptedDataDishes);
            const idplatillo = parsedDataDishes.find(data => data.nombre === nombre)?.idplatillo;
            await insertLogDishService(idplatillo,idusuario,nombre,String(idmenu));         

            await insertDishSpecificationsService(descripcion,precio,preparacion,idplatillo,imagen);
            const resultDishSpecifications = await getDishSpecificationsService();
            const decryptedDataDishSpecifications = decryptData(resultDishSpecifications);
            const parseDataDishSpecifications = JSON.parse(decryptedDataDishSpecifications);
            await insertLogDishSpecificationsService(parseDataDishSpecifications.find(data => data.idplatillo === idplatillo)?.idespecificacion,idusuario,descripcion,String(precio),String(preparacion),String(idplatillo),imagen);
            
            let resultMenuTypeDishes;
            let resultWarehouseDishes;

            if(Array.isArray(tipos) && tipos.length > 0){
                for (const tipo of tipos) {
                    await insertMenuTypeDishService(tipo.idtipo, idplatillo);
                    await insertLogMenuTypeDishService(idusuario,String(tipo.idtipo),String(idplatillo));
                }
                resultMenuTypeDishes = await getMenuTypeDishesService();
            }

            if(Array.isArray(ingredientes) && ingredientes.length > 0){
                for (const ingrediente of ingredientes) {
                    await insertWarehouseDishService(ingrediente.idalmacen,idplatillo,ingrediente.cantidad);
                    await insertLogWarehouseDishService(idusuario,String(ingrediente.idalmacen),String(idplatillo),String(ingrediente.cantidad));
                }
                resultWarehouseDishes = await getWarehouseDishesService();
            }

            const resultLogs = await getLogsService();
            
            io.emit('Get-Dishes',resultDishes);
            io.emit('Get-Dish-Specifications',resultDishSpecifications);
            if(resultMenuTypeDishes !== undefined){
                io.emit('Get-Menu-Type-Dishes',resultMenuTypeDishes);
            }
            if(resultWarehouseDishes !== undefined){
                io.emit('Get-Warehouse-Dishes',resultWarehouseDishes);
            }
            io.emit('Get-Logs',resultLogs); 
        }catch(error){
            console.error('Error al agregar al platillo: ',error);
            return error;
        }
    });
    // ---------- PLATILLOS ELIMINADOS ✔️
    socket.on('Insert-Deleted-Dish',async (idusuario,idplatillo,tipos,ingredientes) => {
        try{
            await insertDeletedDishService(idplatillo);
            const resultDeletedDishes = await getDeletedDishesService();
            const decryptedData = decryptData(resultDeletedDishes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedDishService(parsedData.find(data => data.idplatillo === idplatillo)?.ideliminado,idusuario,String(idplatillo));
            
            let resultMenuTypeDishes;
            let resultWarehouseDishes;

            if(Array.isArray(tipos) && tipos.length > 0){
                for (const tipo of tipos) {
                    await deleteMenuTypeDishService(tipo.idtipo, idplatillo);
                    await deleteLogMenuTypeDishService(idusuario,String(tipo.idtipo),String(idplatillo));
                }
                resultMenuTypeDishes = await getMenuTypeDishesService();
            }

            if(Array.isArray(ingredientes) && ingredientes.length > 0){
                for (const ingrediente of ingredientes) {
                    await deleteWarehouseDishService(ingrediente.idalmacen,idplatillo);
                    await deleteLogWarehouseDishService(idusuario,String(ingrediente.idalmacen),String(idplatillo));
                }
                resultWarehouseDishes = await getWarehouseDishesService();
            }
            
            const resultLogs = await getLogsService();
            
            io.emit('Get-Deleted-Dishes',resultDeletedDishes)
            if(resultMenuTypeDishes !== undefined){
                io.emit('Get-Menu-Type-Dishes',resultMenuTypeDishes);
            }
            if(resultWarehouseDishes !== undefined){
                io.emit('Get-Warehouse-Dishes',resultWarehouseDishes);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar al platillo: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Dishes_UPDATE = (socket) => {
    // ---------- PLATILLOS
    socket.on('Update-Dish',async (idusuario,idplatillo,idespecificacion,nombre,idmenu,descripcion,precio,preparacion,imagen,tiposOriginales,tiposNuevos,ingredientesOriginales,ingredientesNuevos) => {
        try{
            await updateDishService(idplatillo,nombre,idmenu);
            const resultDishes = await getDishesService();
            await updateLogDishService(idplatillo,idusuario,nombre,String(idmenu));         

            let resultDishSpecifications
            if(idespecificacion === 0){
                await insertDishSpecificationsService(descripcion,precio,preparacion,idplatillo,imagen);
                resultDishSpecifications = await getDishSpecificationsService();
                const decryptedDataDishSpecifications = decryptData(resultDishSpecifications);
                const parseDataDishSpecifications = JSON.parse(decryptedDataDishSpecifications);
                await insertLogDishSpecificationsService(parseDataDishSpecifications.find(data => data.idplatillo === idplatillo)?.idespecificacion,idusuario,descripcion,String(precio),String(preparacion),String(idplatillo),imagen);
            }else{
                await updateDishSpecificationsService(idespecificacion,descripcion,precio,preparacion,imagen);
                resultDishSpecifications = await getDishSpecificationsService();
                await updateLogDishSpecificationsService(idespecificacion,idusuario,descripcion,String(precio),String(preparacion),String(idplatillo),imagen);
            }
            
            let resultMenuTypeDishes;
            let resultWarehouseDishes;

            if(Array.isArray(tiposOriginales) && tiposOriginales.length > 0){
                if(Array.isArray(tiposNuevos) && tiposNuevos.length > 0){
                    for (const tipo of tiposNuevos) {
                        const existe = tiposOriginales.some(t => t.idtipo === tipo.idtipo);

                        if (!existe) {
                            await insertMenuTypeDishService(tipo.idtipo, idplatillo);
                            await insertLogMenuTypeDishService(idusuario,String(tipo.idtipo),String(idplatillo));
                        }
                    }
                    for (const tipo of tiposOriginales) {
                        const existe = tiposNuevos.some(t => t.idtipo === tipo.idtipo);

                        if (!existe) {
                            await deleteMenuTypeDishService(tipo.idtipo, idplatillo);
                            await deleteLogMenuTypeDishService(idusuario,String(tipo.idtipo),String(idplatillo));
                        }
                    }
                    resultMenuTypeDishes = await getMenuTypeDishesService();
                }else{
                    for (const tipo of tiposOriginales) {
                        await deleteMenuTypeDishService(tipo.idtipo, idplatillo);
                        await deleteLogMenuTypeDishService(idusuario,String(tipo.idtipo),String(idplatillo));
                    }
                    resultMenuTypeDishes = await getMenuTypeDishesService();
                }
            }else{
                if(Array.isArray(tiposNuevos) && tiposNuevos.length > 0){
                    for (const tipo of tiposNuevos) {
                        await insertMenuTypeDishService(tipo.idtipo, idplatillo);
                        await insertLogMenuTypeDishService(idusuario,String(tipo.idtipo),String(idplatillo));
                    }
                    resultMenuTypeDishes = await getMenuTypeDishesService();
                }
            }

            if(Array.isArray(ingredientesOriginales) && ingredientesOriginales.length > 0){
                if(Array.isArray(ingredientesNuevos) && ingredientesNuevos.length > 0){
                    for (const ingrediente of ingredientesNuevos) {
                        const existe = ingredientesOriginales.some(i => i.idalmacen === ingrediente.idalmacen && i.idplatillo === idplatillo);

                        if(existe){
                            await updateWarehouseDishService(ingrediente.idalmacen,idplatillo,ingrediente.cantidad);
                            await updateLogWarehouseDishService(idusuario,String(ingrediente.idalmacen),String(idplatillo),String(ingrediente.cantidad));
                        }else{
                            await insertWarehouseDishService(ingrediente.idalmacen,idplatillo,ingrediente.cantidad);
                            await insertLogWarehouseDishService(idusuario,String(ingrediente.idalmacen),String(idplatillo),String(ingrediente.cantidad));
                        }
                    }
                    for (const ingrediente of ingredientesOriginales) {
                        const existe = ingredientesNuevos.some(i => i.idalmacen === ingrediente.idalmacen && i.idplatillo === idplatillo);
                        
                        if(!existe){
                            await deleteWarehouseDishService(ingrediente.idalmacen,idplatillo);
                            await deleteLogWarehouseDishService(idusuario,String(ingrediente.idalmacen),String(idplatillo));
                        }
                    }
                    resultWarehouseDishes = await getWarehouseDishesService();
                }
            }else{
                if(Array.isArray(ingredientesNuevos) && ingredientesNuevos.length > 0){
                    for (const ingrediente of ingredientesNuevos) {
                        await insertWarehouseDishService(ingrediente.idalmacen,idplatillo,ingrediente.cantidad);
                        await insertLogWarehouseDishService(idusuario,String(ingrediente.idalmacen),String(idplatillo),String(ingrediente.cantidad));
                    }
                    resultWarehouseDishes = await getWarehouseDishesService();
                }
            }

            const resultLogs = await getLogsService();
            
            io.emit('Get-Dishes',resultDishes);
            io.emit('Get-Dish-Specifications',resultDishSpecifications);
            if(resultMenuTypeDishes !== undefined){
                io.emit('Get-Menu-Type-Dishes',resultMenuTypeDishes);
            }
            if(resultWarehouseDishes !== undefined){
                io.emit('Get-Warehouse-Dishes',resultWarehouseDishes);
            }
            io.emit('Get-Logs',resultLogs); 
        }catch(error){
            console.error('Error al editar al platillo: ',error);
            return error;
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Dishes_DELETE = (socket) => {
    // ---------- PLATILLOS ELIMINADOS ✔️
    socket.on('Delete-Deleted-Dish',async (idusuario,ideliminado,idplatillo) => {
        try{
            await deleteDeletedDishService(idplatillo);
            const resultDeletedDishes = await getDeletedDishesService();
            await deleteLogDeletedDishService(ideliminado,idusuario,String(idplatillo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Dishes',resultDeletedDishes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar al platillo: ',error);
            return error;
        }
    });
}
//______________DELETE______________