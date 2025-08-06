//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { TextFieldsCleaningCategoryContext,TextFieldsCleaningSupplyContext,TextFieldsFixedExpenseContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________

// Hook para reinciar los campos de texto de las categorías de limpieza ✔️
export const ResetTextFieldsCleaningCategory = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsCleaningCategory,setIsTextFieldsCleaningCategory] = useContext(TextFieldsCleaningCategoryContext);
    // Estados iniciales de los contextos
    const initialTextFieldsCleaningCategory = {
        idcategoria: 0,
        nombre: '',
        descripcion: '',
        unidad: '',
        limite: '',
        cantidades: [
            {
                cantidad: '',
            }
        ],
    };
    // Función del hook
    const resetTextFieldsCleaningCategory = () => {
        setIsTextFieldsCleaningCategory(initialTextFieldsCleaningCategory);
    }
    // Retorno de la función del hook
    return resetTextFieldsCleaningCategory;
}
// Hook para reinciar los campos de texto de los suministros de limpieza ✔️
export const ResetTextFieldsCleaningSupply = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsCleaningSupply,setIsTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    // Estados iniciales de los contextos
    const initialTextFieldsCleaningSupply = {
        codigo: '',
        idsuministro: 0,
        nombre: '',
        descripcion: '',
        imagen: '',
        idproveedor: 0,
        idcategoria: 0,
        idcantidad: 0,
    };
    // Función del hook
    const resetTextFieldsCleaningSupply = () => {
        setIsTextFieldsCleaningSupply(initialTextFieldsCleaningSupply);
    }
    // Retorno de la función del hook
    return resetTextFieldsCleaningSupply;
}
// Hook para reinciar los campos de texto de los gastos fijos ✔️
export const ResetTextFieldsFixedExpense = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsFixedExpense,setIsTextFieldsFixedExpense] = useContext(TextFieldsFixedExpenseContext);
    // Estados iniciales de los contextos
    const initialTextFieldsFixedExpense = {
        idgasto: 0,
        nombre: '',
        descripcion: '',
    };
    // Función del hook
    const resetTextFieldsFixedExpense = () => {
        setIsTextFieldsFixedExpense(initialTextFieldsFixedExpense);
    }
    // Retorno de la función del hook
    return resetTextFieldsFixedExpense;
}