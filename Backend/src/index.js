//____________IMPORT/EXPORT____________
// Variables de entorno
import config from './config/config.js';
// Configuración de la base de datos
import { conexionDB,conexionDB_Cirugias } from './config/database.config.js';
// Rutas del servidor
import { routerAPI } from './mealsync/routes/index.js';
// Para la impresora 
import escpos from 'escpos';
import escposUSB from 'escpos-usb';
import escposNetwork from 'escpos-network';
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
  // Endpoint para la impresion de tickets
  app.post(`${api}/print-ticket`, async (req, res) => {
    const { logo, fecha, ubicacion, numero, encargado, pedidos, propina, total, printerType, printerIP } = req.body;

    try {
      let device;

      if (printerType === "USB") {
        device = new escposUSB();
      } else if (printerType === "Network") {
        device = new escposNetwork(printerIP);
      } else {
        return res.status(400).send("Tipo de impresora inválido");
      }

      const printer = new escpos.Printer(device);

      device.open(async () => {
        printer.align("CT");

        // Logo (opcional, si mandas ruta/base64 y tu librería escpos soporta imágenes)
        if (logo) {
          try {
            const image = await escpos.Image.load(logo);
            printer.image(image, "s8");
          } catch (err) {
            console.warn("No se pudo imprimir el logo:", err.message);
          }
        }

        // Encabezado
        printer.text("Hospital Puerta de Hierro")
               .text("Restaurant COMANDA")
               .text(`FECHA: ${fecha}`)
               .text("----------------------------")
               .align("LT");

        // Datos del pedido
        printer.text(`UBICACIÓN: ${ubicacion}`);
        printer.text(`N°: ${numero}`);
        printer.text(`ENCARGADO: ${encargado}`);
        printer.text("----------------------------");

        // Lista de pedidos
        pedidos.forEach((p) => {
          printer.text(`${p.cantidad}  ${p.nombre}   $${(p.precio * p.cantidad).toFixed(2)}`);
        });

        printer.text("----------------------------");
        printer.text(`PROPINA: $${Number(propina).toFixed(2)}`);
        printer.text(`TOTAL:   $${total}`);
        printer.align("CT")
               .text("¡Gracias!")
               .cut()
               .close();

        res.send({ message: "Ticket enviado a impresora" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al imprimir ticket" });
    }
  });
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error.message);
  process.exit(1);
})
// Conexión a la base de datos de cirugias
conexionDB_Cirugias().then(() => {
  console.log('Conexion a la base de datos exitosa...');

  routerAPI(app);
  
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error.message);
  process.exit(1);
})
// Ejecución de eventos socket
socketEvents();