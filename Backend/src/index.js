//____________IMPORT/EXPORT____________
// Variables de entorno
import config from './config/config.js';
// Configuración de la base de datos
import { conexionDB } from './config/database.config.js';
// Rutas del servidor
import { routerAPI } from './mealsync/routes/index.js';
// Creación del servidor
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// Servidor socket
import { Server } from 'socket.io'; 
import http from 'http';
// Eventos de socket
import { socketEvents } from './mealsync/socket/index.js'
//____________IMPORT/EXPORT____________

// Creación el servidor
const app = express();
// Configuración del servidor
app.set('port', config.PORT);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Creación y exportación del servidor socket
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// Ejecución del servidor con variables de entorno
server.listen(app.get('port'));
console.log(
  `Servidor ejecutandose en: http://${config.HOST}:${app.get('port')}${
    config.API_URL
  }`
);
// Ruta base del servidor
const api = config.API_URL;
app.get(`${api}`, (req,res)=>{
    res.send(
        `<h1>API ejecutandose en raiz</h1> <p> Mealsync: <b>${api}/api-docs</b> Para mas información.</p>`
    );
})
// Conexión a la base de datos
conexionDB().then(() => {
  console.log('Conexion a la base de datos exitosa...');

  routerAPI(app);
  
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error.message);
  process.exit(1);
})
// Ejecución de eventos socket
socketEvents();