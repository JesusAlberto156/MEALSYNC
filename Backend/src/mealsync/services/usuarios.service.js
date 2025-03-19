import { conexionDB } from "../../config/database.config";
import { encryptData } from "../../config/crypto";
const sql = require('mssql');

// GET USER ALL
const getUsersAllService = async () => {
  try{
    const pool = await conexionDB();
    const result = await pool.request().query('SELECT * FROM usuarios');

    const jsonData = JSON.stringify(result.recordset);

    const encryptedData = encryptData(jsonData);

    return encryptedData;
  }catch(error){
    console.error('Error al obtener los usuarios: ',error.message);
    throw error;
  }
}
// GET USER ALL
// GET PERMISSIONS ALL
const getPermissionsAllService = async () => {
  try{
    const pool = await conexionDB();
    const result = await pool.request().query('SELECT * FROM permisos');

    const jsonData = JSON.stringify(result.recordset);

    const encryptedData = encryptData(jsonData);

    return encryptedData;
  }catch(error){
    console.error('Error al obtener los permisos de usuarios: ',error.message);
    throw error;
  }
}
// GET PERMISSIONS ALL
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

// UPDATE STATUS ACTIVE
const updateStatusActiveService = async (id,bolean) => {
  try{
    const pool = await conexionDB();
    const result = await pool.request()
      .input('id',sql.Int,id)
      .input('activo',sql.Bit,bolean)
      .query('UPDATE estatus SET activo = @activo WHERE idusuario = @id');
    if(result.rowsAffected[0]>0){
      return 'Usuario activo'
    }else{
      return 'No es posible activar el usuario'
    }
  }catch(error){
    console.error('Error al actualizar el estatus: ',error.message);
    throw error;
  }
}
// UPDATE STATUS ACTIVE 
export { getUsersAllService,getPermissionsAllService,getStatusAllService,updateStatusActiveService };