//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________


//______________GET______________
// ---------- MENUS
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
// ---------- MENUS
// ---------- TIPOS DE MENUS

// ---------- TIPOS DE MENUS
// ---------- TIPOS DE MENUS ELIMINADOS

// ---------- TIPOS DE MENUS ELIMINADOS
// ---------- TIPOS DE MENUS UBICACION

// ---------- TIPOS DE MENUS UBICACION
// ---------- MENUS UBICACION

// ---------- MENUS UBICACION
//______________GET______________