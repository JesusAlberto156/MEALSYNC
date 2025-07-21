//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsMenuTypeContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de los tipos de menú ✔️
export const ResetTextFieldsMenuType = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsMenuType,setIsTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    // Estados iniciales de los contextos
    const initialTextFieldsMenuType = {
        idtipo: 0,
        nombre: '',
        cocina: 0,
        nutriologia: 0,
        areaMedica: 0,
    };
    // Función del hook
    const resetTextFieldsMenuType = () => {
        setIsTextFieldsMenuType(initialTextFieldsMenuType);
    }
    // Retorno de la función del hook
    return resetTextFieldsMenuType;
}