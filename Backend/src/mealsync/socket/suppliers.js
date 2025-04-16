import { getSuppliersAllService,getObservationsAllService } from "../services/suppliers.service.js";
import { io } from "../../index.js";

export const suppliers = (socket) => {
    socket.on('suppliers', async () => {
        try {
          const result = await getSuppliersAllService();
          console.log('Proveedores obtenidos...');
          io.emit('suppliers', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    socket.on('observations', async () => {
        try {
          const result = await getObservationsAllService();
          console.log('Observaciones de proveedores obtenidos...');
          io.emit('observations', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
};