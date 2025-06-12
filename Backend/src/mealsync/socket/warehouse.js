//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSupplyOrdersService,getSupplyOrderObservationsService,getDeletedSupplyOrdersService,getWarehouseCategoriesService,getWarehouseSupplyTypesService } from "../services/warehouse.js";
import { insertSupplyOrderService,insertSupplyOrderObservationService,insertDeletedSupplyOrderService,insertWarehouseCategoryService,insertWarehouseSupplyTypeService } from "../services/warehouse.js";
import { updateSupplyOrderService,updateSupplyOrderStateService,updateWarehouseCategoryService,updateWarehouseSupplyTypeService } from "../services/warehouse.js";
import { deleteDeletedSupplyOrderService } from "../services/warehouse.js";
import { getLogsService } from "../services/logs.js";
import { insertLogSupplyOrderService,insertLogSupplyOrderObservationService,insertLogDeletedSupplyOrderService,insertLogWarehouseCategoryService,insertLogWarehouseSupplyTypeService } from "../services/warehouse.js";
import { updateLogSupplyOrderService,updateLogSupplyOrderStateService,updateLogWarehouseCategoryService,updateLogWarehouseSupplyTypeService } from "../services/warehouse.js";
import { deleteLogDeletedSupplyOrderService } from "../services/warehouse.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Warehouse_GET = (socket) => {
    //---------- PEDIDOS DE INSUMO ✔️
    socket.on('Get-Supply-Orders', async () => {
        try {
            const result = await getSupplyOrdersService();
            console.log('Pedidos por insumo obtenidos...');
            io.emit('Get-Supply-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- OBSERVACIONES DE LOS PEDIDOS DE LOS INSUMOS ✔️
    socket.on('Get-Supply-Order-Observations', async () => {
        try {
            const result = await getSupplyOrderObservationsService();
            console.log('Observaciones de los pedidos por insumo obtenidas...');
            io.emit('Get-Supply-Order-Observations', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PEDIDOS DE INSUMO ELIMINADOS ✔️
    socket.on('Get-Deleted-Supply-Orders', async () => {
        try {
            const result = await getDeletedSupplyOrdersService();
            console.log('Pedidos por insumo eliminados obtenidos...');
            io.emit('Get-Deleted-Supply-Orders', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE CATEGORIAS ✔️
    socket.on('Get-Warehouse-Categories', async () => {
        try {
            const result = await getWarehouseCategoriesService();
            console.log('Almacenes por categoría obtenidos...');
            io.emit('Get-Warehouse-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO ✔️
    socket.on('Get-Warehouse-Supply-Types', async () => {
        try {
            const result = await getWarehouseSupplyTypesService();
            console.log('Almacenes por tipo de insumo obtenidos...');
            io.emit('Get-Warehouse-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Warehouse_INSERT = (socket) => {
    //---------- PEDIDOS DE INSUMO ✔️
    socket.on('Insert-Supply-Order',async (idusuario,numeropedido,fecha,cantidad,preciounitario,preciototal,estado,idunsumo) => {
        try{
            await insertSupplyOrderService(numeropedido,fecha,cantidad,preciounitario,preciototal,estado,idunsumo);
            const resultSupplyOrders = await getSupplyOrdersService();
            const decryptedData = decryptData(resultSupplyOrders);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplyOrderService(parsedData.find(data => data.numeropedido === numeropedido && data.idunsumo === idunsumo)?.idpedido,idusuario,numeropedido,String(fecha),String(cantidad),String(preciounitario),String(preciototal),estado,String(idunsumo));
            const resultLogs = await getLogsService()
            io.emit('Get-Supply-Orders',resultSupplyOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un pedido por insumo: ',error);
            return error;
        }
    });
    //---------- OBSERVACIONES DE LOS PEDIDOS DE LOS INSUMOS ✔️
    socket.on('Insert-Supply-Order-Observation',async (idusuario,numeropedido,fecha,observacion,categoria,idpedido) => {
        try{
            await insertSupplyOrderObservationService(numeropedido,fecha,observacion,categoria,idpedido);
            const resultSupplyOrderObservations = await getSupplyOrderObservationsService();
            const decryptedData = decryptData(resultSupplyOrderObservations);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplyOrderObservationService(parsedData.find(data => data.numeropedido === numeropedido && data.idpedido === idpedido)?.idobservacion,idusuario,numeropedido,String(fecha),observacion,categoria,String(idpedido));
            const resultLogs = await getLogsService()
            io.emit('Get-Supply-Order-Observations',resultSupplyOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar una observación al pedido por insumo: ',error);
            return error;
        }
    });
    //---------- PEDIDOS DE INSUMO ELIMINADOS ✔️
    socket.on('Insert-Deleted-Supply-Order',async (idusuario,idpedido) => {
        try{
            await insertDeletedSupplyOrderService(idpedido);
            const resultDeletedSupplyOrders = await getDeletedSupplyOrdersService();
            const decryptedData = decryptData(resultDeletedSupplyOrders);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedSupplyOrderService(parsedData.find(data => data.idpedido === idpedido)?.ideliminado,idusuario,String(idpedido));
            const resultLogs = await getLogsService()
            io.emit('Get-Deleted-Supply-Orders',resultDeletedSupplyOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar un pedido por insumo: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE CATEGORIAS ✔️
    socket.on('Insert-Warehouse-Category',async (idusuario,idcategoria) => {
        try{
            await insertWarehouseCategoryService(idcategoria);
            const resultWarehouseCategories = await getWarehouseCategoriesService();
            const decryptedData = decryptData(resultWarehouseCategories);
            const parsedData = JSON.parse(decryptedData);
            await insertLogWarehouseCategoryService(parsedData.find(data => data.idcategoria === idcategoria)?.idalmacen,idusuario,String(idcategoria));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Categories',resultWarehouseCategories);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un almacén por categoría: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO ✔️
    socket.on('Insert-Warehouse-Supply-Type',async (idusuario,idtipo) => {
        try{
            await insertWarehouseSupplyTypeService(idcategoria);
            const resultWarehouseSupplyTypes = await getWarehouseSupplyTypesService();
            const decryptedData = decryptData(resultWarehouseSupplyTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogWarehouseSupplyTypeService(parsedData.find(data => data.idtipo === idtipo)?.idalmacen,idusuario,String(idtipo));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Supply-Types',resultWarehouseSupplyTypes);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar un almacén por tipo de insumo: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Warehouse_UPDATE = (socket) => {
    //---------- PEDIDOS DE INSUMO ✔️
    socket.on('Update-Supply-Order',async (idusuario,idpedido,cantidad,preciounitario,preciototal) => {
        try{
            await updateSupplyOrderService(idpedido,cantidad,preciounitario,preciototal);
            const resultSupplyOrders = await getSupplyOrdersService();
            await updateLogSupplyOrderService(idpedido,idusuario,String(cantidad),String(preciounitario),String(preciototal));
            const resultLogs = await getLogsService()
            io.emit('Get-Supply-Orders',resultSupplyOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un pedido por insumo: ',error);
            return error;
        }
    });
    socket.on('Update-Supply-Order-State',async (idusuario,idpedido,estado) => {
        try{
            await updateSupplyOrderStateService(idpedido,estado);
            const resultSupplyOrders = await getSupplyOrdersService();
            await updateLogSupplyOrderStateService(idpedido,idusuario,estado);
            const resultLogs = await getLogsService()
            io.emit('Get-Supply-Orders',resultSupplyOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar el estado de un pedido por insumo: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE CATEGORIAS ✔️
    socket.on('Update-Warehouse-Category',async (idusuario,idalmacen,cantidad,cantidadreal,preciocompra,precioventa,precioreal,idcategoria) => {
        try{
            await updateWarehouseCategoryService(idcategoria,cantidad,cantidadreal,preciocompra,precioventa,precioreal);
            const resultWarehouseCategories = await getWarehouseCategoriesService();
            await updateLogWarehouseCategoryService(idalmacen,idusuario,String(cantidad),String(cantidadreal),String(preciocompra),String(precioventa),String(precioreal));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Categories',resultWarehouseCategories);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un almacén por categoría: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO ✔️
    socket.on('Update-Warehouse-Supply-Type',async (idusuario,idalmacen,cantidad,precio,idtipo) => {
        try{
            await updateWarehouseSupplyTypeService(idtipo,cantidad,precio);
            const resultWarehouseSupplyTypes = await getWarehouseSupplyTypesService();
            await updateLogWarehouseSupplyTypeService(idalmacen,idusuario,String(cantidad),String(precio));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Supply-Types',resultWarehouseSupplyTypes);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un almacén por tipo de insumo: ',error);
            return error;
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Warehouse_DELETE = (socket) =>  {
    //---------- PEDIDOS DE INSUMO ELIMINADOS ✔️
    socket.on('Delete-Deleted-Supply-Order',async (idusuario,ideliminado,idpedido) => {
        try{
            await deleteDeletedSupplyOrderService(idpedido);
            const resultDeletedSupplyOrders = await getDeletedSupplyOrdersService();
            await deleteLogDeletedSupplyOrderService(ideliminado,idusuario,String(idpedido));
            const resultLogs = await getLogsService()
            io.emit('Get-Deleted-Supply-Orders',resultDeletedSupplyOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar un pedido por insumo: ',error);
            return error;
        }
    });
}
//______________DELETE______________