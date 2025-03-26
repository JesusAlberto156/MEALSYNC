import { conexionDB,sql } from "../../config/database.config.js";
import { encryptData } from "../../config/crypto.js";

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
// UPDATE PERMISSIONS ALL
const updatePermissionsAllService = async (id,administrador,chef,almacen,cocinero,nutriologo,medico) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('id',sql.Int,id)
          .input('administrador',sql.Bit,administrador)
          .input('chef',sql.Bit,chef)
          .input('almacen',sql.Bit,almacen)
          .input('cocinero',sql.Bit,cocinero)
          .input('nutriologo',sql.Bit,nutriologo)
          .input('medico',sql.Bit,medico)
          .query('UPDATE permisos SET administrador = @administrador, chef = @chef, almacen = @almacen, cocinero = @cocinero, nutriologo = @nutriologo, medico = @medico WHERE idusuario = @id');

      if(result.rowsAffected[0]>0){
          return 'Permisos actualizados...'
      }else{
          return 'No es posible actualizar los permisos, o permisos cambiados...'
      }
  }catch(error){
      console.error('Error al actualizar los permisos: ',error.message);
      throw error;
  }
}
// UPDATE PERMISSIONS ALL
// UPDATE PERMISSIONS SUPERADMON
const updatePermissionsSuperAdmonService = async (id,superAdmon) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('id',sql.Int,id)
          .input('superAdmon',sql.Bit,superAdmon)
          .query('UPDATE permisos SET superAdmon = @superAdmon WHERE idusuario = @id');

      if(result.rowsAffected[0]>0){
          return 'Permiso actualizado...'
      }else{
          return 'No es posible actualizar el permiso, o permiso cambiado...'
      }
  }catch(error){
      console.error('Error al actualizar el permiso: ',error.message);
      throw error;
  }
}
// UPDATE PERMISSIONS SUPERADMON

export { getPermissionsAllService,updatePermissionsAllService,updatePermissionsSuperAdmonService };