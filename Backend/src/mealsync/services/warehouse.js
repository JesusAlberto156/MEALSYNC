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
            return 'Pedido por insumo eliminado...';
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
//---------- ALMACEN DE CATEGORIAS ✔️
export const insertWarehouseCategoryService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .query('INSERT INTO almacenCategorias (cantidad,cantidadreal,preciocompra,precioventa,precioreal,idcategoria) VALUES (0,0,0,0,0,@idcategoria)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de la categoría insertado...';
        }else{
            return 'No se pudo insertar el almacén de la categoría...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de la categoría: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCategoryService = async (idalmacen,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Categorias')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),'0')
            .input('campo5',sql.VarChar(500),'0')
            .input('campo6',sql.VarChar(500),'0')
            .input('campo7',sql.VarChar(500),idcategoria)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6,campo7) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7)');

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
//---------- ALMACEN DE TIPOS DE INSUMO ✔️
export const insertWarehouseSupplyTypeService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .query('INSERT INTO almacenTipoInsumo (cantidad,precio,idtipo) VALUES (0,0,@idtipo)');

        if(result.rowsAffected[0]>0){
            return 'Almacén del tipo de insumo insertado...';
        }else{
            return 'No se pudo insertar el almacén del tipo de insumo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén del tipo de insumo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseSupplyTypeService = async (idalmacen,idusuario,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idtipo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4)');

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
//______________INSERT______________
//______________UPDATE______________
//---------- PEDIDOS DE INSUMO ✔️
export const updateSupplyOrderService = async (idpedido,cantidad,preciounitario,preciototal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('cantidad',sql.Int,cantidad)
            .input('preciounitario',sql.Decimal(10,4),preciounitario)
            .input('preciototal',sql.Decimal(12,4),preciototal)
            .query('UPDATE pedidoInsumo SET cantidad = @cantidad, preciounitario = @preciounitario, preciototal = @preciototal WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido por insumo actualizado...';
        }else{
            return 'No se pudo actualizar al pedido por insumo...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido por insumo: ',error.message);
        throw error;
    }
}
export const updateLogSupplyOrderService = async (idpedido,idusuario,cantidad,preciounitario,preciototal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos por Insumo')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedido)
            .input('idusuario',sql.Int,idusuario)
            .input('campo4',sql.VarChar(500),cantidad)
            .input('campo5',sql.VarChar(500),preciounitario)
            .input('campo6',sql.VarChar(500),preciototal)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo4,campo5,campo6) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo4,@campo5,@campo6)');

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
export const updateSupplyOrderStateService = async (idpedido,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('estado',sql.VarChar(20),estado)
            .query('UPDATE pedidoInsumo SET estado = @estado WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Estado del pedido por insumo actualizado...';
        }else{
            return 'No se pudo actualizar al estado del pedido por insumo...';
        }
    }catch(error){
        console.error('Error al actualizar al estado del pedido por insumo: ',error.message);
        throw error;
    }
}
export const updateLogSupplyOrderStateService = async (idpedido,idusuario,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos por Insumo')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedido)
            .input('idusuario',sql.Int,idusuario)
            .input('campo7',sql.VarChar(500),estado)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo7) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo7)');

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
//---------- ALMACEN DE CATEGORIAS ✔️
export const updateWarehouseCategoryService = async (idcategoria,cantidad,cantidadreal,preciocompra,precioventa,precioreal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .input('cantidad',sql.Int,cantidad)
            .input('cantidadreal',sql.Decimal(10,4),cantidadreal)
            .input('preciocompra',sql.Decimal(12,4),preciocompra)
            .input('precioventa',sql.Decimal(12,4),precioventa)
            .input('precioreal',sql.Decimal(12,4),precioreal)
            .query('UPDATE almacenCategorias SET cantidad = @cantidad, cantidadreal = @cantidadreal, preciocompra = @preciocompra, precioventa = @precioventa, precioreal = @precioreal WHERE idcategoria = @idcategoria');

        if(result.rowsAffected[0]>0){
            return 'Almacén de la categoría actualizado...';
        }else{
            return 'No se pudo actualizar el almacén de la categoría...';
        }
    }catch(error){
        console.error('Error al actualizar el almacén de la categoría: ',error.message);
        throw error;
    }
}
export const updateLogWarehouseCategoryService = async (idalmacen,idusuario,cantidad,cantidadreal,preciocompra,precioventa,precioreal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Categorias')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidad)
            .input('campo3',sql.VarChar(500),cantidadreal)
            .input('campo4',sql.VarChar(500),preciocompra)
            .input('campo5',sql.VarChar(500),precioventa)
            .input('campo6',sql.VarChar(500),precioreal)
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
//---------- ALMACEN DE TIPOS DE INSUMO ✔️
export const updateWarehouseSupplyTypeService = async (idtipo,cantidad,precio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .input('precio',sql.Decimal(12,4),precio)
            .query('UPDATE almacenTipoInsumo SET cantidad = @cantidad, precio = @precio WHERE idtipo = @idtipo)');

        if(result.rowsAffected[0]>0){
            return 'Almacén del tipo de insumo actualizado...';
        }else{
            return 'No se pudo actualizar el almacén del tipo de insumo...';
        }
    }catch(error){
        console.error('Error al actualizar el almacén del tipo de insumo: ',error.message);
        throw error;
    }
}
export const updateLogWarehouseSupplyTypeService = async (idalmacen,idusuario,cantidad,precio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidad)
            .input('campo3',sql.VarChar(500),precio)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3)');

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
//______________UPDATE______________
//______________DELETE______________
//---------- PEDIDOS DE INSUMO ELIMINADOS ✔️
export const deleteDeletedSupplyOrderService = async (idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .query('DELETE FROM pedidoInsumoEliminado WHERE idpedido VALUES @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido por insumo recuperado...';
        }else{
            return 'No se pudo recuperar al pedido por insumo...';
        }
    }catch(error){
        console.error('Error al recuperar al pedido por insumo: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedSupplyOrderService = async (ideliminado,idusuario,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos por Insumo Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
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
//______________DELETE______________