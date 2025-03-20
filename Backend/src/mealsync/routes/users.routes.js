import { Router } from 'express';
import { getUsersAllController } from '../controllers/users.controller';

const routerUser = Router();

routerUser.get('/',getUsersAllController);

export default routerUser;