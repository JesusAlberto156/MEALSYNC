//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ThemeModeContext,LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext,SubModalContext } from "../contexts/ViewsProvider";
import { AnimationContext,ActionBlockContext,VerificationBlockContext } from "../contexts/VariablesProvider";
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context } from "../contexts/SearchsProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context } from "../contexts/SelectedesProvider";
import { TextFieldsUserContext } from "../contexts/FormsProvider";
import { PermissionsEnableContext,StatusEnableContext } from "../contexts/UsersProvider";
import { LoggedTypeContext } from "../contexts/SessionProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetTextFieldsUser,ResetTextFieldsPermissions,ResetTextFieldsStatus,ResetTextFieldsSupplier,ResetTextFieldsSupply,ResetTextFieldsSupplyType,ResetTextFieldsUnit } from "./Texts";
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
// Hook para cambiar la vista del navbar ✔️
export const HandleNavbarView = () => {
    // Constantes con el valor de los contextos 
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Función del hook
    const handleNavbarView = (View) => {
        setCurrentNView(View);
        setIsSearchTerm('');
        setIsSearchTerm1('');
        setIsSearchTerm2('');
        sessionStorage.setItem('Navbar-View',View);
    };
    // Retorno de la función del hook
    return handleNavbarView;
}
// Hook para cambiar la vista del sidebar ✔️
export const HandleSidebarView = () => {
    // Constantes con el valor de los contextos 
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext)
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    // Función del hook
    const handleSidebarView = (View) => {
        setCurrentSView(View);
        setIsSearchTerm('');
        setIsSearchTerm1('');
        setIsSearchTerm2('');
        sessionStorage.setItem('Sidebar-View',View);
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
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSelectedRow1,setIsSelectedRow1] = useContext(SelectedRow1Context);
    const [isSelectedRow2,setIsSelectedRow2] = useContext(SelectedRow2Context);
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [isSubModal,setIsSubModal] = useContext(SubModalContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const resetTextFieldsSupplier = ResetTextFieldsSupplier();
    const resetTextFieldsSupply = ResetTextFieldsSupply();
    const resetTextFieldsSupplyType = ResetTextFieldsSupplyType();
    const resetTextFieldsUnit = ResetTextFieldsUnit();
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
                setIsSubModal(false);
                sessionStorage.setItem('Sub-Modal',false);
                setIsAnimation(false);
                sessionStorage.removeItem('Animation');
                resetTextFieldsPermissions();
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
        if(currentMView === 'User-Edit' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'User-Delete' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow(null);
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
                setIsActionBlock(false);
                setIsVerificationBlock(false);
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
        if(currentMView === 'Warehouse-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        
        if(currentMView === 'Supply-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsSupply();
                setIsActionBlock(false);
                resetSearchTerms();
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Supply-Edit' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow(null);
                setIsActionBlock(false);
                resetSearchTerms();
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Supply-Type-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsSupplyType();
                setIsActionBlock(false);
                resetSearchTerms();
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Supply-Type-Edit' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow1(null);
                setIsActionBlock(false);
                resetSearchTerms();
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Unit-Add' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                resetTextFieldsUnit();
                setIsActionBlock(false);
                resetSearchTerms();
                navigate(route,{ replace: true });
            },750);
        }
        if(currentMView === 'Unit-Edit' && View === ''){
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Modal',false);
                setIsSelectedRow2(null);
                setIsActionBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
        setCurrentMView(View);
        sessionStorage.setItem('Modal-View',View);
    }
    // Retorno de la función del hook
    return handleModalView;
}