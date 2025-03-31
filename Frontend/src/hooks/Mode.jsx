//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { modeContext } from "../contexts/VariablesProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para cambiar de modo claro/oscuro
export const useChangeMode = () => {
    // Constantes con el valor de los contextos 
    const [isMode,setIsMode] = useContext(modeContext);
    // Función del hook
    const changeMode = () => {
        setIsMode(!isMode);
    }
    // Retorno de la función del hook
    return changeMode;
}