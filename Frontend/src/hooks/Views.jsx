//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { themeModeContext,loginViewContext,navbarViewContext,sidebarViewContext,sidebarVisibleContext,modalViewContext } from "../contexts/ViewsProvider";
import { typeUserContext,searchTermContext,selectedRowContext,actionBlockContext } from "../contexts/VariablesProvider";
import { nameContext,passwordContext,selectContext,radioContext } from "../contexts/FormsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para cambiar el modo de la página (Claro/Oscuro)
export const useChangeThemeMode = () => {
    // Constantes con el valor de los contextos 
    const [themeMode,setThemeMode] = useContext(themeModeContext);
    // Función del hook
    const changeThemeMode = () => {
        setThemeMode(!themeMode);
    }
    // Retorno de la función del hook
    return changeThemeMode;
}
// Hook para cambiar la vista del login
export const useChangeLoginView = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(loginViewContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    // Función del hook
    const changeLoginView = (option,type) => {
        setCurrentLView(option);
        if(option === 'Administration' || option === 'Kitchen'){
            setIsName('');
            setIsPassword('');
            setIsTypeUser('');
        }
        if(option === 'Login') setIsTypeUser(type);
    }
    // Retorno de la función del hook
    return changeLoginView;
}
// Hook para cambiar la vista del navbar
export const useChangeNavbarView = () => {
    // Constantes con el valor de los contextos 
    const [currentNView,setCurrentNView] = useContext(navbarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    // Función del hook
    const changeNavbarView = (View) => {
        setCurrentNView(View);
        setIsSearchTerm('');
    };
    // Retorno de la función del hook
    return changeNavbarView;
}
// Hook para cambiar la vista del sidebar
export const useChangeSidebarView = () => {
    // Constantes con el valor de los contextos 
    const [currentSView,setCurrentSView] = useContext(sidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext)
    const [isTypeUser] =  useContext(typeUserContext);
    // Función del hook
    const changeSidebarView = (View) => {
        if(View === 'Home'){
            if(isTypeUser === 'Administrator' || isTypeUser === 'Chef' || isTypeUser === 'Storekeeper') document.title = "MEALSYNC_Administración_Inicio";
            if(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor') document.title = "MEALSYNC_Menú_Inicio";
        }
        if(View === 'General')document.title = "MEALSYNC_Menú_General";
        if(View === 'Collaborators')document.title = "MEALSYNC_Menú_Colaboradores";
        if(View === 'Nutritionist')document.title = "MEALSYNC_Menú_Nutriólogo";
        if(View === 'Doctor')document.title = "MEALSYNC_Menú_Medico";
        if(View === 'Users')document.title = "MEALSYNC_Administración_Usuarios";
        if(View === 'Suppliers')document.title = "MEALSYNC_Administración_Proveedores";
        if(View === 'Menus')document.title = "MEALSYNC_Administración_Menús";
        if(View === 'Inventory')document.title = "MEALSYNC_Administración_Inventario";
        if(View === 'Record')document.title = "MEALSYNC_Administración_Historial";
        setCurrentSView(View);
        setIsSearchTerm('');
    };
    // Retorno de la función del hook
    return changeSidebarView;
};
// Hook para cambiar el sidebar (Ocultar/Mostrar)
export const useToggleSidebar = () => {
    // Constantes con el valor de los contextos 
    const [isSidebarVisible,setIsSidebarVisible] = useContext(sidebarVisibleContext);
    // Función del hook
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    // Retorno de la función del hook
    return toggleSidebar;
};
// Hook para cambiar el modal
export const useChangeModalView = () => {
    // Constantes con el valor de los contextos 
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    const [isSelect,setIsSelect] = useContext(selectContext);
    const [isRadio,setIsRadio] = useContext(radioContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isActiveBlock,setIsActiveBlock] = useContext(actionBlockContext);
    // Función del hook
    const changeModalView = (View) => {
        if(currentMView === 'Status-Add'){
            setIsSelect([]);
            setIsRadio('');
            setIsActiveBlock(false);
        }
        if(currentMView === 'Status-Enable'){
            setIsName('');
            setIsPassword('');
            setIsSelectedRow(null);

        }
        setCurrentMView(View);
    }
    // Retorno de la función del hook
    return changeModalView;
}