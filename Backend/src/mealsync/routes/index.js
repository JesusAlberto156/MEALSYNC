import { Router } from 'express';
import config from '../../config/config';
import routerUser from './users.routes';
import routerPermission from './permissions.routes';
import routerStatus from './status.routes';

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