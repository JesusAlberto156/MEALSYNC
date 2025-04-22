//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSuppliersService,getObservationsService } from "../services/suppliers.js";
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
          io.emit('suppliers', result);
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
          io.emit('observations', result);
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

    //---------- PROVEEDORES
    //---------- OBSERVACIONES

    //---------- OBSERVACIONES
}
//______________INSERT______________
//______________UPDATE______________
export const Suppliers_UPDATE = (socket) => {
    //---------- PROVEEDORES

    //---------- PROVEEDORES
    //---------- OBSERVACIONES

    //---------- OBSERVACIONES
}
//______________UPDATE______________