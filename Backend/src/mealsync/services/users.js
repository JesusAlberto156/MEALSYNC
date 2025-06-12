//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- USUARIOS ✔️
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
//---------- PERMISOS ✔️
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
//---------- ESTATUS ✔️
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
//---------- TIPOS DE USUARIOS ✔️
export const getUserTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoUsuario');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de usuario: ',error.message);
        throw error;
    }
}
//---------- USUARIOS ELIMINADOS ✔️
export const getDeletedUsersService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM usuariosEliminados');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los usuarios eliminados: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
//---------- USUARIOS ✔️
export const insertUserService = async (nombre,nombrecorto,usuario,contrasena,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(150),nombre)
            .input('nombrecorto',sql.VarChar(50),nombrecorto)
            .input('usuario',sql.VarChar(25),usuario)
            .input('contrasena',sql.VarChar(15),contrasena)
            .input('idtipo',sql.Int,idtipo)
            .query('INSERT INTO usuarios (nombre,nombrecorto,usuario,contrasena,idtipo) VALUES (@nombre,@nombrecorto,@usuario,@contrasena,@idtipo)');

        if(result.rowsAffected[0]>0){
            return 'Usuario insertado...';
        }else{
            return 'No se pudo insertar al usuario...';
        }
    }catch(error){
        console.error('Error al insertar al usuario: ',error.message);
        throw error;
    }
}
export const insertLogUserService = async (idusuario,usuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Usuarios')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idusuario)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),nombrecorto)
            .input('campo4',sql.VarChar(500),usuario)
            .input('campo5',sql.VarChar(500),contrasena)
            .input('campo6',sql.VarChar(500),idtipo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- PERMISOS ✔️
export const insertPermissionsService = async (administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('administrador',sql.Bit,administrador)
            .input('chef',sql.Bit,chef)
            .input('almacenista',sql.Bit,almacenista)
            .input('cocinero',sql.Bit,cocinero)
            .input('nutriologo',sql.Bit,nutriologo)
            .input('medico',sql.Bit,medico)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO permisos (administrador,chef,almacenista,cocinero,nutriologo,medico,superadministrador,idusuario) VALUES (@administrador,@chef,@almacenista,@cocinero,@nutriologo,@medico,0,@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Permisos del usuario insertados...';
        }else{
            return 'No se pudo insertar los permisos al usuario...';
        }
    }catch(error){
        console.error('Error al insertar los permisos al usuario: ',error.message);
        throw error;
    }
}
export const insertLogPermissionsService = async (idpermiso,usuario,administrador,chef,almacenista,cocinero,nutriologo,medico,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Permisos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idpermiso)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),administrador)
            .input('campo3',sql.VarChar(500),chef)
            .input('campo4',sql.VarChar(500),almacenista)
            .input('campo5',sql.VarChar(500),cocinero)
            .input('campo6',sql.VarChar(500),nutriologo)
            .input('campo7',sql.VarChar(500),medico)
            .input('campo8',sql.VarChar(500),'0')
            .input('campo9',sql.VarChar(500),idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7,@campo8,@campo9)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- ESTATUS ✔️
export const insertStatusService = async (habilitado,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('habilitado',sql.Bit,habilitado)
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO estatus (habilitado,activo,idusuario) VALUES (@habilitado,0,@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Estatus del usuario insertado...'
        }else{
            return 'No se pudo insertar el estatus al usuario...';
        }
    }catch(error){
        console.error('Error al insertar el estatus al usuario: ',error.message);
        throw error;
    }
}
export const insertLogStatusService = async (idestatus,usuario,habilitado,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Estatus')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idestatus)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),habilitado)
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- USUARIOS ELIMINADOS ✔️
export const insertDeletedUserService = async (idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idusuario',sql.Int,idusuario)
            .query('INSERT INTO usuariosEliminados (idusuario) VALUES (@idusuario)');

        if(result.rowsAffected[0]>0){
            return 'Usuario Eliminado...';
        }else{
            return 'No se pudo eliminar al usuario...';
        }
    }catch(error){
        console.error('Error al eliminar al usuario: ',error.message);
        throw error;
    }
}
export const insertLogDeletedUserService = async (ideliminado,usuario,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Usuarios Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//______________INSERT______________
//______________UPDATE______________
//---------- USUARIOS ✔️
export const updateUserService = async (idusuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idusuario',sql.Int,idusuario)
            .input('nombre',sql.VarChar(150),nombre)
            .input('nombrecorto',sql.VarChar(50),nombrecorto)
            .input('usuario',sql.VarChar(25),usuario)
            .input('contrasena',sql.VarChar(15),contrasena)
            .input('idtipo',sql.Int,idtipo)
            .query('UPDATE usuarios SET nombre = @nombre, nombrecorto = @nombrecorto, usuario = @usuario, contrasena = @contrasena, idtipo = @idtipo WHERE idusuario = @idusuario');

        if(result.rowsAffected[0]>0){
            return 'Usuario actualizado...';
        }else{
            return 'No se pudo actualizar al usuario...';
        }
    }catch(error){
        console.error('Error al actualizar al usuario: ',error.message);
        throw error;
    }
}
export const updateLogUserService = async (idusuario,usuario,nombre,nombrecorto,usuario,contrasena,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Usuarios')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idusuario)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),nombrecorto)
            .input('campo4',sql.VarChar(500),usuario)
            .input('campo5',sql.VarChar(500),contrasena)
            .input('campo6',sql.VarChar(500),idtipo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- PERMISOS ✔️
export const updatePermissionsService = async (idusuario,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('idusuario',sql.Int,idusuario)
          .input('administrador',sql.Bit,administrador)
          .input('chef',sql.Bit,chef)
          .input('almacenista',sql.Bit,almacenista)
          .input('cocinero',sql.Bit,cocinero)
          .input('nutriologo',sql.Bit,nutriologo)
          .input('medico',sql.Bit,medico)
          .query('UPDATE permisos SET administrador = @administrador, chef = @chef, almacenista = @almacenista, cocinero = @cocinero, nutriologo = @nutriologo, medico = @medico WHERE idusuario = @idusuario');

      if(result.rowsAffected[0]>0){
          return 'Permisos actualizados...'
      }else{
          return 'No se pudo actualizar los permisos al usuario...'
      }
  }catch(error){
      console.error('Error al actualizar los permisos al usuario: ',error.message);
      throw error;
  }
}
export const updateLogPermissionsService = async (idpermiso,idusuario,administrador,chef,almacenista,cocinero,nutriologo,medico) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Permisos')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpermiso)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),administrador)
            .input('campo3',sql.VarChar(500),chef)
            .input('campo4',sql.VarChar(500),almacenista)
            .input('campo5',sql.VarChar(500),cocinero)
            .input('campo6',sql.VarChar(500),nutriologo)
            .input('campo7',sql.VarChar(500),medico)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5,campo6,campo7) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
export const updatePermissionService = async (idusuario,superadministrador) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
          .input('idusuario',sql.Int,idusuario)
          .input('superadministrador',sql.Bit,superadministrador)
          .query('UPDATE permisos SET superadministrador = @superadministrador WHERE idusuario = @idusuario');

      if(result.rowsAffected[0]>0){
          return 'Permiso de super administrador actualizado al usuario...'
      }else{
          return 'No se pudo actualizar el permiso de super administrador al usuario...'
      }
  }catch(error){
      console.error('Error al actualizar el permiso de super administrador al usuario: ',error.message);
      throw error;
  }
}
export const updateLogPermissionService = async (idpermiso,idusuario,superadministrador) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Permisos')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idpermiso)
            .input('idusuario',sql.Int,idusuario)
            .input('campo8',sql.VarChar(500),superadministrador)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo8) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo8)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//---------- ESTATUS ✔️
export const updateStatusLogService = async (idusuario,activo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idusuario',sql.Int,idusuario)
            .input('activo',sql.Bit,activo)
            .query('UPDATE estatus SET activo = @activo WHERE idusuario = @idusuario');

        if(result.rowsAffected[0]>0){
            if(activo){
                return 'Usuario activo...'
            }else{
                return 'Usuario inactivo...'
            }
        }else{
            return 'No se pudo Activar/Desactivar al usuario...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus al usuario: ',error.message);
        throw error;
    }
}
export const updateLogStatusLogService = async (idestatus,usuario,activo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Estatus')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idestatus)
            .input('idusuario',sql.Int,usuario)
            .input('campo3',sql.VarChar(500),activo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo3) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo3)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
export const updateStatusEnableService = async (idusuario,habilitado) => {
    try {
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idusuario',sql.Int,idusuario)
            .input('habilitado',sql.Bit,habilitado)
            .query('UPDATE estatus SET habilitado = @habilitado WHERE idusuario = @idusuario');

        if(result.rowsAffected[0]>0){
            if(habilitado){
                return 'Usuario habilitado...';
            }else{
                return 'Usuario deshabilitado...';
            }
        }else{
            return 'No se pudo Habilitar/Deshabilitar al usuario...'
        }
    }catch(error){
        console.error('Error al actualizar el estatus al usuario: ',error.message);
        throw error;
    }
}
export const updateLogStatusEnableService = async (idestatus,usuario,habilitado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Estatus')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idestatus)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),habilitado)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//______________UPDATE______________
//______________DELETE______________
//---------- USUARIOS ELIMINADOS ✔️
export const deleteDeletedUserService = async (idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idusuario',sql.Int,idusuario)
            .query('DELETE FROM usuarioEliminados WHERE idusuario = @idusuario');

        if(result.rowsAffected[0]>0){
            return 'Usuario recuperado...';
        }else{
            return 'No se pudo recuperar al usuario...';
        }
    }catch(error){
        console.error('Error al recuperar al usuario: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedUserService = async (ideliminado,usuario,idusuario) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Usuarios Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,usuario)
            .input('campo2',sql.VarChar(500),idusuario)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2)');

        if(result.rowsAffected[0]>0){
            return 'Operación regisrada...';
        }else{
            return 'No se pudo registrar la operación...';
        }
    }catch(error){
        console.error('Error al registrar la operación: ',error.message);
        throw error;
    }
}
//______________DELETE______________