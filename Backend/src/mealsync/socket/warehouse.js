//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSupplyOrdersService,getSupplyOrderObservationsService,getDeletedSupplyOrdersService,getWarehousePurchasesCategoriesService,getWarehouseSalesCategoriesService,getWarehousePurchasesSupplyTypesService,getWarehouseSalesSupplyTypesService } from "../services/warehouse.js";
import { insertSupplyOrderService,insertSupplyOrderObservationService,insertDeletedSupplyOrderService } from "../services/warehouse.js";
import { updateSupplyOrderService,updateSupplyOrderStateService,updateWarehousePurchaseCategoryService,updateWarehouseSalesCategoryService,updateWarehousePurchaseSupplyTypeService,updateWarehouseSalesSupplyTypeService } from "../services/warehouse.js";
import { deleteDeletedSupplyOrderService } from "../services/warehouse.js";
import { getLogsService } from "../services/logs.js";
import { insertLogSupplyOrderService,insertLogSupplyOrderObservationService,insertLogDeletedSupplyOrderService } from "../services/warehouse.js";
import { updateLogSupplyOrderService,updateLogSupplyOrderStateService,updateLogWarehousePurchaseCategoryService,updateLogWarehouseSalesCategoryService,updateLogWarehousePurchaseSupplyTypeService,updateLogWarehouseSalesSupplyTypeService } from "../services/warehouse.js";
import { deleteLogDeletedSupplyOrderService } from "../services/warehouse.js";
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
    //---------- ALMACEN DE CATEGORIAS COMPRAS ✔️
    socket.on('Get-Warehouse-Purchases-Categories', async () => {
        try {
            const result = await getWarehousePurchasesCategoriesService();
            console.log('Almacenes de compras por categoría obtenidos...');
            io.emit('Get-Warehouse-Purchases-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE CATEGORIAS VENTAS ✔️
    socket.on('Get-Warehouse-Sales-Categories', async () => {
        try {
            const result = await getWarehouseSalesCategoriesService();
            console.log('Almacenes de ventas por categoría obtenidos...');
            io.emit('Get-Warehouse-Sales-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO COMPRAS ✔️
    socket.on('Get-Warehouse-Purchases-Supply-Types', async () => {
        try {
            const result = await getWarehousePurchasesSupplyTypesService();
            console.log('Almacenes de compras por tipo de insumo obtenidos...');
            io.emit('Get-Warehouse-Purchases-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO VENTAS ✔️
    socket.on('Get-Warehouse-Sales-Supply-Types', async () => {
        try {
            const result = await getWarehouseSalesSupplyTypesService();
            console.log('Almacenes de ventas por tipo de insumo obtenidos...');
            io.emit('Get-Warehouse-Sales-Supply-Types', result);
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
    socket.on('Update-Supply-Order-State',async (idusuario,idpedido,estado,idproveedor,observacion,calificacion,fecha) => {
        try{
            await updateSupplyOrderStateService(idpedido,estado);
            const resultSupplyOrders = await getSupplyOrdersService();
            await updateLogSupplyOrderStateService(idpedido,idusuario,estado);
            await insertObservationService(observacion,calificacion,fecha,idproveedor);
            const resultObservations = await getObservationsService();
            const decryptedData = decryptData(resultObservations);
            const parsedData = JSON.parse(decryptedData);
            await insertLogObservationService(parsedData.find(data => data.fecha === fecha && data.idproveedor === idproveedor)?.idobservacion,idusuario,observacion,String(calificacion),String(fecha),String(idproveedor));
            const resultLogs = await getLogsService();
            io.emit('Get-Observations',resultObservations);
            io.emit('Get-Supply-Orders',resultSupplyOrders);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar el estado de un pedido por insumo: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE CATEGORIAS COMPRAS ✔️
    socket.on('Update-Warehouse-Purchase-Category',async (idusuario,idalmacen,cantidad,cantidadreal,precio,idcategoria) => {
        try{
            await updateWarehousePurchaseCategoryService(idcategoria,cantidad,cantidadreal,precio);
            const resultWarehousePurchasesCategories = await getWarehousePurchasesCategoriesService();
            await updateLogWarehousePurchaseCategoryService(idalmacen,idusuario,String(cantidad),String(cantidadreal),String(precio));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Purchases-Categories',resultWarehousePurchasesCategories);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un almacén de compras por categoría: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE CATEGORIAS VENTAS ✔️
    socket.on('Update-Warehouse-Sales-Category',async (idusuario,idalmacen,cantidad,cantidadreal,precio,idcategoria) => {
        try{
            await updateWarehouseSalesCategoryService(idcategoria,cantidad,cantidadreal,precio);
            const resultWarehouseSalesCategories = await getWarehouseSalesCategoriesService();
            await updateLogWarehouseSalesCategoryService(idalmacen,idusuario,String(cantidad),String(cantidadreal),String(precio));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Sales-Categories',resultWarehouseSalesCategories);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un almacén de ventas por categoría: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO COMPRAS ✔️
    socket.on('Update-Warehouse-Purchase-Supply-Type',async (idusuario,idalmacen,cantidadreal,precio,idtipo) => {
        try{
            await updateWarehousePurchaseSupplyTypeService(idtipo,cantidadreal,precio);
            const resultWarehousePurchasesSupplyTypes = await getWarehousePurchasesSupplyTypesService();
            await updateLogWarehousePurchaseSupplyTypeService(idalmacen,idusuario,String(cantidadreal),String(precio));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Purchases-Supply-Types',resultWarehousePurchasesSupplyTypes);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un almacén de compras por tipo de insumo: ',error);
            return error;
        }
    });
    //---------- ALMACEN DE TIPOS DE INSUMO VENTAS ✔️
    socket.on('Update-Warehouse-Sales-Supply-Type',async (idusuario,idalmacen,cantidadreal,precio,idtipo) => {
        try{
            await updateWarehouseSalesSupplyTypeService(idtipo,cantidadreal,precio);
            const resultWarehouseSalesSupplyTypes = await getWarehouseSalesSupplyTypesService();
            await updateLogWarehouseSalesSupplyTypeService(idalmacen,idusuario,String(cantidadreal),String(precio));
            const resultLogs = await getLogsService()
            io.emit('Get-Warehouse-Sales-Supply-Types',resultWarehouseSalesSupplyTypes);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar un almacén de ventas por tipo de insumo: ',error);
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