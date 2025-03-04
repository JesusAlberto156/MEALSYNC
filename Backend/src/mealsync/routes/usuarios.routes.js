import { Router } from 'express';
import { getUsersAllController,getPermissionsAllController } from '../controllers/usuarios.controller';

const routerUser = Router();

routerUser.get('/',getUsersAllController);
routerUser.get('/permisos',getPermissionsAllController);

export default routerUser;