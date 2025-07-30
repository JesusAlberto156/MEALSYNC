//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________


//______________GET______________
// ---------- PLATILLOS ✔️
export const getDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM platillo');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los platillos: ',error.message);
        throw error;
    }
}
// ---------- ESPECIFICACIONES DE PLATILLOS ✔️
export const getDishSpecificationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM especificacionesPlatillo');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las especificaciones de los platillos: ',error.message);
        throw error;
    }
}
// ---------- PLATILLOS ELIMINADOS ✔️
export const getDeletedDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM platilloEliminado');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los platillos eliminados: ',error.message);
        throw error;
    }
}
// ---------- ALMACÉN DE PLATILLOS ✔️
export const getWarehouseDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenPlatillo');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los almacenes de los platillos: ',error.message);
        throw error;
    }
}
// ---------- TIPO DE MENU PLATILLOS ✔️
export const getMenuTypeDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoMenuPlatillo');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener el tipo de menú que pertenecen los platillos: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
// ---------- PLATILLOS ✔️
export const insertDishService = async (nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(100),nombre)
            .input('idmenu',sql.Int,idmenu)
            .query('INSERT INTO platillo (nombre,idmenu) VALUES (@nombre,@idmenu)');

        if(result.rowsAffected[0]>0){
            return 'Platillo insertado...';
        }else{
            return 'No se pudo insertar al platillo...';
        }
    }catch(error){
        console.error('Error al insertar al platillo: ',error.message);
        throw error;
    }
}
export const insertLogDishService = async (idplatillo,idusuario,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Platillos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idplatillo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),idmenu)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3)');

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
// ---------- ESPECIFICACIONES DE PLATILLOS ✔️
export const insertDishSpecificationsService = async (descripcion,precio,preparacion,idplatillo,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('descripcion',sql.VarChar(500),descripcion)
            .input('precio',sql.Decimal(12,4),precio)
            .input('preparacion',sql.Int,preparacion)
            .input('idplatillo',sql.Int,idplatillo)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .query('INSERT INTO especificacionesPlatillo (descripcion,precio,preparacion,idplatillo,imagen) VALUES (@descripcion,@precio,@preparacion,@idplatillo,@imagen)');

        if(result.rowsAffected[0]>0){
            return 'Especificaciones de platillo insertadas...';
        }else{
            return 'No se pudo insertar las especificaciones de platillo...';
        }
    }catch(error){
        console.error('Error al insertar las especificaciones de platillo: ',error.message);
        throw error;
    }
}
export const insertLogDishSpecificationsService = async (idespecificacion,idusuario,descripcion,precio,preparacion,idplatillo,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Especificaciones de Platillos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idespecificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),descripcion)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),preparacion)
            .input('campo5',sql.VarChar(500),idplatillo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo1,@campo2,@campo3,@campo4,@campo5)');

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
// ---------- PLATILLOS ELIMINADOS ✔️
export const insertDeletedDishService = async (idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idplatillo',sql.Int,idplatillo)
            .query('INSERT INTO platilloEliminado (idplatillo) VALUES (@idplatillo)');

        if(result.rowsAffected[0]>0){
            return 'Platillo eliminado...';
        }else{
            return 'No se pudo eliminar al platillo...';
        }
    }catch(error){
        console.error('Error al eliminar al platillo: ',error.message);
        throw error;
    }
}
export const insertLogDeletedDishService = async (ideliminado,idusuario,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Platillos Eliminados')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idplatillo)
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
// ---------- ALMACÉN DE PLATILLOS ✔️
export const insertWarehouseDishService = async (idalmacen,idplatillo,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idplatillo',sql.Int,idplatillo)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .query('INSERT INTO almacenPlatillo (idalmacen,idplatillo,cantidad) VALUES (@idalmacen,@idplatillo,@cantidad)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de platillo insertado..';
        }else{
            return 'No se pudo insertar al almacén de platillo...';
        }
    }catch(error){
        console.error('Error al insertar al almacén de platillo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseDishService = async (idusuario,idalmacen,idplatillo,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Platillos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idplatillo)
            .input('campo4',sql.VarChar(500),cantidad)
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
// ---------- TIPO DE MENU PLATILLOS ✔️
export const insertMenuTypeDishService = async (idtipo,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idplatillo',sql.Int,idplatillo)
            .query('INSERT INTO tipoMenuPlatillo (idtipo,idplatillo) VALUES (@idtipo,@idplatillo)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú de platillo insertado...';
        }else{
            return 'No se pudo insertar al tipo de menú de platillo...';
        }
    }catch(error){
        console.error('Error al insertar al tipo de menú de platillo: ',error.message);
        throw error;
    }
}
export const insertLogMenuTypeDishService = async (idusuario,idtipo,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Platillos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idplatillo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3)');

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
// ---------- PLATILLOS ✔️
export const updateDishService = async (idplatillo,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idplatillo',sql.Int,idplatillo)
            .input('nombre',sql.VarChar(100),nombre)
            .input('idmenu',sql.Int,idmenu)
            .query('UPDATE platillo SET nombre = @nombre, idmenu = @idmenu WHERE idplatillo = @idplatillo');

        if(result.rowsAffected[0]>0){
            return 'Platillo actualizado...';
        }else{
            return 'No se pudo actualizar al platillo...';
        }
    }catch(error){
        console.error('Error al actualizar al platillo: ',error.message);
        throw error;
    }
}
export const updateLogDishService = async (idplatillo,idusuario,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Platillos')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idplatillo)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),nombre)
            .input('campo3',sql.VarChar(500),idmenu)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3)');

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
// ---------- ESPECIFICACIONES DE PLATILLOS ✔️
export const updateDishSpecificationsService = async (idespecificacion,descripcion,precio,preparacion,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idespecificacion',sql.Int,idespecificacion)
            .input('descripcion',sql.VarChar(500),descripcion)
            .input('precio',sql.Decimal(12,4),precio)
            .input('preparacion',sql.Int,preparacion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .query('UPDATE especificacionesPlatillo SET descripcion = @descripcion, precio = @precio, preparacion = @preparacion, imagen = @imagen WHERE idespecificacion = @idespecificacion');

        if(result.rowsAffected[0]>0){
            return 'Especificaciones de platillo actualizadas...';
        }else{
            return 'No se pudo actualizar las especificaciones de platillo...';
        }
    }catch(error){
        console.error('Error al actualizar las especificaciones de platillo: ',error.message);
        throw error;
    }
}
export const updateLogDishSpecificationsService = async (idespecificacion,idusuario,descripcion,precio,preparacion,idplatillo,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Especificaciones de Platillos')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idespecificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),descripcion)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),preparacion)
            .input('campo5',sql.VarChar(500),idplatillo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo1,@campo2,@campo3,@campo4,@campo5)');

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
// ---------- ALMACÉN DE PLATILLOS ✔️
export const updateWarehouseDishService = async (idalmacen,idplatillo,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idplatillo',sql.Int,idplatillo)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .query('UPDATE almacenPlatillo SET cantidad = @cantidad WHERE idplatillo = @idplatillo AND idalmacen = @idalmacen');

        if(result.rowsAffected[0]>0){
            return 'Almacén de platillo actualizado...';
        }else{
            return 'No se pudo actualizar al almacén de platillo...';
        }
    }catch(error){
        console.error('Error al actualizar al almacén de platillo: ',error.message);
        throw error;
    }
}
export const updateLogWarehouseDishService = async (idusuario,idalmacen,idplatillo,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Platillos')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idplatillo)
            .input('campo4',sql.VarChar(500),cantidad)
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
//______________UPDATE______________
//______________DELETE______________
// ---------- PLATILLOS ELIMINADOS ✔️
export const deleteDeletedDishService = async (idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idplatillo',sql.Int,idplatillo)
            .query('DELETE FROM platilloEliminado WHERE idplatillo = @idplatillo');

        if(result.rowsAffected[0]>0){
            return 'Platillo recuperado...';
        }else{
            return 'No se pudo recuperar al platillo...';
        }
    }catch(error){
        console.error('Error al recuperar al platillo: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedDishService = async (ideliminado,idusuario,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Platillos Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idplatillo)
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
// ---------- TIPO DE MENU PLATILLOS ✔️
export const deleteMenuTypeDishService = async (idtipo,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idplatillo',sql.Int,idplatillo)
            .query('DELETE FROM tipoMenuPlatillo WHERE idtipo = @idtipo AND idplatillo = @idplatillo');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú de platillo eliminado...';
        }else{
            return 'No se pudo eliminar al tipo de menú de platillo...';
        }
    }catch(error){
        console.error('Error al eliminar al tipo de menú de platillo: ',error.message);
        throw error;
    }
}
export const deleteLogMenuTypeDishService = async (idusuario,idtipo,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Platillos')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idplatillo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3)');

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
// ---------- ALMACÉN DE PLATILLOS ✔️
export const deleteWarehouseDishService = async (idalmacen,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idplatillo',sql.Int,idplatillo)
            .query('DELETE FROM almacenPlatillo WHERE idalmacen = @idalmacen AND idplatillo = @idplatillo');

        if(result.rowsAffected[0]>0){
            return 'Almacén de platillo eliminado...';
        }else{
            return 'No se pudo eliminar al almacén de platillo...';
        }
    }catch(error){
        console.error('Error al eliminar al almacén de platillo: ',error.message);
        throw error;
    }
}
export const deleteLogWarehouseDishService = async (idusuario,idalmacen,idplatillo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Platillos')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idplatillo)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3)');

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