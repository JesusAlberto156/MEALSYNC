import { Router } from 'express';
import { getUsersAllController } from '../controllers/users.controller.js';

const routerUser = Router();

routerUser.get('/',getUsersAllController);

export default routerUser;