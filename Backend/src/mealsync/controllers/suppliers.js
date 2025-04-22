//____________IMPORT/EXPORT____________
// Consultas a la base de datos
import { getSuppliersService,getObservationsService } from "../services/suppliers.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- PROVEEDORES
export const getSuppliersController = async (req, res) => {
    try{
        const suppliers = await getSuppliersService();
        res.status(200).json(suppliers);
    }catch(error){
        res.status(500).json({message: 'Error al obtener los proveedores ', error: error.message});
    }
}
//---------- PROVEEDORES
//---------- OBSERVACIONES
export const getObservationsController = async (req, res) => {
    try{
        const observations = await getObservationsService();
        res.status(200).json(observations);
    }catch(error){
        res.status(500).json({message: 'Error al obtener las observaciones de los proveedores ', error: error.message});
    }
}
//---------- OBSERVACIONES
//______________GET______________