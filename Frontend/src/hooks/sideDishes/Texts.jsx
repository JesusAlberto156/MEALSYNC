//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsSideDishContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de las guarniciones ✔️
export const ResetTextFieldsSideDish = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsSideDish,setIsTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    // Estados iniciales de los contextos
    const initialTextFieldsSideDish = {
        idguarnicion: 0,
        nombre: '',
        idmenu: 0,
        idespecificacion: 0,
        descripcion: '',
        precio: '',
        preparacion: '',
        imagen: '',
        tipos: [{
            idtipo: 0,
        }],
        ingredientes: [{
            idalmacen: 0,
            idguarnicion: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }]
    };
    // Función del hook
    const resetTextFieldsSideDish = () => {
        setIsTextFieldsSideDish(initialTextFieldsSideDish);
    }
    // Retorno de la función del hook
    return resetTextFieldsSideDish;
}