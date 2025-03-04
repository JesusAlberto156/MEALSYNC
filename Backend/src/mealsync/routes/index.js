import { Router } from 'express';
import config from '../../config/config';
import routerUser from './usuarios.routes';

const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;

  app.use(api, router);
  router.use('/usuarios',routerUser);

  return router;
};

export default routerAPI;