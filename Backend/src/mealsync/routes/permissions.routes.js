import { Router } from 'express';
import { getPermissionsAllController } from '../controllers/permissions.controller.js';

const routerPermission = Router();

routerPermission.get('/',getPermissionsAllController);

export default routerPermission;