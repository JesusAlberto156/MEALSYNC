//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Archivo de configuración que contiene los datos de conexión
import config from './config.js';
//____________IMPORT/EXPORT____________

// Variable para almacenar la conexión reutilizable (singleton)
let pool = null;
// Función para establecer la conexión con la base de datos.
export const conexionDB = async () => {
    try {
        // Si no existe una conexión activa, se crea una nueva
        if(!pool){
            pool = await sql.connect({
                user: config.USER,
                password: config.PASSWORD,
                server: config.SERVER,
                database: config.DATABASE,
                options: {
                    encrypt: false,
                    trustServerCertificate: true
                }
            });
            console.log('Conectado a la Base de Datos: ',config.DATABASE);
        }
        // Retornamos la conexión existente o recién creada
        return pool;
    } catch (error) {
        console.log('Error: ', error);
    }
};