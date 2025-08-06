//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliesService,getDeletedSuppliesService,getSupplyTypesService,getCountSupplyTypesService,getDeletedSupplyTypesService,getSupplyCategoriesService,getDeletedSupplyCategoriesService } from "../services/supplies.js";
import { insertSupplyService,insertDeletedSupplyService,insertSupplyTypeService,insertCountSupplyTypeService,insertDeletedSupplyTypeService,insertSupplyCategoryService,insertDeletedSupplyCategoryService } from "../services/supplies.js";
import { updateSupplyService,updateSupplyTypeService,updateSupplyCategoryService } from "../services/supplies.js";
import { deleteDeletedSupplyService,deleteDeletedSupplyTypeService,deleteDeletedSupplyCategoryService } from "../services/supplies.js";
import { getLogsService } from "../services/logs.js";
import { insertLogSupplyService,insertLogDeletedSupplyService,insertLogSupplyTypeService,insertLogCountSupplyTypeService,insertLogDeletedSupplyTypeService,insertLogSupplyCategoryService,insertLogDeletedSupplyCategoryService } from "../services/supplies.js";
import { updateLogSupplyService,updateLogSupplyTypeService,updateLogSupplyCategoryService } from "../services/supplies.js";
import { deleteLogDeletedSupplyService,deleteLogDeletedSupplyTypeService,deleteLogDeletedSupplyCategoryService } from "../services/supplies.js";
import { getWarehouseCategoriesService,getWarehouseSupplyTypesService } from "../services/warehouse.js";
import { insertWarehouseCategoryStartService,insertWarehouseSupplyTypeStartService } from "../services/warehouse.js";
import { insertLogWarehouseCategoryStartService,insertLogWarehouseSupplyTypeStartService } from "../services/warehouse.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Supplies_GET = (socket) => {
    //---------- INSUMOS ✔️
    socket.on('Get-Supplies', async () => {
        try {
            const result = await getSuppliesService();
            console.log('Insumos obtenidos...');
            io.emit('Get-Supplies', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- INSUMOS ELIMINADOS ✔️
    socket.on('Get-Deleted-Supplies', async () => {
        try {
            const result = await getDeletedSuppliesService();
            console.log('Insumos eliminados obtenidos...');
            io.emit('Get-Deleted-Supplies', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPO DE INSUMOS ✔️
    socket.on('Get-Supply-Types', async () => {
        try {
            const result = await getSupplyTypesService();
            console.log('Tipos de Insumo obtenidos...');
            io.emit('Get-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CANTIDAD DE TIPOS DE INSUMO ✔️
    socket.on('Get-Count-Supply-Types', async () => {
        try {
            const result = await getCountSupplyTypesService();
            console.log('Cantidades de los tipos de Insumo obtenidas...');
            io.emit('Get-Count-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS ✔️
    socket.on('Get-Deleted-Supply-Types', async () => {
        try {
            const result = await getDeletedSupplyTypesService();
            console.log('Tipos de Insumo eliminados obtenidos...');
            io.emit('Get-Deleted-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CATEGORIAS DE INSUMO ✔️
    socket.on('Get-Supply-Categories', async () => {
        try {
            const result = await getSupplyCategoriesService();
            console.log('Categorías de los Insumo obtenidas...');
            io.emit('Get-Supply-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CATEGORIAS DE INSUMO ELIMINADAS ✔️
    socket.on('Get-Deleted-Supply-Categories', async () => {
        try {
            const result = await getDeletedSupplyCategoriesService();
            console.log('Categorías de los Insumo eliminadas obtenidas...');
            io.emit('Get-Deleted-Supply-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
};
//______________GET______________
//______________INSERT______________
export const Supplies_INSERT = (socket) => {
    //---------- INSUMOS ✔️
    socket.on('Insert-Supply',async (idusuario,codigo,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria,idcantidad) => {
        try{
            await insertSupplyService(codigo,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria,idcantidad);
            const resultSupplies = await getSuppliesService();
            const decryptedData = decryptData(resultSupplies);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplyService(parsedData.find(data => data.nombre === nombre && data.idproveedor === idproveedor)?.idinsumo,idusuario,imagen,codigo,nombre,descripcion,String(idproveedor),String(idtipo),String(idcategoria),String(idcantidad));
            const resultLogs = await getLogsService();
            io.emit('Get-Supplies',resultSupplies)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar al insumo: ',error);
            return error;
        }
    });
    //---------- INSUMOS ELIMINADOS ✔️
    socket.on('Insert-Deleted-Supply',async (idusuario,idinsumo) => {
        try{
            await insertDeletedSupplyService(idinsumo);
            const resultDeletedSupplies = await getDeletedSuppliesService();
            const decryptedData = decryptData(resultDeletedSupplies);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedSupplyService(parsedData.find(data => data.idinsumo === idinsumo)?.ideliminado,idusuario,String(idinsumo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Supplies',resultDeletedSupplies)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar al insumo: ',error);
            return error;
        }
    });
    //---------- TIPO DE INSUMOS ✔️
    socket.on('Insert-Supply-Type',async (idusuario,tipo,descripcion,unidad,idcategoria,limite) => {
        try{
            await insertSupplyTypeService(tipo,descripcion,unidad,idcategoria,limite);
            const resultSupplyTypes = await getSupplyTypesService();
            const decryptedData = decryptData(resultSupplyTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplyTypeService(parsedData.find(data => data.tipo === tipo)?.idtipo,idusuario,tipo,descripcion,unidad,String(idcategoria),String(limite));
            const type = parsedData.find(data => data.tipo === tipo)?.idtipo
            await insertWarehouseSupplyTypeStartService(type);
            const resultWarehouseSupplyTypes = await getWarehouseSupplyTypesService();
            const decryptedDataWarehouse = decryptData(resultWarehouseSupplyTypes);
            const parsedDataWarehouse = JSON.parse(decryptedDataWarehouse);
            await insertLogWarehouseSupplyTypeStartService(parsedDataWarehouse.find(data => data.idtipo === type)?.idalmacen,idusuario,String(type));
            const resultLogs = await getLogsService();
            io.emit('Get-Warehouse-Supply-Types',resultWarehouseSupplyTypes);
            io.emit('Get-Supply-Types',resultSupplyTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar al tipo de insumo: ',error);
            return error;
        }
    });
    //---------- CANTIDAD DE TIPOS DE INSUMO ✔️
    socket.on('Insert-Count-Supply-Type',async (idusuario,cantidad,idtipo) => {
        try{
            await insertCountSupplyTypeService(cantidad,idtipo);
            const resultCountSupplyTypes = await getCountSupplyTypesService();
            const decryptedData = decryptData(resultCountSupplyTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogCountSupplyTypeService(parsedData.find(data => data.idtipo === idtipo && data.cantidad === cantidad)?.idcantidad,idusuario,String(cantidad),String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Count-Supply-Types',resultCountSupplyTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar la cantidad al tipo de insumo: ',error);
            return error;
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS ✔️
    socket.on('Insert-Deleted-Supply-Type',async (idusuario,idtipo) => {
        try{
            await insertDeletedSupplyTypeService(idtipo);
            const resultDeletedSupplyTypes = await getDeletedSupplyTypesService();
            const decryptedData = decryptData(resultDeletedSupplyTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedSupplyTypeService(parsedData.find(data => data.idtipo === idtipo)?.ideliminado,idusuario,String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Supply-Types',resultDeletedSupplyTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar al tipo de insumo: ',error);
            return error;
        }
    });
    //---------- CATEGORIAS DE INSUMO ✔️
    socket.on('Insert-Supply-Category',async (idusuario,nombre,descripcion) => {
        try{
            await insertSupplyCategoryService(nombre,descripcion);
            const resultSupplyCategories = await getSupplyCategoriesService();
            const decryptedData = decryptData(resultSupplyCategories);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplyCategoryService(parsedData.find(data => data.nombre === nombre)?.idcategoria,idusuario,nombre,descripcion);
            const resultLogs = await getLogsService();
            const category = parsedData.find(data => data.nombre === nombre)?.idcategoria
            await insertWarehouseCategoryStartService(category);
            const resultWarehouseCategories = await getWarehouseCategoriesService();
            const decryptedDataWarehouse = decryptData(resultWarehouseCategories);
            const parsedDataWarehouse = JSON.parse(decryptedDataWarehouse);
            await insertLogWarehouseCategoryStartService(parsedDataWarehouse.find(data => data.idcategoria === category)?.idalmacen,idusuario,String(category));
            io.emit('Get-Supply-Categories',resultSupplyCategories)
            io.emit('Get-Warehouse-Categories',resultWarehouseCategories);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar la categoría del insumo: ',error);
            return error;
        }
    });
    //---------- CATEGORIAS DE INSUMO ELIMINADAS ✔️
    socket.on('Insert-Deleted-Supply-Category',async (idusuario,idcategoria) => {
        try{
            await insertDeletedSupplyCategoryService(idcategoria);
            const resultDeletedSupplyCategories = await getDeletedSupplyCategoriesService();
            const decryptedData = decryptData(resultDeletedSupplyCategories);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedSupplyCategoryService(parsedData.find(data => data.idcategoria === idcategoria)?.ideliminado,idusuario,String(idcategoria));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Supply-Categories',resultDeletedSupplyCategories)
            io.emit('Get-Logs',resultLogs);    
        }catch(error){
            console.error('Error al eliminar la categoría del insumo: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Supplies_UPDATE = (socket) => {
    //---------- INSUMOS ✔️
    socket.on('Update-Supply',async (idusuario,idinsumo,codigo,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria,idcantidad) => {
        try{
            await updateSupplyService(idinsumo,codigo,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria,idcantidad);
            const resultSupplies = await getSuppliesService();
            await updateLogSupplyService(idinsumo,idusuario,imagen,codigo,nombre,descripcion,String(idproveedor),String(idtipo),String(idcategoria),String(idcantidad));
            const resultLogs = await getLogsService();
            io.emit('Get-Supplies',resultSupplies);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar al insumo: ',error);
            return error;
        }
    });
    //---------- TIPOS DE INSUMO ✔️
    socket.on('Update-Supply-Type',async (idusuario,idtipo,tipo,descripcion,unidad,idcategoria,limite) => {
        try{
            await updateSupplyTypeService(idtipo,tipo,descripcion,unidad,idcategoria,limite);
            const resultSupplyTypes = await getSupplyTypesService();
            await updateLogSupplyTypeService(idtipo,idusuario,tipo,descripcion,unidad,String(idcategoria),String(limite));
            const resultLogs = await getLogsService();
            io.emit('Get-Supply-Types',resultSupplyTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar al tipo de insumo: ',error);
            return error;
        }
    });
    //---------- CATEGORIAS DE INSUMO ✔️
    socket.on('Update-Supply-Category',async (idusuario,idcategoria,nombre,descripcion) => {
        try{
            await updateSupplyCategoryService(idcategoria,nombre,descripcion);
            const resultSupplyCategories = await getSupplyCategoriesService();
            await updateLogSupplyCategoryService(idcategoria,idusuario,nombre,descripcion);
            const resultLogs = await getLogsService();
            io.emit('Get-Supply-Categories',resultSupplyCategories)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar la categoría del insumo: ',error);
            return error;
        }
    });
}
//______________UPDATE______________
//______________DELETE______________
export const Supplies_DELETE = (socket) => {
    //---------- INSUMOS ELIMINADOS ✔️
    socket.on('Delete-Deleted-Supply',async (idusuario,ideliminado,idinsumo) => {
        try{
            await deleteDeletedSupplyService(idinsumo);
            const resultDeletedSupplies = await getDeletedSuppliesService();
            await deleteLogDeletedSupplyService(ideliminado,idusuario,String(idinsumo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Supplies',resultDeletedSupplies)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar al insumo: ',error);
            return error;
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS ✔️
    socket.on('Delete-Deleted-Supply-Type',async (idusuario,ideliminado,idtipo) => {
        try{
            await deleteDeletedSupplyTypeService(idtipo);
            const resultDeletedSupplyTypes = await getDeletedSupplyTypesService();
            await deleteLogDeletedSupplyTypeService(ideliminado,idusuario,String(idtipo));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Supply-Types',resultDeletedSupplyTypes)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar al tipo de insumo: ',error);
            return error;
        }
    });
    //---------- CATEGORIAS DE INSUMO ELIMINADAS ✔️
    socket.on('Delete-Deleted-Supply-Category',async (idusuario,ideliminado,idcategoria) => {
        try{
            await deleteDeletedSupplyCategoryService(idcategoria);
            const resultDeletedSupplyCategories = await getDeletedSupplyCategoriesService();
            await deleteLogDeletedSupplyCategoryService(ideliminado,idusuario,String(idcategoria));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Supply-Categories',resultDeletedSupplyCategories)
            io.emit('Get-Logs',resultLogs);    
        }catch(error){
            console.error('Error al recuperar la categoría del insumo: ',error);
            return error;
        }
    });
}
//______________DELETE______________