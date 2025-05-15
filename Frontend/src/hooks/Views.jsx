//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ThemeModeContext,LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { SearchTermContext,SelectedRowContext,AnimationContext,ActionBlockContext,VerificationBlockContext } from "../contexts/VariablesProvider";
import { SelectContext,RadioPermissionsContext,RadioStatusContext,CheckboxContext,TextFieldsUserContext } from "../contexts/FormsProvider";
import { PermissionsEnableContext,StatusEnableContext } from "../contexts/UsersProvider";
import { LoggedTypeContext } from "../contexts/SessionProvider";
// Hooks personalizados
import { ResetTextFieldsUser,ResetTextFieldsPermissions,ResetTextFieldsStatus,ResetTextFieldsSupplier,ResetTextFieldsSupply } from "./Texts";
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
    const [isSelect,setIsSelect] = useContext(SelectContext);
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
    const [isRadioPermissions,setIsRadioPermissions] = useContext(RadioPermissionsContext);
    const [isRadioStatus,setIsRadioStatus] = useContext(RadioStatusContext);
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSelect,setIsSelect] = useContext(SelectContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    const resetTextFieldsSupply = ResetTextFieldsSupply();
    // Función del hook
    const handleModalView = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Modal',true);
        const route = sessionStorage.getItem('Route');
        if(currentMView === 'Out-Login' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'User-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsUser();
                resetTextFieldsPermissions();
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'User-Edit' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'User-View' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsUser();
                setIsActionBlock(false);
                setIsVerificationBlock(false);
                sessionStorage.removeItem('Action-Block');
                sessionStorage.removeItem('Verification-Block');
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Permissions-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsPermissions();
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Permissions-Edit' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsActionBlock(false);
                setIsSelectedRow(null);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Permissions-Enable' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsActionBlock(false);
                setIsSelectedRow(null);
                setIsVerificationBlock(false);
                resetTextFieldsUser();
                setIsPermissionsEnable([]);
                sessionStorage.removeItem('Action-Block');
                sessionStorage.removeItem('Verification-Block');
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Status-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsActionBlock(false);
                resetTextFieldsStatus();
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Status-Enable' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsUser();
                setIsActionBlock(false);
                setIsVerificationBlock(false);
                setIsStatusEnable([]);
                setIsSelectedRow(null);
                sessionStorage.removeItem('Action-Block');
                sessionStorage.removeItem('Verification-Block');
                navigate(route,{ replace: true });
            },750);
        }

        if(currentMView === 'Supplier-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsSupplier();
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Supplier-Edit' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Supplier-Details' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow(null);
                navigate(route,{ replace: true });
            },750);
        }

        if(currentMView === 'Supply-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsSupply();
                navigate(route,{ replace: true });
            },750);
        }
        setCurrentMView(View);
        sessionStorage.setItem('Modal-View',View);
    }
    // Retorno de la función del hook
    return handleModalView;
}