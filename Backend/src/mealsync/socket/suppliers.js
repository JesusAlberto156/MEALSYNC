//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliersService,getObservationsService,getDeletedSuppliersService } from "../services/suppliers.js";
import { insertSupplierService,insertDeletedSupplierService } from "../services/suppliers.js";
import { updateSupplierService } from "../services/suppliers.js";
import { deleteDeletedSupplierService } from "../services/suppliers.js";
import { getLogsService } from "../services/logs.js";
import { insertLogSupplierService,insertLogDeletedSupplierService } from "../services/suppliers.js";
import { updateLogSupplierService } from "../services/suppliers.js";
import { deleteLogDeletedSupplierService } from "../services/suppliers.js";
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
}
//______________DELETE______________