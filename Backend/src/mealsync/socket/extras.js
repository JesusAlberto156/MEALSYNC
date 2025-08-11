//____________IMPORT/EXPORT____________
// Consultas de sql
import { getCleaningCategoriesService,getDeletedCleaningCategoriesService,getCleaningTypesService,getCountCleaningTypesService,getDeletedCleaningTypesService,getCleaningSuppliesService,getDeletedCleaningSuppliesService,getFixedExpensesService,getDeletedFixedExpensesService } from "../services/extras.js";
import { insertCleaningCategoryService,insertDeletedCleaningCategoryService,insertCleaningTypeService,insertCountCleaningTypeService,insertDeletedCleaningTypeService,insertCleaningSupplyService,insertDeletedCleaningSupplyService,insertFixedExpenseService,insertDeletedFixedExpenseService } from "../services/extras.js";
import { updateCleaningCategoryService,updateCleaningTypeService,updateCleaningSupplyService,updateFixedExpenseService } from "../services/extras.js";
import { deleteDeletedCleaningCategoryService,deleteDeletedCleaningTypeService,deleteDeletedCleaningSupplyService,deleteDeletedFixedExpenseService } from "../services/extras.js";
import { getLogsService } from "../services/logs.js";
import { insertLogCleaningCategoryService,insertLogDeletedCleaningCategoryService,insertLogCleaningTypeService,insertLogCountCleaningTypeService,insertLogDeletedCleaningTypeService,insertLogCleaningSupplyService,insertLogDeletedCleaningSupplyService,insertLogFixedExpenseService,insertLogDeletedFixedExpenseService } from "../services/extras.js";
import { updateLogCleaningCategoryService,updateLogCleaningTypeService,updateLogCleaningSupplyService,updateLogFixedExpenseService } from "../services/extras.js";
import { deleteLogDeletedCleaningCategoryService,deleteLogDeletedCleaningTypeService,deleteLogDeletedCleaningSupplyService,deleteLogDeletedFixedExpenseService } from "../services/extras.js";
import { getWarehouseCleaningService,getWarehouseCleaningTypesService,getWarehouseFixedExpensesService } from "../services/warehouse.js";
import { insertWarehouseCleaningStartService,insertWarehouseCleaningTypeStartService,insertWarehouseFixedExpenseStartService } from "../services/warehouse.js";
import { insertLogWarehouseCleaningStartService,insertLogWarehouseCleaningTypeStartService,insertLogWarehouseFixedExpenseStartService } from "../services/warehouse.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Extras_GET = (socket) => {
    //---------- CATEGORÍAS DE LIMPIEZA ✔️
    socket.on('Get-Cleaning-Categories', async () => {
        try {
            const result = await getCleaningCategoriesService();
            console.log('Categorías de limpieza obtenidas...');
            io.emit('Get-Cleaning-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS ✔️
    socket.on('Get-Deleted-Cleaning-Categories', async () => {
        try {
            const result = await getDeletedCleaningCategoriesService();
            console.log('Categorías de limpieza eliminadas obtenidas...');
            io.emit('Get-Deleted-Cleaning-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE LIMPIEZA ✔️
    socket.on('Get-Cleaning-Types', async () => {
        try {
            const result = await getCleaningTypesService();
            console.log('Tipos de limpieza obtenidos...');
            io.emit('Get-Cleaning-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CANTIDADES DE TIPOS DE LIMPIEZA ✔️
    socket.on('Get-Count-Cleaning-Types', async () => {
        try {
            const result = await getCountCleaningTypesService();
            console.log('Cantidades de tipos de limpieza obtenidas...');
            io.emit('Get-Count-Cleaning-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE LIMPIEZA ELIMINADOS ✔️
    socket.on('Get-Deleted-Cleaning-Types', async () => {
        try {
            const result = await getDeletedCleaningTypesService();
            console.log('Tipos de limpieza eliminados obtenidos...');
            io.emit('Get-Deleted-Cleaning-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- SUMINISTROS DE LIMPIEZA ✔️
    socket.on('Get-Cleaning-Supplies', async () => {
        try {
            const result = await getCleaningSuppliesService();
            console.log('Suministros de limpieza obtenidos...');
            io.emit('Get-Cleaning-Supplies', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- SUMINISTROS DE LIMPIEZA ELIMINADOS ✔️
    socket.on('Get-Deleted-Cleaning-Supplies', async () => {
        try {
            const result = await getDeletedCleaningSuppliesService();
            console.log('Suministros de limpieza eliminados obtenidos...');
            io.emit('Get-Deleted-Cleaning-Supplies', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- GASTOS FIJOS ✔️
    socket.on('Get-Fixed-Expenses', async () => {
        try {
            const result = await getFixedExpensesService();
            console.log('Gastos fijos obtenidos...');
            io.emit('Get-Fixed-Expenses', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- GASTOS FIJOS ELIMINADOS ✔️
    socket.on('Get-Deleted-Fixed-Expenses', async () => {
        try {
            const result = await getDeletedFixedExpensesService();
            console.log('Gastos fijos eliminados obtenidos...');
            io.emit('Get-Deleted-Fixed-Expenses', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Extras_INSERT = (socket) => {
    //---------- CATEGORÍAS DE LIMPIEZA ✔️
    socket.on('Insert-Cleaning-Category',async (idusuario,nombre,descripcion) => {
        try{
            await insertCleaningCategoryService(nombre,descripcion);
            const resultCleaningCategories = await getCleaningCategoriesService();
            const decryptedData = decryptData(resultCleaningCategories);
            const parsedData = JSON.parse(decryptedData);
            await insertLogCleaningCategoryService(parsedData.find(data => data.nombre === nombre)?.idcategoria,idusuario,nombre,descripcion);
            const category = parsedData.find(data => data.nombre === nombre)?.idcategoria
            await insertWarehouseCleaningStartService(category);
            const resultWarehouseCleaning = await getWarehouseCleaningService();
            const decryptedDataWarehouse = decryptData(resultWarehouseCleaning);
            const parsedDataWarehouse = JSON.parse(decryptedDataWarehouse);
            await insertLogWarehouseCleaningStartService(parsedDataWarehouse.find(data => data.idcategoria === category)?.idalmacen,idusuario,String(category));
            const resultLogs = await getLogsService();
            io.emit('Get-Warehouse-Cleaning',resultWarehouseCleaning);
            io.emit('Get-Cleaning-Categories',resultCleaningCategories)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar la categoría de limpieza: ',error);
            return error;
        }
    });
    //---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS ✔️
    socket.on('Insert-Deleted-Cleaning-Category',async (idusuario,idcategoria) => {
        try{
            await insertDeletedCleaningCategoryService(idcategoria);
            const resultDeletedCleaningCategories = await getDeletedCleaningCategoriesService();
            const decryptedData = decryptData(resultDeletedCleaningCategories);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedCleaningCategoryService(parsedData.find(data => data.idcategoria === idcategoria)?.ideliminado,idusuario,String(idcategoria));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Cleaning-Categories',resultDeletedCleaningCategories)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar la categoría de limpieza: ',error);
            return error;
        }
    });
    //---------- TIPOS DE LIMPIEZA ✔️
    socket.on('Insert-Cleaning-Type',async (idusuario,tipo,descripcion,unidad,idcategoria,limite) => {
        try{
            await insertCleaningTypeService(tipo,descripcion,unidad,idcategoria,limite);
            const resultCleaningTypes = await getCleaningTypesService();
            const decryptedData = decryptData(resultCleaningTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogCleaningTypeService(parsedData.find(data => data.tipo === tipo)?.idtipo,idusuario,tipo,descripcion,unidad,String(idcategoria),String(limite));
            const type = parsedData.find(data => data.tipo === tipo)?.idtipo
            await insertWarehouseCleaningTypeStartService(type);
            const resultWarehouseCleaningType = await getWarehouseCleaningTypesService();
            const decryptedDataWarehouse = decryptData(resultWarehouseCleaningType);
            const parsedDataWarehouse = JSON.parse(decryptedDataWarehouse);
            await insertLogWarehouseCleaningTypeStartService(parsedDataWarehouse.find(data => data.idtipo === type)?.idalmacen,idusuario,String(type));
            const resultLogs = await getLogsService();
            io.emit('Get-Warehouse-Cleaning-Type',resultWarehouseCleaningType);
            io.emit('Get-Cleaning-Types',resultCleaningTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar al tipo de limpieza: ',error);
            return error;
        }
    });
    //---------- CANTIDADES DE TIPOS DE LIMPIEZA ✔️
    socket.on('Insert-Count-Cleaning-Type',async (idusuario,cantidad,idtipo) => {
        try{
            await insertCountCleaningTypeService(cantidad,idtipo);
            const resultCountCleaningTypes = await getCountCleaningTypesService();
            const decryptedData = decryptData(resultCountCleaningTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogCountCleaningTypeService(parsedData.find(data => data.idtipo === idtipo && data.cantidad === cantidad)?.idcantidad,idusuario,String(cantidad),String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Count-Cleaning-Types',resultCountCleaningTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar la cantidad del tipo de limpieza: ',error);
            return error;
        }
    });
    //---------- TIPOS DE LIMPIEZA ELIMINADOS ✔️
    socket.on('Insert-Deleted-Cleaning-Type',async (idusuario,idtipo) => {
        try{
            await insertDeletedCleaningTypeService(idtipo);
            const resultDeletedCleaningTypes = await getDeletedCleaningTypesService();
            const decryptedData = decryptData(resultDeletedCleaningTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedCleaningTypeService(parsedData.find(data => data.idtipo === idtipo)?.ideliminado,idusuario,String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Cleaning-Types',resultDeletedCleaningTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar la categoría de limpieza: ',error);
            return error;
        }
    });
    //---------- SUMINISTROS DE LIMPIEZA ✔️
    socket.on('Insert-Cleaning-Supply',async (idusuario,codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad,idtipo) => {
        try{
            await insertCleaningSupplyService(codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad,idtipo);
            const resultCleaningSupplies = await getCleaningSuppliesService();
            const decryptedData = decryptData(resultCleaningSupplies);
            const parsedData = JSON.parse(decryptedData);
            await insertLogCleaningSupplyService(parsedData.find(data => data.nombre === nombre)?.idsuministro,idusuario,codigo,nombre,descripcion,imagen,String(idproveedor),String(idcategoria),String(idcantidad),String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Cleaning-Supplies',resultCleaningSupplies)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar al suministro de limpieza: ',error);
            return error;
        }
    });
    //---------- SUMINISTROS DE LIMPIEZA ELIMINADOS ✔️
    socket.on('Insert-Deleted-Cleaning-Supply',async (idusuario,idsuministro) => {
        try{
            await insertDeletedCleaningSupplyService(idsuministro);
            const resultDeletedCleaningSupplies = await getDeletedCleaningSuppliesService();
            const decryptedData = decryptData(resultDeletedCleaningSupplies);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedCleaningSupplyService(parsedData.find(data => data.idsuministro === idsuministro)?.ideliminado,idusuario,String(idsuministro));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Cleaning-Supplies',resultDeletedCleaningSupplies)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar al suministro de limpieza: ',error);
            return error;
        }
    });
    //---------- GASTOS FIJOS ✔️
    socket.on('Insert-Fixed-Expense',async (idusuario,nombre,descripcion) => {
        try{
            await insertFixedExpenseService(nombre,descripcion);
            const resultFixedExpenses = await getFixedExpensesService();
            const decryptedData = decryptData(resultFixedExpenses);
            const parsedData = JSON.parse(decryptedData);
            await insertLogFixedExpenseService(parsedData.find(data => data.nombre === nombre)?.idgasto,idusuario,nombre,descripcion);
            const Expense = parsedData.find(data => data.nombre === nombre)?.idgasto
            await insertWarehouseFixedExpenseStartService(Expense);
            const resultWarehouseFixedExpenses = await getWarehouseFixedExpensesService();
            const decryptedDataWarehouse = decryptData(resultWarehouseFixedExpenses);
            const parsedDataWarehouse = JSON.parse(decryptedDataWarehouse);
            await insertLogWarehouseFixedExpenseStartService(parsedDataWarehouse.find(data => data.idgasto === Expense)?.idalmacen,idusuario,String(Expense));
            const resultLogs = await getLogsService();
            io.emit('Get-Warehouse-Fixed-Expenses',resultWarehouseFixedExpenses);
            io.emit('Get-Fixed-Expenses',resultFixedExpenses)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar al gasto fijo: ',error);
            return error;
        }
    });
    //---------- GASTOS FIJOS ELIMINADOS ✔️
    socket.on('Insert-Deleted-Fixed-Expense',async (idusuario,idgasto) => {
        try{
            await insertDeletedFixedExpenseService(idgasto);
            const resultDeletedFixedExpenses = await getDeletedFixedExpensesService();
            const decryptedData = decryptData(resultDeletedFixedExpenses);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedFixedExpenseService(parsedData.find(data => data.idgasto === idgasto)?.ideliminado,idusuario,String(idgasto));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Fixed-Expenses',resultDeletedFixedExpenses)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar al gasto fijo: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Extras_UPDATE = (socket) => {
    //---------- CATEGORÍAS DE LIMPIEZA ✔️
    socket.on('Update-Cleaning-Category',async (idusuario,idcategoria,nombre,descripcion) => {
        try{
            await updateCleaningCategoryService(idcategoria,nombre,descripcion);
            const resultCleaningCategories = await getCleaningCategoriesService();
            await updateLogCleaningCategoryService(idcategoria,idusuario,nombre,descripcion);
            const resultLogs = await getLogsService();
            io.emit('Get-Cleaning-Categories',resultCleaningCategories);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar la categoría de limpieza: ',error);
            return error;
        }
    });
    //---------- TIPOS DE LIMPIEZA ✔️
    socket.on('Update-Cleaning-Type',async (idusuario,idtipo,tipo,descripcion,unidad,idcategoria,limite) => {
        try{
            await updateCleaningTypeService(idtipo,tipo,descripcion,unidad,idcategoria,limite);
            const resultCleaningTypes = await getCleaningTypesService();
            await updateLogCleaningTypeService(idtipo,idusuario,tipo,descripcion,unidad,String(idcategoria),String(limite));
            const resultLogs = await getLogsService();
            io.emit('Get-Cleaning-Types',resultCleaningTypes);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar al tipo de limpieza: ',error);
            return error;
        }
    });
    //---------- SUMINISTROS DE LIMPIEZA ✔️
    socket.on('Update-Cleaning-Supply',async (idusuario,idsuministro,codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad,idtipo) => {
        try{
            await updateCleaningSupplyService(idsuministro,codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad,idtipo);
            const resultCleaningSupplies = await getCleaningSuppliesService();
            await updateLogCleaningSupplyService(idsuministro,idusuario,codigo,nombre,descripcion,imagen,String(idproveedor),String(idcategoria),String(idcantidad),String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Cleaning-Supplies',resultCleaningSupplies);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar al suministro de limpieza: ',error);
            return error;
        }
    });
    //---------- GASTOS FIJOS ✔️
    socket.on('Update-Fixed-Expense',async (idusuario,idgasto,nombre,descripcion) => {
        try{
            await updateFixedExpenseService(idgasto,nombre,descripcion);
            const resultFixedExpenses = await getFixedExpensesService();
            await updateLogFixedExpenseService(idgasto,idusuario,nombre,descripcion);
            const resultLogs = await getLogsService();
            io.emit('Get-Fixed-Expenses',resultFixedExpenses);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar al gasto fijo: ',error);
            return error;
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Extras_DELETE = (socket) => {
    //---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS ✔️
    socket.on('Delete-Deleted-Cleaning-Category',async (idusuario,ideliminado,idcategoria) => {
        try{
            await deleteDeletedCleaningCategoryService(idcategoria);
            const resultDeletedCleaningCategories = await getDeletedCleaningCategoriesService();
            await deleteLogDeletedCleaningCategoryService(ideliminado,idusuario,String(idcategoria));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Cleaning-Categories',resultDeletedCleaningCategories)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar la categoría de limpieza: ',error);
            return error;
        }
    });
    //---------- TIPOS DE LIMPIEZA ELIMINADOS ✔️
    socket.on('Delete-Deleted-Cleaning-Type',async (idusuario,ideliminado,idtipo) => {
        try{
            await deleteDeletedCleaningTypeService(idtipo);
            const resultDeletedCleaningTypes = await getDeletedCleaningTypesService();
            await deleteLogDeletedCleaningTypeService(ideliminado,idusuario,String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Cleaning-Types',resultDeletedCleaningTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar al tipo de limpieza: ',error);
            return error;
        }
    });
    //---------- SUMINISTROS DE LIMPIEZA ELIMINADOS ✔️
    socket.on('Delete-Deleted-Cleaning-Supply',async (idusuario,ideliminado,idsuministro) => {
        try{
            await deleteDeletedCleaningSupplyService(idsuministro);
            const resultDeletedCleaningSupplies = await getDeletedCleaningSuppliesService();
            await deleteLogDeletedCleaningSupplyService(ideliminado,idusuario,String(idsuministro));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Cleaning-Supplies',resultDeletedCleaningSupplies)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar al suministro de limpieza: ',error);
            return error;
        }
    });
    //---------- GASTOS FIJOS ELIMINADOS ✔️
    socket.on('Delete-Deleted-Fixed-Expense',async (idusuario,ideliminado,idgasto) => {
        try{
            await deleteDeletedFixedExpenseService(idgasto);
            const resultDeletedFixedExpenses = await getDeletedFixedExpensesService();
            await deleteLogDeletedFixedExpenseService(ideliminado,idusuario,String(idgasto));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Fixed-Expenses',resultDeletedFixedExpenses)
            io.emit('Get-Logs',resultLogs);    
        }catch(error){
            console.error('Error al recuperar al gasto fijo: ',error);
            return error;
        }
    });
}
//______________DELETE______________