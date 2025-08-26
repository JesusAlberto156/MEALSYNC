//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
// ---------- CLAVE ✔️
export const getKeyService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM claveAutorizacion');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener la clave de autorización: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
// ---------- CLAVE ✔️
export const insertKeyService = async (clave) => {
    try{
        const pool = await conexionDB();
        
        const result = await pool.request()
            .input('clave',sql.VarChar(20),clave)
            .query('INSERT INTO claveAutorizacion (clave) VALUES (@clave)');
        
        if(result.rowsAffected[0]>0){
            return 'Clave insertada...';
        }else{
            return 'No se pudo insertar la clave...';
        }
    }catch(error){
        console.error('Error al insertar la clave: ',error.message);
        throw error;
    }
}
export const insertLogKeyService = async (idclave,idusuario,clave) => {
    try{
        const pool = await conexionDB();
        
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Clave de Autorización')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idclave)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),clave)
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
// ---------- CLAVE ✔️
export const updateKeyService = async (idclave,clave) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idclave',sql.Int,idclave)
            .input('clave',sql.VarChar(20),clave)
            .query('UPDATE claveAutorizacion SET clave = @clave WHERE idclave = @idclave');

        if(result.rowsAffected[0]>0){
            return 'Clave actualizada...';
        }else{
            return 'No se pudo actualizar la clave...';
        }
    }catch(error){
        console.error('Error al actualizar la clave: ',error.message);
        throw error;
    }
}
export const updateLogKeyService = async (idclave,idusuario,clave) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Clave de Autorización')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idclave)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),clave)
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