import config from './config/config';
import { conexionDB } from './config/database.config';
import routerAPI from './mealsync/routes/index.js';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { Server } from 'socket.io'; 
import http from 'http';

import { getUsersAllService,getPermissionsAllService,getStatusAllService,updateStatusActiveService } from './mealsync/services/usuarios.service.js';

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

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });

  socket.on('users', async () => {
    try{
      const result = await getUsersAllService();
      console.log('Usuarios Obtenidos');
      socket.emit('users',result);
    }catch(error){
      console.error('Error al obtener los datos: ',error)
      return error;
    }
  })

  socket.on('permissions', async () => {
    try{
      const result = await getPermissionsAllService();
      console.log('Permisos de Usuarios Obtenidos');
      socket.emit('permissions',result);
    }catch(error){
      console.error('Error al obtener los datos: ',error)
      return error;
    }
  })
  socket.on('status', async () => {
    try{
      const result = await getStatusAllService();
      console.log('Estatus de Usuarios Obtenidos');
      socket.emit('status',result);
    }catch(error){
      console.error('Error al obtener los datos: ',error)
      return error;
    }
  })
  socket.on('updateStatusActive', async (id,bolean) => {
    try{
      const updateResult = await updateStatusActiveService(id,bolean);
      console.log('Usuario activo/inactivo');
      socket.emit('updateStatusActive',updateResult);
    }catch(error){
      console.error('Error al actualizar: ',error)
      return error;
    }
  })
})