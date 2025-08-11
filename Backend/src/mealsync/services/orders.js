//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB,conexionDB_Medicos,conexionDB_Cirugias } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
// ---------- MÉDICOS ✔️
export const getDoctorsService = async () => {
    try{
        const pool = await conexionDB_Medicos();
        const result = await pool.request().query('SELECT * FROM Medicos_Credencializados');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los médicos credencializados: ',error.message);
        throw error;
    }
}
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

//______________UPDATE______________