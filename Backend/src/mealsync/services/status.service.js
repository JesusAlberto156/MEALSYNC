import { conexionDB,sql } from "../../config/database.config.js";
import { encryptData } from "../../config/crypto.js";

// INSERT STATUS 
const insertStatusService = async (id,habilitado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .input('habilitado',sql.Bit,habilitado)
            .query('INSERT INTO estatus (habilitado, activo, idusuario) VALUES (@habilitado,0,@id)');

        if(result.rowsAffected[0]>0){
            return 'Estatus de usuario insertado...'
        }else{
            return 'Inserción del estatus del usuario no realizada...'
        }
    }catch(error){
        console.error('Error al insertar el estatus de los usuarios: ',error.message);
        throw error;
    }
}
// INSERT STATUS 
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
            return 'Activación del usuario no realizada...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
// UPDATE STATUS LOGIN 
// UPDATE STATUS LOGOUT
const updateStatusLogoutService = async (id) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .query('UPDATE estatus SET activo = 0 WHERE idusuario = @id');

        if(result.rowsAffected[0]>0){
            return 'Usuario inactivo...'
        }else{
            return 'Desactivación del usuario no realizada...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
// UPDATE STATUS LOGOUT
// UPDATE STATUS ENABLE
const updateStatusEnableService = async (id) => {
    try {
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .query('UPDATE estatus SET habilitado = 1 WHERE idusuario = @id');

        if(result.rowsAffected[0]>0){
            return 'Usuario habilitado...'
        }else{
            return 'Habilitación del usuario no realizada...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
// UPDATE STATUS ENABLE
// UPDATE STATUS DISABLE
const updateStatusDisableService = async (id) => {
    try {
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .query('UPDATE estatus SET habilitado = 0 WHERE idusuario = @id');

        if(result.rowsAffected[0]>0){
            return 'Usuario deshabilitado...'
        }else{
            return 'Deshabilitación del usuario no realizada...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
// UPDATE STATUS DISABLE

export { insertStatusService,getStatusAllService,updateStatusLoginService,updateStatusLogoutService,updateStatusEnableService,updateStatusDisableService };