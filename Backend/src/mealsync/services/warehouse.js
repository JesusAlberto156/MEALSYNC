//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- ALMACEN DE CATEGORIAS ✔️
export const getWarehouseCategoriesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenCategorias');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por categorías: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE TIPOS DE INSUMO ✔️
export const getWarehouseSupplyTypesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenTipoInsumo');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por tipos de insumo: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE LIMPIEZA ✔️
export const getWarehouseCleaningService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenLimpieza');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por limpieza: ',error.message);
        throw error;
    }
}
//---------- ALMACEN DE GASTOS FIJOS ✔️
export const getWarehouseFixedExpensesService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM almacenGastosFijos');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener el almacén por gastos fijos: ',error.message);
        throw error;
    }
}
//______________GET______________
//______________INSERT______________
//---------- ALMACEN DE CATEGORIAS ✔️
export const insertWarehouseCategoryStartService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenCategorias (cantidadreal,precio,idcategoria,transaccion) VALUES (0,0,@idcategoria,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de la categoría insertado...';
        }else{
            return 'No se pudo insertar el almacén de la categoría...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de la categoría: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCategoryStartService = async (idalmacen,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Categorias')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),'Inicial')
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
export const insertWarehouseCategoryService = async (cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenCategorias (cantidadreal,precio,idcategoria,transaccion) VALUES (@cantidadreal,@precio,@idcategoria,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de la categoría insertado...';
        }else{
            return 'No se pudo insertar el almacén de la categoría...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de la categoría: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCategoryService = async (idalmacen,idusuario,cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Categorias')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),transaccion)
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
//---------- ALMACEN DE TIPOS DE INSUMO ✔️
export const insertWarehouseSupplyTypeStartService = async (idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenTipoInsumo (cantidadreal,precio,idtipo,transaccion) VALUES (0,0,@idtipo,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén del tipo de insumo insertado...';
        }else{
            return 'No se pudo insertar el almacén del tipo de insumo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén del tipo de insumo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseSupplyTypeStartService = async (idalmacen,idusuario,idtipo) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idtipo)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),'Inicial')
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
export const insertWarehouseSupplyTypeService = async (cantidadreal,precio,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idtipo',sql.Int,idtipo)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenTipoInsumo (cantidadreal,precio,idtipo,transaccion) VALUES (@cantidadreal,@precio,@idtipo,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén del tipo de insumo insertado...';
        }else{
            return 'No se pudo insertar el almacén del tipo de insumo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén del tipo de insumo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseSupplyTypeService = async (idalmacen,idusuario,cantidadreal,precio,idtipo,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Tipos de Insumo')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idtipo)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),transaccion)
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
//---------- ALMACEN DE LIMPIEZA ✔️
export const insertWarehouseCleaningStartService = async (idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenLimpieza (cantidadreal,precio,idcategoria,transaccion) VALUES (0,0,@idcategoria,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningStartService = async (idalmacen,idusuario,idcategoria) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),'0')
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),'Inicial')
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
export const insertWarehouseCleaningService = async (cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('cantidadreal',sql.Decimal(12,4),cantidadreal)
            .input('precio',sql.Decimal(12,4),precio)
            .input('idcategoria',sql.Int,idcategoria)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenLimpieza (cantidadreal,precio,idcategoria,transaccion) VALUES (@cantidadreal,@precio,@idcategoria,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de limpieza insertado...';
        }else{
            return 'No se pudo insertar el almacén de limpieza...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de limpieza: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseCleaningService = async (idalmacen,idusuario,cantidadreal,precio,idcategoria,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Limpieza')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),cantidadreal)
            .input('campo3',sql.VarChar(500),precio)
            .input('campo4',sql.VarChar(500),idcategoria)
            .input('campo5',sql.VarChar(500),new Date().toISOString())
            .input('campo6',sql.VarChar(500),transaccion)
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
//---------- ALMACEN DE GASTOS FIJOS ✔️
export const insertWarehouseFixedExpenseStartService = async (idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('idgasto',sql.Int,idgasto)
            .input('transaccion',sql.VarChar(20),'Inicial')
            .query('INSERT INTO almacenGastosFijos (precio,idgasto,transaccion) VALUES (0,@idgasto,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de gasto fijo insertado...';
        }else{
            return 'No se pudo insertar el almacén de gasto fijo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de gasto fijo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseFixedExpenseStartService = async (idalmacen,idusuario,idgasto) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Gastos Fijos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),'0')
            .input('campo3',sql.VarChar(500),idgasto)
            .input('campo4',sql.VarChar(500),new Date().toISOString())
            .input('campo5',sql.VarChar(500),'Inicial')
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5)');

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
export const insertWarehouseFixedExpenseService = async (precio,idgasto,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('precio',sql.Decimal(10,4),precio)
            .input('idgasto',sql.Int,idgasto)
            .input('transaccion',sql.VarChar(20),transaccion)
            .query('INSERT INTO almacenGastosFijos (precio,idgasto,transaccion) VALUES (@precio,@idgasto,@transaccion)');

        if(result.rowsAffected[0]>0){
            return 'Almacén de gasto fijo insertado...';
        }else{
            return 'No se pudo insertar el almacén de gasto fijo...';
        }
    }catch(error){
        console.error('Error al insertar el almacén de gasto fijo: ',error.message);
        throw error;
    }
}
export const insertLogWarehouseFixedExpenseService = async (idalmacen,idusuario,precio,idgasto,transaccion) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla', sql.VarChar(50), 'Almacen por Gastos Fijos')
            .input('operacion', sql.VarChar(20), 'INSERT')
            .input('idtabla',sql.Int,idalmacen)
            .input('idusuario',sql.Int,idusuario)
            .input('campo2',sql.VarChar(500),precio)
            .input('campo3',sql.VarChar(500),idgasto)
            .input('campo4',sql.VarChar(500),new Date().toISOString())
            .input('campo5',sql.VarChar(500),transaccion)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo2,campo3,campo4,campo5) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo2,@campo3,@campo4,@campo5)');

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

//______________UPDATE______________
//______________DELETE______________

//______________DELETE______________