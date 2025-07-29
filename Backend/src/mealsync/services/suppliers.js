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
//______________DELETE______________