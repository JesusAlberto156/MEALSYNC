//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect,useMemo } from "react";
// Contextos
import { TextFieldsCustomizedContext } from "../../contexts/FormsProvider";
//____________IMPORT/EXPORT____________


// Hook para realizar las acciones de la dieta personalizada ✔️
export const NutritionistFunctions = () => {
    // Constantes con el valor de los contextos 
    const [isTextFieldsCustomized,setIsTextFieldsCustomized] = useContext(TextFieldsCustomizedContext); 
    // Funcion para agregar un nuevo ingrediente
    const IngredientAdd = () => {
        const newIngredient = {
            unidad: '',
            cantidad: 0,
            idcategoria: 0,
            nombre: '',
            idtipo: 0,
            tipo: '',
            searchCategoria: '',
            searchTipo: ''
        }
        setIsTextFieldsCustomized({
            ...isTextFieldsCustomized,
            ingredients: [...isTextFieldsCustomized.ingredients, newIngredient],
        })
    }
    // Funcion para eliminar un nuevo ingrediente
    const IngredientDelete = (index) => {
        const updatedIngredients = [...isTextFieldsCustomized.ingredients];
        updatedIngredients.splice(index,1);
        setIsTextFieldsCustomized({
            ...isTextFieldsCustomized,
            ingredients: updatedIngredients,
        })
    }

    return { IngredientAdd,IngredientDelete }
}