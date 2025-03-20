import { Router } from 'express';
import config from '../../config/config.js';
import routerUser from './users.routes.js';
import routerPermission from './permissions.routes.js';
import routerStatus from './status.routes.js';

const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;

  app.use(api, router);
  router.use('/usuarios',routerUser);
  router.use('/permisos',routerPermission);
  router.use('/estatus',routerStatus);

  return router;
};

export default routerAPI;