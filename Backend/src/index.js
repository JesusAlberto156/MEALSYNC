import app, { initSocket } from './app';
import config from './config/config';
import http from 'http';

const server = http.createServer(app);
export const io = initSocket(server);

server.listen(app.get('port'));
console.log(
  `Servidor ejecutandose en: http://${config.HOST}:${app.get('port')}${
    config.API_URL
  }`
);