//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB,conexionDB_Cirugias } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
// ---------- CIRUGIAS ✔️
export const getSurgeriesService = async () => {
    try{
        const pool = await conexionDB_Cirugias();
        const result = await pool.request().query('SELECT * FROM CEYE');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las cirujias programadas: ',error.message);
        throw error;
    }
}
// ---------- TIPOS DE CIRUGIAS ✔️
export const getSurgeryTypesService = async () => {
    try{
        const pool = await conexionDB_Cirugias();
        const result = await pool.request().query('SELECT * FROM TiposCirugias');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de cirugias: ',error.message);
        throw error;
    }
}
// ---------- COCINA ✔️
export const getOrderKitchenService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidosCocina');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos de la cocina: ',error.message);
        throw error;
    }
}
export const getCountOrderKitchenService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidoCocinaCantidad');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las cantidades de los pedidos de la cocina: ',error.message);
        throw error;
    }
}
// ---------- ÁREA MÉDICA ✔️
export const getOrderDoctorService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidosAreaMedica');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos del estar médico: ',error.message);
        throw error;
    }
}
export const getOrderDoctorOrderService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidoAreaMedica');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las cantidades de los pedidos del estar médico: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
// ---------- COCINA ✔️
export const insertOrderKitchenService = async (tipoubicacion,ubicacion,encargado,precio,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tipoubicacion',sql.VarChar(50),tipoubicacion)
            .input('ubicacion',sql.VarChar(250),ubicacion)
            .input('encargado',sql.VarChar(150),encargado)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO pedidosCocina (tipoubicacion,ubicacion,encargado,precio,idusuario) VALUES (@tipoubicacion,@ubicacion,@encargado,@precio,@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de cocina insertado...';
        }else{
            return 'No se pudo insertar al pedido de cocina...';
        }
    }catch(error){
        console.error('Error al insertar al pedido de cocina: ',error.message);
        throw error;
    }
}
export const insertCountOrderKitchenDishService = async (cantidad,estado,idplatillo,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidad',sql.Int,cantidad)
            .input('estado',sql.VarChar(50),estado)
            .input('idplatillo',sql.Int,idplatillo)
            .input('idpedido',sql.Int,idpedido)
            .query('INSERT INTO pedidoCocinaCantidad (cantidad,estado,idplatillo,idpedido) VALUES (@cantidad,@estado,@idplatillo,@idpedido)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de cocina insertado...';
        }else{
            return 'No se pudo insertar al pedido de cocina...';
        }
    }catch(error){
        console.error('Error al insertar al pedido de cocina: ',error.message);
        throw error;
    }
}
export const insertCountOrderKitchenSideDishService = async (cantidad,estado,idguarnicion,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidad',sql.Int,cantidad)
            .input('estado',sql.VarChar(50),estado)
            .input('idguarnicion',sql.Int,idguarnicion)
            .input('idpedido',sql.Int,idpedido)
            .query('INSERT INTO pedidoCocinaCantidad (cantidad,estado,idguarnicion,idpedido) VALUES (@cantidad,@estado,@idguarnicion,@idpedido)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de cocina insertado...';
        }else{
            return 'No se pudo insertar al pedido de cocina...';
        }
    }catch(error){
        console.error('Error al insertar al pedido de cocina: ',error.message);
        throw error;
    }
}
export const insertCountOrderKitchenDrinkService = async (cantidad,estado,idbebida,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidad',sql.Int,cantidad)
            .input('estado',sql.VarChar(50),estado)
            .input('idbebida',sql.Int,idbebida)
            .input('idpedido',sql.Int,idpedido)
            .query('INSERT INTO pedidoCocinaCantidad (cantidad,estado,idbebida,idpedido) VALUES (@cantidad,@estado,@idbebida,@idpedido)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de cocina insertado...';
        }else{
            return 'No se pudo insertar al pedido de cocina...';
        }
    }catch(error){
        console.error('Error al insertar al pedido de cocina: ',error.message);
        throw error;
    }
}
// ---------- ÁREA MÉDICA ✔️
export const insertOrderDoctorService = async (sala,cirugia,medico,solicitante,idusuario,precio,idcirugia) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('sala',sql.VarChar(10),sala)
            .input('cirugia',sql.VarChar(100),cirugia)
            .input('medico',sql.VarChar(150),medico)
            .input('solicitante',sql.VarChar(150),solicitante)
            .input('idusuario',sql.Int,idusuario)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idcirugia',sql.Int,idcirugia)
            .query('INSERT INTO pedidosAreaMedica (sala,cirugia,medico,solicitante,idusuario,precio,idcirugia) VALUES (@sala,@cirugia,@medico,@solicitante,@idusuario,@precio,@idcirugia)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de estar médico insertado...';
        }else{
            return 'No se pudo insertar al pedido de estar médico...';
        }
    }catch(error){
        console.error('Error al insertar al pedido de estar médico: ',error.message);
        throw error;
    }
}
export const insertOrderDoctorOrderService = async (estado,comentario,idplatillo,idguarnicion,idbebida,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('estado',sql.VarChar(50),estado)
            .input('comentario',sql.VarChar(100),comentario)
            .input('idplatillo',sql.Int,idplatillo)
            .input('idguarnicion',sql.Int,idguarnicion)
            .input('idbebida',sql.Int,idbebida)
            .input('idpedido',sql.Int,idpedido)
            .query('INSERT INTO pedidoAreaMedica (estado,comentario,idplatillo,idguarnicion,idbebida,idpedido) VALUES (@estado,@comentario,@idplatillo,@idguarnicion,@idbebida,@idpedido)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de estar médico insertado...';
        }else{
            return 'No se pudo insertar al pedido de estar médico...';
        }
    }catch(error){
        console.error('Error al insertar al pedido de estar médico: ',error.message);
        throw error;
    }
}
//______________INSERT______________
//______________UPDATE______________
// ---------- COCINA ✔️
export const updateOrderKitchenPriceService = async (idpedido,precio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('precio',sql.Decimal(12,4),precio)
            .query('UPDATE pedidosCocina SET precio = @precio WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido de cocina actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de cocina...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de cocina: ',error.message);
        throw error;
    }
}
export const updateCountOrderKitchenStateService = async (idpedidoindividual,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('estado',sql.VarChar(50),estado)
            .query('UPDATE pedidoCocinaCantidad SET estado = @estado WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de cocina actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de cocina...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de cocina: ',error.message);
        throw error;
    }
}
// ---------- ÁREA MÉDICA ✔️
export const updateOrderDoctorPriceService = async (idpedido,precio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('precio',sql.Decimal(12,4),precio)
            .query('UPDATE pedidosAreaMedica SET precio = @precio WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido de estar médico actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de estar médico...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de estar médico: ',error.message);
        throw error;
    }
}
export const updateOrderDoctorOrderStateService = async (idpedidoindividual,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('estado',sql.VarChar(50),estado)
            .query('UPDATE pedidoAreaMedica SET estado = @estado WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de estar médico actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de estar médico...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de estar médico: ',error.message);
        throw error;
    }
}
//______________UPDATE______________