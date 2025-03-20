import sql from 'mssql';

import config from './config.js';

const conexionDB = async () => {
    try {
        const pool = await sql.connect({
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

        return pool;
    } catch (error) {
        console.log('Error: ', error);
    }
};

export {conexionDB};