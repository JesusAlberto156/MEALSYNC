import { Router } from 'express';
import { getStatusAllController } from '../controllers/status.controller.js';

const routerStatus = Router();

routerStatus.get('/',getStatusAllController);

export default routerStatus;