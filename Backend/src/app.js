import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import { conexionDB } from './config/database.config';
import routerAPI from './mealsync/routes/index.js';
import { Server } from 'socket.io'; 
import { getUsersAllService } from './mealsync/services/usuarios.service.js';

const app = express();

app.set('port', config.PORT);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

export function initSocket(server) {
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
  
    io.on("connection", (socket) => {
      console.log(`Cliente conectado: ${socket.id}`);
      
      socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
      });
    });

    io.on("requestUsers", () => {
      const users = getUsersAllService();  // Llamar a tu servicio para obtener los usuarios
      io.emit("users", users);  // Emitir los usuarios al cliente
  });
  
    return io;
  }

export default app;