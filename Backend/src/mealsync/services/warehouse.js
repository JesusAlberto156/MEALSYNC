//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- PEDIDOS DE INSUMO ✔️
export const getSupplyOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos por insumo: ',error.message);
        throw error;
    }
}
//---------- OBSERVACIONES DE LOS PEDIDOS DE LOS INSUMOS ✔️
export const getSupplyOrderObservationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM observacionesPedidoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las observaciones de los pedidos por insumo: ',error.message);
        throw error;
    }
}
//---------- PEDIDOS DE INSUMO ELIMINADOS ✔️
export const getDeletedSupplyOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidoInsumoEliminado');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos por insumo eliminados: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE CATEGORIAS ✔️
export const getWarehouseCategoriesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenCategorias');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por categorías: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE TIPOS DE INSUMO ✔️
export const getWarehouseSupplyTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenTipoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por tipos de insumo: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
//---------- PEDIDOS DE INSUMO ✔️
export const insertSupplyOrderService = async (numeropedido,fecha,cantidad,preciounitario,preciototal,estado,idunsumo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('numeropedido',sql.VarChar(10),numeropedido)
            .input('fecha',sql.DateTime,fecha)
            .input('cantidad',sql.Int,cantidad)
            .input('preciounitario',sql.Decimal(10,4),preciounitario)
            .input('preciototal',sql.Decimal(12,4),preciototal)
            .input('estado',sql.VarChar(20),estado)
            .input('idunsumo',sql.Int,idunsumo)
            .query('INSERT INTO pedidoInsumo (numeropedido,fecha,cantidad,preciounitario,preciototal,estado,idunsumo) VALUES (@numeropedido,@fecha,@cantidad,@preciounitario,@preciototal,@estado,@idunsumo)');

        if(result.rowsAffected[0]>0){
            return 'Pedido por insumo insertado...';
        }else{
            return 'No se pudo insertar al pedido por insumo...';
        }
    }catch(error){
        console.error('Error al insertar al pedido por insumo: ',error.message);
        throw error;
    }
}
export const insertLogSupplyOrderService = async (idpedido,idusuario,numeropedido,fecha,cantidad,preciounitario,preciototal,estado,idunsumo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos por Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idpedido)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),numeropedido)
            .input('campo3',sql.VarChar(500),fecha)
            .input('campo4',sql.VarChar(500),cantidad)
            .input('campo5',sql.VarChar(500),preciounitario)
            .input('campo6',sql.VarChar(500),preciototal)
            .input('campo7',sql.VarChar(500),estado)
            .input('campo8',sql.VarChar(500),idunsumo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6,campo7,campo8) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7,@campo8)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- OBSERVACIONES DE LOS PEDIDOS DE LOS INSUMOS ✔️
export const insertSupplyOrderObservationService = async (numeropedido,fecha,observacion,categoria,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('numeropedido',sql.VarChar(10),numeropedido)
            .input('fecha',sql.DateTime,fecha)
            .input('observacion',sql.VarChar(250),observacion)
            .input('categoria',sql.VarChar(50),categoria)
            .input('idpedido',sql.Int,idpedido)
            .query('INSERT INTO pedidoInsumo (numeropedido,fecha,observacion,categoria,idpedido) VALUES (@numeropedido,@fecha,@observacion,@categoria,@idpedido)');

        if(result.rowsAffected[0]>0){
            return 'Observación al pedido por insumo insertada...';
        }else{
            return 'No se pudo insertar la observación al pedido por insumo...';
        }
    }catch(error){
        console.error('Error al insertar la observación al pedido por insumo: ',error.message);
        throw error;
    }
}
export const insertLogSupplyOrderObservationService = async (idobservacion,idusuario,numeropedido,fecha,observacion,categoria,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Observaciones de los Pedidos por Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idobservacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),numeropedido)
            .input('campo3',sql.VarChar(500),fecha)
            .input('campo4',sql.VarChar(500),observacion)
            .input('campo5',sql.VarChar(500),categoria)
            .input('campo6',sql.VarChar(500),idpedido)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- PEDIDOS DE INSUMO ELIMINADOS ✔️
export const insertDeletedSupplyOrderService = async (idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .query('INSERT INTO pedidoInsumoEliminado (idpedido) VALUES (@idpedido)');

        if(result.rowsAffected[0]>0){
            return 'Pedido por insumo Eliminado...';
        }else{
            return 'No se pudo eliminar al pedido por insumo...';
        }
    }catch(error){
        console.error('Error al eliminar al pedido por insumo: ',error.message);
        throw error;
    }
}
export const insertLogDeletedSupplyOrderService = async (ideliminado,idusuario,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos por Insumo Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idpedido)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE CATEGORIAS

//---------- ALMACEN DE TIPOS DE INSUMO

//______________INSERT______________
//______________UPDATE______________

//______________UPDATE______________
//______________DELETE______________

//______________DELETE______________