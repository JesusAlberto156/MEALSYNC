//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ThemeModeContext,LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { SearchTermContext,SelectedRowContext,AnimationContext,ActionBlockContext,VerificationBlockContext } from "../contexts/VariablesProvider";
import { TextFieldsContext,SelectContext,RadioContext,CheckboxContext } from "../contexts/FormsProvider";
import { PermissionsAddContext,PermissionsEditContext,PermissionsEnableContext,StatusAddContext,StatusEnableContext } from "../contexts/UsersProvider";
import { LoggedTypeContext } from "../contexts/SessionProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para cambiar el modo de la página (Claro/Oscuro)
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
// Hook para cambiar la vista del login
export const HandleChangeLogin = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
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
    return handleChangeLogin;
}
// Hook para cambiar la vista del navbar
export const HandleChangeNavbar = () => {
    // Constantes con el valor de los contextos 
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSelect,setIsSelect] = useContext(SelectContext);
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
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext)
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
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
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
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Función del hook
    const handleChangeModal = (View) => {
        setCurrentMView(View);
        setIsModal(true);
        if(currentMView === 'Out-Login'){
            setTimeout(() => {
                setIsModal(false);
                navigate(isLoggedType === 'Cook' || isLoggedType === 'Nutritionist' || isLoggedType === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
            },700);
        }
    }
    // Retorno de la función del hook
    return handleChangeModal;
}