//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { themeModeContext,loginViewContext,navbarViewContext,sidebarViewContext,sidebarContext,modalViewContext,modalContext } from "../contexts/ViewsProvider";
import { typeUserContext,searchTermContext,selectedRowContext,animationContext,actionBlockContext,verificationBlockContext } from "../contexts/VariablesProvider";
import { textFieldsContext,nameContext,passwordContext,selectContext,radioContext,checkboxContext } from "../contexts/FormsProvider";
import { statusAddContext,statusEnableContext } from "../contexts/StatusProvider";
import { permissionsAddContext,permissionsEditContext,permissionsEnableContext } from "../contexts/PermissionsProvider";

// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para cambiar el modo de la página (Claro/Oscuro)
export const ToggleThemeMode = () => {
    // Constantes con el valor de los contextos 
    const [themeMode,setThemeMode] = useContext(themeModeContext);
    // Función del hook
    const toggleThemeMode = () => {
        setThemeMode(!themeMode);
    }
    // Retorno de la función del hook
    return toggleThemeMode;
}
// Hook para cambiar la vista del login
export const HandleChangeLogin = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(loginViewContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isTextFields,setIsTextFields] = useContext(textFieldsContext);
    const [isAnimation,setIsAnimation] = useContext(animationContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    // Función del hook
    const handleChangeLogin = (option,type) => {
        setTimeout(() => {
            setCurrentLView(option);
        },700);
        if(option === ''){
            setIsAnimation(false);
        }
        if(option === 'Administration' || option === 'Kitchen'){
            setIsTextFields(prev => ({
                ...prev,             
                user: '',      
                password: '',       
            }));
            setIsTypeUser('');
            setIsAnimation(true);
            setIsActionBlock(true);
        }
        if(option === 'Login'){
            setIsTypeUser(type);
            setIsAnimation(false);
            setIsActionBlock(false);
        }
    }
    // Retorno de la función del hook
    return handleChangeLogin;
}
// Hook para cambiar la vista del navbar
export const HandleChangeNavbar = () => {
    // Constantes con el valor de los contextos 
    const [currentNView,setCurrentNView] = useContext(navbarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isSelect,setIsSelect] = useContext(selectContext);
    // Función del hook
    const handleChangeNavbar = (View) => {
        setCurrentNView(View);
        setIsSearchTerm('');
        setIsSelect([]);
    };
    // Retorno de la función del hook
    return handleChangeNavbar;
}
// Hook para cambiar la vista del sidebar
export const HandleChangeSidebar = () => {
    // Constantes con el valor de los contextos 
    const [currentSView,setCurrentSView] = useContext(sidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext)
    // Función del hook
    const handleChangeSidebar = (View) => {
        setCurrentSView(View);
        setIsSearchTerm('');
    };
    // Retorno de la función del hook
    return handleChangeSidebar;
};
// Hook para cambiar el sidebar (Ocultar/Mostrar)
export const ToggleSidebar = () => {
    // Constantes con el valor de los contextos 
    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    // Función del hook
    const toggleSidebar = () => {
        setIsSidebar(!isSidebar);
    };
    // Retorno de la función del hook
    return toggleSidebar;
};
// Hook para cambiar el modal
export const HandleChangeModal = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isTypeUser] = useContext(typeUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Función del hook
    const handleChangeModal = (View) => {
        setCurrentMView(View);
        setIsModal(true);
        if(currentMView === 'Out-Login'){
            setTimeout(() => {
                setIsModal(false);
                navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
            },700);
        }
    }
    // Retorno de la función del hook
    return handleChangeModal;
}
export const useChangeModalView = () => {
    // Constantes con el valor de los contextos 
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    const [isSelect,setIsSelect] = useContext(selectContext);
    const [isRadio,setIsRadio] = useContext(radioContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isFormVerification,setIsFormVerification] = useContext(verificationBlockContext);
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