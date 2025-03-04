import { getUsersAllService,getPermissionsAllService } from '../services/usuarios.service.js';
import { io } from '../../index.js';

// GET USER ALL
const getUsersAllController = async (req,res) => {
  try{
    const users = await getUsersAllService();
    res.status(200).json(users);
  } catch(error){
    res.status(500).json({message: 'Error al obtener los usuarios ', error: error.message});
  }
}
// GET USER ALL
// GET PERMISSIONS ALL
const getPermissionsAllController = async (req,res) => {
  try{
    const permissions = await getPermissionsAllService();
    res.status(200).json(permissions);
  } catch(error){
    res.status(500).json({message: 'Error al obtener los permisos de usuarios ', error: error.message});
  }
}
// GET PERMISSIONS ALL
export { getUsersAllController,getPermissionsAllController };