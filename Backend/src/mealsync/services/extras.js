//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- CATEGORÍAS DE LIMPIEZA ✔️
export const getCleaningCategoriesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM categoriasLimpieza');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las categorías de limpieza: ',error.message);
        throw error;
    }
}
//---------- CANTIDADES DE CATEGORÍAS DE LIMPIEZA ✔️
export const getCountCleaningCategoriesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM cantidadCategoriasLimpieza');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las cantidades de las categorías de limpieza: ',error.message);
        throw error;
    }
}
//---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS ✔️
export const getDeletedCleaningCategoriesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM categoriasLimpiezaEliminadas');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las categorías de limpieza eliminadas: ',error.message);
        throw error;
    }
}
//---------- SUMINISTROS DE LIMPIEZA ✔️
export const getCleaningSuppliesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM suministrosLimpieza');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los suministros de limpieza: ',error.message);
        throw error;
    }
}
//---------- SUMINISTROS DE LIMPIEZA ELIMINADOS ✔️
export const getDeletedCleaningSuppliesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM suministrosLimpiezaEliminados');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los suministros de limpieza eliminados: ',error.message);
        throw error;
    }
}
//---------- GASTOS FIJOS ✔️
export const getFixedExpensesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM gastosFijos');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los gastos fijos: ',error.message);
        throw error;
    }
}
//---------- GASTOS FIJOS ELIMINADOS ✔️
export const getDeletedFixedExpensesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM gastosFijosEliminados');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los gastos fijos eliminados: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
//---------- CATEGORÍAS DE LIMPIEZA ✔️
export const insertCleaningCategoryService = async (nombre,descripcion,unidad,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('unidad',sql.VarChar(20),unidad)
            .input('limite',sql.Decimal(10,4),limite)
            .query('INSERT INTO categoriasLimpieza (nombre,descripcion,unidad,limite) VALUES (@nombre,@descripcion,@unidad,@limite)');

        if(result.rowsAffected[0]>0){
            return 'Categoría de limpieza insertada...';
        }else{
            return 'No se pudo insertar la categoría de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar la categoría de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogCleaningCategoryService = async (idcategoria,idusuario,nombre,descripcion,unidad,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Categorías de Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idcategoria)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),descripcion)
            .input('campo4',sql.VarChar(500),unidad)
            .input('campo5',sql.VarChar(500),limite)
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
//---------- CANTIDADES DE CATEGORÍAS DE LIMPIEZA ✔️
export const insertCountCleaningCategoryService = async (cantidad,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .input('idcategoria',sql.Int,idcategoria)
            .query('INSERT INTO cantidadCategoriasLimpieza (cantidad,idcategoria) VALUES (@cantidad,@idcategoria)');

        if(result.rowsAffected[0]>0){
            return 'Cantidad a la categoría de limpieza insertada...';
        }else{
            return 'No se pudo insertar la cantidad a la categoría de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar la cantidad a la categoría de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogCountCleaningCategoryService = async (idcantidad,idusuario,cantidad,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50),'Cantidad de Catedorías de Limpieza')
            .input('operacion', sql.VarChar(20),'INSERT')
            .input('idtabla',sql.Int,idcantidad)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidad)
            .input('campo3',sql.VarChar(500),idcategoria)
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
//---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS ✔️
export const insertDeletedCleaningCategoryService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .query('INSERT INTO categoriasLimpiezaEliminadas (idcategoria) VALUES (@idcategoria)');

        if(result.rowsAffected[0]>0){
            return 'Categoría de limpieza eliminada...';
        }else{
            return 'No se pudo eliminar la categoría de limpieza...';
        }
    }catch(error){
        console.error('Error al eliminar la categoría de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogDeletedCleaningCategoryService = async (ideliminado,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Categorías de Limpieza Eliminadas')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idcategoria)
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
//---------- SUMINISTROS DE LIMPIEZA ✔️
export const insertCleaningSupplyService = async (codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('codigo',sql.VarChar(20),codigo)
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .input('idproveedor',sql.Int,idproveedor)
            .input('idcategoria',sql.Int,idcategoria)
            .input('idcantidad',sql.Int,idcantidad)
            .query('INSERT INTO suministrosLimpieza (codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad) VALUES (@codigo,@nombre,@descripcion,@imagen,@idproveedor,@idcategoria,@idcantidad)');

        if(result.rowsAffected[0]>0){
            return 'Suministro de limpieza insertado...';
        }else{
            return 'No se pudo insertar al suministro de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar al suministro de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogCleaningSupplyService = async (idsuministro,idusuario,codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Suministros de Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idsuministro)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(sql.MAX),imagen)
            .input('campo2',sql.VarChar(500),codigo)
            .input('campo3',sql.VarChar(500),nombre)
            .input('campo4',sql.VarChar(500),descripcion)
            .input('campo5',sql.VarChar(500),idproveedor)
            .input('campo6',sql.VarChar(500),idcategoria)
            .input('campo7',sql.VarChar(500),idcantidad)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo1,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7)');

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
//---------- SUMINISTROS DE LIMPIEZA ELIMINADOS ✔️
export const insertDeletedCleaningSupplyService = async (idsuministro) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idsuministro',sql.Int,idsuministro)
            .query('INSERT INTO suministrosLimpiezaEliminados (idsuministro) VALUES (@idsuministro)');

        if(result.rowsAffected[0]>0){
            return 'Suministro de limpieza eliminada...';
        }else{
            return 'No se pudo eliminar al suministro de limpieza...';
        }
    }catch(error){
        console.error('Error al eliminar al suministro de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogDeletedCleaningSupplyService = async (ideliminado,idusuario,idsuministro) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Suministros de Limpieza Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idsuministro)
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
//---------- GASTOS FIJOS ✔️
export const insertFixedExpenseService = async (nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .query('INSERT INTO gastosFijos (nombre,descripcion) VALUES (@nombre,@descripcion)');

        if(result.rowsAffected[0]>0){
            return 'Gasto fijo insertado...';
        }else{
            return 'No se pudo insertar al gasto fijo...';
        }
    }catch(error){
        console.error('Error al insertar al gasto fijo: ',error.message);
        throw error;
    }
}
export const insertLogFixedExpenseService = async (idgasto,idusuario,nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Gastos Fijos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idgasto)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),descripcion)
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
//---------- GASTOS FIJOS ELIMINADOS ✔️
export const insertDeletedFixedExpenseService = async (idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idgasto',sql.Int,idgasto)
            .query('INSERT INTO gastosFijosEliminados (idgasto) VALUES (@idgasto)');

        if(result.rowsAffected[0]>0){
            return 'Gasto fijo eliminado...';
        }else{
            return 'No se pudo eliminar al gasto fijo...';
        }
    }catch(error){
        console.error('Error al eliminar al gasto fijo: ',error.message);
        throw error;
    }
}
export const insertLogDeletedFixedExpenseService = async (ideliminado,idusuario,idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Gastos Fijos Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idgasto)
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
//______________INSERT______________
//______________UPDATE______________
//---------- CATEGORÍAS DE LIMPIEZA ✔️
export const updateCleaningCategoryService = async (idcategoria,nombre,descripcion,unidad,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('unidad',sql.VarChar(20),unidad)
            .input('limite',sql.Decimal(10,4),limite)
            .query('UPDATE categoriasLimpieza SET nombre = @nombre, descripcion = @descripcion, unidad = @unidad, limite = @limite WHERE idcategoria = @idcategoria');

        if(result.rowsAffected[0]>0){
            return 'Categoría de limpieza actualizada...';
        }else{
            return 'No se pudo actualizar a la categoría de limpieza...';
        }
    }catch(error){
        console.error('Error al actualizar a la categoría de limpieza: ',error.message);
        throw error;
    }
}
export const updateLogCleaningCategoryService = async (idcategoria,idusuario,nombre,descripcion,unidad,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Categorías de Limpieza')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idcategoria)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),descripcion)
            .input('campo4',sql.VarChar(500),unidad)
            .input('campo5',sql.VarChar(500),limite)
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
//---------- SUMINISTROS DE LIMPIEZA ✔️
export const updateCleaningSupplyService = async (idsuministro,codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idsuministro',sql.Int,idsuministro)
            .input('codigo',sql.VarChar(20),codigo)
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .input('idproveedor',sql.Int,idproveedor)
            .input('idcategoria',sql.Int,idcategoria)
            .input('idcantidad',sql.Int,idcantidad)
            .query('UPDATE suministrosLimpieza SET codigo = @codigo, nombre = @nombre, descripcion = @descripcion, imagen = @imagen, idproveedor = @idproveedor, idcategoria = @idcategoria, idcantidad = @idcantidad WHERE idsuministro = @idsuministro');

        if(result.rowsAffected[0]>0){
            return 'Suministro de limpieza actualizado...';
        }else{
            return 'No se pudo actualizar al suministro de limpieza...';
        }
    }catch(error){
        console.error('Error al actualizar al suministro de limpieza: ',error.message);
        throw error;
    }
}
export const updateLogCleaningSupplyService = async (idsuministro,idusuario,codigo,nombre,descripcion,imagen,idproveedor,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Suministros de Limpieza')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idsuministro)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),codigo)
            .input('campo3',sql.VarChar(500),nombre)
            .input('campo4',sql.VarChar(500),descripcion)
            .input('campo5',sql.VarChar(500),idproveedor)
            .input('campo6',sql.VarChar(500),idcategoria)
            .input('campo7',sql.VarChar(500),idcantidad)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo1,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7)');

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
//---------- GASTOS FIJOS ✔️
export const updateFixedExpenseService = async (idgasto,nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idgasto',sql.Int,idgasto)
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .query('UPDATE gastosFijos SET nombre = @nombre, descripcion = @descripcion WHERE idgasto = @idgasto');

        if(result.rowsAffected[0]>0){
            return 'Gasti fijo actualizado...';
        }else{
            return 'No se pudo actualizar al gasto fijo...';
        }
    }catch(error){
        console.error('Error al actualizar al gasto fijo: ',error.message);
        throw error;
    }
}
export const updateLogFixedExpenseService = async (idgasto,idusuario,nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Gastos Fijos')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idgasto)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),descripcion)
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
//---------- CATEGORÍAS DE LIMPIEZA ELIMINADAS ✔️
export const deleteDeletedCleaningCategoryService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .query('DELETE FROM categoriasLimpiezaEliminadas WHERE idcategoria = @idcategoria');

        if(result.rowsAffected[0]>0){
            return 'Categoría de limpieza recuperada...';
        }else{
            return 'No se pudo recuperar la categoría de limpieza...';
        }
    }catch(error){
        console.error('Error al recuperar la categoría de limpieza: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedCleaningCategoryService = async (ideliminado,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Categorías de Limpieza Eliminadas')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idcategoria)
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
//---------- SUMINISTROS DE LIMPIEZA ELIMINADOS ✔️
export const deleteDeletedCleaningSupplyService = async (idsuministro) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idsuministro',sql.Int,idsuministro)
            .query('DELETE FROM suministrosLimpiezaEliminados WHERE idsuministro = @idsuministro');

        if(result.rowsAffected[0]>0){
            return 'Suministro de limpieza recuperado...';
        }else{
            return 'No se pudo recuperar al suministro de limpieza...';
        }
    }catch(error){
        console.error('Error al recuperar al suministro de limpieza: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedCleaningSupplyService = async (ideliminado,idusuario,idsuministro) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Suministros de Limpieza Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idsuministro)
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
//---------- GASTOS FIJOS ELIMINADOS ✔️
export const deleteDeletedFixedExpenseService = async (idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idgasto',sql.Int,idgasto)
            .query('DELETE FROM gastosFijosEliminados WHERE idgasto = @idgasto');

        if(result.rowsAffected[0]>0){
            return 'Gasto fijo recuperado...';
        }else{
            return 'No se pudo recuperar al gasto fijo...';
        }
    }catch(error){
        console.error('Error al recuperar al gasto fijo: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedFixedExpenseService = async (ideliminado,idusuario,idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Gastos Fijos Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idgasto)
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