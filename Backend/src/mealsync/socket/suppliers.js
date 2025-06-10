//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliersService,getObservationsService,getDeletedSuppliersService,getSuppliesService,getDeletedSuppliesService,getSupplyTypesService,getCountSupplyTypesService,getDeletedSupplyTypesService,getSupplyCategoriesService,getDeletedSupplyCategoriesService } from "../services/suppliers.js";
import { insertSupplierService,insertObservationService,insertDeletedSupplierService,insertSupplyService,insertDeletedSupplyService,insertSupplyTypeService,insertCountSupplyTypeService,insertDeletedSupplyTypeService,insertSupplyCategoryService,insertDeletedSupplyCategoryService } from "../services/suppliers.js";
import { updateSupplierService,updateSupplyService,updateSupplyTypeService,updateCountSupplyTypeService,updateSupplyCategoryService } from "../services/suppliers.js";
import { deleteDeletedSupplierService } from "../services/suppliers.js";
// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Suppliers_GET = (socket) => {
    //---------- PROVEEDORES  
    socket.on('Get-Suppliers', async () => {
        try {
          const result = await getSuppliersService();
          console.log('Proveedores obtenidos...');
          io.emit('Get-Suppliers', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PROVEEDORES
    //---------- OBSERVACIONES
    socket.on('Get-Observations', async () => {
        try {
          const result = await getObservationsService();
          console.log('Observaciones de los proveedores obtenidos...');
          io.emit('Get-Observations', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- OBSERVACIONES
    //---------- PROVEEDORES ELIMINADOS
    socket.on('Get-Deleted-Suppliers', async () => {
        try {
          const result = await getDeletedSuppliersService();
          console.log('Proveedores eliminados obtenidos...');
          io.emit('Get-Deleted-Suppliers', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PROVEEDORES ELIMINADOS
    //---------- INSUMOS
    socket.on('Get-Supplies', async () => {
        try {
            const result = await getSuppliesService();
            console.log('Insumos obtenidos...');
            io.emit('Get-Supplies', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- INSUMOS
    //---------- INSUMOS ELIMINADOS
    socket.on('Get-Deleted-Supplies', async () => {
        try {
            const result = await getDeletedSuppliesService();
            console.log('Insumos eliminados obtenidos...');
            io.emit('Get-Deleted-Supplies', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- INSUMOS ELIMINADOS
    //---------- TIPO DE INSUMOS
    socket.on('Get-Supply-Types', async () => {
        try {
            const result = await getSupplyTypesService();
            console.log('Tipos de Insumo obtenidos...');
            io.emit('Get-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPO DE INSUMOS
    //---------- CANTIDAD DE TIPOS DE INSUMO
    socket.on('Get-Count-Supply-Types', async () => {
        try {
            const result = await getCountSupplyTypesService();
            console.log('Cantidades de los tipos de Insumo obtenidas...');
            io.emit('Get-Count-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CANTIDAD DE TIPOS DE INSUMO
    //---------- TIPOS DE INSUMO ELIMINADOS
    socket.on('Get-Deleted-Supply-Types', async () => {
        try {
            const result = await getDeletedSupplyTypesService();
            console.log('Tipos de Insumo eliminados obtenidos...');
            io.emit('Get-Deleted-Supply-Types', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS
    //---------- CATEGORIAS DE INSUMO
    socket.on('Get-Supply-Categories', async () => {
        try {
            const result = await getSupplyCategoriesService();
            console.log('Categorías de los Insumo obtenidas...');
            io.emit('Get-Supply-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CATEGORIAS DE INSUMO
    //---------- CATEGORIAS DE INSUMO ELIMINADAS
    socket.on('Get-Deleted-Supply-Categories', async () => {
        try {
            const result = await getDeletedSupplyCategoriesService();
            console.log('Categorías de los Insumo eliminadas obtenidas...');
            io.emit('Get-Deleted-Supply-Categories', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- CATEGORIAS DE INSUMO ELIMINADAS
};
//______________GET______________
//______________INSERT______________
export const Suppliers_INSERT = (socket) => {
    //---------- PROVEEDORES
    socket.on('Insert-Supplier',async (usuario,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await insertSupplierService(nombre,rfc,domicilio,telefono,correo);
            io.emit('Insert-Supplier',`${usuario} agregó al proveedor ${nombre}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES
    //---------- OBSERVACIONES
    socket.on('Insert-Observation',async (usuario,proveedor,observacion,calificacion,fecha,idproveedor) => {
        try{
            await insertObservationService(observacion,calificacion,fecha,idproveedor);
            io.emit('Insert-Observation',`${usuario} agregó una observación al proveedor ${proveedor}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- OBSERVACIONES
    //---------- PROVEEDORES ELIMINADOS
    socket.on('Insert-Deleted-Supplier',async (usuario,proveedor,idproveedor) => {
        try{
            await insertDeletedSupplierService(idproveedor);
            io.emit('Insert-Deleted-Supplier',`${usuario} eliminó al proveedor ${proveedor}`);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES ELIMINADOS
    //---------- INSUMOS
    socket.on('Insert-Supply',async (usuario,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria) => {
        try{
            await insertSupplyService(nombre,descripcion,imagen,idproveedor,idtipo,idcategoria);
            io.emit('Insert-Supply',`${usuario} agregó al insumo ${nombre}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- INSUMOS
    //---------- INSUMOS ELIMINADOS
    socket.on('Insert-Deleted-Supply',async (usuario,insumo,idinsumo) => {
        try{
            await insertDeletedSupplyService(idinsumo);
            io.emit('Insert-Deleted-Supply',`${usuario} eliminó al insumo ${insumo}`);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- INSUMOS ELIMINADOS
    //---------- TIPO DE INSUMOS
    socket.on('Insert-Supply-Type',async (usuario,tipo,descripcion,unidad,idcategoria) => {
        try{
            await insertSupplyTypeService(tipo,descripcion,unidad,idcategoria);
            io.emit('Insert-Supply-Type',`${usuario} agregó al tipo de insumo ${tipo}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- TIPO DE INSUMOS
    //---------- CANTIDAD DE TIPOS DE INSUMO
    socket.on('Insert-Count-Supply-Type',async (usuario,tipo,cantidad,idtipo) => {
        try{
            await insertCountSupplyTypeService(cantidad,idtipo);
            io.emit('Insert-Count-Supply-Type',`${usuario} agregó una cantidad al tipo de insumo ${tipo}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- CANTIDAD DE TIPOS DE INSUMO
    //---------- TIPOS DE INSUMO ELIMINADOS
    socket.on('Insert-Deleted-Supply-Type',async (usuario,tipo,idtipo) => {
        try{
            await insertDeletedSupplyTypeService(idtipo);
            io.emit('Insert-Deleted-Supply-Type',`${usuario} eliminó al tipo de insumo ${tipo}`);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS
    //---------- CATEGORIAS DE INSUMO
    socket.on('Insert-Supply-Category',async (usuario,nombre,descripcion) => {
        try{
            await insertSupplyCategoryService(nombre,descripcion);
            io.emit('Insert-Supply-Category',`${usuario} agregó la categoría de insumo ${nombre}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- CATEGORIAS DE INSUMO
    //---------- CATEGORIAS DE INSUMO ELIMINADAS
    socket.on('Insert-Deleted-Supply-Category',async (usuario,categoria,idcategoria) => {
        try{
            await insertDeletedSupplyCategoryService(idcategoria);
            io.emit('Insert-Deleted-Supply-Category',`${usuario} eliminó la categoría de insumo ${categoria}`);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- CATEGORIAS DE INSUMO ELIMINADAS
}
//______________INSERT______________
//______________UPDATE______________
export const Suppliers_UPDATE = (socket) => {
    //---------- PROVEEDORES
    socket.on('Update-Supplier',async (usuario,idproveedor,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await updateSupplierService(idproveedor,nombre,rfc,domicilio,telefono,correo);
            io.emit('Update-Supplier',`${usuario} editó al proveedor ${nombre}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES
    //---------- INSUMOS
    socket.on('Update-Supply',async (usuario,idproveedor,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await updateSupplyService(idproveedor,nombre,rfc,domicilio,telefono,correo);
            io.emit('Update-Supply',`${usuario} editó al insumo ${nombre}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- INSUMOS
    //---------- TIPOS DE INSUMO

    //---------- TIPOS DE INSUMO
    //---------- CANTIDAD DE TIPOS DE INSUMO

    //---------- CANTIDAD DE TIPOS DE INSUMO
    //---------- CATEGORIAS DE INSUMO

    //---------- CATEGORIAS DE INSUMO
}
//______________UPDATE______________
//______________DELETE______________
export const Suppliers_DELETE = (socket) => {
    //---------- PROVEEDORES ELIMINADOS
    socket.on('Delete-Deleted-Supplier',async (usuario,proveedor,idproveedor) => {
        try{
            await deleteDeletedSupplierService(idproveedor);
            io.emit('Delete-Deleted-Supplier',`${usuario} recuperó al proveedor ${proveedor}`);
        }catch(error){
            console.error('Error al recuperar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES ELIMINADOS
}
//______________DELETE______________