//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliersService,getObservationsService,getDeletedSuppliersService,getSuppliesService,getDeletedSuppliesService,getSupplyTypesService,getCountSupplyTypesService,getDeletedSupplyTypesService,getSupplyCategoriesService,getDeletedSupplyCategoriesService } from "../services/suppliers.js";
import { insertSupplierService,insertDeletedSupplierService,insertSupplyService,insertDeletedSupplyService,insertSupplyTypeService,insertCountSupplyTypeService,insertDeletedSupplyTypeService,insertSupplyCategoryService,insertDeletedSupplyCategoryService } from "../services/suppliers.js";
import { updateSupplierService,updateSupplyService,updateSupplyTypeService,updateSupplyCategoryService } from "../services/suppliers.js";
import { deleteDeletedSupplierService,deleteDeletedSupplyService,deleteDeletedSupplyTypeService,deleteDeletedSupplyCategoryService } from "../services/suppliers.js";
import { getLogsService } from "../services/logs.js";
import { insertLogSupplierService,insertLogDeletedSupplierService,insertLogSupplyService,insertLogDeletedSupplyService,insertLogSupplyTypeService,insertLogCountSupplyTypeService,insertLogDeletedSupplyTypeService,insertLogSupplyCategoryService,insertLogDeletedSupplyCategoryService } from "../services/suppliers.js";
import { updateLogSupplierService,updateLogSupplyService,updateLogSupplyTypeService,updateLogSupplyCategoryService } from "../services/suppliers.js";
import { deleteLogDeletedSupplierService,deleteLogDeletedSupplyService,deleteLogDeletedSupplyTypeService,deleteLogDeletedSupplyCategoryService } from "../services/suppliers.js";
import { getWarehousePurchasesCategoriesService,getWarehouseSalesCategoriesService,getWarehousePurchasesSupplyTypesService,getWarehouseSalesSupplyTypesService } from "../services/warehouse.js";
import { insertWarehousePurchaseCategoryService,insertWarehouseSalesCategoryService,insertWarehousePurchaseSupplyTypeService,insertWarehouseSalesSupplyTypeService } from "../services/warehouse.js";
import { insertLogWarehousePurchaseCategoryService,insertLogWarehouseSalesCategoryService,insertLogWarehousePurchaseSupplyTypeService,insertLogWarehouseSalesSupplyTypeService } from "../services/warehouse.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Suppliers_GET = (socket) => {
    //---------- PROVEEDORES ✔️
    socket.on('Get-Suppliers', async () => {
        try {
          const result = await getSuppliersService();
          console.log('Proveedores obtenidos...');
          io.emit('Get-Suppliers', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- OBSERVACIONES ✔️
    socket.on('Get-Observations', async () => {
        try {
          const result = await getObservationsService();
          console.log('Observaciones de los proveedores obtenidos...');
          io.emit('Get-Observations', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PROVEEDORES ELIMINADOS ✔️
    socket.on('Get-Deleted-Suppliers', async () => {
        try {
          const result = await getDeletedSuppliersService();
          console.log('Proveedores eliminados obtenidos...');
          io.emit('Get-Deleted-Suppliers', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
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
export const Suppliers_INSERT = (socket) => {
    //---------- PROVEEDORES ✔️
    socket.on('Insert-Supplier',async (idusuario,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await insertSupplierService(nombre,rfc,domicilio,telefono,correo);
            const resultSuppliers = await getSuppliersService();
            const decryptedData = decryptData(resultSuppliers);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplierService(parsedData.find(data => data.nombre === nombre)?.idproveedor,idusuario,nombre,rfc,domicilio,telefono,correo);
            const resultLogs = await getLogsService();
            io.emit('Get-Suppliers',resultSuppliers);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al agregar la proveedor: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES ELIMINADOS ✔️
    socket.on('Insert-Deleted-Supplier',async (idusuario,idproveedor) => {
        try{
            await insertDeletedSupplierService(idproveedor);
            const resultDeletedSuppliers = await getDeletedSuppliersService();
            const decryptedData = decryptData(resultDeletedSuppliers);
            const parsedData = JSON.parse(decryptedData);
            await insertLogDeletedSupplierService(parsedData.find(data => data.idproveedor === idproveedor)?.ideliminado,idusuario,String(idproveedor));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Suppliers',resultDeletedSuppliers)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al eliminar al proveedor: ',error);
            return error;
        }
    });
    //---------- INSUMOS ✔️
    socket.on('Insert-Supply',async (idusuario,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria) => {
        try{
            await insertSupplyService(nombre,descripcion,imagen,idproveedor,idtipo,idcategoria);
            const resultSupplies = await getSuppliesService();
            const decryptedData = decryptData(resultSupplies);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplyService(parsedData.find(data => data.nombre === nombre && data.idproveedor === idproveedor)?.idinsumo,idusuario,imagen,nombre,descripcion,String(idproveedor),String(idtipo),String(idcategoria));
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
    socket.on('Insert-Supply-Type',async (idusuario,tipo,descripcion,unidad,idcategoria,limite,cantidad) => {
        try{
            await insertSupplyTypeService(tipo,descripcion,unidad,idcategoria,limite);
            const resultSupplyTypes = await getSupplyTypesService();
            const decryptedData = decryptData(resultSupplyTypes);
            const parsedData = JSON.parse(decryptedData);
            await insertLogSupplyTypeService(parsedData.find(data => data.tipo === tipo)?.idtipo,idusuario,tipo,descripcion,unidad,String(idcategoria),String(limite));
            const type = parsedData.find(data => data.tipo === tipo)?.idtipo
            await insertWarehousePurchaseSupplyTypeService(type);
            await insertWarehouseSalesSupplyTypeService(type);
            const resultWarehousePurchasesSupplyTypes = await getWarehousePurchasesSupplyTypesService();
            const resultWarehouseSalesSupplyTypes = await getWarehouseSalesSupplyTypesService();
            const decryptedDataPurchases = decryptData(resultWarehousePurchasesSupplyTypes);
            const parsedDataPurchases = JSON.parse(decryptedDataPurchases);
            const decryptedDataSales = decryptData(resultWarehouseSalesSupplyTypes);
            const parsedDataSales = JSON.parse(decryptedDataSales);
            await insertLogWarehousePurchaseSupplyTypeService(parsedDataPurchases.find(data => data.idtipo === type)?.idalmacen,idusuario,String(type));
            await insertLogWarehouseSalesSupplyTypeService(parsedDataSales.find(data => data.idtipo === type)?.idalmacen,idusuario,String(type));
            const resultLogs = await getLogsService();
            io.emit('Get-Warehouse-Purchases-Supply-Types',resultWarehousePurchasesSupplyTypes);
            io.emit('Get-Warehouse-Sales-Supply-Types',resultWarehouseSalesSupplyTypes);
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
            await insertWarehousePurchaseCategoryService(category);
            await insertWarehouseSalesCategoryService(category);
            const resultWarehousePurchasesCategories = await getWarehousePurchasesCategoriesService();
            const resultWarehouseSalesCategories = await getWarehouseSalesCategoriesService();
            const decryptedDataPurchases = decryptData(resultWarehousePurchasesCategories);
            const parsedDataPurchases = JSON.parse(decryptedDataPurchases);
            const decryptedDataSales = decryptData(resultWarehouseSalesCategories);
            const parsedDataSales = JSON.parse(decryptedDataSales);
            await insertLogWarehousePurchaseCategoryService(parsedDataPurchases.find(data => data.idcategoria === category)?.idalmacen,idusuario,String(category));
            await insertLogWarehouseSalesCategoryService(parsedDataSales.find(data => data.idcategoria === category)?.idalmacen,idusuario,String(category));
            io.emit('Get-Supply-Categories',resultSupplyCategories)
            io.emit('Get-Warehouse-Purchases-Categories',resultWarehousePurchasesCategories);
            io.emit('Get-Warehouse-Sales-Categories',resultWarehouseSalesCategories);
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
export const Suppliers_UPDATE = (socket) => {
    //---------- PROVEEDORES ✔️
    socket.on('Update-Supplier',async (idusuario,idproveedor,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await updateSupplierService(idproveedor,nombre,rfc,domicilio,telefono,correo);
            const resultSuppliers = await getSuppliersService();
            await updateLogSupplierService(idproveedor,idusuario,nombre,rfc,domicilio,telefono,correo);
            const resultLogs = await getLogsService();
            io.emit('Get-Suppliers',resultSuppliers);
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al editar al proveedor: ',error);
            return error;
        }
    });
    //---------- INSUMOS ✔️
    socket.on('Update-Supply',async (idusuario,idinsumo,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria) => {
        try{
            await updateSupplyService(idproveedor,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria);
            const resultSupplies = await getSuppliesService();
            await updateLogSupplyService(idinsumo,idusuario,imagen,nombre,descripcion,String(idproveedor),String(idtipo),String(idcategoria));
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
export const Suppliers_DELETE = (socket) => {
    //---------- PROVEEDORES ELIMINADOS ✔️
    socket.on('Delete-Deleted-Supplier',async (idusuario,ideliminado,idproveedor) => {
        try{
            await deleteDeletedSupplierService(idproveedor);
            const resultDeletedSuppliers = await getDeletedSuppliersService();
            await deleteLogDeletedSupplierService(ideliminado,idusuario,String(idproveedor));
            const resultLogs = await getLogsService();
            io.emit('Get-Deleted-Suppliers',resultDeletedSuppliers)
            io.emit('Get-Logs',resultLogs);
        }catch(error){
            console.error('Error al recuperar al proveedor: ',error);
            return error;
        }
    });
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
    socket.on('Delete-Deleted-Supply-Category',async (idusuario,idcategoria) => {
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