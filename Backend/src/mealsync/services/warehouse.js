//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- INSUMOS
export const getSuppliesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM insumos');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los insumos: ',error.message);
        throw error;
    }
}
//---------- INSUMOS
//---------- TIPO DE INSUMOS
export const getSupplyTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM tipoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los tipos de insumos: ',error.message);
        throw error;
    }
}
//---------- TIPO DE INSUMOS
//---------- MEDIDA
export const getUnitsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM medida');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener las medidas de los insumos: ',error.message);
        throw error;
    }
}
//---------- MEDIDA
//---------- PRECIO DEL INSUMO
export const getSupplyPricesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM precioInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los precios de los insumos: ',error.message);
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
        console.error('Error al obtener el almacen: ',error.message);
        throw error;
    }
}
//---------- ALMACEN
//______________GET______________
//______________INSERT______________
//---------- INSUMOS
export const insertSupplyService = async (nombre,descripcion,imagen,idproveedor,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('nombre',sql.VarChar(150),nombre)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('imagen',sql.VarChar(sql.MAX),imagen)
            .input('idproveedor',sql.Int,idproveedor)
            .input('idtipo',sql.Int,idtipo)
            .query('INSERT INTO insumos (nombre,descripcion,imagen,idproveedor,idtipo) VALUES (@nombre,@descripcion,@imagen,@idproveedor,@idtipo)');

        if(result.rowsAffected[0]>0){
            return 'Insumo insertado...';
        }else{
            return 'No se pudo insertar el insumo...';
        }
    }catch(error){
        console.error('Error al insertar el insumo: ',error.message);
        throw error;
    }
}
//---------- INSUMOS
//---------- TIPO DE INSUMOS
export const insertSupplyTypeService = async (tipo,descripcion,idmedida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tipo',sql.VarChar(150),tipo)
            .input('descripcion',sql.VarChar(250),descripcion)
            .input('idmedida',sql.Int,idmedida)
            .query('INSERT INTO tipoInsumo (tipo,descripcion,idmedida) VALUES (@tipo,@descripcion,@idmedida)');

        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo insertado...';
        }else{
            return 'No se pudo insertar el tipo de insumo...';
        }
    }catch(error){
        console.error('Error al insertar el tipo de insumo: ',error.message);
        throw error;
    }
}
//---------- TIPO DE INSUMOS
//---------- MEDIDA
export const insertUnitService = async (medida,unidad,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('medida',sql.VarChar(20),medida)
            .input('unidad',sql.VarChar(20),unidad)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .query('INSERT INTO medida (medida,unidad,cantidad) VALUES (@medida,@unidad,@cantidad)');

        if(result.rowsAffected[0]>0){
            return 'Medida insertado...';
        }else{
            return 'No se pudo insertar la medida...';
        }
    }catch(error){
        console.error('Error al insertar la medida: ',error.message);
        throw error;
    }
}
//---------- MEDIDA
//---------- PRECIO DEL INSUMO

//---------- PRECIO DEL INSUMO
//---------- ALMACEN

//---------- ALMACEN
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
          return 'No pudo actualizar el insumo...'
      }
  }catch(error){
      console.error('Error al actualizar el insumo: ',error.message);
      throw error;
  }
}
//---------- INSUMOS
//---------- TIPO DE INSUMOS
export const updateSupplyTypeService = async (idtipo,tipo,descripcion,idmedida) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
          .input('tipo',sql.VarChar(150),tipo)
          .input('descripcion',sql.VarChar(250),descripcion)
          .input('idmedida',sql.Int,idmedida)
          .input('idtipo',sql.Int,idtipo)
          .query('UPDATE tipoInsumo SET tipo = @tipo, descripcion = @descripcion, idmedida = @idmedida WHERE idtipo = @idtipo');
  
        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo actualizado...'
        }else{
            return 'No pudo actualizar el tipo de insumo...'
        }
    }catch(error){
        console.error('Error al actualizar el tipo de insumo: ',error.message);
        throw error;
    }
}
export const updateSupplyTypeTypeService = async (tipo,descripcion,tipoOriginal) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
          .input('tipo',sql.VarChar(150),tipo)
          .input('tipoOriginal',sql.VarChar(150),tipoOriginal)
          .input('descripcion',sql.VarChar(250),descripcion)
          .query('UPDATE tipoInsumo SET tipo = @tipo, descripcion = @descripcion WHERE tipo = @tipoOriginal');
  
        if(result.rowsAffected[0]>0){
            return 'Tipo de insumo actualizado...'
        }else{
            return 'No pudo actualizar el tipo de insumo...'
        }
    }catch(error){
        console.error('Error al actualizar el tipo de insumo: ',error.message);
        throw error;
    }
}
//---------- TIPO DE INSUMOS
//---------- MEDIDA
export const updateUnitService = async (idmedida,medida,unidad,cantidad) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('medida',sql.VarChar(20),medida)
            .input('unidad',sql.VarChar(20),unidad)
            .input('cantidad',sql.Decimal(10,4),cantidad)
            .input('idmedida',sql.Int,idmedida)
            .query('UPDATE medida SET medida = @medida, unidad = @unidad, cantidad = @cantidad WHERE idmedida = @idmedida');
  
        if(result.rowsAffected[0]>0){
            return 'Medida actualizada...'
        }else{
            return 'No pudo actualizar la medida...'
        }
    }catch(error){
        console.error('Error al actualizar la medida: ',error.message);
        throw error;
    }
}
//---------- MEDIDA
//---------- PRECIO DEL INSUMO

//---------- PRECIO DEL INSUMO
//---------- ALMACEN

//---------- ALMACEN
//______________UPDATE______________