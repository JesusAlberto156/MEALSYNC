//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Conexión a Base de datos
import { conexionDB } from "../../config/database.config.js";
// Método de Encryptación
import { encryptData } from "../../config/crypto.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- LOG ✔️
export const getLogsService = async () => {
    try{
        const pool = await conexionDB();
        const result = await pool.request().query('SELECT * FROM logComandaMedicaTepic');

        const jsonData = JSON.stringify(result.recordset);

        const encryptedData = encryptData(jsonData);

        return encryptedData;
    }catch(error){
        console.error('Error al obtener los registros: ',error.message);
        throw error;
    }
}
//______________GET______________

export const insertLogService = async (tabla,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9,campo10) => {
    try{
        const pool = await conexionDB();
        const result = await pool.request()
            .input('tabla',sql.VarChar(50),tabla)
            .input('operacion',sql.VarChar(20),operacion)
            .input('idtabla',sql.Int,idtabla)
            .input('idusuario',sql.Int,idusuario)
            .input('campo1',sql.VarChar(sql.MAX),campo1)
            .input('campo2',sql.VarChar(500),campo2)
            .input('campo3',sql.VarChar(500),campo3)
            .input('campo4',sql.VarChar(500),campo4)
            .input('campo5',sql.VarChar(500),campo5)
            .input('campo6',sql.VarChar(500),campo6)
            .input('campo7',sql.VarChar(500),campo7)
            .input('campo8',sql.VarChar(500),campo8)
            .input('campo9',sql.VarChar(500),campo9)
            .input('campo10',sql.VarChar(500),campo10)
            .query('INSERT INTO logComandaMedicaTepic (tabla,operacion,idtabla,idusuario,campo1,campo2,campo3,campo4,campo5,campo6,campo7,campo8,campo9,campo10) VALUES (@tabla,@operacion,@idtabla,@idusuario,@campo1,@campo2,@campo3,@campo4,@campo5,@campo6,@campo7,@campo8,@campo9,@campo10)');

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
