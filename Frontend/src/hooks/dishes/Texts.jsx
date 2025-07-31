//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsDishContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los platillos ✔️
export const ResetTextFieldsDish = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsDish,setIsTextFieldsDish] = useContext(TextFieldsDishContext);
    // Estados iniciales de los contextos
    const initialTextFieldsDish = {
        idplatillo: 0,
        nombre: '',
        idmenu: 0,
        idespecifiacion: 0,
        descripcion: '',
        precio: '',
        preparacion: '',
        imagen: '',
        tipos: [{
            idtipo: 0,
        }],
        ingredientes: [{
            idalmacen: 0,
            idplatillo: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }]
    };
    // Función del hook
    const resetTextFieldsDish = () => {
        setIsTextFieldsDish(initialTextFieldsDish);
    }
    // Retorno de la función del hook
    return resetTextFieldsDish;
}