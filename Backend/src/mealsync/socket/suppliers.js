//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliersService,getObservationsService,getDeletedSuppliersService } from "../services/suppliers.js";
import { insertSupplierService,insertObservationService,insertDeletedSupplierService } from "../services/suppliers.js";
import { updateSupplierService } from "../services/suppliers.js";
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
};
//______________GET______________
//______________INSERT______________
export const Suppliers_INSERT = (socket) => {
    //---------- PROVEEDORES
    socket.on('Insert-Supplier',async (usuario,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await insertSupplierService(nombre,rfc,domicilio,telefono,correo);
            io.emit('Insert-Supplier',`${usuario} agregó al proveedor `,nombre);
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
            io.emit('Insert-Observation',`${usuario} agregó una observación al proveedor `,proveedor);
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
            io.emit('Insert-Deleted-Supplier',`${usuario} eliminó al proveedor `,proveedor);
        }catch(error){
            console.error('Error al eliminar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES ELIMINADOS
}
//______________INSERT______________
//______________UPDATE______________
export const Suppliers_UPDATE = (socket) => {
    //---------- PROVEEDORES
    socket.on('Update-Supplier',async (usuario,idproveedor,nombre,rfc,domicilio,telefono,correo) => {
        try{
            await updateSupplierService(idproveedor,nombre,rfc,domicilio,telefono,correo);
            io.emit('Update-Supplier',`${usuario} editó al proveedor `,nombre);
        }catch(error){
            console.error('Error al editar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES
}
//______________UPDATE______________
//______________DELETE______________
export const Suppliers_DELETE = (socket) => {
    //---------- PROVEEDORES ELIMINADOS
    socket.on('Delete-Deleted-Supplier',async (usuario,proveedor,idproveedor) => {
        try{
            await deleteDeletedSupplierService(idproveedor);
            io.emit('Delete-Deleted-Supplier',`${usuario} recuperó al proveedor `,proveedor);
        }catch(error){
            console.error('Error al recuperar: ',error);
            return error;
        }
    });
    //---------- PROVEEDORES ELIMINADOS
}
//______________DELETE______________