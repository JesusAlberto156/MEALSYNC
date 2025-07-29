//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________


//______________GET______________
// ---------- MENUS ✔️
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
// ---------- TIPOS DE MENUS ✔️
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
// ---------- TIPOS DE MENUS ELIMINADOS ✔️
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
// ---------- TIPOS DE MENUS UBICACION ✔️
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
// ---------- MENUS UBICACION ✔️
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
//______________GET______________
//______________INSERT______________
// ---------- TIPOS DE MENUS ✔️
export const insertMenuTypeService = async (nombre) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(100),nombre)
            .query('INSERT INTO tipoMenu (nombre) VALUES (@nombre)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú insertado...';
        }else{
            return 'No se pudo insertar al tipo de menú...';
        }
    }catch(error){
        console.error('Error al insertar al tipo de menú: ',error.message);
        throw error;
    }
}
export const insertLogMenuTypeService = async (idtipo,idusuario,nombre) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idtipo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
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
// ---------- TIPOS DE MENUS ELIMINADOS ✔️
export const insertDeletedMenuTypeService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .query('INSERT INTO tipoMenuEliminado (idtipo) VALUES (@idtipo)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú eliminado...';
        }else{
            return 'No se pudo eliminar al tipo de menú...';
        }
    }catch(error){
        console.error('Error al eliminar al tipo de menú: ',error.message);
        throw error;
    }
}
export const insertLogDeletedMenuTypeService = async (ideliminado,idusuario,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Eliminados')
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
// ---------- TIPOS DE MENUS UBICACION ✔️
export const insertMenuTypeUbicationService = async (idtipo,idubicacion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idubicacion',sql.Int,idubicacion)
            .query('INSERT INTO tipoMenuUbicacionMenu (idtipo,idubicacion) VALUES (@idtipo,@idubicacion)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú insertado...';
        }else{
            return 'No se pudo insertar al tipo de menú...';
        }
    }catch(error){
        console.error('Error al insertar al tipo de menú: ',error.message);
        throw error;
    }
}
export const insertLogMenuTypeUbicationService = async (idusuario,idtipo,idubicacion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Ubicacion de Menu')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idubicacion)
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
//______________INSERT______________
//______________UPDATE______________
// ---------- TIPOS DE MENUS ✔️
export const updateMenuTypeService = async (idtipo,nombre) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('nombre',sql.VarChar(100),nombre)
            .query('UPDATE tipoMenu SET nombre = @nombre WHERE idtipo = @idtipo');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú actualizado...';
        }else{
            return 'No se pudo actualizar al tipo de menú...';
        }
    }catch(error){
        console.error('Error al actualizar al tipo de menú: ',error.message);
        throw error;
    }
}
export const updateLogMenuTypeService = async (idtipo,idusuario,nombre) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idtipo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
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
//______________UPDATE______________
//______________DELETE______________
// ---------- TIPOS DE MENUS ELIMINADOS ✔️
export const deleteDeletedMenuTypeService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .query('DELETE FROM tipoMenuEliminado WHERE idtipo = @idtipo');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú recuperado...';
        }else{
            return 'No se pudo recuperar al tipo de menú...';
        }
    }catch(error){
        console.error('Error al recuperar al tipo de menú: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedMenuTypeService = async (ideliminado,idusuario,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Eliminados')
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
// ---------- TIPOS DE MENUS UBICACION ✔️
export const deleteMenuTypeUbicationService = async (idtipo,idubicacion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idubicacion',sql.Int,idubicacion)
            .query('DELETE FROM tipoMenuUbicacionMenu WHERE idtipo = @idtipo AND idubicacion = @idubicacion');

        if(result.rowsAffected[0]>0){
            return 'Ubicación del Tipo de menú perdido...';
        }else{
            return 'No se pudo perder la ubicación del Tipo de menú...';
        }
    }catch(error){
        console.error('Error al perder la ubicación del Tipo de menú: ',error.message);
        throw error;
    }
}
export const deleteLogMenuTypeUbicationService = async (idusuario,idtipo,idubicacion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Ubicacion de Menu')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idubicacion)
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
//______________DELETE______________