//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________


//______________GET______________
// ---------- BEBIDAS ✔️
export const getDrinksService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM bebida');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las bebidas: ',error.message);
        throw error;
    }
}
// ---------- ESPECIFICACIONES DE BEBIDAS ✔️
export const getDrinkSpecificationsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM especificacionesBebida');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las especificaciones de las bebidas: ',error.message);
        throw error;
    }
}
// ---------- BEBIDAS ELIMINADAS ✔️
export const getDeletedDrinksService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM bebidaEliminada');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener las bebidas eliminadas: ',error.message);
        throw error;
    }
}
// ---------- ALMACÉN DE BEBIDAS ✔️
export const getWarehouseDrinksService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenBebida');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener los almacenes de las bebidas: ',error.message);
        throw error;
    }
}
// ---------- TIPO DE MENU BEBIDAS ✔️
export const getMenuTypeDrinksService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoMenuBebida');
    
        const jsonData = JSON.stringify(result.recordset);
    
        const encryptedData = encryptData(jsonData);
    
        return encryptedData;
    }catch(error){
        console.error('Error al obtener el tipo de menú que pertenecen las bebidas: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
// ---------- BEBIDAS ✔️
export const insertDrinkService = async (nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(100),nombre)
            .input('idmenu',sql.Int,idmenu)
            .query('INSERT INTO bebida (nombre,idmenu) VALUES (@nombre,@idmenu)');

        if(result.rowsAffected[0]>0){
            return 'Bebida insertada...';
        }else{
            return 'No se pudo insertar la bebida...';
        }
    }catch(error){
        console.error('Error al insertar la bebida: ',error.message);
        throw error;
    }
}
export const insertLogDrinkService = async (idbebida,idusuario,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Bebidas')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idbebida)
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
// ---------- ESPECIFICACIONES DE BEBIDAS ✔️
export const insertDrinkSpecificationsService = async (descripcion,precio,preparacion,idbebida,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('descripcion',sql.VarChar(500),descripcion)
            .input('precio',sql.Decimal(12,4),precio)
            .input('preparacion',sql.Int,preparacion)
            .input('idbebida',sql.Int,idbebida)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .query('INSERT INTO especificacionesBebida (descripcion,precio,preparacion,idbebida,imagen) VALUES (@descripcion,@precio,@preparacion,@idbebida,@imagen)');

        if(result.rowsAffected[0]>0){
            return 'Especificaciones de bebida insertadas...';
        }else{
            return 'No se pudo insertar las especificaciones de bebida...';
        }
    }catch(error){
        console.error('Error al insertar las especificaciones de bebida: ',error.message);
        throw error;
    }
}
export const insertLogDrinkSpecificationsService = async (idespecificacion,idusuario,descripcion,precio,preparacion,idbebida,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Especificaciones de Bebidas')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idespecificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),descripcion)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),preparacion)
            .input('campo5',sql.VarChar(500),idbebida)
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
// ---------- BEBIDAS ELIMINADAS ✔️
export const insertDeletedDrinkService = async (idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idbebida',sql.Int,idbebida)
            .query('INSERT INTO bebidaEliminada (idbebida) VALUES (@idbebida)');

        if(result.rowsAffected[0]>0){
            return 'Bebida eliminado...';
        }else{
            return 'No se pudo eliminar la bebida...';
        }
    }catch(error){
        console.error('Error al eliminar la bebida: ',error.message);
        throw error;
    }
}
export const insertLogDeletedDrinkService = async (ideliminado,idusuario,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Bebidas Eliminadas')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idbebida)
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
// ---------- ALMACÉN DE BEBIDAS ✔️
export const insertWarehouseDrinkService = async (idalmacen,idbebida,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idbebida',sql.Int,idbebida)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .query('INSERT INTO almacenBebida (idalmacen,idbebida,cantidad) VALUES (@idalmacen,@idbebida,@cantidad)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de bebida insertado..';
        }else{
            return 'No se pudo insertar al almacén de bebida...';
        }
    }catch(error){
        console.error('Error al insertar al almacén de bebida: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseDrinkService = async (idusuario,idalmacen,idbebida,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Bebidas')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idbebida)
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
// ---------- TIPO DE MENU BEBIDAS ✔️
export const insertMenuTypeDrinkService = async (idtipo,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idbebida',sql.Int,idbebida)
            .query('INSERT INTO tipoMenuBebida (idtipo,idbebida) VALUES (@idtipo,@idbebida)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú de bebida insertado...';
        }else{
            return 'No se pudo insertar al tipo de menú de bebida...';
        }
    }catch(error){
        console.error('Error al insertar al tipo de menú de bebida: ',error.message);
        throw error;
    }
}
export const insertLogMenuTypeDrinkService = async (idusuario,idtipo,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Bebidas')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idbebida)
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
// ---------- BEBIDAS ✔️
export const updateDrinkService = async (idbebida,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idbebida',sql.Int,idbebida)
            .input('nombre',sql.VarChar(100),nombre)
            .input('idmenu',sql.Int,idmenu)
            .query('UPDATE bebida SET nombre = @nombre, idmenu = @idmenu WHERE idbebida = @idbebida');

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
export const updateLogDrinkService = async (idbebida,idusuario,nombre,idmenu) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Bebidas')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idbebida)
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
// ---------- ESPECIFICACIONES DE BEBIDAS ✔️
export const updateDrinkSpecificationsService = async (idespecificacion,descripcion,precio,preparacion,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idespecificacion',sql.Int,idespecificacion)
            .input('descripcion',sql.VarChar(500),descripcion)
            .input('precio',sql.Decimal(12,4),precio)
            .input('preparacion',sql.Int,preparacion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .query('UPDATE especificacionesBebida SET descripcion = @descripcion, precio = @precio, preparacion = @preparacion, imagen = @imagen WHERE idespecificacion = @idespecificacion');

        if(result.rowsAffected[0]>0){
            return 'Especificaciones de bebida actualizadas...';
        }else{
            return 'No se pudo actualizar las especificaciones de bebida...';
        }
    }catch(error){
        console.error('Error al actualizar las especificaciones de bebida: ',error.message);
        throw error;
    }
}
export const updateLogDrinkSpecificationsService = async (idespecificacion,idusuario,descripcion,precio,preparacion,idbebida,imagen) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Especificaciones de Bebidas')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,idespecificacion)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(500),imagen)
            .input('campo2',sql.VarChar(500),descripcion)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),preparacion)
            .input('campo5',sql.VarChar(500),idbebida)
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
// ---------- ALMACÉN DE BEBIDAS ✔️
export const updateWarehouseDrinkService = async (idalmacen,idbebida,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idbebida',sql.Int,idbebida)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .query('UPDATE almacenBebida SET cantidad = @cantidad WHERE idbebida = @idbebida AND idalmacen = @idalmacen');

        if(result.rowsAffected[0]>0){
            return 'Almacén de bebida actualizado...';
        }else{
            return 'No se pudo actualizar al almacén de bebida...';
        }
    }catch(error){
        console.error('Error al actualizar al almacén de bebida: ',error.message);
        throw error;
    }
}
export const updateLogWarehouseDrinkService = async (idusuario,idalmacen,idbebida,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Bebidas')
            .input('operacion', sql.VarChar(20), 'UPDATE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idbebida)
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
// ---------- BEBIDAS ELIMINADAS ✔️
export const deleteDeletedDrinkService = async (idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idbebida',sql.Int,idbebida)
            .query('DELETE FROM bebidaEliminada WHERE idbebida = @idbebida');

        if(result.rowsAffected[0]>0){
            return 'Bebida recuperada...';
        }else{
            return 'No se pudo recuperar la bebida...';
        }
    }catch(error){
        console.error('Error al recuperar la bebida: ',error.message);
        throw error;
    }
}
export const deleteLogDeletedDrinkService = async (ideliminado,idusuario,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Bebidas Eliminados')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,ideliminado)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idbebida)
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
// ---------- TIPO DE MENU BEBIDAS ✔️
export const deleteMenuTypeDrinkService = async (idtipo,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('idbebida',sql.Int,idbebida)
            .query('DELETE FROM tipoMenuBebida WHERE idtipo = @idtipo AND idbebida = @idbebida');

        if(result.rowsAffected[0]>0){
            return 'Tipo de menú de bebida eliminado...';
        }else{
            return 'No se pudo eliminar al tipo de menú de bebida...';
        }
    }catch(error){
        console.error('Error al eliminar al tipo de menú de bebida: ',error.message);
        throw error;
    }
}
export const deleteLogMenuTypeDrinkService = async (idusuario,idtipo,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Tipos de Menu Bebidas')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idtipo)
            .input('campo3',sql.VarChar(500),idbebida)
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
// ---------- ALMACÉN DE BEBIDAS ✔️
export const deleteWarehouseDrinkService = async (idalmacen,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('idbebida',sql.Int,idbebida)
            .query('DELETE FROM almacenBebida WHERE idalmacen = @idalmacen AND idbebida = @idbebida');

        if(result.rowsAffected[0]>0){
            return 'Almacén de bebida eliminado...';
        }else{
            return 'No se pudo eliminar al almacén de bebida...';
        }
    }catch(error){
        console.error('Error al eliminar al almacén de bebida: ',error.message);
        throw error;
    }
}
export const deleteLogWarehouseDrinkService = async (idusuario,idalmacen,idbebida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacén de Bebidas')
            .input('operacion', sql.VarChar(20), 'DELETE')
            .input('idtabla',sql.Int,0)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),idalmacen)
            .input('campo3',sql.VarChar(500),idbebida)
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