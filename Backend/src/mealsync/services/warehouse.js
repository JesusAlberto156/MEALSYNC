//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- INSUMOS
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
//---------- INSUMOS
//---------- TIPO DE INSUMOS
export const getSupplyTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de insumos: ',error.message);
        throw error;
    }
}
//---------- TIPO DE INSUMOS
//---------- MEDIDA
export const getUnitsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM medida');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las medidas de los insumos: ',error.message);
        throw error;
    }
}
//---------- MEDIDA
//---------- PRECIO DEL INSUMO
export const getSupplyPricesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM precioInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los precios de los insumos: ',error.message);
        throw error;
    }
}
//---------- PRECIO DEL INSUMO
//---------- ALMACEN
export const getWarehouseService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacen');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacen: ',error.message);
        throw error;
    }
}
//---------- ALMACEN
//______________GET______________
//______________INSERT______________
//---------- INSUMOS

//---------- INSUMOS
//---------- TIPO DE INSUMOS

//---------- TIPO DE INSUMOS
//---------- MEDIDA

//---------- MEDIDA
//---------- PRECIO DEL INSUMO

//---------- PRECIO DEL INSUMO
//---------- ALMACEN

//---------- ALMACEN
//______________INSERT______________
//______________UPDATE______________
//---------- INSUMOS

//---------- INSUMOS
//---------- TIPO DE INSUMOS

//---------- TIPO DE INSUMOS
//---------- MEDIDA

//---------- MEDIDA
//---------- PRECIO DEL INSUMO

//---------- PRECIO DEL INSUMO
//---------- ALMACEN

//---------- ALMACEN
//______________UPDATE______________