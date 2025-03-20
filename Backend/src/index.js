import config from './config/config.js'
import { conexionDB } from './config/database.config.js';
import routerAPI from './mealsync/routes/index.js';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { Server } from 'socket.io'; 
import http from 'http';

import { socketEvents } from './mealsync/socket/index.js'

const app = express();

app.set('port', config.PORT);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

server.listen(app.get('port'));
console.log(
  `Servidor ejecutandose en: http://${config.HOST}:${app.get('port')}${
    config.API_URL
  }`
);

const api = config.API_URL;
app.get(`${api}`, (req,res)=>{
    res.send(
        `<h1>API ejecutandose en raiz</h1> <p> Mealsync: <b>${api}/api-docs</b> Para mas información.</p>`
    );
})

conexionDB().then(() => {
  console.log('Conexion a la base de datos exitosa');

  routerAPI(app);
  
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error.message);
  process.exit(1);
})

socketEvents(io);