//____________IMPORT/EXPORT____________
// Hook de express
import { Router } from 'express';
// Controladores
import { getUsersController,getPermissionsController,getStatusController,getUserTypesController } from '../controllers/users.js';
//____________IMPORT/EXPORT____________

// exportación de las rutas
export const routerUsers = Router();

//____________GET____________
routerUsers.get('/usuarios',getUsersController);
routerUsers.get('/permisos',getPermissionsController);
routerUsers.get('/estatus',getStatusController);
routerUsers.get('/tipos-de-usuarios',getUserTypesController);
//____________GET____________