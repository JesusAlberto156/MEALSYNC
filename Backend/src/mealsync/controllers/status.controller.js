import { getStatusAllService } from '../services/status.service';

// GET STATUS ALL
const getStatusAllController = async (req,res) => {
  try{
    const status = await getStatusAllService();
    res.status(200).json(status);
  } catch(error){
    res.status(500).json({message: 'Error al obtener el estatus de los usuarios ', error: error.message});
  }
}
// GET STATUS ALL

export { getStatusAllController };