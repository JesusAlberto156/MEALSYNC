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
export const getMenusService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM menu');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los menús: ',error.message);
        throw error;
    }
}
// ---------- MENUS
// ---------- TIPOS DE MENUS
export const getMenuTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoMenu');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de menú: ',error.message);
        throw error;
    }
}
// ---------- TIPOS DE MENUS
// ---------- TIPOS DE MENUS ELIMINADOS
export const getDeletedMenuTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoMenuEliminado');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de menú eliminados: ',error.message);
        throw error;
    }
}
// ---------- TIPOS DE MENUS ELIMINADOS
// ---------- TIPOS DE MENUS UBICACION
export const getMenuTypeUbicationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoMenuUbicacionMenu');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las ubicaciones de los tipos de menú agregados: ',error.message);
        throw error;
    }
}
// ---------- TIPOS DE MENUS UBICACION
// ---------- MENUS UBICACION
export const getMenuUbicationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM ubicacionMenu');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las ubicaciones de los tipos de menú: ',error.message);
        throw error;
    }
}
// ---------- MENUS UBICACION
//______________GET______________
//______________INSERT______________
// ---------- TIPOS DE MENUS

// ---------- TIPOS DE MENUS
// ---------- TIPOS DE MENUS ELIMINADOS

// ---------- TIPOS DE MENUS ELIMINADOS
// ---------- TIPOS DE MENUS UBICACION

// ---------- TIPOS DE MENUS UBICACION
//______________INSERT______________
//______________UPDATE______________
// ---------- TIPOS DE MENUS

// ---------- TIPOS DE MENUS
//______________UPDATE______________
//______________DELETE______________
// ---------- TIPOS DE MENUS ELIMINADOS

// ---------- TIPOS DE MENUS ELIMINADOS
// ---------- TIPOS DE MENUS UBICACION

// ---------- TIPOS DE MENUS UBICACION
//______________DELETE______________