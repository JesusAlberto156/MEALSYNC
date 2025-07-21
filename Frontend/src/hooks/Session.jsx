//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { VerificationBlockContext,AnimationContext,ActionBlockContext,FunctionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext,UserUpdatedContext,PermissionUpdatedContext } from "../contexts/VariablesProvider";
import { LoggedLogContext,LoggedUserContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext,LoggedLoggedContext } from "../contexts/SessionProvider";
//____________IMPORT/EXPORT____________

// Hook para eliminar el sessión storage ✔️
export const DeleteSessionStorage = () => {
    // Función del hook
    const deleteSessionStorage = () => {
        sessionStorage.removeItem('Estado del Modal');
        sessionStorage.removeItem('Vista del Modal');
        sessionStorage.removeItem('Estado del Sidebar');
        sessionStorage.removeItem('Vista del Sidebar');
        sessionStorage.removeItem('Usuario');
        sessionStorage.removeItem('Permisos');
        sessionStorage.removeItem('Estatus');
        sessionStorage.removeItem('Ruta');
        sessionStorage.removeItem('Sesión');
        sessionStorage.removeItem('Tipo de usuario');
        sessionStorage.removeItem('Vista del Navbar');
        sessionStorage.removeItem('Vista del Sidebar');
        sessionStorage.removeItem('Verificación del Bloqueo');
        sessionStorage.removeItem('Función del Bloqueo');
    }
    // Retorno de la función del hook
    return deleteSessionStorage;
}
// Hook para reiniciar valores de las variables que controlas las vistas del sistema ✔️
export const ResetViews = () => {
    // Constantes con los valores de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Función del hook
    const resetViews = () => {
        setCurrentLView('');
        setCurrentNView('');
        setCurrentSView('');
        setIsSidebar(false);
    }
    // Retorno de la función del hook
    return resetViews;
}
// Hook para reiniciar valores de todas las variables que controlas las vistas del sistema ✔️
export const ResetViewsAll = () => {
    // Constantes con los valores de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    // Función del hook
    const resetViewsAll = () => {
        setCurrentLView('');
        setCurrentNView('');
        setCurrentSView('');
        setIsSidebar(false);
        setCurrentMView('');
        setIsModal(false);
    }
    // Retorno de la función del hook
    return resetViewsAll;
}
// Hook para reiniciar valores de las variables del sistema ✔️
export const ResetVariables = () => {
    // Constantes con los valores de los contextos 
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    const [isPermissionUpdated,setIsPermissionUpdated] = useContext(PermissionUpdatedContext);
    // Función del hook
    const resetVariables = () => {
        setIsVerificationBlock(false);
        setIsAnimation(false);
        setIsFunctionBlock(false);
        setIsKeyboard(false);
        setIsKeyboardView(false);
        setIsTouch(false);
        setIsUserUpdated('');
        setIsPermissionUpdated('');
    }
    // Retorno de la función del hook
    return resetVariables;
}
// Hook para reiniciar valores de todas las variables del sistema ✔️
export const ResetVariablesAll = () => {
    // Constantes con los valores de los contextos 
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    const [isPermissionUpdated,setIsPermissionUpdated] = useContext(PermissionUpdatedContext);
    // Función del hook
    const resetVariablesAll = () => {
        setIsVerificationBlock(false);
        setIsAnimation(false);
        setIsActionBlock(false);
        setIsFunctionBlock(false);
        setIsKeyboard(false);
        setIsKeyboardView(false);
        setIsTouch(false);
        setIsUserUpdated('');
        setIsPermissionUpdated('');
    }
    // Retorno de la función del hook
    return resetVariablesAll;
}
// Hook para reiniciar valores de las variables del sistema ✔️
export const ResetLoggeds = () => {
    // Constantes con los valores de los contextos 
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isLoggedStatus,setIsLoggedStatus] = useContext(LoggedStatusContext); 
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged,setIsLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    // Función del hook
    const resetLoggeds = () => {
        setIsLoggedUser([]);
        setIsLoggedPermissions([]);
        setIsLoggedStatus([]);
        setIsLoggedLog(false);
        setIsLoggedLogged(false);
        setIsLoggedType('');
    }
    // Retorno de la función del hook
    return resetLoggeds;
}