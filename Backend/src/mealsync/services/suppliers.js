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

//---------- PROVEEDORES
//---------- OBSERVACIONES

//---------- OBSERVACIONES
//______________INSERT______________
//______________UPDATE______________
//---------- PROVEEDORES

//---------- PROVEEDORES
//---------- OBSERVACIONES

//---------- OBSERVACIONES
//______________UPDATE______________