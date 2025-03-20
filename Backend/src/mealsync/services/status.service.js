import { conexionDB } from "../../config/database.config.js";
import { encryptData } from "../../config/crypto.js";
import sql from 'mssql';

// GET STATUS ALL
const getStatusAllService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM estatus');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener el estatus de los usuarios: ',error.message);
        throw error;
    }
}
  // GET STATUS ALL
// UPDATE STATUS LOGIN
const updateStatusLoginService = async (id) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .query('UPDATE estatus SET activo = 1 WHERE idusuario = @id');

        if(result.rowsAffected[0]>0){
            return 'Usuario activo...'
        }else{
            return 'No es posible actualizar el estatus, o estatus cambiado...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
// UPDATE STATUS LOGIN 
// UPDATE STATUS LOGIN
const updateStatusLogoutService = async (id,bolean) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .query('UPDATE estatus SET activo = 0 WHERE idusuario = @id');

        if(result.rowsAffected[0]>0){
            return 'Usuario inactivo...'
        }else{
            return 'No es posible actualizar el estatus, o estatus cambiado...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
// UPDATE STATUS LOGIN 

export { getStatusAllService,updateStatusLoginService,updateStatusLogoutService };