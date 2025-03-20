import { getUsersAllService } from '../services/users.service.js';

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

export { getUsersAllController };