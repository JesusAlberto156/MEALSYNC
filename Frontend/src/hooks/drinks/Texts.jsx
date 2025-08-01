//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsDrinkContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de las bebidas ✔️
export const ResetTextFieldsDrink = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsDrink,setIsTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    // Estados iniciales de los contextos
    const initialTextFieldsDrink = {
        idbebida: 0,
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
            idbebida: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }]
    };
    // Función del hook
    const resetTextFieldsDrink = () => {
        setIsTextFieldsDrink(initialTextFieldsDrink);
    }
    // Retorno de la función del hook
    return resetTextFieldsDrink;
}