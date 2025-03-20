import { conexionDB } from "../../config/database.config.js";
import { encryptData } from "../../config/crypto.js";
import sql from 'mssql';

// GET PERMISSIONS ALL
const getPermissionsAllService = async () => {
  try{
    const pool = await conexionDB();
    const result = await pool.request().query('SELECT * FROM permisos');

    const jsonData = JSON.stringify(result.recordset);

    const encryptedData = encryptData(jsonData);

    return encryptedData;
  }catch(error){
    console.error('Error al obtener los permisos de los usuarios: ',error.message);
    throw error;
  }
}
// GET PERMISSIONS ALL

export { getPermissionsAllService };