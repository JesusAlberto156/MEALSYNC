import { conexionDB } from "../../config/database.config";
import { io } from "../../index.js";

// GET USER ALL
const getUsersAllService = async () => {
  try{
    const pool = await conexionDB();
    const result = await pool.request().query('SELECT * FROM usuarios');

    return result.recordset;
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

    io.emit('permissions',result.recordset);

    return result.recordset;
  }catch(error){
    console.error('Error al obtener los permisos de usuarios: ',error.message);
    throw error;
  }
}
// GET PERMISSIONS ALL

export { getUsersAllService,getPermissionsAllService };