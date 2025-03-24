import sql from 'mssql';
import config from './config.js';

let pool = null;

const conexionDB = async () => {
    try {
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
        }else{
            console.log('Utilizando conexión existente...');
        }

        return pool;
    } catch (error) {
        console.log('Error: ', error);
    }
};

export {conexionDB,sql};