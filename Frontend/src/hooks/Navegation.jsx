//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";
import { searchTermContext } from "../contexts/VariablesProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

//____________SIDEBAR____________
// Hook para cambiar las vistas
export const useChangeViewNavbar = () => {
    // Constantes con el valor de los contextos 
    const [isNavbar,setIsNavbar] = useContext(navbarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    // Función del hook
    const changeViewNavbar = (View) => {
        setIsNavbar(View);
        setIsSearchTerm('');
    };
    // Retorno de la función del hook
    return navbarViews;
}
//____________SIDEBAR____________
// Hook para ir a inicio del sidebar
export const useSidebarHome = () => {
    // Constantes con el valor de los contextos 
    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext)
    const [isTypeUser] =  useContext(typeUserContext);
    // Función del hook
    const sidebarHome = (View) => {
        if(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor'){
            document.title = "MEALSYNC_Menú_Inicio";
        }else{
            document.title = "MEALSYNC_Administración_Inicio";
        }
        setIsSidebar(View);
        setIsSearchTerm('');
    };
    // Retorno de la función del hook
    return sidebarHome;
};
// Hook para ir a una de las opciones del sidebar
export const useSidebarViews = () => {
    // Constantes con el valor de los contextos 
    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [isNavbar,setIsNavbar] = useContext(navbarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext)
    // Función del hook
    const sidebarViews = (view,navbar) => {
        if(view === 'General')document.title = "MEALSYNC_Menú_General";
        if(view === 'Collaborators')document.title = "MEALSYNC_Menú_Colaboradores";
        if(view === 'Nutritionist')document.title = "MEALSYNC_Menú_Nutriólogo";
        if(view === 'Doctor')document.title = "MEALSYNC_Menú_Medico";
        if(view === 'Users')document.title = "MEALSYNC_Administración_Usuarios";
        if(view === 'Suppliers')document.title = "MEALSYNC_Administración_Proveedores";
        if(view === 'Menus')document.title = "MEALSYNC_Administración_Menús";
        if(view === 'Inventory')document.title = "MEALSYNC_Administración_Inventario";
        if(view === 'Record')document.title = "MEALSYNC_Administración_Historial";
        setIsSidebar(view);
        setIsNavbar(navbar);
        setIsSearchTerm('');
    }
    // Retorno de la función del hook
    return sidebarViews;
};