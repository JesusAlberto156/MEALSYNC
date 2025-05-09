//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- PROVEEDORES
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
//---------- PROVEEDORES
//---------- OBSERVACIONES
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
//---------- OBSERVACIONES
//______________GET______________
//______________INSERT______________
//---------- PROVEEDORES
export const insertSuppliersService = async (nombre,rfc,domicilio,telefono,correo) => {
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
//---------- PROVEEDORES
//---------- OBSERVACIONES

//---------- OBSERVACIONES
//______________INSERT______________
//______________UPDATE______________
//---------- PROVEEDORES
export const updateSuppliersService = async (idproveedor,nombre,rfc,domicilio,telefono,correo) => {
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
//---------- PROVEEDORES
//---------- OBSERVACIONES

//---------- OBSERVACIONES
//______________UPDATE______________