//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- PRECIO DEL INSUMO
export const getSupplyPricesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM precioInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los precios del almacén por insumo: ',error.message);
        throw error;
    }
}
//---------- PRECIO DEL INSUMO
//---------- ALMACEN
export const getWarehouseService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacen');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén: ',error.message);
        throw error;
    }
}
//---------- ALMACEN
//---------- INSUMOS ELIMINADOS
export const getDeletedSuppliesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM insumosEliminados');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los insumos, tipos de insumo o medidas eliminadas: ',error.message);
        throw error;
    }
}
//---------- INSUMOS ELIMINADOS
//---------- TIPOS DE INSUMO ELIMINADOS
export const getDeletedWarehouseService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoInsumoEliminado');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los insumos eliminados del almacén: ',error.message);
        throw error;
    }
}
//---------- TIPOS DE INSUMO ELIMINADOS
//______________GET______________
//______________INSERT______________
//---------- PRECIO DEL INSUMO
export const insertSupplyPriceService = async (precio,fecha,idinsumo,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('precio',sql.Decimal(12,4),precio)
            .input('fecha',sql.DateTime,fecha)
            .input('idinsumo',sql.Int,idinsumo)
            .input('estado',sql.VarChar(20),estado)
            .query('INSERT INTO precioInsumo (precio,fecha,idinsumo,estado) VALUES (@precio,@fecha,@idinsumo,@estado)');

        if(result.rowsAffected[0]>0){
            return 'Precio del almacén por insumo insertado...';
        }else{
            return 'No se pudo insertar al precio del almacén por insumo...';
        }
    }catch(error){
        console.error('Error al insertar al precio del almacén por insumo: ',error.message);
        throw error;
    }
}
//---------- PRECIO DEL INSUMO
//---------- ALMACEN
export const insertWarehouseService = async (cantidad,observacion,idprecio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidad',sql.Int,cantidad)
            .input('observacion',sql.VarChar(250),observacion)
            .input('idprecio',sql.Int,idprecio)
            .query('INSERT INTO almacen (cantidad,observacion,idprecio) VALUES (@cantidad,@observacion,@idprecio)');

        if(result.rowsAffected[0]>0){
            return 'Cantidad del almacén por insumo insertado...';
        }else{
            return 'No se pudo insertar la cantidad del almacén por insumo...';
        }
    }catch(error){
        console.error('Error al insertar la cantidad del almacén por insumo: ',error.message);
        throw error;
    }
}
//---------- ALMACEN
//---------- INSUMOS ELIMINADOS
export const insertDeletedSupplyService = async (tabla,idtabla) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla',sql.VarChar(20),tabla)
            .input('idtabla',sql.Int,idtabla)
            .query('INSERT INTO insumosEliminados (idtabla,tabla) VALUES (@idtabla,@tabla)');

        if(result.rowsAffected[0]>0){
            if(tabla === 'INSUMOS'){
                return 'Insumo Eliminado...';
            }
            if(tabla === 'TIPOS DE INSUMO'){
                return 'Tipo de insumo Eliminado...';
            }
            if(tabla === 'MEDIDAS'){
                return 'Medida Eliminada...';
            }
        }else{
            if(tabla === 'INSUMOS'){
                return 'No se pudo eliminar al insumo...';
            }
            if(tabla === 'TIPOS DE INSUMO'){
                return 'No se pudo eliminar al tipo de insumo...';
            }
            if(tabla === 'MEDIDAS'){
                return 'No se pudo eliminar la medida...';
            }
        }
    }catch(error){
        if(tabla === 'INSUMOS'){
            console.error('Error al eliminar al insumo: ',error.message);
        }
        if(tabla === 'TIPOS DE INSUMO'){
            console.error('Error al eliminar al tipo de insumo: ',error.message);
        }
        if(tabla === 'MEDIDAS'){
            console.error('Error al eliminar la medida: ',error.message);
        }
        throw error;
    }
}
//---------- INSUMOS ELIMINADOS
//---------- TIPOS DE INSUMO ELIMINADOS
export const insertDeletedWarehouseService = async (idtipo,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('cantidad',sql.Decimal(12,4),cantidad)
            .query('INSERT INTO tipoInsumoEliminado (idtipo,cantidad) VALUES (@idtipo,@cantidad)');

        if(result.rowsAffected[0]>0){
            return 'Insumo del almacén Eliminado...';
        }else{
            return 'No se pudo eliminar al insumo del almacén...';
        }
    }catch(error){
        console.error('Error al eliminar al insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- TIPOS DE INSUMO ELIMINADOS
//______________INSERT______________
//______________UPDATE______________
//---------- INSUMOS
export const updateSupplyService = async (idinsumo,nombre,descripcion,imagen,idproveedor,idtipo) => {
  try{
      const pool = await conexionDB();
      const result = await pool.request()
        .input('idinsumo',sql.Int,idinsumo)
        .input('nombre',sql.VarChar(150),nombre)
        .input('descripcion',sql.VarChar(250),descripcion)
        .input('imagen',sql.VarChar(sql.MAX),imagen)
        .input('idproveedor',sql.Int,idproveedor)
        .input('idtipo',sql.Int,idtipo)
        .query('UPDATE insumos SET nombre = @nombre, descripcion = @descripcion, imagen = @imagen, idproveedor = @idproveedor, @idtipo = idtipo WHERE idinsumo = @idinsumo');

      if(result.rowsAffected[0]>0){
          return 'Insumo actualizado...'
      }else{
          return 'No se pudo actualizar al insumo...'
      }
  }catch(error){
      console.error('Error al actualizar al insumo: ',error.message);
      throw error;
  }
}
//---------- INSUMOS
//---------- TIPO DE INSUMOS
export const updateSupplyTypeService = async (idtipo,tipo,descripcion,idmedida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('tipo',sql.VarChar(150),tipo)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('idmedida',sql.Int,idmedida)
            .query('UPDATE tipoInsumo SET tipo = @tipo, descripcion = @descripcion, idmedida = @idmedida WHERE idtipo = @idtipo');
  
        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo actualizado...'
        }else{
            return 'No se pudo actualizar al tipo de insumo...'
        }
    }catch(error){
        console.error('Error al actualizar al tipo de insumo: ',error.message);
        throw error;
    }
}
export const updateSupplyTypeTypeDescriptionService = async (tipoOriginal,tipo,descripcion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tipoOriginal',sql.VarChar(150),tipoOriginal)
            .input('tipo',sql.VarChar(150),tipo)
            .input('descripcion',sql.VarChar(250),descripcion)
            .query('UPDATE tipoInsumo SET tipo = @tipo, descripcion = @descripcion WHERE tipo = @tipoOriginal');
  
        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo actualizado...'
        }else{
            return 'No se pudo actualizar al tipo de insumo...'
        }
    }catch(error){
        console.error('Error al actualizar al tipo de insumo: ',error.message);
        throw error;
    }
}
//---------- TIPO DE INSUMOS
//---------- MEDIDA
export const updateUnitService = async (idmedida,nombre,unidad,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idmedida',sql.Int,idmedida)
            .input('nombre',sql.VarChar(20),nombre)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .input('unidad',sql.VarChar(20),unidad)
            .query('UPDATE medida SET nombre = @nombre, cantidad = @cantidad, unidad = @unidad WHERE idmedida = @idmedida');
  
        if(result.rowsAffected[0]>0){
            return 'Medida actualizada...'
        }else{
            return 'No se pudo actualizar la medida...'
        }
    }catch(error){
        console.error('Error al actualizar la medida: ',error.message);
        throw error;
    }
}
export const updateUnitNameUnitService = async (nombreOriginal,nombre,unidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombreOriginal',sql.VarChar(20),nombreOriginal)
            .input('nombre',sql.VarChar(20),nombre)
            .input('unidad',sql.VarChar(20),unidad)
            .query('UPDATE medida SET nombre = @nombre, unidad = @unidad WHERE nombre = @nombreOriginal');
  
        if(result.rowsAffected[0]>0){
            return 'Medida actualizada...'
        }else{
            return 'No se pudo actualizar la medida...'
        }
    }catch(error){
        console.error('Error al actualizar la medida: ',error.message);
        throw error;
    }
}
//---------- MEDIDA
//---------- PRECIO DEL INSUMO
export const updateSupplyPricePriceService = async (idprecio,precio) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idprecio',sql.Int,idprecio)
            .input('precio',sql.Decimal(12,4),precio)
            .query('UPDATE precioInsumo SET precio = @precio WHERE idprecio = @idprecio');
  
        if(result.rowsAffected[0]>0){
            return 'Precio del almacén por insumo actualizado...'
        }else{
            return 'No se pudo actualizar el precio del almacén por insumo...'
        }
    }catch(error){
        console.error('Error al actualizar el precio del almacén por insumo: ',error.message);
        throw error;
    }
}
export const updateSupplyPriceStateService = async (idprecio,estado) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idprecio',sql.Int,idprecio)
            .input('estado',sql.VarChar(20),estado)
            .query('UPDATE precioInsumo SET estado = @estado WHERE idprecio = @idprecio');
  
        if(result.rowsAffected[0]>0){
            return 'Estado del precio del almacén por insumo actualizado...'
        }else{
            return 'No se pudo actualizar el estado del precio del almacén por insumo...'
        }
    }catch(error){
        console.error('Error al actualizar el estado del precio del almacén por insumo: ',error.message);
        throw error;
    }
}
//---------- PRECIO DEL INSUMO
//---------- ALMACEN
export const updateWarehouseQuantityService = async (idalmacen,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('cantidad',sql.Int,cantidad)
            .query('UPDATE almacen SET cantidad = @cantidad WHERE idalmacen = @idalmacen');
  
        if(result.rowsAffected[0]>0){
            return 'Cantidad del almacén por insumo actualizado...'
        }else{
            return 'No se pudo actualizar la cantidad del almacén por insumo...'
        }
    }catch(error){
        console.error('Error al actualizar la cantidad del almacén por insumo: ',error.message);
        throw error;
    }
}
export const updateWarehouseObservationService = async (idalmacen,observacion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idalmacen',sql.Int,idalmacen)
            .input('observacion',sql.VarChar(250),observacion)
            .query('UPDATE almacen SET observacion = @observacion WHERE idalmacen = @idalmacen');
  
        if(result.rowsAffected[0]>0){
            return 'Observación de la cantidad del almacén por insumo actualizada...'
        }else{
            return 'No se pudo actualizar la observación de la cantidad del almacén por insumo...'
        }
    }catch(error){
        console.error('Error al actualizar la observación de la cantidad del almacén por insumo: ',error.message);
        throw error;
    }
}
//---------- ALMACEN
//---------- TIPOS DE INSUMO ELIMINADOS
export const updateDeletedWarehouseService = async (ideliminado,idtipo,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('ideliminado',sql.Int,ideliminado)
            .input('idtipo',sql.Int,idtipo)
            .input('cantidad',sql.Decimal(12,4),cantidad)
            .query('UPDATE tipoInsumoEliminado SET idtipo = @idtipo, cantidad = @cantidad WHERE ideliminado = @ideliminado');
  
        if(result.rowsAffected[0]>0){
            return 'Insumo del almacén actualizado...'
        }else{
            return 'No se pudo actualizar el insumo del almacén...'
        }
    }catch(error){
        console.error('Error al actualizar el insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- TIPOS DE INSUMO ELIMINADOS
//______________UPDATE______________
//______________DELETE______________
//---------- INSUMOS ELIMINADOS
export const deleteDeletedSupplyService = async (ideliminado,tabla) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('ideliminado',sql.Int,ideliminado)
            .query('DELETE FROM insumosEliminados WHERE ideliminado = @ideliminado');

        if(result.rowsAffected[0]>0){
            if(tabla === 'INSUMOS'){
                return 'Insumo recuperado...';
            }
            if(tabla === 'TIPOS DE INSUMO'){
                return 'Tipo de insumo recuperado...';
            }
            if(tabla === 'MEDIDAS'){
                return 'Medida recuperado...';
            }
        }else{
            if(tabla === 'INSUMOS'){
                return 'No se pudo recuperar al insumo...';
            }
            if(tabla === 'TIPOS DE INSUMO'){
                return 'No se pudo recuperar al tipo de insumo...';
            }
            if(tabla === 'MEDIDAS'){
                return 'No se pudo recuperar la medida...';
            }
        }
    }catch(error){
        if(tabla === 'INSUMOS'){
            console.error('Error al recuperar al insumo: ',error.message);
        }
        if(tabla === 'TIPOS DE INSUMO'){
            console.error('Error al recuperar al tipo de insumo: ',error.message);
        }
        if(tabla === 'MEDIDAS'){
            console.error('Error al recuperar la medida: ',error.message);
        }
        throw error;
    }
}
//---------- INSUMOS ELIMINADOS
//---------- TIPOS DE INSUMO ELIMINADOS
export const deleteDeletedWarehouseService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .query('DELETE FROM tipoInsumoEliminado WHERE idtipo = @idtipo');

        if(result.rowsAffected[0]>0){
            return 'Insumo del almacén recuperado...';
        }else{
            return 'No se pudo recuperar al insumo del almacén...';
        }
    }catch(error){
        console.error('Error al recuperar al insumo del almacén: ',error.message);
        throw error;
    }
}
//---------- TIPOS DE INSUMO ELIMINADOS
//______________DELETE______________