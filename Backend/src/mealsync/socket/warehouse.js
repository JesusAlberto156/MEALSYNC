//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSupplyPricesService,getWarehouseService,getDeletedSuppliesService,getDeletedWarehouseService } from "../services/warehouse.js";
import { insertSupplyPriceService,insertWarehouseService,insertDeletedSupplyService,insertDeletedWarehouseService } from "../services/warehouse.js";
import { updateSupplyService,updateSupplyTypeService,updateSupplyTypeTypeDescriptionService,updateUnitService,updateUnitNameUnitService,updateSupplyPricePriceService,updateSupplyPriceStateService,updateWarehouseQuantityService,updateWarehouseObservationService,updateDeletedWarehouseService } from "../services/warehouse.js";
import { deleteDeletedSupplyService,deleteDeletedWarehouseService } from "../services/warehouse.js";
// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Warehouse_GET = (socket) => {
    //---------- PRECIO DEL INSUMO
    socket.on('Get-Supply-Prices', async () => {
        try {
            const result = await getSupplyPricesService();
            console.log('Precios del almacén por insumo obtenidos...');
            io.emit('Get-Supply-Prices', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PRECIO DEL INSUMO
    //---------- ALMACEN
    socket.on('Get-Warehouse', async () => {
        try {
            const result = await getWarehouseService();
            console.log('Almacén obtenido...');
            io.emit('Get-Warehouse', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN
    //---------- INSUMOS ELIMINADOS
    socket.on('Get-Deleted-Supplies', async () => {
        try {
            const result = await getDeletedSuppliesService();
            console.log('Insumos, Tipos de insumo y Medidas eliminadas obtenidas...');
            io.emit('Get-Deleted-Supplies', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- INSUMOS ELIMINADOS
    //---------- TIPOS DE INSUMO ELIMINADOS
    socket.on('Get-Deleted-Warehouse', async () => {
        try {
            const result = await getDeletedWarehouseService();
            console.log('Insumos eliminados del almacén obtenidos...');
            io.emit('Get-Deleted-Warehouse', result);
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS
};
//______________GET______________
//______________INSERT______________
export const Warehouse_INSERT = (socket) => {
    //---------- PRECIO DEL INSUMO
    socket.on('Insert-Supply-Price',async (usuario,insumo,precio,fecha,idinsumo,estado) => {
        try{
            await insertSupplyPriceService(precio,fecha,idinsumo,estado);
            io.emit('Insert-Supply-Price',`${usuario} agregó $${precio} del insumo ${insumo} al almacén`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- PRECIO DEL INSUMO
    //---------- ALMACEN
    socket.on('Insert-Warehouse',async (usuario,insumo,cantidad,observacion,idprecio) => {
        try{
            await insertWarehouseService(cantidad,observacion,idprecio);
            io.emit('Insert-Warehouse',`${usuario} agregó la cantidad ${cantidad} al almacén del insumo ${insumo}`);
        }catch(error){
            console.error('Error al agregar: ',error);
            return error;
        }
    });
    //---------- ALMACEN
    //---------- INSUMOS ELIMINADOS
    socket.on('Insert-Deleted-Supply',async (usuario,nombre,tabla,idtabla) => {
        try{
            await insertDeletedSupplyService(tabla,idtabla);
            io.emit('Insert-Deleted-Supply',`${usuario} eliminó ${nombre} a ${tabla === 'INSUMOS' || tabla === 'TIPOS DE INSUMO' ? 'los' : 'las'} ${tabla} `);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- INSUMOS ELIMINADOS
    //---------- TIPOS DE INSUMO ELIMINADOS
    socket.on('Insert-Deleted-Warehouse',async (usuario,tipo,idtipo,cantidad) => {
        try{
            await insertDeletedWarehouseService(idtipo,cantidad);
            io.emit('Insert-Deleted-Warehouse',`${usuario} eliminó del insumo ${tipo} al almacén la cantidad de ${cantidad} Kg/Lt.`);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS
}
//______________INSERT______________
//______________UPDATE______________
export const Warehouse_UPDATE = (socket) => {
    //---------- INSUMOS
    socket.on('Update-Supply',async (usuario,idinsumo,nombre,descripcion,imagen,idproveedor,idtipo) => {
        try{
            await updateSupplyService(idinsumo,nombre,descripcion,imagen,idproveedor,idtipo);
            io.emit('Update-Supply',`${usuario} editó al insumo ${nombre}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- INSUMOS
    //---------- TIPO DE INSUMOS
    socket.on('Update-Supply-Type',async (usuario,cantidad,unidad,idtipo,tipo,descripcion,idmedida) => {
        try{
            await updateSupplyTypeService(idtipo,tipo,descripcion,idmedida);
            io.emit('Update-Supply-Type',`${usuario} editó al tipo de insumo ${tipo} de ${cantidad} ${unidad}`);
        }catch(error){ 
            console.error('Error al editar: ',error);
            return error;
        }
    });
    socket.on('Update-Supply-Type-Type-Description',async (usuario,tipoOriginal,tipo,descripcion) => {
        try{
            await updateSupplyTypeTypeDescriptionService(tipoOriginal,tipo,descripcion);
            io.emit('Update-Supply-Type-Type-Description',`${usuario} editó al tipo de insumo ${tipoOriginal} a ${tipo}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- TIPO DE INSUMOS
    //---------- MEDIDA
    socket.on('Update-Unit',async (usuario,idmedida,nombre,unidad,cantidad) => {
        try{
            await updateUnitService(idmedida,nombre,unidad,cantidad);
            io.emit('Update-Unit',`${usuario} editó la medida ${nombre} a ${cantidad} ${unidad}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    socket.on('Update-Unit-Name-Unit',async (usuario,nombreOriginal,nombre,unidad) => {
        try{
            await updateUnitNameUnitService(nombreOriginal,nombre,unidad);
            io.emit('Update-Unit-Name-Unit',`${usuario} editó la medida ${nombreOriginal} a ${nombre}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- MEDIDA
    //---------- PRECIO DEL INSUMO
    socket.on('Update-Supply-Price-Price',async (usuario,insumo,idprecio,precio) => {
        try{
            await updateSupplyPricePriceService(idprecio,precio);
            io.emit('Update-Supply-Price-Price',`${usuario} editó el precio al almacén por el insumo ${insumo} a $${precio}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    socket.on('Update-Supply-Price-State',async (usuario,insumo,idprecio,estado) => {
        try{
            await updateSupplyPriceStateService(idprecio,estado);
            io.emit('Update-Supply-Price-State',`${usuario} editó el estado al almacén por el insumo ${insumo} a ${estado}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- PRECIO DEL INSUMO
    //---------- ALMACEN
    socket.on('Update-Warehouse-Quantity',async (usuario,insumo,idalmacen,cantidad) => {
        try{
            await updateWarehouseQuantityService(idalmacen,cantidad);
            io.emit('Update-Warehouse-Quantity',`${usuario} editó la cantidad a ${cantidad} del almacén por el insumo ${insumo}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    socket.on('Update-Warehouse-Observation',async (usuario,insumo,idalmacen,observacion) => {
        try{
            await updateWarehouseObservationService(idalmacen,observacion);
            io.emit('Update-Warehouse-Observation',`${usuario} editó la observación del almacén por el insumo ${insumo}`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- ALMACEN
    //---------- TIPOS DE INSUMO ELIMINADOS
    socket.on('Update-Deleted-Warehouse',async (usuario,insumo,ideliminado,idtipo,cantidad) => {
        try{
            await updateDeletedWarehouseService(ideliminado,idtipo,cantidad);
            io.emit('Update-Deleted-Warehouse',`${usuario} editó la cantidad a ${cantidad} del insumo ${insumo} al almacén`);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS
}
//______________UPDATE______________
//______________DELETE______________
export const Warehouse_DELETE = (socket) =>  {
    //---------- INSUMOS ELIMINADOS
    socket.on('Delete-Deleted-Supply',async (usuario,ideliminado,tabla) => {
        try{
            await deleteDeletedSupplyService(ideliminado,tabla);
            io.emit('Delete-Deleted-Supply',`${usuario} recuperó un elemento a ${tabla === 'INSUMOS' || tabla === 'TIPOS DE INSUMO' ? 'los':'las'} ${tabla}`);
        }catch(error){
            console.error('Error al recuperar: ',error);
            return error;
        }
    });
    //---------- INSUMOS ELIMINADOS
    //---------- TIPOS DE INSUMO ELIMINADOS
    socket.on('Delete-Deleted-Warehouse',async (usuario,idtipo) => {
        try{
            await deleteDeletedWarehouseService(idtipo);
            io.emit('Delete-Deleted-Warehouse',`${usuario} recuperó un insumo al almacén`);
        }catch(error){
            console.error('Error al recuperar: ',error);
            return error;
        }
    });
    //---------- TIPOS DE INSUMO ELIMINADOS
}
//______________DELETE______________