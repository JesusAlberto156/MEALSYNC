//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- NOTIFICACIONES ✔️
export const getNotificationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM notificaciones');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las notificaciones: ',error.message);
        throw error;
    }
}
//---------- NOTIFICACIONES DE USUARIOS ✔️
export const getUserNotificationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM notificacionUsuario');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las notificaciones de usuarios: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
//---------- NOTIFICACIONES ✔️
export const insertNotificationService = async (tipo,mensaje,duracion,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tipo',sql.VarChar(50),tipo)
            .input('mensaje',sql.VarChar(500),mensaje)
            .input('estado',sql.VarChar(50),'Visible')
            .input('duracion',sql.Int,duracion)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO notificaciones (tipo,mensaje,estado,duracion,idusuario) VALUES (@tipo,@mensaje,@estado,@duracion,@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Notificación insertada...';
        }else{
            return 'No se pudo insertar la notificación...';
        }
    }catch(error){
        console.error('Error al insertar la notificación: ',error.message);
        throw error;
    }
}
export const insertLogNotificactionService = async (usuario,idnotificacion,tipo,mensaje,duracion,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Notificaciones')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idnotificacion)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),new Date().toISOString())
            .input('campo3',sql.VarChar(500),tipo)
            .input('campo4',sql.VarChar(500),mensaje)
            .input('campo5',sql.VarChar(500),'Visible')
            .input('campo6',sql.VarChar(500),duracion)
            .input('campo7',sql.VarChar(500),idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6,campo7) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7)');

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
//---------- NOTIFICACIONES DE USUARIOS ✔️
export const insertUserNotificationService = async (idnotificacion,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idnotificacion',sql.Int,idnotificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('estado',sql.VarChar(50),'No leída')
            .query('INSERT INTO notificacionUsuario (idnotificacion,idusuario,estado) VALUES (@idnotificacion,@idusuario,@estado)');

        if(result.rowsAffected[0]>0){
            return 'Notificación de usuario insertada...';
        }else{
            return 'No se pudo insertar la notificación de usuario...';
        }
    }catch(error){
        console.error('Error al insertar la notificación de usuario: ',error.message);
        throw error;
    }
}
export const insertLogUserNotificactionService = async (usuario,idnotificacion,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Notificaciones de Usuario')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),idnotificacion)
            .input('campo3',sql.VarChar(500),idusuario)
            .input('campo4',sql.VarChar(500),'No leída')
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4)');

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
//---------- NOTIFICACIONES ✔️
export const updateNotificationService = async (idnotificacion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idnotificacion',sql.Int,idnotificacion)
            .input('estado',sql.VarChar(50),'No visible')
            .query('UPDATE notificaciones SET estado = @estado WHERE idnotificacion = @idnotificacion');

        if(result.rowsAffected[0]>0){
            return 'Notificación actualizada...';
        }else{
            return 'No se pudo actualizar la notificación...';
        }
    }catch(error){
        console.error('Error al actualizar la notificación: ',error.message);
        throw error;
    }
}
export const updateLogNotificationService = async (idnotificacion,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Notificaciones')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idnotificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo5',sql.VarChar(500),'No visible')
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo5)');

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
//---------- NOTIFICACIONES DE USUARIOS ✔️
export const updateUserNotificationService = async (idnotificacion,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idnotificacion',sql.Int,idnotificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('estado',sql.VarChar(50),'Leída')
            .query('UPDATE notificacionUsuario SET estado = @estado WHERE idnotificacion = @idnotificacion AND idusuario = @idusuario');

        if(result.rowsAffected[0]>0){
            return 'Notificación de usuario actualizada...';
        }else{
            return 'No se pudo actualizar la notificación de usuario...';
        }
    }catch(error){
        console.error('Error al actualizar la notificación de usuario: ',error.message);
        throw error;
    }
}
export const updateLogUserNotificationService = async (usuario,idnotificacion,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Notificaciones de Usuario')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),idnotificacion)
            .input('campo3',sql.VarChar(500),idusuario)
            .input('campo4',sql.VarChar(500),'Leída')
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4)');

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