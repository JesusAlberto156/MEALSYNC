//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ThemeModeContext,LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { SearchTermContext,SelectedRowContext,AnimationContext,ActionBlockContext,VerificationBlockContext } from "../contexts/VariablesProvider";
import { TextFieldsContext,SelectContext,RadioPermissionsContext,RadioStatusContext,CheckboxContext } from "../contexts/FormsProvider";
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
        sessionStorage.setItem('Theme-Mode',!themeMode);
    }
    // Retorno de la función del hook
    return toggleThemeMode;
}
// Hook para cambiar la vista del login
export const HandleLoginView = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
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
    return handleLoginView;
}
// Hook para cambiar la vista del navbar
export const HandleNavbarView = () => {
    // Constantes con el valor de los contextos 
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    // Función del hook
    const handleNavbarView = (View) => {
        setCurrentNView(View);
        setIsSearchTerm('');
        sessionStorage.setItem('Navbar-View',View);
    };
    // Retorno de la función del hook
    return handleNavbarView;
}
// Hook para cambiar la vista del sidebar
export const HandleSidebarView = () => {
    // Constantes con el valor de los contextos 
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext)
    // Función del hook
    const handleSidebarView = (View) => {
        setCurrentSView(View);
        setIsSearchTerm('');
        sessionStorage.setItem('Sidebar-View',View);
    };
    // Retorno de la función del hook
    return handleSidebarView;
};
// Hook para cambiar el sidebar (Ocultar/Mostrar)
export const ToggleSidebar = () => {
    // Constantes con el valor de los contextos 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Función del hook
    const toggleSidebar = () => {
        setIsSidebar(!isSidebar);
        sessionStorage.setItem('Sidebar',!isSidebar);
    };
    // Retorno de la función del hook
    return toggleSidebar;
};
// Hook para cambiar el modal
export const HandleModalView = () => {
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    const [isRadioPermissions,setIsRadioPermissions] = useContext(RadioPermissionsContext);
    const [isRadioStatus,setIsRadioStatus] = useContext(RadioStatusContext);
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    // Estados iniciales de los contextos
    const initialTextFields = {
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
    };
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Función del hook
    const handleModalView = (View) => {
        if(currentMView === 'Out-Login'){
            setCurrentMView(View);
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal-View',View);
                sessionStorage.setItem('Modal',false);
                return navigate(isLoggedType === 'Cook' || isLoggedType === 'Nutritionist' || isLoggedType === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
            },700);
        }
        if(currentMView === 'User-Add'){
            setCurrentMView(View);
            setTimeout(() => {
                setIsModal(false);
                setIsTextFields(initialTextFields);
                setIsRadioPermissions('');
                setIsRadioStatus('');
                setIsCheckbox([]);
                sessionStorage.setItem('Modal-View',View);
                sessionStorage.setItem('Modal',false);
                return navigate('/Administration/Users/Users',{ replace: true });
            },750);
        }
        setCurrentMView(View);
        setIsModal(true);
        sessionStorage.setItem('Modal-View',View);
        sessionStorage.setItem('Modal',true);
    }
    // Retorno de la función del hook
    return handleModalView;
}