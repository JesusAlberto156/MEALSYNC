//____________IMPORT/EXPORT____________
// Consultas de sql
import { getWarehouseCategoriesService,getWarehouseSupplyTypesService,getWarehouseCleaningService,getWarehouseFixedExpensesService,getOrdersService,getDeletedOrdersService,getSupplyOrdersService,getCleaningSupplyOrdersService,getMessageSupplyOrdersService,getMessageCleaningSupplyOrdersService } from "../services/warehouse.js";
import { insertWarehouseCategoryService,insertWarehouseSupplyTypeService,insertWarehouseCleaningService,insertWarehouseFixedExpenseService,insertOrderService,insertDeletedOrderService,insertSupplyOrderService,insertCleaningSupplyOrderService } from "../services/warehouse.js";
import { getLogsService } from "../services/logs.js";
import { insertLogWarehouseCategoryService,insertLogWarehouseSupplyTypeService,insertLogWarehouseCleaningService,insertLogWarehouseFixedExpenseService,insertLogOrderService,insertLogDeletedOrderService,insertLogSupplyOrderService,insertLogCleaningSupplyOrderService } from "../services/warehouse.js";
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
    //---------- ALMACEN DE CATEGORIAS ✔️
    socket.on('Insert-Warehouse-Category',async (idusuario,cantidadreal,precio,idcategoria,transaccion) => {
        try{
            await insertWarehouseCategoryService(cantidadreal,precio,idcategoria,transaccion);
            const resultWarehouseCategories = await getWarehouseCategoriesService();
            const decryptedData = decryptData(resultWarehouseCategories);
            const parsedData = JSON.parse(decryptedData);
            await insertLogWarehouseCategoryService(parsedData.find(data => data.idcategoria === idcategoria)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(idcategoria),transaccion);
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Categories',resultWarehouseCategories);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un almacén por categoría: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO ✔️
    socket.on('Insert-Warehouse-Supply-Type',async (idusuario,cantidadreal,precio,idtipo,transaccion) => {
        try{
            await insertWarehouseSupplyTypeService(cantidadreal,precio,idtipo,transaccion);
            const resultWarehouseSupplyTypes = await getWarehouseSupplyTypesService();
            const decryptedData = decryptData(resultWarehouseSupplyTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogWarehouseSupplyTypeService(parsedData.find(data => data.idtipo === idtipo)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(idtipo),transaccion);
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Supply-Types',resultWarehouseSupplyTypes);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un almacén por tipo de insumo: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE LIMPIEZA ✔️
    socket.on('Insert-Warehouse-Cleaning',async (idusuario,cantidadreal,precio,idcategoria,transaccion) => {
        try{
            await insertWarehouseCleaningService(cantidadreal,precio,idcategoria,transaccion);
            const resultWarehouseCleaning = await getWarehouseCleaningService();
            const decryptedData = decryptData(resultWarehouseCleaning);
            const parsedData = JSON.parse(decryptedData);
            await insertLogWarehouseCleaningService(parsedData.find(data => data.idcategoria === idcategoria)?.idalmacen,idusuario,String(cantidadreal),String(precio),String(idtipo),transaccion);
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Cleaning',resultWarehouseCleaning);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un almacén por limpieza: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE GASTOS FIJOS ✔️
    socket.on('Insert-Warehouse-Fixed-Expense',async (idusuario,precio,idgasto,transaccion) => {
        try{
            await insertWarehouseFixedExpenseService(precio,idgasto,transaccion);
            const resultWarehouseFixedExpenses = await getWarehouseFixedExpensesService();
            const decryptedData = decryptData(resultWarehouseFixedExpenses);
            const parsedData = JSON.parse(decryptedData);
            await insertLogWarehouseFixedExpenseService(parsedData.find(data => data.idgasto === idgasto)?.idalmacen,idusuario,String(precio),String(idtipo),transaccion);
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Fixed-Expenses',resultWarehouseFixedExpenses);
            io.emit('Get-Logs',resultLogs);
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
                    resultSupplyOrders = await getSupplyOrdersService();
                    const decryptedDataSupplyOrders = decryptData(resultSupplyOrders);
                    const parseDataSupplyOrders = JSON.parse(decryptedDataSupplyOrders);
                    await insertLogSupplyOrderService(parseDataSupplyOrders.find(data => data.idpedido === Number(insumo.idpedido) && data.idinsumo === Number(insumo.idinsumo))?.idpedidoindividual,usuario,String(insumo.idinsumo),String(insumo.cantidad),String(insumo.idpedido));
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
                    resultCleaningSupplyOrders = await getCleaningSupplyOrdersService();
                    const decryptedDataCleaningSupplyOrders = decryptData(resultCleaningSupplyOrders);
                    const parseDataCleaningSupplyOrders = JSON.parse(decryptedDataCleaningSupplyOrders);
                    await insertLogCleaningSupplyOrderService(parseDataCleaningSupplyOrders.find(data => data.idpedido === Number(suministro.idpedido) && data.idsuministro === Number(suministro.idsuministro))?.idpedidoindividual,usuario,String(suministro.idsuministro),String(suministro.cantidad),String(suministro.idpedido));
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
}
//______________INSERT______________
//______________UPDATE______________
export const Warehouse_UPDATE = (socket) => {
    
}
//______________UPDATE______________
//______________DELETE______________
export const Warehouse_DELETE = (socket) =>  {
    
}
//______________DELETE______________