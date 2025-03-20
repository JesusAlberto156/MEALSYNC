import { conexionDB } from "../../config/database.config.js";
import { encryptData } from "../../config/crypto.js";
import sql from 'mssql';

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

export { getUsersAllService };