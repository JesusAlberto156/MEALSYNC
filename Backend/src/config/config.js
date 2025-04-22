//____________IMPORT/EXPORT____________
// Módulo para manipulación del archivo .env
import dotenv from 'dotenv';
//____________IMPORT/EXPORT____________

// Hook
dotenv.config();
// Exportación de la variables de entorno
export default {
    HOST: process.env.HOST || 'NO ENCONTRO VAR ENTORNO',
    PORT: process.env.PORT || 3600,
    API_URL: process.env.API_URL || '/Mealsync',
    SERVER: process.env.SERVER || 'localhost',
    DATABASE: process.env.DATABASE || 'myDataBase',
    PASSWORD: process.env.PASSWORD || 'defaultPassword',
    USER: process.env.USER || 'defaultUser',
    SECRET_KEY: process.env.SECRET_KEY || 'defaultSecretKey'
}

