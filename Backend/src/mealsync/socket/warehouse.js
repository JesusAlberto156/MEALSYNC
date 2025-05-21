//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliesService,getSupplyTypesService,getUnitsService,getSupplyPricesService,getWarehouseService } from "../services/warehouse.js";
import { insertSupplyService,insertSupplyTypeService } from "../services/warehouse.js";
import { updateSupplyService,updateSupplyTypeService } from "../services/warehouse.js";
// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//____________GET____________
export const Warehouse_GET = (socket) => {
    //---------- INSUMOS
    socket.on('Supplies', async () => {
        try {
          const result = await getSuppliesService();
          console.log('Insumos obtenidos...');
          io.emit('Supplies', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- INSUMOS
    //---------- TIPO DE INSUMOS
    socket.on('Supply-Types', async () => {
        try {
          const result = await getSupplyTypesService();
          console.log('Tipos de Insumos obtenidos...');
          io.emit('Supply-Types', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- TIPO DE INSUMOS
    //---------- MEDIDA
    socket.on('Units', async () => {
        try {
          const result = await getUnitsService();
          console.log('Medidas obtenidos...');
          io.emit('Units', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- MEDIDA
    //---------- PRECIO DEL INSUMO
    socket.on('Supply-Prices', async () => {
        try {
          const result = await getSupplyPricesService();
          console.log('Precios de Insumos obtenidos...');
          io.emit('Supply-Prices', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PRECIO DEL INSUMO
    //---------- ALMACEN
    socket.on('Warehouse', async () => {
        try {
          const result = await getWarehouseService();
          console.log('Almacén obtenido...');
          io.emit('Warehouse', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- ALMACEN
};
//____________GET____________
//______________INSERT______________
export const Warehouse_INSERT = (socket) => {
    //---------- INSUMOS
    socket.on('Supply-Insert',async (nombre,descripcion,imagen,idproveedor,idtipo) => {
        try{
            await insertSupplyService(nombre,descripcion,imagen,idproveedor,idtipo);
            io.emit('Supply-Insert','Se inserto el insumo ',nombre);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    //---------- INSUMOS
    //---------- TIPO DE INSUMOS
    socket.on('Supply-Type-Insert',async (tipo,descripcion,idmedida) => {
        try{
            await insertSupplyTypeService(tipo,descripcion,idmedida);
            io.emit('Supply-Type-Insert','Se inserto el tipo de insumo ',tipo);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    //---------- TIPO DE INSUMOS
    //---------- MEDIDA

    //---------- MEDIDA
    //---------- PRECIO DEL INSUMO

    //---------- PRECIO DEL INSUMO
    //---------- ALMACEN

    //---------- ALMACEN
}
//______________INSERT______________
//______________UPDATE______________
export const Warehouse_UPDATE = (socket) => {
    //---------- INSUMOS
    socket.on('Supply-Update',async (idinsumo,nombre,descripcion,imagen,idproveedor,idtipo) => {
        try{
            await updateSupplyService(idinsumo,nombre,descripcion,imagen,idproveedor,idtipo);
            io.emit('Supply-Update','Se actualizo el insumo ',nombre);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    //---------- INSUMOS
    //---------- TIPO DE INSUMOS
    socket.on('Supply-Type-Update',async (idtipo,tipo,descripcion,idmedida) => {
        try{
            await updateSupplyTypeService(idtipo,tipo,descripcion,idmedida);
            io.emit('Supply-Type-Update','Se actualizo el tipo de insumo ',tipo);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    //---------- TIPO DE INSUMOS
    //---------- MEDIDA

    //---------- MEDIDA
    //---------- PRECIO DEL INSUMO

    //---------- PRECIO DEL INSUMO
    //---------- ALMACEN

    //---------- ALMACEN
}
//______________UPDATE______________