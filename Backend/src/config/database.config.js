//____________IMPORT/EXPORT____________
// Librería 'mssql'
import sql from 'mssql';
// Archivo de configuración que contiene los datos de conexión
import config from './config.js';
//____________IMPORT/EXPORT____________

// Variable para almacenar la conexión reutilizable (singleton)
let poolPrincipal = null;
let poolMedicos = null;
let poolCirugias = null;
// Función para establecer la conexión con la base de datos.
export const conexionDB = async () => {
    try {
        // Si no existe una conexión activa, se crea una nueva
        if(!poolPrincipal){
            poolPrincipal = await new sql.ConnectionPool({
                user: config.USER,
                password: config.PASSWORD,
                server: config.SERVER,
                database: config.DATABASE_PRINCIPAL,
                options: {
                    encrypt: false,
                    trustServerCertificate: true
                },
                requestTimeout: 15000,
            }).connect();
            console.log('Conectado a la Base de Datos: ',config.DATABASE_PRINCIPAL);
        }
        // Retornamos la conexión existente o recién creada
        return poolPrincipal;
    } catch (error) {
        console.log('Error: ', error);
    }
};
// Función para establecer la conexión con la base de datos de medicos
export const conexionDB_Cirugias = async () => {
    try {
        // Si no existe una conexión activa, se crea una nueva
        if(!poolCirugias){
            poolCirugias = await new sql.ConnectionPool({
                user: config.USER,
                password: config.PASSWORD,
                server: config.SERVER,
                database: config.DATABASE_CIRUGIAS,
                options: {
                    encrypt: false,
                    trustServerCertificate: true
                },
                requestTimeout: 15000,
            }).connect();
            console.log('Conectado a la Base de Datos: ',config.DATABASE_CIRUGIAS);
        }
        // Retornamos la conexión existente o recién creada
        return poolCirugias;
    } catch (error) {
        console.log('Error: ', error);
    }
};