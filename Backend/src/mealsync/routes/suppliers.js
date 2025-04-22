//____________IMPORT/EXPORT____________
// Hook de express
import { Router } from 'express';
// Controladores
import { getSuppliersController,getObservationsController } from '../controllers/suppliers.js';
//____________IMPORT/EXPORT____________

// exportación de las rutas
export const routerSuppliers = Router();

//____________GET____________
routerSuppliers.get('/proveedores',getSuppliersController);
routerSuppliers.get('/observaciones',getObservationsController);
//____________GET____________