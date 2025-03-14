import dotenv from 'dotenv';
const { USER,PASSWORD,SERVER,DATABASE,PORT,API_URL,SECRET_KEY } = require('../../credentials/credentials');

dotenv.config();

export default {
    HOST: process.env.HOST || 'NO ENCONTRO VAR ENTORNO',
    PORT: process.env.PORT || PORT,
    API_URL: process.env.API_URL || API_URL,
    SERVER: process.env.SERVER || SERVER,
    DATABASE: process.env.DATABASE || DATABASE,
    PASSWORD: process.env.PASSWORD || PASSWORD,
    USER: process.env.USER || USER,
    SECRET_KEY: process.env.SECRET_KEY || SECRET_KEY
}

