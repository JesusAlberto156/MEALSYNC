//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- PROVEEDORES ✔️
export const getSuppliersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM proveedores');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los proveedores: ',error.message);
        throw error;
    }
}
//---------- OBSERVACIONES ✔️
export const getObservationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM observacionesProveedor');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las observaciones de los proveedores: ',error.message);
        throw error;
    }
}
//---------- PROVEEDORES ELIMINADOS ✔️
export const getDeletedSuppliersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM proveedoresEliminados');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los proveedores eliminados: ',error.message);
        throw error;
    }
}
//---------- INSUMOS ✔️
export const getSuppliesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM insumos');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los insumos: ',error.message);
        throw error;
    }
}
//---------- INSUMOS ELIMINADOS ✔️
export const getDeletedSuppliesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM insumosEliminados');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los insumos eliminados: ',error.message);
        throw error;
    }
}
//---------- TIPOS DE INSUMO ✔️
export const getSupplyTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de insumo: ',error.message);
        throw error;
    }
}
//---------- CANTIDAD DE TIPOS DE INSUMO ✔️
export const getCountSupplyTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM cantidadTipoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las cantidades de los tipos de insumo: ',error.message);
        throw error;
    }
}
//---------- TIPOS DE INSUMO ELIMINADOS ✔️
export const getDeletedSupplyTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoInsumoEliminado');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de insumo eliminados: ',error.message);
        throw error;
    }
}
//---------- CATEGORIAS DE INSUMO ✔️
export const getSupplyCategoriesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM categoriasInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las categorías de insumo: ',error.message);
        throw error;
    }
}
//---------- CATEGORIAS DE INSUMO ELIMINADAS ✔️
export const getDeletedSupplyCategoriesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM categoriasInsumoEliminadas');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las categorías de insumo eliminadas: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
//---------- PROVEEDORES ✔️
export const insertSupplierService = async (nombre,rfc,domicilio,telefono,correo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(150),nombre)
            .input('rfc',sql.VarChar(30),rfc)
            .input('domicilio',sql.VarChar(150),domicilio)
            .input('telefono',sql.VarChar(20),telefono)
            .input('correo',sql.VarChar(150),correo)
            .query('INSERT INTO proveedores (nombre,rfc,domicilio,telefono,correo) VALUES (@nombre,@rfc,@domicilio,@telefono,@correo)');

        if(result.rowsAffected[0]>0){
            return 'Proveedor insertado...';
        }else{
            return 'No se pudo insertar al proveedor...';
        }
    }catch(error){
        console.error('Error al insertar al proveedor: ',error.message);
        throw error;
    }
}
export const insertLogSupplierService = async (idproveedor,idusuario,nombre,rfc,domicilio,telefono,correo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Proveedores')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idproveedor)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),rfc)
            .input('campo4',sql.VarChar(500),domicilio)
            .input('campo5',sql.VarChar(500),telefono)
            .input('campo6',sql.VarChar(500),correo)
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
//---------- OBSERVACIONES ✔️
export const insertObservationService = async (observacion,calificacion,fecha,idproveedor) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('observacion',sql.VarChar(250),observacion)
            .input('calificacion',sql.Int,calificacion)
            .input('fecha',sql.DateTime,fecha)
            .input('idproveedor',sql.Int,idproveedor)
            .query('INSERT INTO observacionesProveedor (observacion,calificacion,fecha,idproveedor) VALUES (@observacion,@calificacion,@domicilio,@fecha,@idproveedor)');

        if(result.rowsAffected[0]>0){
            return 'Observación del proveedor insertada...';
        }else{
            return 'No se pudo insertar la observación...';
        }
    }catch(error){
        console.error('Error al insertar la observación: ',error.message);
        throw error;
    }
}
export const insertLogObservationService = async (idobservacion,idusuario,observacion,calificacion,fecha,idproveedor) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Observaciones Proveedor')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idobservacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),observacion)
            .input('campo3',sql.VarChar(500),calificacion)
            .input('campo4',sql.VarChar(500),fecha)
            .input('campo5',sql.VarChar(500),idproveedor)
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
//---------- PROVEEDORES ELIMINADOS ✔️
export const insertDeletedSupplierService = async (idproveedor) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idproveedor',sql.Int,idproveedor)
            .query('INSERT INTO proveedoresEliminados (idproveedor) VALUES (@idproveedor)');

        if(result.rowsAffected[0]>0){
            return 'Proveedor eliminado...';
        }else{
            return 'No se pudo eliminar al proveedor...';
        }
    }catch(error){
        console.error('Error al eliminar al proveedor: ',error.message);
        throw error;
    }
}
export const insertLogDeletedSupplierService = async (ideliminado,idusuario,idproveedor) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Proveedores Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idproveedor)
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
//---------- INSUMOS ✔️
export const insertSupplyService = async (nombre,descripcion,imagen,idproveedor,idtipo,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .input('idproveedor',sql.Int,idproveedor)
            .input('idtipo',sql.Int,idtipo)
            .input('idcategoria',sql.Int,idcategoria)
            .input('idcantidad',sql.Int,idcantidad)
            .query('INSERT INTO insumos (nombre,descripcion,imagen,idproveedor,idtipo,idcategoria,idcantidad) VALUES (@nombre,@descripcion,@imagen,@idproveedor,@idtipo,@idcategoria,@idcantidad)');

        if(result.rowsAffected[0]>0){
            return 'Insumo insertado...';
        }else{
            return 'No se pudo insertar al insumo...';
        }
    }catch(error){
        console.error('Error al insertar al insumo: ',error.message);
        throw error;
    }
}
export const insertLogSupplyService = async (idinsumo,idusuario,imagen,nombre,descripcion,idproveedor,idtipo,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Insumos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idinsumo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),descripcion)
            .input('campo4',sql.VarChar(500),idproveedor)
            .input('campo5',sql.VarChar(500),idtipo)
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
//---------- INSUMOS ELIMINADOS ✔️
export const insertDeletedSupplyService = async (idinsumo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idinsumo',sql.Int,idinsumo)
            .query('INSERT INTO insumosEliminados (idinsumo) VALUES (@idinsumo)');

        if(result.rowsAffected[0]>0){
            return 'Insumo eliminado...';
        }else{
            return 'No se pudo eliminar al insumo...';
        }
    }catch(error){
        console.error('Error al eliminar al insumo: ',error.message);
        throw error;
    }
}
export const insertLogDeletedSupplyService = async (ideliminado,idusuario,idinsumo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Insumos Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idinsumo)
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
//---------- TIPOS DE INSUMO ✔️
export const insertSupplyTypeService = async (tipo,descripcion,unidad,idcategoria,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tipo',sql.VarChar(150),tipo)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('unidad',sql.VarChar(20),unidad)
            .input('idcategoria',sql.Int,idcategoria)
            .input('limite',sql.Decimal(10,4),limite)
            .query('INSERT INTO tipoInsumo (tipo,descripcion,unidad,idcategoria,limite) VALUES (@tipo,@descripcion,@unidad,@idcategoria,@limite)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo insertado...';
        }else{
            return 'No se pudo insertar al tipo de insumo...';
        }
    }catch(error){
        console.error('Error al insertar al tipo de insumo: ',error.message);
        throw error;
    }
}
export const insertLogSupplyTypeService = async (idtipo,idusuario,tipo,descripcion,unidad,idcategoria,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idtipo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),tipo)
            .input('campo3',sql.VarChar(500),descripcion)
            .input('campo4',sql.VarChar(500),unidad)
            .input('campo5',sql.VarChar(500),idcategoria)
            .input('campo6',sql.VarChar(500),limite)
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
//---------- CANTIDAD DE TIPOS DE INSUMO ✔️
export const insertCountSupplyTypeService = async (cantidad,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .input('idtipo',sql.Int,idtipo)
            .query('INSERT INTO cantidadTipoInsumo (cantidad,idtipo) VALUES (@cantidad,@idtipo)');

        if(result.rowsAffected[0]>0){
            return 'Cantidad al tipo de insumo insertado...';
        }else{
            return 'No se pudo insertar la cantidad al tipo de insumo...';
        }
    }catch(error){
        console.error('Error al insertar la cantidad al tipo de insumo: ',error.message);
        throw error;
    }
}
export const insertLogCountSupplyTypeService = async (idcantidad,idusuario,cantidad,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50),'Cantidad de Tipos de Insumo')
            .input('operacion', sql.VarChar(20),'INSERT')
            .input('idtabla',sql.Int,idcantidad)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidad)
            .input('campo3',sql.VarChar(500),idtipo)
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
//---------- TIPOS DE INSUMO ELIMINADOS ✔️
export const insertDeletedSupplyTypeService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .query('INSERT INTO tipoInsumoEliminado (idtipo) VALUES (@idtipo)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo eliminado...';
        }else{
            return 'No se pudo eliminar al tipo de insumo...';
        }
    }catch(error){
        console.error('Error al eliminar al tipo de insumo: ',error.message);
        throw error;
    }
}
export const insertLogDeletedSupplyTypeService = async (ideliminado,idusuario,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Insumo Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
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
//---------- CATEGORIAS DE INSUMO ✔️
export const insertSupplyCategoryService = async (nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.Varchar(150),nombre)
            .input('descripcion',sql.Varchar(250),descripcion)
            .query('INSERT INTO categoriasInsumo (nombre,descripcion) VALUES (@nombre,@descripcion)');

        if(result.rowsAffected[0]>0){
            return 'Categoría de insumo insertada...';
        }else{
            return 'No se pudo insertar la categoría del insumo...';
        }
    }catch(error){
        console.error('Error al insertar la categoría del insumo: ',error.message);
        throw error;
    }
}
export const insertLogSupplyCategoryService = async (idcategoria,idusuario,nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50),'Categorias de Insumo')
            .input('operacion', sql.VarChar(20),'INSERT')
            .input('idtabla',sql.Int,idcategoria)
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
//---------- CATEGORIAS DE INSUMO ELIMINADAS ✔️
export const insertDeletedSupplyCategoryService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .query('INSERT INTO categoriasInsumoEliminadas (idcategoria) VALUES (@idcategoria)');

        if(result.rowsAffected[0]>0){
            return 'Categoría de insumo eliminada...';
        }else{
            return 'No se pudo eliminar la categoría del insumo...';
        }
    }catch(error){
        console.error('Error al eliminar la categoría del insumo: ',error.message);
        throw error;
    }
}
export const insertLogDeletedSupplyCategoryService = async (ideliminado,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Categorias de Insumo Eliminadas')
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
//______________INSERT______________
//______________UPDATE______________
//---------- PROVEEDORES ✔️
export const updateSupplierService = async (idproveedor,nombre,rfc,domicilio,telefono,correo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idproveedor',sql.Int,idproveedor)
            .input('nombre',sql.VarChar(150),nombre)
            .input('rfc',sql.VarChar(30),rfc)
            .input('domicilio',sql.VarChar(150),domicilio)
            .input('telefono',sql.VarChar(20),telefono)
            .input('correo',sql.VarChar(150),correo)
            .query('UPDATE proveedores SET nombre = @nombre, rfc = @rfc, domicilio = @domicilio, telefono = @telefono, correo = @correo WHERE idproveedor = @idproveedor');

        if(result.rowsAffected[0]>0){
            return 'Proveedor actualizado...';
        }else{
            return 'No se pudo actualizar al proveedor...';
        }
    }catch(error){
        console.error('Error al actualizar al proveedor: ',error.message);
        throw error;
    }
}
export const updateLogSupplierService = async (idproveedor,idusuario,nombre,rfc,domicilio,telefono,correo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Proveedores')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idproveedor)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),rfc)
            .input('campo4',sql.VarChar(500),domicilio)
            .input('campo5',sql.VarChar(500),telefono)
            .input('campo6',sql.VarChar(500),correo)
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
//---------- INSUMOS ✔️
export const updateSupplyService = async (idinsumo,nombre,descripcion,imagen,idproveedor,idtipo,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idinsumo',sql.Int,idinsumo)
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .input('idproveedor',sql.Int,idproveedor)
            .input('idtipo',sql.Int,idtipo)
            .input('idcategoria',sql.Int,idcategoria)
            .input('idcantidad',sql.Int,idcantidad)
            .query('UPDATE insumos SET nombre = @nombre, descripcion = @descripcion, imagen = @imagen, idproveedor = @idproveedor, idtipo = @idtipo, idcategoria = @idcategoria, idcantidad = @idcantidad WHERE idinsumo = @idinsumo');

        if(result.rowsAffected[0]>0){
            return 'Insumo actualizado...';
        }else{
            return 'No se pudo actualizar al insumo...';
        }
    }catch(error){
        console.error('Error al actualizar al insumo: ',error.message);
        throw error;
    }
}
export const updateLogSupplyService = async (idinsumo,idusuario,imagen,nombre,descripcion,idproveedor,idtipo,idcategoria,idcantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Insumos')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idinsumo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),descripcion)
            .input('campo4',sql.VarChar(500),idproveedor)
            .input('campo5',sql.VarChar(500),idtipo)
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
//---------- TIPOS DE INSUMO ✔️
export const updateSupplyTypeService = async (idtipo,tipo,descripcion,unidad,idcategoria,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('tipo',sql.VarChar(150),tipo)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('unidad',sql.VarChar(20),unidad)
            .input('idcategoria',sql.Int,idcategoria)
            .input('limite',sql.Decimal(10,4),limite)
            .query('UPDATE tipoInsumo SET tipo = @tipo, descripcion = @descripcion, unidad = @unidad, idcategoria = @idcategoria, limite = @limite WHERE idtipo = @idtipo');

        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo actualizado...';
        }else{
            return 'No se pudo actualizar al tipo de insumo...';
        }
    }catch(error){
        console.error('Error al actualizar al tipo de insumo: ',error.message);
        throw error;
    }
}
export const updateLogSupplyTypeService = async (idtipo,idusuario,tipo,descripcion,unidad,idcategoria,limite) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idtipo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),tipo)
            .input('campo3',sql.VarChar(500),descripcion)
            .input('campo4',sql.VarChar(500),unidad)
            .input('campo5',sql.VarChar(500),idcategoria)
            .input('campo6',sql.VarChar(500),limite)
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
//---------- CATEGORIAS DE INSUMO ✔️
export const updateSupplyCategoryService = async (idcategoria,nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .input('nombre',sql.Varchar(150),nombre)
            .input('descripcion',sql.Varchar(250),descripcion)
            .query('UPDATE tipoInsumo SET nombre = @nombre, descripcion = @descripcion WHERE idcategoria = @idcategoria');

        if(result.rowsAffected[0]>0){
            return 'Categoría del insumo actualizada...';
        }else{
            return 'No se pudo actualizar la categoría del insumo...';
        }
    }catch(error){
        console.error('Error al actualizar la categoría del insumo: ',error.message);
        throw error;
    }
}
export const updateLogSupplyCategoryService = async (idcategoria,idusuario,nombre,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50),'Categorias de Insumo')
            .input('operacion', sql.VarChar(20),'UPDATE')
            .input('idtabla',sql.Int,idcategoria)
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
//---------- PROVEEDORES ELIMINADOS ✔️
export const deleteDeletedSupplierService = async (idproveedor) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idproveedor',sql.Int,idproveedor)
            .query('DELETE FROM proveedoresEliminados WHERE idproveedor = @idproveedor');

        if(result.rowsAffected[0]>0){
            return 'Proveedor recuperado...';
        }else{
            return 'No se pudo recuperar al proveedor...';
        }
    }catch(error){
        console.error('Error al recuperar al proveedor: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedSupplierService = async (ideliminado,idusuario,idproveedor) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Proveedores Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idproveedor)
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
//---------- INSUMOS ELIMINADOS ✔️
export const deleteDeletedSupplyService = async (idinsumo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idinsumo',sql.Int,idinsumo)
            .query('DELETE FROM insumosEliminados WHERE idinsumo = @idinsumo');

        if(result.rowsAffected[0]>0){
            return 'Insumo recuperado...';
        }else{
            return 'No se pudo recuperar al insumo...';
        }
    }catch(error){
        console.error('Error al recuperar al insumo: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedSupplyService = async (ideliminado,idusuario,idinsumo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Insumos Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idinsumo)
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
//---------- TIPOS DE INSUMO ELIMINADOS ✔️
export const deleteDeletedSupplyTypeService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .query('DELETE FROM tipoInsumoEliminado WHERE idtipo = @idtipo');

        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo recuperado...';
        }else{
            return 'No se pudo recuperar al tipo de insumo...';
        }
    }catch(error){
        console.error('Error al recuperar al tipo de insumo: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedSupplyTypeService = async (ideliminado,idusuario,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Insumo Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
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
//---------- CATEGORIAS DE INSUMO ELIMINADAS ✔️
export const deleteDeletedSupplyCategoryService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .query('DELETE FROM categoriasInsumoEliminadas WHERE idcategoria = @idcategoria');

        if(result.rowsAffected[0]>0){
            return 'Categoría de insumo recuperada...';
        }else{
            return 'No se pudo recuperar la categoría de insumo...';
        }
    }catch(error){
        console.error('Error al recuperar la categoría de insumo: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedSupplyCategoryService = async (ideliminado,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Categorias de Insumo Eliminadas')
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
//______________DELETE______________