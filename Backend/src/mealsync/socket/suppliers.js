//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliersService,getObservationsService } from "../services/suppliers.js";
import { insertSuppliersService } from "../services/suppliers.js";
import { updateSuppliersService } from "../services/suppliers.js";

// Servidor socket
import { io } from "../../index.js";
//____________IMPORT/EXPORT____________

//____________GET____________
export const Suppliers_GET = (socket) => {
    //---------- PROVEEDORES  
    socket.on('Suppliers', async () => {
        try {
          const result = await getSuppliersService();
          console.log('Proveedores obtenidos...');
          io.emit('Suppliers', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- PROVEEDORES
    //---------- OBSERVACIONES
    socket.on('Observations', async () => {
        try {
          const result = await getObservationsService();
          console.log('Observaciones de proveedores obtenidos...');
          io.emit('Observations', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    //---------- OBSERVACIONES
};
//____________GET____________
//______________INSERT______________
export const Suppliers_INSERT = (socket) => {
    //---------- PROVEEDORES
    socket.on('Supplier-Insert',async (nombre,rfc,domicilio,telefono,correo) => {
        try{
            await insertSuppliersService(nombre,rfc,domicilio,telefono,correo);
            io.emit('Supplier-Insert','Se inserto el proveedor ',nombre);
        }catch(error){
            console.error('Error al insertar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES
    //---------- OBSERVACIONES

    //---------- OBSERVACIONES
}
//______________INSERT______________
//______________UPDATE______________
export const Suppliers_UPDATE = (socket) => {
    //---------- PROVEEDORES
    socket.on('Supplier-Update',async (idproveedor,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await updateSuppliersService(idproveedor,nombre,rfc,domicilio,telefono,correo);
            io.emit('Supplier-Update','Se actualizo al proveedor ',nombre);
        }catch(error){
            console.error('Error al actualizar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES
    //---------- OBSERVACIONES

    //---------- OBSERVACIONES
}
//______________UPDATE______________