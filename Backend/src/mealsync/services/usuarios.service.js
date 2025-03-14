import { conexionDB } from "../../config/database.config";
import { encryptData } from "../../config/crypto";

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

export { getUsersAllService,getPermissionsAllService };