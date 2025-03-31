//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { navbarContext } from "../contexts/ViewsProvider";
import { searchTermContext } from "../contexts/VariablesProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para ir a una de las opciones del navbar
export const useNavbarViews = () => {
    // Constantes con el valor de los contextos 
    const [isNavbar,setIsNavbar] = useContext(navbarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    // Función del hook
    const navbarViews = (View) => {
        setIsNavbar(View);
        setIsSearchTerm('');
    };
    // Retorno de la función del hook
    return navbarViews;
}