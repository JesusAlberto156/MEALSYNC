//____________IMPORT/EXPORT____________
// Hook de express
import { Router } from 'express';
// Controladores
import { getUsersController,getPermissionsController,getStatusController } from '../controllers/users.js';
//____________IMPORT/EXPORT____________

// exportación de las rutas
export const routerUsers = Router();

//____________GET____________
routerUsers.get('/usuarios',getUsersController);
routerUsers.get('/permisos',getPermissionsController);
routerUsers.get('/estatus',getStatusController);
//____________GET____________