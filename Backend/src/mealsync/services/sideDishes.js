//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________


//______________GET______________
// ---------- GUARNICIONES ✔️
export const getSideDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM guarnicion');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las guarniciones: ',error.message);
        throw error;
    }
}
// ---------- ESPECIFICACIONES DE GUARNICIONES ✔️
export const getSideDishSpecificationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM especificacionesGuarnicion');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las especificaciones de las guarniciones: ',error.message);
        throw error;
    }
}
// ---------- GUARNICIONES ELIMINADAS ✔️
export const getDeletedSideDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM guarnicionEliminada');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las guarniciones eliminadas: ',error.message);
        throw error;
    }
}
// ---------- ALMACÉN DE GUARNICIONES ✔️
export const getWarehouseSideDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenGuarnicion');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los almacenes de las guarniciones: ',error.message);
        throw error;
    }
}
// ---------- TIPO DE MENU GUARNICIONES ✔️
export const getMenuTypeSideDishesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoMenuGuarnicion');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener el tipo de menú que pertenecen las guarniciones: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
// ---------- GUARNICIONES ✔️
export const insertSideDishService = async (nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(100),nombre)
            .input('idmenu',sql.Int,idmenu)
            .query('INSERT INTO guarnicion (nombre,idmenu) VALUES (@nombre,@idmenu)');

        if(result.rowsAffected[0]>0){
            return 'Guarnicion insertada...';
        }else{
            return 'No se pudo insertar la guarnicion...';
        }
    }catch(error){
        console.error('Error al insertar la guarnicion: ',error.message);
        throw error;
    }
}
export const insertLogSideDishService = async (idguarnicion,idusuario,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Guarniciones')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idguarnicion)
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
// ---------- ESPECIFICACIONES DE GUARNICIONES ✔️
export const insertSideDishSpecificationsService = async (descripcion,precio,preparacion,idguarnicion,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('descripcion',sql.VarChar(500),descripcion)
            .input('precio',sql.Decimal(12,4),precio)
            .input('preparacion',sql.Int,preparacion)
            .input('idguarnicion',sql.Int,idguarnicion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .query('INSERT INTO especificacionesGuarnicion (descripcion,precio,preparacion,idguarnicion,imagen) VALUES (@descripcion,@precio,@preparacion,@idguarnicion,@imagen)');

        if(result.rowsAffected[0]>0){
            return 'Especificaciones de guarnicion insertadas...';
        }else{
            return 'No se pudo insertar las especificaciones de guarnicion...';
        }
    }catch(error){
        console.error('Error al insertar las especificaciones de guarniciom: ',error.message);
        throw error;
    }
}
export const insertLogSideDishSpecificationsService = async (idespecificacion,idusuario,descripcion,precio,preparacion,idguarnicion,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Especificaciones de Guarniciones')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idespecificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),descripcion)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),preparacion)
            .input('campo5',sql.VarChar(500),idguarnicion)
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
// ---------- GUARNICIONES ELIMINADAS ✔️
export const insertDeletedSideDishService = async (idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idguarnicion',sql.Int,idguarnicion)
            .query('INSERT INTO guarnicionEliminada (idguarnicion) VALUES (@idguarnicion)');

        if(result.rowsAffected[0]>0){
            return 'Guarnicion eliminada...';
        }else{
            return 'No se pudo eliminar la guarnicion...';
        }
    }catch(error){
        console.error('Error al eliminar la guarnicion: ',error.message);
        throw error;
    }
}
export const insertLogDeletedSideDishService = async (ideliminado,idusuario,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Guarniciones Eliminadas')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idguarnicion)
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
// ---------- ALMACÉN DE GUARNICIONES ✔️
export const insertWarehouseSideDishService = async (idalmacen,idguarnicion,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idguarnicion',sql.Int,idguarnicion)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .query('INSERT INTO almacenGuarnicion (idalmacen,idguarnicion,cantidad) VALUES (@idalmacen,@idguarnicion,@cantidad)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de guarnicion insertado..';
        }else{
            return 'No se pudo insertar al almacén de guarnicion...';
        }
    }catch(error){
        console.error('Error al insertar al almacén de guarnicion: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseSideDishService = async (idusuario,idalmacen,idguarnicion,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Guarniciones')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idguarnicion)
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
// ---------- TIPO DE MENU GUARNICIONES ✔️
export const insertMenuTypeSideDishService = async (idtipo,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idguarnicion',sql.Int,idguarnicion)
            .query('INSERT INTO tipoMenuGuarnicion (idtipo,idguarnicion) VALUES (@idtipo,@idguarnicion)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú de guarnicion insertado...';
        }else{
            return 'No se pudo insertar al tipo de menú de guarnicion...';
        }
    }catch(error){
        console.error('Error al insertar al tipo de menú de guarnicion: ',error.message);
        throw error;
    }
}
export const insertLogMenuTypeSideDishService = async (idusuario,idtipo,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Guarniciones')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idguarnicion)
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
// ---------- GUARNICIONES ✔️
export const updateSideDishService = async (idguarnicion,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idguarnicion',sql.Int,idguarnicion)
            .input('nombre',sql.VarChar(100),nombre)
            .input('idmenu',sql.Int,idmenu)
            .query('UPDATE guarnicion SET nombre = @nombre, idmenu = @idmenu WHERE idguarnicion = @idguarnicion');

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
export const updateLogSideDishService = async (idguarnicion,idusuario,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Guarniciones')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idguarnicion)
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
// ---------- ESPECIFICACIONES DE GUARNICIONES ✔️
export const updateSideDishSpecificationsService = async (idespecificacion,descripcion,precio,preparacion,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idespecificacion',sql.Int,idespecificacion)
            .input('descripcion',sql.VarChar(500),descripcion)
            .input('precio',sql.Decimal(12,4),precio)
            .input('preparacion',sql.Int,preparacion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .query('UPDATE especificacionesGuarnicion SET descripcion = @descripcion, precio = @precio, preparacion = @preparacion, imagen = @imagen WHERE idespecificacion = @idespecificacion');

        if(result.rowsAffected[0]>0){
            return 'Especificaciones de guarnicion actualizadas...';
        }else{
            return 'No se pudo actualizar las especificaciones de guarnicion...';
        }
    }catch(error){
        console.error('Error al actualizar las especificaciones de guarnicion: ',error.message);
        throw error;
    }
}
export const updateLogSideDishSpecificationsService = async (idespecificacion,idusuario,descripcion,precio,preparacion,idguarnicion,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Especificaciones de Guarniciones')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idespecificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),descripcion)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),preparacion)
            .input('campo5',sql.VarChar(500),idguarnicion)
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
// ---------- ALMACÉN DE GUARNICIONES ✔️
export const updateWarehouseSideDishService = async (idalmacen,idguarnicion,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idguarnicion',sql.Int,idguarnicion)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .query('UPDATE almacenGuarnicion SET cantidad = @cantidad WHERE idguarnicion = @idguarnicion AND idalmacen = @idalmacen');

        if(result.rowsAffected[0]>0){
            return 'Almacén de guarnicion actualizado...';
        }else{
            return 'No se pudo actualizar al almacén de guarnicion...';
        }
    }catch(error){
        console.error('Error al actualizar al almacén de guarnicion: ',error.message);
        throw error;
    }
}
export const updateLogWarehouseSideDishService = async (idusuario,idalmacen,idguarnicion,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Guarniciones')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idguarnicion)
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
// ---------- GUARNICIONES ELIMINADAS ✔️
export const deleteDeletedSideDishService = async (idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idguarnicion',sql.Int,idguarnicion)
            .query('DELETE FROM guarnicionEliminada WHERE idguarnicion = @idguarnicion');

        if(result.rowsAffected[0]>0){
            return 'Guarnicion recuperada...';
        }else{
            return 'No se pudo recuperar la guarnicion...';
        }
    }catch(error){
        console.error('Error al recuperar la guarnicion: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedSideDishService = async (ideliminado,idusuario,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Guarniciones Eliminadas')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idguarnicion)
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
// ---------- TIPO DE MENU GUARNICIONES ✔️
export const deleteMenuTypeSideDishService = async (idtipo,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idguarnicion',sql.Int,idguarnicion)
            .query('DELETE FROM tipoMenuGuarnicion WHERE idtipo = @idtipo AND idguarnicion = @idguarnicion');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú de guarnicion eliminado...';
        }else{
            return 'No se pudo eliminar al tipo de menú de guarnicion...';
        }
    }catch(error){
        console.error('Error al eliminar al tipo de menú de guarnicion: ',error.message);
        throw error;
    }
}
export const deleteLogMenuTypeSideDishService = async (idusuario,idtipo,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Guarniciones')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idguarnicion)
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
// ---------- ALMACÉN DE GUARNICIONES ✔️
export const deleteWarehouseSideDishService = async (idalmacen,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idguarnicion',sql.Int,idguarnicion)
            .query('DELETE FROM almacenGuarnicion WHERE idalmacen = @idalmacen AND idguarnicion = @idguarnicion');

        if(result.rowsAffected[0]>0){
            return 'Almacén de guarnicion eliminado...';
        }else{
            return 'No se pudo eliminar al almacén de guarnicion...';
        }
    }catch(error){
        console.error('Error al eliminar al almacén de guarnicion: ',error.message);
        throw error;
    }
}
export const deleteLogWarehouseSideDishService = async (idusuario,idalmacen,idguarnicion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Guarniciones')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idguarnicion)
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