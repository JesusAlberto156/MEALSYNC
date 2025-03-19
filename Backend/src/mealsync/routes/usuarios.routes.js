import { Router } from 'express';
import { getUsersAllController,getPermissionsAllController,getStatusAllController } from '../controllers/usuarios.controller';

const routerUser = Router();

routerUser.get('/',getUsersAllController);
routerUser.get('/permisos',getPermissionsAllController);
routerUser.get('/estatus',getStatusAllController);

export default routerUser;