//____________IMPORT/EXPORT____________
// Consultas de sql
import { getWarehouseCategoriesService,getWarehouseSupplyTypesService,getWarehouseCleaningService,getWarehouseFixedExpensesService } from "../services/warehouse.js";
import { insertWarehouseCategoryService,insertWarehouseSupplyTypeService,insertWarehouseCleaningService,insertWarehouseFixedExpenseService } from "../services/warehouse.js";
import { getLogsService } from "../services/logs.js";
import { insertLogWarehouseCategoryService,insertLogWarehouseSupplyTypeService,insertLogWarehouseCleaningService,insertLogWarehouseFixedExpenseService } from "../services/warehouse.js";
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