//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- USUARIOS
export const getUsersService = async () => {
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
//---------- USUARIOS
//---------- PERMISOS
export const getPermissionsService = async () => {
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
//---------- PERMISOS
//---------- ESTATUS
export const getStatusService = async () => {
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
//---------- ESTATUS
//---------- TIPOS DE USUARIOS
export const getUserTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoUsuario');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de los usuarios: ',error.message);
        throw error;
    }
}
//---------- TIPOS DE USUARIOS
//______________GET______________
//______________INSERT______________
//---------- USUARIOS
export const insertUsersService = async (id,nombre,nombrecorto,usuario,contrasena) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .input('nombre',sql.VarChar(150),nombre)
            .input('nombrecorto',sql.VarChar(50),nombrecorto)
            .input('usuario',sql.VarChar(25),usuario)
            .input('contrasena',sql.VarChar(15),contrasena)
            .query('INSERT INTO usuarios (nombre,nombrecorto,usuario,contrasena,idtipo) VALUES (@nombre,@nombrecorto,@usuario,@contrasena,@id)');

        if(result.rowsAffected[0]>0){
            return 'Usuario insertado...';
        }else{
            return 'No se pudo insertar el usuario...';
        }
    }catch(error){
        console.error('Error al insertar el usuario: ',error.message);
        throw error;
    }
}
//---------- USUARIOS
//---------- PERMISOS
export const insertPermissionsService = async (id,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
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
            return 'Permisos de usuario insertados...';
        }else{
            return 'No se pudo insertar los permisos del usuario...';
        }
    }catch(error){
        console.error('Error al insertar los permisos del usuario: ',error.message);
        throw error;
    }
}
//---------- PERMISOS
//---------- ESTATUS
export const insertStatusService = async (id,habilitado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .input('habilitado',sql.Bit,habilitado)
            .query('INSERT INTO estatus (habilitado, activo, idusuario) VALUES (@habilitado,0,@id)');

        if(result.rowsAffected[0]>0){
            return 'Estatus de usuario insertado...'
        }else{
            return 'No se pudo insertar el estatus del usuario...';
        }
    }catch(error){
        console.error('Error al insertar el estatus del usuario: ',error.message);
        throw error;
    }
}
//---------- ESTATUS
//______________INSERT______________
//______________UPDATE______________
//---------- USUARIOS
export const updateUsersService = async (id,idusuario,nombre,nombrecorto,usuario,contrasena) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .input('idusuario',sql.Int,idusuario)
            .input('nombre',sql.VarChar(150),nombre)
            .input('nombrecorto',sql.VarChar(50),nombrecorto)
            .input('usuario',sql.VarChar(25),usuario)
            .input('contrasena',sql.VarChar(15),contrasena)
            .query('UPDATE usuarios SET nombre = @nombre, nombrecorto = @nombrecorto, usuario = @usuario, contrasena = @contrasena, idtipo = @id WHERE idusuario = @idusuario');

        if(result.rowsAffected[0]>0){
            return 'Usuario actualizado...';
        }else{
            return 'No se pudo actualizar el usuario...';
        }
    }catch(error){
        console.error('Error al actualizar el usuario: ',error.message);
        throw error;
    }
}
//---------- USUARIOS
//---------- PERMISOS
export const updatePermissionsService = async (id,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
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
          return 'No pudo actualizar los permisos...'
      }
  }catch(error){
      console.error('Error al actualizar los permisos: ',error.message);
      throw error;
  }
}
export const updatePermissionService = async (id,superadministrador) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('id',sql.Int,id)
          .input('superadministrador',sql.Bit,superadministrador)
          .query('UPDATE permisos SET superadministrador = @superadministrador WHERE idusuario = @id');

      if(result.rowsAffected[0]>0){
          return 'Permiso actualizado...'
      }else{
          return 'No pudo actualizar el permiso...'
      }
  }catch(error){
      console.error('Error al actualizar el permiso: ',error.message);
      throw error;
  }
}
//---------- PERMISOS
//---------- ESTATUS
export const updateStatusLogService = async (id,activo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .input('activo',sql.Bit,activo)
            .query('UPDATE estatus SET activo = @activo WHERE idusuario = @id');

        if(result.rowsAffected[0]>0){
            if(activo){
                return 'Usuario activo...'
            }else{
                return 'Usuario inactivo...'
            }
        }else{
            return 'No pudo Activar/Desactivar el usuario...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
export const updateStatusEnableService = async (id,habilitado) => {
    try {
        const pool = await conexionDB();
        const result = await pool.request()
            .input('id',sql.Int,id)
            .input('habilitado',sql.Bit,habilitado)
            .query('UPDATE estatus SET habilitado = @habilitado WHERE idusuario = @id');

        if(result.rowsAffected[0]>0){
            if(habilitado){
                return 'Usuario habilitado...';
            }else{
                return 'Usuario deshabilitado...';
            }
        }else{
            return 'No pudo Habilitar/Deshabilitar el usuario...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus: ',error.message);
        throw error;
    }
}
//---------- ESTATUS
//______________UPDATE______________