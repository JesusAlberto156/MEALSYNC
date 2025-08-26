//____________IMPORT/EXPORT____________
// Consultas de sql
import { getWarehouseCategoriesService,getWarehouseSupplyTypesService,getWarehouseCleaningTypesService,getWarehouseCleaningService,getWarehouseFixedExpensesService,getOrdersService,getDeletedOrdersService,getSupplyOrdersService,getCleaningSupplyOrdersService,getMessageSupplyOrdersService,getMessageCleaningSupplyOrdersService,updateSupplyOrderPriceService,updateLogSupplyOrderPriceService, updateCleaningSupplyOrderPriceService, updateLogCleaningSupplyOrderPriceService } from "../services/warehouse.js";
import { insertWarehouseCategoryService,insertWarehouseCategoryDateService,insertWarehouseSupplyTypeService,insertWarehouseSupplyTypeDateService,insertWarehouseCleaningTypeService,insertWarehouseCleaningDateService,insertWarehouseCleaningTypeDateService,insertWarehouseCleaningService,insertWarehouseFixedExpenseService,insertOrderService,insertDeletedOrderService,insertWarehouseFixedExpenseDateService,insertSupplyOrderService,insertCleaningSupplyOrderService } from "../services/warehouse.js";
import { updateOrderStateService,updateSupplyOrderStateService,updateCleaningSupplyOrderStateService,updateSupplyOrderCountService,updateCleaningSupplyOrderCountService,updateOrderPriceService } from "../services/warehouse.js";
import { deleteSupplyOrderService,deleteCleaningSupplyOrderService } from "../services/warehouse.js";
import { getLogsService } from "../services/logs.js";
import { insertLogWarehouseCategoryService,insertLogWarehouseCategoryDateService,insertLogWarehouseSupplyTypeService,insertLogWarehouseSupplyTypeDateService,insertLogWarehouseCleaningTypeService,insertLogWarehouseCleaningDateService,insertLogWarehouseCleaningTypeDateService,insertLogWarehouseCleaningService,insertLogWarehouseFixedExpenseService,insertLogWarehouseFixedExpenseDateService,insertLogOrderService,insertLogDeletedOrderService } from "../services/warehouse.js";
import { updateLogOrderStateService,updateLogSupplyOrderStateService,updateLogCleaningSupplyOrderStateService,updateLogSupplyOrderCountService,updateLogCleaningSupplyOrderCountService,updateLogOrderPriceService } from "../services/warehouse.js";
import { deleteLogSupplyOrderService,deleteLogCleaningSupplyOrderService } from "../services/warehouse.js";
import { insertMessageSupplyOrderService,insertMessageCleaningSupplyOrderService } from "../services/warehouse.js";
import { updateMessageSupplyOrderStateService,updateMessageCleaningSupplyOrderStateService } from "../services/warehouse.js";
import { deleteMessageSupplyOrderService,deleteMessageCleaningSupplyOrderService } from "../services/warehouse.js";
import { getObservationsService } from "../services/suppliers.js";
import { insertObservationService } from "../services/suppliers.js";
import { insertLogObservationService } from "../services/suppliers.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Warehouse_GET = (socket) => {
    //---------- ALMACEN DE CATEGORIAS ✔️
    socket.on('Get-Warehouse-Categories', async () => {
        try {
            const result = await getWarehouseCategoriesService();
            console.log('Almacenes por categorías obtenidos...');
            io.emit('Get-Warehouse-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO ✔️
    socket.on('Get-Warehouse-Supply-Types', async () => {
        try {
            const result = await getWarehouseSupplyTypesService();
            console.log('Almacenes por tipos de insumo obtenidos...');
            io.emit('Get-Warehouse-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE LIMPIEZA ✔️
    socket.on('Get-Warehouse-Cleaning', async () => {
        try {
            const result = await getWarehouseCleaningService();
            console.log('Almacenes por limpieza obtenidos...');
            io.emit('Get-Warehouse-Cleaning', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE TIPOS DE LIMPIEZA ✔️
    socket.on('Get-Warehouse-Cleaning-Types', async () => {
        try {
            const result = await getWarehouseCleaningTypesService();
            console.log('Almacenes por tipos de limpieza obtenidos...');
            io.emit('Get-Warehouse-Cleaning-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE GASTOS FIJOS ✔️
    socket.on('Get-Warehouse-Fixed-Expenses', async () => {
        try {
            const result = await getWarehouseFixedExpensesService();
            console.log('Almacenes por gastos fijos obtenidos...');
            io.emit('Get-Warehouse-Fixed-Expenses', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PEDIDOS ✔️
    socket.on('Get-Orders', async () => {
        try {
            const result = await getOrdersService();
            console.log('Pedidos del almacén obtenidos...');
            io.emit('Get-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PEDIDOS ELIMINADOS ✔️
    socket.on('Get-Deleted-Orders', async () => {
        try {
            const result = await getDeletedOrdersService();
            console.log('Pedidos del almacén eliminados obtenidos...');
            io.emit('Get-Deleted-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PEDIDOS DE INSUMOS ✔️
    socket.on('Get-Supply-Orders', async () => {
        try {
            const result = await getSupplyOrdersService();
            console.log('Pedidos del almacén de insumos obtenidos...');
            io.emit('Get-Supply-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
    socket.on('Get-Cleaning-Supply-Orders', async () => {
        try {
            const result = await getCleaningSupplyOrdersService();
            console.log('Pedidos del almacén de suministros de limpieza obtenidos...');
            io.emit('Get-Cleaning-Supply-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- MENSAJES PEDIDOS DE INSUMOS ✔️
    socket.on('Get-Message-Supply-Orders', async () => {
        try {
            const result = await getMessageSupplyOrdersService();
            console.log('Mensajes de pedidos del almacén de insumos obtenidos...');
            io.emit('Get-Message-Supply-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- MENSAJES PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
    socket.on('Get-Message-Cleaning-Supply-Orders', async () => {
        try {
            const result = await getMessageCleaningSupplyOrdersService();
            console.log('Mensajes de pedidos del almacén de suministros de limpieza obtenidos...');
            io.emit('Get-Message-Cleaning-Supply-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Warehouse_INSERT = (socket) => {
    //---------- ALMACEN DE TIPOS DE INSUMO ✔️
    socket.on('Insert-Warehouse-Supply-Type',async (idusuario,cantidadreal,precio,fecha,idtipo,idcategoria,transaccion,tipofecha) => {
        try{
            if(tipofecha === 'Automática'){
                await insertWarehouseSupplyTypeService(cantidadreal,precio,idtipo,transaccion);
                await insertWarehouseCategoryService(cantidadreal,precio,idcategoria,transaccion);
                const resultWarehouseSupplyTypes = await getWarehouseSupplyTypesService();
                const resultWarehouseCategories = await getWarehouseCategoriesService();
                const decryptedDataC = decryptData(resultWarehouseSupplyTypes);
                const parsedDataC = JSON.parse(decryptedDataC);
                await insertLogWarehouseSupplyTypeService(parsedDataC.find(data => data.idtipo === idtipo)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(idtipo),transaccion);
                const decryptedDataS = decryptData(resultWarehouseCategories);
                const parsedDataS = JSON.parse(decryptedDataS);
                await insertLogWarehouseCategoryService(parsedDataS.find(data => data.idcategoria === idcategoria)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(idcategoria),transaccion);
                
                const resultLogs = await getLogsService()
                io.emit('Get-Warehouse-Supply-Types',resultWarehouseSupplyTypes);
                io.emit('Get-Warehouse-Categories',resultWarehouseCategories);
                io.emit('Get-Logs',resultLogs);
            }
            if(tipofecha === 'Personalizada'){
                await insertWarehouseSupplyTypeDateService(cantidadreal,precio,fecha,idtipo,transaccion);
                await insertWarehouseCategoryDateService(cantidadreal,precio,fecha,idcategoria,transaccion);
                const resultWarehouseSupplyTypes = await getWarehouseSupplyTypesService();
                const resultWarehouseCategories = await getWarehouseCategoriesService();
                const decryptedDataC = decryptData(resultWarehouseSupplyTypes);
                const parsedDataC = JSON.parse(decryptedDataC);
                await insertLogWarehouseSupplyTypeDateService(parsedDataC.find(data => data.idtipo === idtipo)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(fecha),String(idtipo),transaccion);
                const decryptedDataS = decryptData(resultWarehouseCategories);
                const parsedDataS = JSON.parse(decryptedDataS);
                await insertLogWarehouseCategoryDateService(parsedDataS.find(data => data.idcategoria === idcategoria)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(fecha),String(idcategoria),transaccion);
                
                const resultLogs = await getLogsService()
                io.emit('Get-Warehouse-Supply-Types',resultWarehouseSupplyTypes);
                io.emit('Get-Warehouse-Categories',resultWarehouseCategories);
                io.emit('Get-Logs',resultLogs);
            }
        }catch(error){
            console.error('Error al agregar un almacén por tipo de insumo: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE LIMPIEZA ✔️
    socket.on('Insert-Warehouse-Cleaning',async (idusuario,cantidadreal,precio,fecha,idtipo,idcategoria,transaccion,tipofecha) => {
        try{
            if(tipofecha === 'Automática'){
                await insertWarehouseCleaningTypeService(cantidadreal,precio,idtipo,transaccion);
                await insertWarehouseCleaningService(cantidadreal,precio,idcategoria,transaccion);
                const resultWarehouseCleaningTypes = await getWarehouseCleaningTypesService();
                const resultWarehouseCleaning = await getWarehouseCleaningService();
                const decryptedDataC = decryptData(resultWarehouseCleaningTypes);
                const parsedDataC = JSON.parse(decryptedDataC);
                await insertLogWarehouseCleaningTypeService(parsedDataC.find(data => data.idtipo === idtipo)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(idtipo),transaccion);
                const decryptedDataS = decryptData(resultWarehouseCleaning);
                const parsedDataS = JSON.parse(decryptedDataS);
                await insertLogWarehouseCleaningService(parsedDataS.find(data => data.idcategoria === idcategoria)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(idcategoria),transaccion);
                
                const resultLogs = await getLogsService()
                io.emit('Get-Warehouse-Cleaning-Types',resultWarehouseCleaningTypes);
                io.emit('Get-Warehouse-Cleaning',resultWarehouseCleaning);
                io.emit('Get-Logs',resultLogs);
            }
            if(tipofecha === 'Personalizada'){
                await insertWarehouseCleaningTypeDateService(cantidadreal,precio,fecha,idtipo,transaccion);
                await insertWarehouseCleaningDateService(cantidadreal,precio,fecha,idcategoria,transaccion);
                const resultWarehouseCleaningTypes = await getWarehouseCleaningTypesService();
                const resultWarehouseCleaning = await getWarehouseCleaningService();
                const decryptedDataC = decryptData(resultWarehouseCleaningTypes);
                const parsedDataC = JSON.parse(decryptedDataC);
                await insertLogWarehouseCleaningTypeDateService(parsedDataC.find(data => data.idtipo === idtipo)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(fecha),String(idtipo),transaccion);
                const decryptedDataS = decryptData(resultWarehouseCleaning);
                const parsedDataS = JSON.parse(decryptedDataS);
                await insertLogWarehouseCleaningDateService(parsedDataS.find(data => data.idcategoria === idcategoria)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(fecha),String(idcategoria),transaccion);
                
                const resultLogs = await getLogsService()
                io.emit('Get-Warehouse-Cleaning-Types',resultWarehouseCleaningTypes);
                io.emit('Get-Warehouse-Cleaning',resultWarehouseCleaning);
                io.emit('Get-Logs',resultLogs);
            }
        }catch(error){
            console.error('Error al agregar un almacén por limpieza: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE GASTOS FIJOS ✔️
    socket.on('Insert-Warehouse-Fixed-Expense',async (idusuario,precio,fecha,idgasto,transaccion,tipofecha) => {
        try{
            if(tipofecha === 'Automática'){
                await insertWarehouseFixedExpenseService(precio,idgasto,transaccion);
                const resultWarehouseFixedExpenses = await getWarehouseFixedExpensesService();
                const decryptedData = decryptData(resultWarehouseFixedExpenses);
                const parsedData = JSON.parse(decryptedData);
                await insertLogWarehouseFixedExpenseService(parsedData.find(data => data.idgasto === idgasto)?.idalmacen,idusuario,String(precio),String(idgasto),transaccion);
                const resultLogs = await getLogsService()
                io.emit('Get-Warehouse-Fixed-Expenses',resultWarehouseFixedExpenses);
                io.emit('Get-Logs',resultLogs);
            }
            if(tipofecha === 'Personalizada'){
                await insertWarehouseFixedExpenseDateService(precio,fecha,idgasto,transaccion);
                const resultWarehouseFixedExpenses = await getWarehouseFixedExpensesService();
                const decryptedData = decryptData(resultWarehouseFixedExpenses);
                const parsedData = JSON.parse(decryptedData);
                await insertLogWarehouseFixedExpenseDateService(parsedData.find(data => data.idgasto === idgasto)?.idalmacen,idusuario,String(precio),String(fecha),String(idgasto),transaccion);
                const resultLogs = await getLogsService()
                io.emit('Get-Warehouse-Fixed-Expenses',resultWarehouseFixedExpenses);
                io.emit('Get-Logs',resultLogs);
            }
        }catch(error){
            console.error('Error al agregar un almacén por gasto fijo: ',error);
            return error;
        }
    });
    //---------- PEDIDOS ELIMINADOS ✔️
    socket.on('Insert-Deleted-Order',async (idusuario,idpedido) => {
        try{
            await insertDeletedOrderService(idpedido);
            const resultDeletedOrders = await getDeletedOrdersService();
            const decryptedData = decryptData(resultDeletedOrders);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedOrderService(parsedData.find(data => data.idpedido === idpedido)?.ideliminado,idusuario,String(idpedido));
            const resultLogs = await getLogsService()
            io.emit('Get-Deleted-Orders',resultDeletedOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar un pedido de almacén: ',error);
            return error;
        }
    });
    //---------- PEDIDOS DE INSUMOS ✔️
    socket.on('Insert-Supply-Order',async (usuario,idpedido,campus,idproveedor,idusuario,insumos) => {
        try{
            await insertOrderService(idpedido,campus,idproveedor,idusuario);
            const resultOrders = await getOrdersService();
            await insertLogOrderService(idpedido,usuario,campus,String(idproveedor),String(idusuario));

            let resultSupplyOrders;

            if(Array.isArray(insumos) && insumos.length > 0){
                for (const insumo of insumos) {
                    await insertSupplyOrderService(insumo.idinsumo,insumo.cantidad,insumo.idpedido);
                }
                resultSupplyOrders = await getSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultSupplyOrders !== undefined){
                io.emit('Get-Supply-Orders',resultSupplyOrders);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un pedido de insumo: ',error);
            return error;
        }
    });
    socket.on('Insert-Supply-Order-Verification',async (idusuario,idpedido,estado,insumos) => {
        try{
            await updateOrderStateService(idpedido,estado);
            const resultOrders = await getOrdersService();
            await updateLogOrderStateService(idpedido,idusuario,estado);

            let resultSupplyOrders;
            let resultMessages;

            if(Array.isArray(insumos) && insumos.length > 0){
                await Promise.all(insumos.map(async (insumo) => {
                    if(insumo.estado === 'Modificar'){
                        const mensaje = insumo.mensajes[0];
                        await insertMessageSupplyOrderService(mensaje.mensaje,mensaje.idpedidoindividual,'Mantener','Visible',idusuario);
                    }

                    await updateSupplyOrderStateService(insumo.idpedidoindividual,insumo.estado);
                    await updateLogSupplyOrderStateService(insumo.idpedidoindividual,idusuario,insumo.estado);
                }));
                resultSupplyOrders = await getSupplyOrdersService();
                resultMessages = await getMessageSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultSupplyOrders !== undefined){
                io.emit('Get-Supply-Orders',resultSupplyOrders);
            }
            if(resultMessages !== undefined){
                io.emit('Get-Message-Supply-Orders',resultMessages);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar una revisión al pedido de insumo: ',error);
            return error;
        }
    });
    //---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
    socket.on('Insert-Cleaning-Supply-Order',async (usuario,idpedido,campus,idproveedor,idusuario,suministros) => {
        try{
            await insertOrderService(idpedido,campus,idproveedor,idusuario);
            const resultOrders = await getOrdersService();
            await insertLogOrderService(idpedido,usuario,campus,String(idproveedor),String(idusuario));

            let resultCleaningSupplyOrders;

            if(Array.isArray(suministros) && suministros.length > 0){
                for (const suministro of suministros) {
                    await insertCleaningSupplyOrderService(suministro.idsuministro,suministro.cantidad,suministro.idpedido);
                }
                resultCleaningSupplyOrders = await getCleaningSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultCleaningSupplyOrders !== undefined){
                io.emit('Get-Cleaning-Supply-Orders',resultCleaningSupplyOrders);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un pedido de suministro: ',error);
            return error;
        }
    });
    socket.on('Insert-Cleaning-Supply-Order-Verification',async (idusuario,idpedido,estado,suministros) => {
        try{
            await updateOrderStateService(idpedido,estado);
            const resultOrders = await getOrdersService();
            await updateLogOrderStateService(idpedido,idusuario,estado);

            let resultCleaningSupplyOrders;
            let resultMessages;

            if(Array.isArray(suministros) && suministros.length > 0){
                await Promise.all(suministros.map(async (suministro) => {
                    if(suministro.estado === 'Modificar'){
                        const mensaje = suministro.mensajes[0];
                        await insertMessageCleaningSupplyOrderService(mensaje.mensaje,mensaje.idpedidoindividual,'Mantener','Visible',idusuario);
                    }

                    await updateCleaningSupplyOrderStateService(suministro.idpedidoindividual,suministro.estado);
                    await updateLogCleaningSupplyOrderStateService(suministro.idpedidoindividual,idusuario,suministro.estado);
                }));
                resultCleaningSupplyOrders = await getCleaningSupplyOrdersService();
                resultMessages = await getMessageCleaningSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultCleaningSupplyOrders !== undefined){
                io.emit('Get-Cleaning-Supply-Orders',resultCleaningSupplyOrders);
            }
            if(resultMessages !== undefined){
                io.emit('Get-Message-Cleaning-Supply-Orders',resultMessages);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar una revisión al pedido de suministro: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Warehouse_UPDATE = (socket) => {
    //---------- PEDIDOS DE INSUMOS 
    socket.on('Update-Supply-Order-Verification',async (idusuario,idpedido,estado,insumosOriginales,insumos) => {
        try{
            await updateOrderStateService(idpedido,estado);
            const resultOrders = await getOrdersService();
            await updateLogOrderStateService(idpedido,idusuario,estado);

            let resultSupplyOrders;
            let resultMessages;

            if(Array.isArray(insumosOriginales) && insumosOriginales.length > 0){
                await Promise.all(insumosOriginales.map(async (insumo) => {
                    if(insumo.estado === 'Modificar'){
                        const mensaje = insumo.mensajes[0];
                        await updateMessageSupplyOrderStateService(mensaje.idmensaje,'No Visible');
                        await updateSupplyOrderStateService(insumo.idpedidoindividual,'En espera');
                        
                        if(Array.isArray(insumos) && insumos.length > 0){
                            const count = insumos.find(i => i.idpedidoindividual === insumo.idpedidoindividual)?.cantidad;
                            await updateSupplyOrderCountService(insumo.idpedidoindividual,count);
                            await updateLogSupplyOrderCountService(insumo.idpedidoindividual,idusuario,String(count));
                        }
                    }
                    if(insumo.estado === 'Eliminar'){
                        await deleteMessageSupplyOrderService(insumo.idpedidoindividual);
                        await deleteSupplyOrderService(insumo.idpedidoindividual);
                        await deleteLogSupplyOrderService(insumo.idpedidoindividual,idusuario);
                    }
                    if(insumo.estado === 'Mantener'){
                        await updateSupplyOrderStateService(insumo.idpedidoindividual,'En espera');
                    }
                }));
                resultSupplyOrders = await getSupplyOrdersService();
                resultMessages = await getMessageSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultSupplyOrders !== undefined){
                io.emit('Get-Supply-Orders',resultSupplyOrders);
            }
            if(resultMessages !== undefined){
                io.emit('Get-Message-Supply-Orders',resultMessages);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar una revisión al pedido de insumo: ',error);
            return error;
        }
    });
    socket.on('Update-Supply-Order-Start',async (idusuario,idpedido,estado,insumos) => {
        try{
            await updateOrderStateService(idpedido,estado);
            const resultOrders = await getOrdersService();
            await updateLogOrderStateService(idpedido,idusuario,estado);

            let resultSupplyOrders;

            if(Array.isArray(insumos) && insumos.length > 0){
                await Promise.all(insumos.map(async (insumo) => {   
                    await updateSupplyOrderStateService(insumo.idpedidoindividual,estado);
                    await updateLogSupplyOrderStateService(insumo.idpedidoindividual,idusuario,estado);
                }));
                resultSupplyOrders = await getSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultSupplyOrders !== undefined){
                io.emit('Get-Supply-Orders',resultSupplyOrders);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al iniciar el pedido de insumo: ',error);
            return error;
        }
    });
    socket.on('Update-Supply-Order-End',async (idusuario,idpedido,estado,precio,insumos,observacion,calificacion,idproveedor) => {
        try{
            await updateOrderStateService(idpedido,estado);
            await updateLogOrderStateService(idpedido,idusuario,estado);

            if(Number(precio) > 0){
                await updateOrderPriceService(idpedido,precio)
                await updateLogOrderPriceService(idpedido,idusuario,String(precio));
            }

            let result;

            if(estado === 'Finalizado'){
                await insertObservationService(observacion,calificacion,idproveedor,idpedido)
                result = await getObservationsService();
                const decryptedData = decryptData(result);
                const parsedData = JSON.parse(decryptedData);
                await insertLogObservationService(parsedData.find(o => o.idpedido === idpedido)?.idobservacion,idusuario,observacion,String(calificacion),String(idproveedor),String(idpedido))
            }

            let resultSupplyOrders;
            let message;
            let warehouseS;
            let wareHouseC;

            if(Array.isArray(insumos) && insumos.length > 0){
                await Promise.all(insumos.map(async (insumo) => {
                    if(insumo.estado === 'Aceptado'){
                        await insertWarehouseSupplyTypeService(insumo.cantidadreal,insumo.preciototal,insumo.idtipo,'Compra');
                        await insertWarehouseCategoryService(insumo.cantidadreal,insumo.preciototal,insumo.idcategoria,'Compra');
                        await updateSupplyOrderPriceService(insumo.idpedidoindividual,insumo.preciounitario,insumo.preciototal);
                        await updateLogSupplyOrderPriceService(insumo.idpedidoindividual,idusuario,String(insumo.preciounitario),String(insumo.preciototal))
                        const mensaje = insumo.mensajes[0];
                        if(mensaje.idmensaje !== 0){
                            await updateMessageSupplyOrderStateService(mensaje.idmensaje,'No Visible');
                        }
                    }
                    if(insumo.estado  === 'Cancelado' || insumo.estado === 'Devolución'){
                        const mensaje = insumo.mensajes[0];
                        if(mensaje.idmensaje !== 0){
                            await updateMessageSupplyOrderStateService(mensaje.idmensaje,'No Visible');
                        }
                        
                        await insertMessageSupplyOrderService(mensaje.mensaje,mensaje.idpedidoindividual,'Cancelado','Visible',idusuario);
                    }   
                    await updateSupplyOrderStateService(insumo.idpedidoindividual,insumo.estado);
                    await updateLogSupplyOrderStateService(insumo.idpedidoindividual,idusuario,insumo.estado);
                }));
                resultSupplyOrders = await getSupplyOrdersService();
                message = await getMessageSupplyOrdersService();
                warehouseS = await getWarehouseSupplyTypesService();
                wareHouseC = await getWarehouseCategoriesService();
            }

            const resultOrders = await getOrdersService();
            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(result !== undefined){
                io.emit('Get-Observations',result);
            }
            if(resultSupplyOrders !== undefined){
                io.emit('Get-Supply-Orders',resultSupplyOrders);
            }
            if(message !== undefined){
                io.emit('Get-Message-Supply-Orders',message)
            }
            if(warehouseS !== undefined){
                io.emit('Get-Warehouse-Supply-Types',warehouseS);
            }
            if(wareHouseC !== undefined){
                io.emit('Get-Warehouse-Categories',wareHouseC)
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al finalizar el pedido de insumo: ',error);
            return error;
        }
    });
    //---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA 
    socket.on('Update-Cleaning-Supply-Order-Verification',async (idusuario,idpedido,estado,suministrosOriginales,suministros) => {
        try{
            await updateOrderStateService(idpedido,estado);
            const resultOrders = await getOrdersService();
            await updateLogOrderStateService(idpedido,idusuario,estado);

            let resultCleaningSupplyOrders;
            let resultMessages;

            if(Array.isArray(suministrosOriginales) && suministrosOriginales.length > 0){
                await Promise.all(suministrosOriginales.map(async (suministro) => {
                    if(suministro.estado === 'Modificar'){
                        const mensaje = suministro.mensajes[0];
                        await updateMessageCleaningSupplyOrderStateService(mensaje.idmensaje,'No Visible');
                        await updateCleaningSupplyOrderStateService(suministro.idpedidoindividual,'En espera');

                        if(Array.isArray(suministros) && suministros.length > 0){
                            const count = suministros.find(i => i.idpedidoindividual === suministro.idpedidoindividual)?.cantidad;
                            await updateCleaningSupplyOrderCountService(suministro.idpedidoindividual,count);
                            await updateLogCleaningSupplyOrderCountService(suministro.idpedidoindividual,idusuario,String(count));
                        }
                    }
                    if(suministro.estado === 'Eliminar'){
                        await deleteMessageCleaningSupplyOrderService(suministro.idpedidoindividual);
                        await deleteCleaningSupplyOrderService(suministro.idpedidoindividual);
                        await deleteLogCleaningSupplyOrderService(suministro.idpedidoindividual,idusuario);
                    }
                    if(suministro.estado === 'Mantener'){
                        await updateCleaningSupplyOrderStateService(suministro.idpedidoindividual,'En espera');
                    }
                }));
                resultCleaningSupplyOrders = await getCleaningSupplyOrdersService();
                resultMessages = await getMessageCleaningSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultCleaningSupplyOrders !== undefined){
                io.emit('Get-Cleaning-Supply-Orders',resultCleaningSupplyOrders);
            }
            if(resultMessages !== undefined){
                io.emit('Get-Message-Cleaning-Supply-Orders',resultMessages);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar una revisión al pedido de suministro: ',error);
            return error;
        }
    });
    socket.on('Update-Cleaning-Supply-Order-Start',async (idusuario,idpedido,estado,suministros) => {
        try{
            await updateOrderStateService(idpedido,estado);
            const resultOrders = await getOrdersService();
            await updateLogOrderStateService(idpedido,idusuario,estado);

            let resultCleaningSupplyOrders;

            if(Array.isArray(suministros) && suministros.length > 0){
                await Promise.all(suministros.map(async (suministro) => {   
                    await updateCleaningSupplyOrderStateService(suministro.idpedidoindividual,estado);
                    await updateLogCleaningSupplyOrderStateService(suministro.idpedidoindividual,idusuario,estado);
                }));
                resultCleaningSupplyOrders = await getCleaningSupplyOrdersService();
            }

            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(resultCleaningSupplyOrders !== undefined){
                io.emit('Get-Cleaning-Supply-Orders',resultCleaningSupplyOrders);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al iniciar el pedido de suministro: ',error);
            return error;
        }
    });
    socket.on('Update-Cleaning-Supply-Order-End',async (idusuario,idpedido,estado,precio,suministros,observacion,calificacion,idproveedor) => {
        try{
            await updateOrderStateService(idpedido,estado);
            await updateLogOrderStateService(idpedido,idusuario,estado);

            if(Number(precio) > 0){
                await updateOrderPriceService(idpedido,precio)
                await updateLogOrderPriceService(idpedido,idusuario,String(precio));
            }

            let result;

            if(estado === 'Finalizado'){
                await insertObservationService(observacion,calificacion,idproveedor,idpedido)
                result = await getObservationsService();
                const decryptedData = decryptData(result);
                const parsedData = JSON.parse(decryptedData);
                await insertLogObservationService(parsedData.find(o => o.idpedido === idpedido)?.idobservacion,idusuario,observacion,String(calificacion),String(idproveedor),String(idpedido))
            }

            let resultSupplyOrders;
            let message;
            let warehouseC;

            if(Array.isArray(suministros) && suministros.length > 0){
                await Promise.all(suministros.map(async (suministro) => {
                    if(suministro.estado === 'Aceptado'){
                        await insertWarehouseCleaningTypeService(suministro.cantidadreal,suministro.preciototal,suministro.idtipo,'Compra');
                        await insertWarehouseCleaningService(suministro.cantidadreal,suministro.preciototal,suministro.idcategoria,'Compra');
                        await updateCleaningSupplyOrderPriceService(suministro.idpedidoindividual,suministro.preciounitario,suministro.preciototal);
                        await updateLogCleaningSupplyOrderPriceService(suministro.idpedidoindividual,idusuario,String(suministro.preciounitario),String(suministro.preciototal))
                        const mensaje = suministro.mensajes[0];
                        if(mensaje.idmensaje !== 0){
                            await updateMessageCleaningSupplyOrderStateService(mensaje.idmensaje,'No Visible');
                        }
                    }
                    if(suministro.estado  === 'Cancelado' || suministro.estado === 'Devolución'){
                        const mensaje = suministro.mensajes[0];
                        if(mensaje.idmensaje !== 0){
                            await updateMessageCleaningSupplyOrderStateService(mensaje.idmensaje,'No Visible');
                        }
                        
                        await insertMessageCleaningSupplyOrderService(mensaje.mensaje,mensaje.idpedidoindividual,'Cancelado','Visible',idusuario);
                    }   
                    await updateCleaningSupplyOrderStateService(suministro.idpedidoindividual,suministro.estado);
                    await updateLogCleaningSupplyOrderStateService(suministro.idpedidoindividual,idusuario,suministro.estado);
                }));
                resultSupplyOrders = await getCleaningSupplyOrdersService();
                message = await getMessageCleaningSupplyOrdersService();
                warehouseC = await getWarehouseCleaningService();
            }
            
            const resultOrders = await getOrdersService();
            const resultLogs = await getLogsService()
            io.emit('Get-Orders',resultOrders);
            if(result !== undefined){
                io.emit('Get-Observations',result);
            }
            if(resultSupplyOrders !== undefined){
                io.emit('Get-Cleaning-Supply-Orders',resultSupplyOrders);
            }
            if(message !== undefined){
                io.emit('Get-Message-Cleaning-Supply-Orders',message)
            }
            if(warehouseC !== undefined){
                io.emit('Get-Warehouse-Cleaning',warehouseC);
            }
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al finalizar el pedido de suministro: ',error);
            return error;
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Warehouse_DELETE = (socket) =>  {
    
}
//______________DELETE______________