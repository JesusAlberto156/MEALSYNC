//____________IMPORT/EXPORT____________
// Hook de express
import { Router } from 'express';
// Configuración de variables de entornos
import config from '../../config/config.js';
// Rutas
import { routerUsers } from './users.js';
import { routerSuppliers } from './suppliers.js';
//____________IMPORT/EXPORT____________

// Creación de rutas
export const routerAPI = (app) => {
    const router = Router();
    const api = config.API_URL;

    app.use(api, router);
    router.use('/usuarios',routerUsers);
    router.use('/proveedores',routerSuppliers);

    return router;
};