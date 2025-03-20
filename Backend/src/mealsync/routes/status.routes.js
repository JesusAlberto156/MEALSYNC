import { Router } from 'express';
import { getStatusAllController } from '../controllers/status.controller';

const routerStatus = Router();

routerStatus.get('/',getStatusAllController);

export default routerStatus;