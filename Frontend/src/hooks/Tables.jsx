//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../contexts/SelectedesProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar los ordenamientos de las tablas de la tabla
export const TableActions = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext)
    // Cambio de direccion del ordenamiento
    const ToggleOrderDirection = () => {
        setIsSelectedOptionOrderDirection(prev => prev === 'Asc' ? 'Desc' : 'Asc');
    };
    // Cambio de lo que quiere ordenar
    const ToggleOrder = (option) => {
        setIsSelectedOptionOrder(option);
    };
    // Retorno de la función del hook
    return { ToggleOrder,ToggleOrderDirection }
}