//____________IMPORT/EXPORT____________
// Consultas a la base de datos
import { getUsersService,getPermissionsService,getStatusService } from "../services/users.js";
//____________IMPORT/EXPORT____________

//______________GET______________
//---------- USUARIOS
export const getUsersController = async (req, res) => {
    try{
        const users = await getUsersService();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'Error al obtener los usuarios ', error: error.message});
    }
}
//---------- USUARIOS
//---------- PERMISOS
export const getPermissionsController = async (req,res) => {
  try{
    const permissions = await getPermissionsService();
    res.status(200).json(permissions);
  } catch(error){
    res.status(500).json({message: 'Error al obtener los permisos de los usuarios ', error: error.message});
  }
}
//---------- PERMISOS
//---------- ESTATUS
export const getStatusController = async (req,res) => {
    try{
        const status = await getStatusService();
        res.status(200).json(status);
    } catch(error){
        res.status(500).json({message: 'Error al obtener el estatus de los usuarios ', error: error.message});
    }
}
//---------- ESTATUS
//______________GET______________