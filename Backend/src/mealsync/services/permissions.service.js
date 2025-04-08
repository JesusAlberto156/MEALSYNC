import { conexionDB,sql } from "../../config/database.config.js";
import { encryptData } from "../../config/crypto.js";

// INSERT PERMISSIONS 
const insertPermissionsService = async (id,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('id',sql.Int,id)
          .input('administrador',sql.Bit,administrador)
          .input('chef',sql.Bit,chef)
          .input('almacenista',sql.Bit,almacenista)
          .input('cocinero',sql.Bit,cocinero)
          .input('nutriologo',sql.Bit,nutriologo)
          .input('medico',sql.Bit,medico)
          .query('INSERT INTO permisos (administrador,chef,almacenista,cocinero,nutriologo,medico,superadministrador,idusuario) VALUES (@administrador,@chef,@almacenista,@cocinero,@nutriologo,@medico,0,@id)');

      if(result.rowsAffected[0]>0){
          return 'Permisos de usuario insertados...'
      }else{
          return 'Inserción de los permisos del usuario no realizada...'
    }
  }catch(error){
      console.error('Error al insertar los permisos de los usuarios: ',error.message);
      throw error;
  }
}
// INSERT PERMISSIONS 
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
const updatePermissionsAllService = async (id,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('id',sql.Int,id)
          .input('administrador',sql.Bit,administrador)
          .input('chef',sql.Bit,chef)
          .input('almacenista',sql.Bit,almacenista)
          .input('cocinero',sql.Bit,cocinero)
          .input('nutriologo',sql.Bit,nutriologo)
          .input('medico',sql.Bit,medico)
          .query('UPDATE permisos SET administrador = @administrador, chef = @chef, almacenista = @almacenista, cocinero = @cocinero, nutriologo = @nutriologo, medico = @medico WHERE idusuario = @id');

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
const updatePermissionsSuperAdmonService = async (id,superadministrador) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('id',sql.Int,id)
          .input('superadministrador',sql.Bit,superadministrador)
          .query('UPDATE permisos SET superadministrador = @superadministrador WHERE idusuario = @id');

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

export { insertPermissionsService,getPermissionsAllService,updatePermissionsAllService,updatePermissionsSuperAdmonService };