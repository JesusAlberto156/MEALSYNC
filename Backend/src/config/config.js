import dotenv from 'dotenv';

dotenv.config();

export default {
    HOST: process.env.HOST || 'NO ENCONTRO VAR ENTORNO',
    PORT: process.env.PORT || 3500,
    API_URL: process.env.API_URL || '/Mealsync',
    SERVER: process.env.SERVER || 'localhost',
    DATABASE: process.env.DATABASE || 'myDataBase',
    PASSWORD: process.env.PASSWORD || 'defaultPassword',
    USER: process.env.USER || 'defaultUser',
    SECRET_KEY: process.env.SECRET_KEY || 'defaultSecretKey'
}

