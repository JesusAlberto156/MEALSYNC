//____________IMPORT/EXPORT____________
// Consultas de sql
import { getSurgeriesService,getSurgeryTypesService,getOrderKitchenService,getCountOrderKitchenService,getOrderDoctorService,getOrderDoctorOrderService } from "../services/orders.js";
import { insertOrderKitchenService,insertCountOrderKitchenDishService,insertCountOrderKitchenSideDishService,insertCountOrderKitchenDrinkService,insertOrderDoctorService,insertOrderDoctorOrderService } from "../services/orders.js";
import { updateOrderKitchenPriceService,updateCountOrderKitchenStateService,updateOrderDoctorPriceService,updateOrderDoctorOrderStateService } from "../services/orders.js";
// Servidor socket
import { io } from "../../index.js";
// Servicios
import { decryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
export const Orders_GET = (socket) => {
    // ---------- CIRUGIAS ✔️
    socket.on('Get-Surgeries', async () => {
        try {
          const result = await getSurgeriesService();
          console.log('Cirujías obtenidas...');
          io.emit('Get-Surgeries', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- TIPOS DE CIRUGIAS ✔️
    socket.on('Get-Surgery-Types', async () => {
        try {
          const result = await getSurgeryTypesService();
          console.log('Tipos de cirujía obtenidos...');
          io.emit('Get-Surgery-Types', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- COCINA ✔️
    socket.on('Get-Order-Kitchen', async () => {
        try {
          const result = await getOrderKitchenService();
          console.log('Pedidos de cocina obtenidos...');
          io.emit('Get-Order-Kitchen', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    socket.on('Get-Count-Order-Kitchen', async () => {
        try {
          const result = await getCountOrderKitchenService();
          console.log('Cantidades de los pedidos de cocina obtenidas...');
          io.emit('Get-Count-Order-Kitchen', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    // ---------- ÁREA MÉDICA ✔️
    socket.on('Get-Order-Doctor', async () => {
        try {
          const result = await getOrderDoctorService();
          console.log('Pedidos de estar médico obtenidos...');
          io.emit('Get-Order-Doctor', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
    socket.on('Get-Order-Doctor-Order', async () => {
        try {
          const result = await getOrderDoctorOrderService();
          console.log('Pedidos individuales de estar médico obtenidos...');
          io.emit('Get-Order-Doctor-Order', result);
        } catch (error) {
          console.error('Error al obtener los datos: ', error);
        }
    });
}
//______________GET______________
//______________INSERT______________
export const Orders_INSERT = (socket) => {
    // ---------- COCINA ✔️
    socket.on('Insert-Order-Kitchen',async (idusuario,tipoubicacion,ubicacion,encargado,precio,pedidos) => {
        try{
            await insertOrderKitchenService(tipoubicacion,ubicacion,encargado,precio,idusuario);
            const resultOrder = await getOrderKitchenService();
            const decryptedData = decryptData(resultOrder);
            const parsedData = JSON.parse(decryptedData);
            const idpedido = parsedData.find(data => data.tipoubicacion === tipoubicacion && data.ubicacion === ubicacion && data.encargado === encargado && data.precio === precio)?.idpedido;        

            let resultCount;

            if(Array.isArray(pedidos) && pedidos.length > 0){
                for (const pedido of pedidos) {
                    if(pedido.idplatillo !== 0){
                      insertCountOrderKitchenDishService(pedido.cantidad,'En espera',pedido.idplatillo,idpedido);
                    }
                    if(pedido.idbebida !== 0){
                      insertCountOrderKitchenDrinkService(pedido.cantidad,'En espera',pedido.idbebida,idpedido);
                    }
                    if(pedido.idguarnicion !== 0){
                      insertCountOrderKitchenSideDishService(pedido.cantidad,'En espera',pedido.idguarnicion,idpedido);
                    }
                }
                resultCount = await getCountOrderKitchenService();
            }
            
            io.emit('Get-Order-Kitchen',resultOrder);
            if(resultCount !== undefined){
                io.emit('Get-Count-Order-Kitchen',resultCount);
            }
        }catch(error){
            console.error('Error al agregar al pedido: ',error);
            return error;
        }
    });
    // ---------- ÁREA MÉDICA ✔️
    socket.on('Insert-Order-Doctor',async (idusuario,sala,cirugia,medico,solicitante,precio,idcirugia,pedidos) => {
        try{
            await insertOrderDoctorService(sala,cirugia,medico,solicitante,idusuario,precio,idcirugia);
            const resultOrder = await getOrderDoctorService();
            const decryptedData = decryptData(resultOrder);
            const parsedData = JSON.parse(decryptedData);
            const idpedido = parsedData.find(data => data.idcirugia === idcirugia)?.idpedido;        

            let resultO;

            if(Array.isArray(pedidos) && pedidos.length > 0){
                for (const pedido of pedidos) {
                    insertOrderDoctorOrderService('En espera',pedido.comentario,pedido.idplatillo,pedido.idguarnicion,pedido.idbebida,idpedido)
                }
                resultO = await getOrderDoctorOrderService();
            }
            
            io.emit('Get-Order-Doctor',resultOrder);
            if(resultO !== undefined){
                io.emit('Get-Order-Doctor-Order',resultO);
            }
        }catch(error){
            console.error('Error al agregar al pedido: ',error);
            return error;
        }
    });
}
//______________INSERT______________
//______________UPDATE______________
export const Orders_UPDATE = (socket) => {

}
//______________UPDATE______________