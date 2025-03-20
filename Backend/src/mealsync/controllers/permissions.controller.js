import { getPermissionsAllService } from '../services/permissions.service';

// GET PERMISSIONS ALL
const getPermissionsAllController = async (req,res) => {
  try{
    const permissions = await getPermissionsAllService();
    res.status(200).json(permissions);
  } catch(error){
    res.status(500).json({message: 'Error al obtener los permisos de los usuarios ', error: error.message});
  }
}
// GET PERMISSIONS ALL

export { getPermissionsAllController };