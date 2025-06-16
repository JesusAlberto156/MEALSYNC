//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ThemeModeContext,LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { AnimationContext,ActionBlockContext } from "../contexts/VariablesProvider";
import { TextFieldsUserContext } from "../contexts/FormsProvider";
import { LoggedTypeContext } from "../contexts/SessionProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedOptions } from "./Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar el modo de la página (Claro/Oscuro) ✔️
export const ToggleThemeMode = () => {
    // Constantes con el valor de los contextos 
    const [themeMode,setThemeMode] = useContext(ThemeModeContext);
    // Función del hook
    const toggleThemeMode = () => {
        setThemeMode(!themeMode);
    }
    // Retorno de la función del hook
    return toggleThemeMode;
}
// Hook para cambiar la vista del login ✔️
export const HandleLoginView = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleLoginView = (option,type) => {
        setTimeout(() => {
            setCurrentLView(option);
        },700);
        if(option === ''){
            setIsAnimation(false);
        }
        if(option === 'Administration' || option === 'Kitchen'){
            setIsTextFieldsUser(prev => ({
                ...prev,             
                usuario: '',      
                contrasena: '',       
            }));
            setIsLoggedType('');
            setIsAnimation(true);
            setIsActionBlock(true);
        }
        if(option === 'Login'){
            setIsLoggedType(type);
            setIsAnimation(false);
            setIsActionBlock(false);
        }
    }
    // Retorno de la función del hook
    return handleLoginView;
}
// Hook para cambiar la vista del navbar ✔️
export const HandleNavbarView = () => {
    // Constantes con el valor de los contextos 
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    // Constantes con la funcionalidad de los hooks
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleNavbarView = (View) => {
        setCurrentNView(View);
        resetSearchTerms();
        resetSelectedOptions();
        sessionStorage.setItem('Vista del Navbar',View);
    };
    // Retorno de la función del hook
    return handleNavbarView;
}
// Hook para cambiar la vista del sidebar ✔️
export const HandleSidebarView = () => {
    // Constantes con el valor de los contextos 
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    // Constantes con la funcionalidad de los hooks
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleSidebarView = (View) => {
        setCurrentSView(View);
        resetSearchTerms();
        resetSelectedOptions();
        sessionStorage.setItem('Vista del Sidebar',View);
    };
    // Retorno de la función del hook
    return handleSidebarView;
};
// Hook para cambiar el sidebar (Ocultar/Mostrar) ✔️
export const ToggleSidebar = () => {
    // Constantes con el valor de los contextos 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Función del hook
    const toggleSidebar = () => {
        setIsSidebar(!isSidebar);
        sessionStorage.setItem('Estado del Sidebar',!isSidebar);
    };
    // Retorno de la función del hook
    return toggleSidebar;
};
// Hook para cambiar el modal ✔️
export const HandleModalView = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleModalView = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        // CERRAR SESIÓN
        if(currentMView === 'Cerrar-Sesión' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                navigate(route,{ replace: true });
            },750);
        }
        // CERRAR SESIÓN
        setCurrentMView(View);
        sessionStorage.setItem('Vista del Modal',View);
        resetSelectedOptions();
        resetSearchTerms();
    }
    // Retorno de la función del hook
    return handleModalView;
}