import { conexionDB,sql } from "../../config/database.config.js";
import { encryptData } from "../../config/crypto.js";

//__________GET__________
// ---------- SUPPLIERS ALL
export const getSuppliersAllService = async () => {
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
// ---------- SUPPLIERS ALL
// ---------- OBSERVATIONS ALL
export const getObservationsAllService = async () => {
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
// ---------- OBSERVATIONS ALL
//__________GET__________