//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { themeModeContext,loginViewContext,navbarViewContext,sidebarViewContext,sidebarVisibleContext,modalViewContext } from "../contexts/ViewsProvider";
import { typeUserContext,searchTermContext,selectedRowContext,actionBlockContext,formVerificationContext } from "../contexts/VariablesProvider";
import { nameContext,passwordContext,selectContext,radioContext,checkboxContext } from "../contexts/FormsProvider";
import { statusAddContext,statusEnableContext } from "../contexts/StatusProvider";
import { permissionsAddContext,permissionsEditContext,permissionsEnableContext } from "../contexts/PermissionsProvider";
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
    // Función del hook
    const changeSidebarView = (View) => {
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
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isFormVerification,setIsFormVerification] = useContext(formVerificationContext);
    const [isStatusAdd,setIsStatusAdd] = useContext(statusAddContext);
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(permissionsAddContext);
    const [isCheckbox,setIsCheckbox] = useContext(checkboxContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(permissionsEditContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(permissionsEnableContext);
    // Función del hook
    const changeModalView = (View) => {

        if(currentMView === 'Users-View'){
            setIsActionBlock(false);
            setIsName('');
            setIsPassword('');
            setIsFormVerification(false);
        }
        if(currentMView === 'Permissions-Add'){
            setIsPermissionsAdd(false);
            setIsSelect([]);
            setIsCheckbox([]);
            setIsActionBlock(false);
        }
        if(currentMView === 'Permissions-Edit'){
            setIsCheckbox([]);
            setIsActionBlock(false);
            setIsPermissionsEdit(false);
            setIsSelectedRow(null);
        }
        if(currentMView === 'Permissions-Super-Administrator'){
            setIsActionBlock(false);
            setIsPermissionsEnable([]);
            setIsSelectedRow(null);
            setIsName('');
            setIsPassword('');
            setIsFormVerification(false);
        }
        if(currentMView === 'Status-Add'){
            setIsSelect([]);
            setIsRadio('');
            setIsActionBlock(false);
            setIsStatusAdd(false);
        }
        if(currentMView === 'Status-Enable'){
            setIsName('');
            setIsPassword('');
            setIsSelectedRow(null);
            setIsActionBlock(false);
            setIsFormVerification(false);
            setIsStatusEnable([]);
        }
        setCurrentMView(View);
    }
    // Retorno de la función del hook
    return changeModalView;
}