//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
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
//---------- ALMACEN DE LIMPIEZA ✔️
export const getWarehouseCleaningService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenLimpieza');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por limpieza: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE TIPOS DE LIMPIEZA ✔️
export const getWarehouseCleaningTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenTipoLimpieza');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por tipos de limpieza: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE GASTOS FIJOS ✔️
export const getWarehouseFixedExpensesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenGastosFijos');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por gastos fijos: ',error.message);
        throw error;
    }
}
//---------- PEDIDOS ✔️
export const getOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidos');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos del almacén: ',error.message);
        throw error;
    }
}
//---------- PEDIDOS ELIMINADOS ✔️
export const getDeletedOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidosEliminados');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos del almacén eliminados: ',error.message);
        throw error;
    }
}
//---------- PEDIDOS DE INSUMOS ✔️
export const getSupplyOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos de insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
export const getCleaningSupplyOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM pedidoSuministro');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los pedidos de suministro del almacén: ',error.message);
        throw error;
    }
}
//---------- MENSAJES PEDIDOS DE INSUMOS ✔️
export const getMessageSupplyOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM mensajesPedidoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los mensajes de pedidos de insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- MENSAJES PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
export const getMessageCleaningSupplyOrdersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM mensajesPedidoSuministro');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los mensajes de pedidos de suministro del almacén: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
//---------- ALMACEN DE CATEGORIAS ✔️
export const insertWarehouseCategoryStartService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenCategorias (cantidadreal,precio,idcategoria,transaccion) VALUES (0,0,@idcategoria,@transaccion)');

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
export const insertLogWarehouseCategoryStartService = async (idalmacen,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Categorias')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),'Inicial')
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
export const insertWarehouseCategoryService = async (cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenCategorias (cantidadreal,precio,idcategoria,transaccion) VALUES (@cantidadreal,@precio,@idcategoria,@transaccion)');

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
export const insertLogWarehouseCategoryService = async (idalmacen,idusuario,cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Categorias')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),transaccion)
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
export const insertWarehouseCategoryDateService = async (cantidadreal,precio,fecha,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('fecha',sql.DateTime,fecha)
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenCategorias (cantidadreal,precio,fecha,idcategoria,transaccion) VALUES (@cantidadreal,@precio,@fecha,@idcategoria,@transaccion)');

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
export const insertLogWarehouseCategoryDateService = async (idalmacen,idusuario,cantidadreal,precio,fecha,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Categorias')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),fecha)
            .input('campo6',sql.VarChar(500),transaccion)
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
export const insertWarehouseSupplyTypeStartService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenTipoInsumo (cantidadreal,precio,idtipo,transaccion) VALUES (0,0,@idtipo,@transaccion)');

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
export const insertLogWarehouseSupplyTypeStartService = async (idalmacen,idusuario,idtipo) => {
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
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),'Inicial')
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
export const insertWarehouseSupplyTypeService = async (cantidadreal,precio,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenTipoInsumo (cantidadreal,precio,idtipo,transaccion) VALUES (@cantidadreal,@precio,@idtipo,@transaccion)');

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
export const insertLogWarehouseSupplyTypeService = async (idalmacen,idusuario,cantidadreal,precio,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idtipo)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),transaccion)
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
export const insertWarehouseSupplyTypeDateService = async (cantidadreal,precio,fecha,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('fecha',sql.DateTime,fecha)
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenTipoInsumo (cantidadreal,precio,fecha,idtipo,transaccion) VALUES (@cantidadreal,@precio,@fecha,@idtipo,@transaccion)');

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
export const insertLogWarehouseSupplyTypeDateService = async (idalmacen,idusuario,cantidadreal,precio,fecha,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idtipo)
            .input('campo5',sql.VarChar(500),fecha)
            .input('campo6',sql.VarChar(500),transaccion)
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
//---------- ALMACEN DE LIMPIEZA ✔️
export const insertWarehouseCleaningStartService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenLimpieza (cantidadreal,precio,idcategoria,transaccion) VALUES (0,0,@idcategoria,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningStartService = async (idalmacen,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),'Inicial')
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
export const insertWarehouseCleaningService = async (cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenLimpieza (cantidadreal,precio,idcategoria,transaccion) VALUES (@cantidadreal,@precio,@idcategoria,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningService = async (idalmacen,idusuario,cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),transaccion)
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
export const insertWarehouseCleaningDateService = async (cantidadreal,precio,fecha,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('fecha',sql.DateTime,fecha)
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenLimpieza (cantidadreal,precio,fecha,idcategoria,transaccion) VALUES (@cantidadreal,@precio,@fecha,@idcategoria,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningDateService = async (idalmacen,idusuario,cantidadreal,precio,fecha,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),fecha)
            .input('campo6',sql.VarChar(500),transaccion)
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
//---------- ALMACEN DE TIPOS DE LIMPIEZA ✔️
export const insertWarehouseCleaningTypeStartService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenTipoLimpieza (cantidadreal,precio,idtipo,transaccion) VALUES (0,0,@idtipo,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de tipo de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de tipo de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de tipo de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningTypeStartService = async (idalmacen,idusuario,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idtipo)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),'Inicial')
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
export const insertWarehouseCleaningTypeService = async (cantidadreal,precio,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenTipoLimpieza (cantidadreal,precio,idtipo,transaccion) VALUES (@cantidadreal,@precio,@idtipo,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de tipo de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de tipo de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de tipo de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningTypeService = async (idalmacen,idusuario,cantidadreal,precio,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idtipo)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),transaccion)
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
export const insertWarehouseCleaningTypeDateService = async (cantidadreal,precio,fecha,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('fecha',sql.DateTime,fecha)
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenTipoLimpieza (cantidadreal,precio,fecha,idtipo,transaccion) VALUES (@cantidadreal,@precio,@fecha,@idtipo,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de tipo de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de tipo de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de tipo de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningTypeDateService = async (idalmacen,idusuario,cantidadreal,precio,fecha,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idtipo)
            .input('campo5',sql.VarChar(500),fecha)
            .input('campo6',sql.VarChar(500),transaccion)
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
//---------- ALMACEN DE GASTOS FIJOS ✔️
export const insertWarehouseFixedExpenseStartService = async (idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idgasto',sql.Int,idgasto)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenGastosFijos (precio,idgasto,transaccion) VALUES (0,@idgasto,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de gasto fijo insertado...';
        }else{
            return 'No se pudo insertar el almacén de gasto fijo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de gasto fijo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseFixedExpenseStartService = async (idalmacen,idusuario,idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Gastos Fijos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),idgasto)
            .input('campo4',sql.VarChar(500),new Date().toISOString())
            .input('campo5',sql.VarChar(500),'Inicial')
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5)');

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
export const insertWarehouseFixedExpenseService = async (precio,idgasto,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('precio',sql.Decimal(10,4),precio)
            .input('idgasto',sql.Int,idgasto)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenGastosFijos (precio,idgasto,transaccion) VALUES (@precio,@idgasto,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de gasto fijo insertado...';
        }else{
            return 'No se pudo insertar el almacén de gasto fijo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de gasto fijo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseFixedExpenseService = async (idalmacen,idusuario,precio,idgasto,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Gastos Fijos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),precio)
            .input('campo3',sql.VarChar(500),idgasto)
            .input('campo4',sql.VarChar(500),new Date().toISOString())
            .input('campo5',sql.VarChar(500),transaccion)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5)');

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
export const insertWarehouseFixedExpenseDateService = async (precio,fecha,idgasto,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('precio',sql.Decimal(10,4),precio)
            .input('fecha',sql.DateTime,fecha)
            .input('idgasto',sql.Int,idgasto)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenGastosFijos (precio,fecha,idgasto,transaccion) VALUES (@precio,@fecha,@idgasto,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de gasto fijo insertado...';
        }else{
            return 'No se pudo insertar el almacén de gasto fijo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de gasto fijo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseFixedExpenseDateService = async (idalmacen,idusuario,precio,fecha,idgasto,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Gastos Fijos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),precio)
            .input('campo3',sql.VarChar(500),idgasto)
            .input('campo4',sql.VarChar(500),fecha)
            .input('campo5',sql.VarChar(500),transaccion)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5)');

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
//---------- PEDIDOS ✔️
export const insertOrderService = async (idpedido,campus,idproveedor,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('campus',sql.VarChar(50),campus)
            .input('estado',sql.VarChar(30),'Solicitud')
            .input('idproveedor',sql.Int,idproveedor)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO pedidos (idpedido,campus,estado,idproveedor,idusuario) VALUES (@idpedido,@campus,@estado,@idproveedor,@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de almacén insertado...'
        }else{
            return 'No se pudo insertar el pedido de almacén...';
        }
    }catch(error){
        console.error('Error al insertar el pedido de almacén: ',error.message);
        throw error;
    }
}
export const insertLogOrderService = async (idpedido,usuario,campus,idproveedor,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Almacen')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idpedido)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),new Date().toISOString())
            .input('campo3',sql.VarChar(500),campus)
            .input('campo5',sql.VarChar(500),'Solicitud')
            .input('campo6',sql.VarChar(500),idproveedor)
            .input('campo7',sql.VarChar(500),idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo5,campo6,campo7) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo5,@campo6,@campo7)');

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
//---------- PEDIDOS ELIMINADOS ✔️
export const insertDeletedOrderService = async (idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .query('INSERT INTO pedidosEliminados (idpedido) VALUES (@idpedido)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de almacén eliminado...';
        }else{
            return 'No se pudo eliminar al pedido de almacén...';
        }
    }catch(error){
        console.error('Error al eliminar al pedido de almacén: ',error.message);
        throw error;
    }
}
export const insertLogDeletedOrderService = async (ideliminado,idusuario,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Almacen Eliminados')
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
//---------- PEDIDOS DE INSUMOS ✔️
export const insertSupplyOrderService = async (idinsumo,cantidad,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idinsumo',sql.Int,idinsumo)
            .input('cantidad',sql.Int,cantidad)
            .input('idpedido',sql.Int,idpedido)
            .input('estado',sql.VarChar(20),'En espera')
            .query('INSERT INTO pedidoInsumo (idinsumo,cantidad,idpedido,estado) VALUES (@idinsumo,@cantidad,@idpedido,@estado)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de insumo del almacén insertado...'
        }else{
            return 'No se pudo insertar el pedido de insumo del almacén...';
        }
    }catch(error){
        console.error('Error al insertar el pedido de insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
export const insertCleaningSupplyOrderService = async (idsuministro,cantidad,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idsuministro',sql.Int,idsuministro)
            .input('cantidad',sql.Int,cantidad)
            .input('idpedido',sql.Int,idpedido)
            .input('estado',sql.VarChar(20),'En espera')
            .query('INSERT INTO pedidoSuministro (idsuministro,cantidad,idpedido,estado) VALUES (@idsuministro,@cantidad,@idpedido,@estado)');

        if(result.rowsAffected[0]>0){
            return 'Pedido de suministro del alamcén insertado...'
        }else{
            return 'No se pudo insertar el pedido de suministro del almacén...';
        }
    }catch(error){
        console.error('Error al insertar el pedido de suministro del almacén: ',error.message);
        throw error;
    }
}
//---------- MENSAJES PEDIDOS DE INSUMOS ✔️
export const insertMessageSupplyOrderService = async (mensaje,idpedidoindividual,tipo,estado,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('mensaje',sql.VarChar(500),mensaje)
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('tipo',sql.VarChar(20),tipo)
            .input('estado',sql.VarChar(20),estado)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO mensajesPedidoInsumo (mensaje,idpedidoindividual,tipo,estado,idusuario) VALUES (@mensaje,@idpedidoindividual,@tipo,@estado,@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Mensaje de pedido de insumo del alamcén insertado...'
        }else{
            return 'No se pudo insertar el mensaje de pedido de insumo del almacén...';
        }
    }catch(error){
        console.error('Error al insertar el mensaje de pedido de insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- MENSAJES PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
export const insertMessageCleaningSupplyOrderService = async (mensaje,idpedidoindividual,tipo,estado,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('mensaje',sql.VarChar(500),mensaje)
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('tipo',sql.VarChar(20),tipo)
            .input('estado',sql.VarChar(20),estado)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO mensajesPedidoSuministro (mensaje,idpedidoindividual,tipo,estado,idusuario) VALUES (@mensaje,@idpedidoindividual,@tipo,@estado,@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Mensaje de pedido de suministro del alamcén insertado...'
        }else{
            return 'No se pudo insertar el mensaje de pedido de suministro del almacén...';
        }
    }catch(error){
        console.error('Error al insertar el mensaje de pedido de suministro del almacén: ',error.message);
        throw error;
    }
}
//______________INSERT______________
//______________UPDATE______________
//---------- PEDIDOS ✔️
export const updateOrderService = async (idpedido,idpedidonuevo,campus,idproveedor,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('idpedidonuevo',sql.Int,idpedidonuevo)
            .input('campus',sql.VarChar(50),campus)
            .input('idproveedor',sql.Int,idproveedor)
            .input('idusuario',sql.Int,idusuario)
            .query('UPDATE pedidos SET idpedido = @idpedidonuevo, campus = @campus, idproveedor = @idproveedor, idusuario = @idusuario WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido de almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de almacén: ',error.message);
        throw error;
    }
}
export const updateLogOrderService = async (idpedido,usuario,idpedidonuevo,campus,idproveedor,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedido)
            .input('idusuario',sql.Int,usuario)
            .input('campo3',sql.VarChar(500),campus)
            .input('campo6',sql.VarChar(500),idproveedor)
            .input('campo7',sql.VarChar(500),idusuario)
            .input('campo8',sql.VarChar(500),idpedidonuevo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo3,campo6,campo7,campo8) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo3,@campo6,@campo7,@campo8)');

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
export const updateOrderStateService = async (idpedido,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('estado',sql.VarChar(20),estado)
            .query('UPDATE pedidos SET estado = @estado WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido de almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de almacén: ',error.message);
        throw error;
    }
}
export const updateLogOrderStateService = async (idpedido,idusuario,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedido)
            .input('idusuario',sql.Int,idusuario)
            .input('campo5',sql.VarChar(500),estado)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo5)');

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
export const updateOrderPriceService = async (idpedido,precio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .input('precio',sql.Decimal(12,4),precio)
            .query('UPDATE pedidos SET precio = @precio WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido de almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de almacén: ',error.message);
        throw error;
    }
}
export const updateLogOrderPriceService = async (idpedido,idusuario,precio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedido)
            .input('idusuario',sql.Int,idusuario)
            .input('campo4',sql.VarChar(500),precio)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo4) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo4)');

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
//---------- PEDIDOS DE INSUMOS ✔️
export const updateSupplyOrderStateService = async (idpedidoindividual,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('estado',sql.VarChar(20),estado)
            .query('UPDATE pedidoInsumo SET estado = @estado WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de insumo del almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de insumo del almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de insumo del almacén: ',error.message);
        throw error;
    }
}
export const updateLogSupplyOrderStateService = async (idpedidoindividual,idusuario,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Insumo del Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .input('campo8',sql.VarChar(500),estado)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo8) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo8)');

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
export const updateSupplyOrderCountService = async (idpedidoindividual,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('cantidad',sql.Int,cantidad)
            .query('UPDATE pedidoInsumo SET cantidad = @cantidad WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de insumo del almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de insumo del almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de insumo del almacén: ',error.message);
        throw error;
    }
}
export const updateLogSupplyOrderCountService = async (idpedidoindividual,idusuario,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Insumo del Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .input('campo4',sql.VarChar(500),cantidad)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo4) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo4)');

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
export const updateSupplyOrderPriceService = async (idpedidoindividual,preciounitario,preciototal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('preciounitario',sql.Decimal(10,4),preciounitario)
            .input('preciototal',sql.Decimal(12,4),preciototal)
            .query('UPDATE pedidoInsumo SET preciounitario = @preciounitario, preciototal = @preciototal WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de insumo del almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de insumo del almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de insumo del almacén: ',error.message);
        throw error;
    }
}
export const updateLogSupplyOrderPriceService = async (idpedidoindividual,idusuario,preciounitario,preciototal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Insumo del Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .input('campo5',sql.VarChar(500),preciounitario)
            .input('campo6',sql.VarChar(500),preciototal)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo5,campo6) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo5,@campo6)');

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
//---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
export const updateCleaningSupplyOrderStateService = async (idpedidoindividual,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('estado',sql.VarChar(20),estado)
            .query('UPDATE pedidoSuministro SET estado = @estado WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de suministro del almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de suministro del almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de suministro del almacén: ',error.message);
        throw error;
    }
}
export const updateLogCleaningSupplyOrderStateService = async (idpedidoindividual,idusuario,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Suministro del Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .input('campo8',sql.VarChar(500),estado)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo8) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo8)');

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
export const updateCleaningSupplyOrderCountService = async (idpedidoindividual,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('cantidad',sql.Int,cantidad)
            .query('UPDATE pedidoSuministro SET cantidad = @cantidad WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de suministro del almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de suministro del almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de suministro del almacén: ',error.message);
        throw error;
    }
}
export const updateLogCleaningSupplyOrderCountService = async (idpedidoindividual,idusuario,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Suministro del Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .input('campo4',sql.VarChar(500),cantidad)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo4) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo4)');

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
export const updateCleaningSupplyOrderPriceService = async (idpedidoindividual,preciounitario,preciototal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .input('preciounitario',sql.Decimal(10,4),preciounitario)
            .input('preciototal',sql.Decimal(12,4),preciototal)
            .query('UPDATE pedidoSuministro SET preciounitario = @preciounitario, preciototal = @preciototal WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de suministro del almacén actualizado...';
        }else{
            return 'No se pudo actualizar al pedido de suministro del almacén...';
        }
    }catch(error){
        console.error('Error al actualizar al pedido de suministro del almacén: ',error.message);
        throw error;
    }
}
export const updateLogCleaningSupplyOrderPriceService = async (idpedidoindividual,idusuario,preciounitario,preciototal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Suministro del Almacen')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .input('campo5',sql.VarChar(500),preciounitario)
            .input('campo6',sql.VarChar(500),preciototal)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo5,campo6) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo5,@campo6)');

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
//---------- MENSAJES PEDIDOS DE INSUMOS ✔️
export const updateMessageSupplyOrderService = async (idmensaje,mensaje,estado,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idmensaje',sql.Int,idmensaje)
            .input('mensaje',sql.VarChar(500),mensaje)
            .input('estado',sql.VarChar(20),estado)
            .input('idusuario',sql.Int,idusuario)
            .query('UPDATE mensajesPedidoInsumo SET mensaje = @mensaje, estado = @estado, idusuario = @idusuario WHERE idmensaje = @idmensaje');

        if(result.rowsAffected[0]>0){
            return 'Mensaje de pedido de insumo del alamcén actualizado...';
        }else{
            return 'No se pudo actualizar al mensaje de pedido de insumo del alamcén...';
        }
    }catch(error){
        console.error('Error al actualizar al mensaje de pedido de insumo del alamcén: ',error.message);
        throw error;
    }
}
export const updateMessageSupplyOrderStateService = async (idmensaje,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idmensaje',sql.Int,idmensaje)
            .input('estado',sql.VarChar(20),estado)
            .query('UPDATE mensajesPedidoInsumo SET estado = @estado WHERE idmensaje = @idmensaje');

        if(result.rowsAffected[0]>0){
            return 'Mensaje de pedido de insumo del alamcén actualizado...';
        }else{
            return 'No se pudo actualizar al mensaje de pedido de insumo del alamcén...';
        }
    }catch(error){
        console.error('Error al actualizar al mensaje de pedido de insumo del alamcén: ',error.message);
        throw error;
    }
}
//---------- MENSAJES PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
export const updateMessageCleaningSupplyOrderService = async (idmensaje,mensaje,estado,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idmensaje',sql.Int,idmensaje)
            .input('mensaje',sql.VarChar(500),mensaje)
            .input('estado',sql.VarChar(20),estado)
            .input('idusuario',sql.Int,idusuario)
            .query('UPDATE mensajesPedidoSuministro SET mensaje = @mensaje, estado = @estado, idusuario = @idusuario WHERE idmensaje = @idmensaje');

        if(result.rowsAffected[0]>0){
            return 'Mensaje de pedido de suministro del alamcén actualizado...';
        }else{
            return 'No se pudo actualizar al mensaje de pedido de suministro del alamcén...';
        }
    }catch(error){
        console.error('Error al actualizar al mensaje de pedido de suministro del alamcén: ',error.message);
        throw error;
    }
}
export const updateMessageCleaningSupplyOrderStateService = async (idmensaje,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idmensaje',sql.Int,idmensaje)
            .input('estado',sql.VarChar(20),estado)
            .query('UPDATE mensajesPedidoSuministro SET estado = @estado WHERE idmensaje = @idmensaje');

        if(result.rowsAffected[0]>0){
            return 'Mensaje de pedido de suministro del alamcén actualizado...';
        }else{
            return 'No se pudo actualizar al mensaje de pedido de suministro del alamcén...';
        }
    }catch(error){
        console.error('Error al actualizar al mensaje de pedido de suministro del alamcén: ',error.message);
        throw error;
    }
}
//______________UPDATE______________
//______________DELETE______________
//---------- PEDIDOS ELIMINADOS ✔️
export const deleteDeletedOrderService = async (idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedido',sql.Int,idpedido)
            .query('DELETE FROM pedidosEliminados WHERE idpedido = @idpedido');

        if(result.rowsAffected[0]>0){
            return 'Pedido de almacén recuperado...';
        }else{
            return 'No se pudo recuperar al pedido de almacén...';
        }
    }catch(error){
        console.error('Error al recuperar al pedido de almacén: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedOrderService = async (ideliminado,idusuario,idpedido) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Almacen Eliminados')
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
//---------- PEDIDOS DE INSUMOS ✔️
export const deleteSupplyOrderService = async (idpedidoindividual) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .query('DELETE FROM pedidoInsumo WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de insumo del almacén eliminado...';
        }else{
            return 'No se pudo eliminar al pedido de insumo del almacén...';
        }
    }catch(error){
        console.error('Error al eliminar al pedido de insumo del almacén: ',error.message);
        throw error;
    }
}
export const deleteLogSupplyOrderService = async (idpedidoindividual,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Insumo del Almacen')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario) VALUES (@tabla,@operacion,@idtabla,@idusuario)');

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
//---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA ✔️
export const deleteCleaningSupplyOrderService = async (idpedidoindividual) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .query('DELETE FROM pedidoSuministro WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Pedido de suministro del almacén eliminado...';
        }else{
            return 'No se pudo eliminar al pedido de suministro del almacén...';
        }
    }catch(error){
        console.error('Error al eliminar al pedido de suministro del almacén: ',error.message);
        throw error;
    }
}
export const deleteLogCleaningSupplyOrderService = async (idpedidoindividual,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Pedidos de Suministro del Almacen')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,idpedidoindividual)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario) VALUES (@tabla,@operacion,@idtabla,@idusuario)');

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
//---------- MENSAJES PEDIDOS DE INSUMOS
export const deleteMessageSupplyOrderService = async (idpedidoindividual) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .query('DELETE FROM mensajesPedidoInsumo WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Mensajes de pedido de insumo del almacén eliminado...';
        }else{
            return 'No se pudo eliminar a los mensajes de pedido de insumo del almacén...';
        }
    }catch(error){
        console.error('Error al eliminar a los mensajes de pedido de insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- MENSAJES PEDIDOS DE SUMINISTROS DE LIMPIEZA
export const deleteMessageCleaningSupplyOrderService = async (idpedidoindividual) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idpedidoindividual',sql.Int,idpedidoindividual)
            .query('DELETE FROM mensajesPedidoInsumo WHERE idpedidoindividual = @idpedidoindividual');

        if(result.rowsAffected[0]>0){
            return 'Mensajes de pedido de suministro del almacén eliminado...';
        }else{
            return 'No se pudo eliminar a los mensajes de pedido de suministro del almacén...';
        }
    }catch(error){
        console.error('Error al eliminar a los mensajes de pedido de suministro del almacén: ',error.message);
        throw error;
    }
}
//______________DELETE______________