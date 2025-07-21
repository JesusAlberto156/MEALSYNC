//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useRef,useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoginViewContext,NavbarViewContext,SidebarViewContext,SidebarContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { TouchContext,KeyboardViewContext,KeyboardContext,ActionBlockContext } from "../contexts/VariablesProvider";
import { RefKeyboardContext } from "../contexts/RefsProvider";
import { TextFieldsUserContext,TextFieldsMenuTypeContext } from "../contexts/FormsProvider";
import { LoggedTypeContext } from "../contexts/SessionProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedOptions,ResetSelectedTables } from "./Texts";
//____________IMPORT/EXPORT____________

// Hook para cambiar la vista del login ✔️
export const HandleLoginView = () => {
    // Constantes con el valor de los contextos 
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Función del hook
    const handleLoginView = (option,type) => {
        setCurrentLView(option);
        if(option === 'Administration' || option === 'Kitchen'){
            setIsTextFieldsUser(prev => ({
                ...prev,             
                usuario: '',      
                contrasena: '',       
            }));
            setIsLoggedType('');
        }
        if(option === 'Login'){
            setIsLoggedType(type);
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
    const resetSelectedTables = ResetSelectedTables();
    // Función del hook
    const handleNavbarView = (View) => {
        setCurrentNView(View);
        resetSearchTerms();
        resetSelectedOptions();
        resetSelectedTables();
        sessionStorage.setItem('Vista del Navbar',View);
    };
    // Retorno de la función del hook
    return handleNavbarView;
}
// Hook para controlar el teclado virtual 
export const HandleKeyboard = () => {
    // Constantes con el valor de los contextos 
    const [isTouch,setIsTouch] = useContext(TouchContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);

    const [isTextFieldsMenuType,setIsTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    // Constantes con el valor de los useRef
    const lastTouchTimeRef = useRef(0);
    // Hook con callback para verificar si hubo touch o no en la pantalla 
    const KeyboardView = useCallback(() => {
        const handleTouchStart = () => {
            lastTouchTimeRef.current = Date.now();
            setIsTouch(true);
        };

        const handleMouseDown = () => {
            const now = Date.now();
            const timeSinceLastTouch = now - lastTouchTimeRef.current;

            // Solo si no hubo un touch reciente, considera que es mouse
            if (timeSinceLastTouch > 500) {
                setIsTouch(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousedown', handleMouseDown);
        }; 
    }, []);
    /// Hook con callback para mantener visible el teclado
    const KeyboardClick = useCallback(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                // Usuario
                const inputNameUser = document.getElementById("Input-Nombre-Usuario");
                const inputShortNameUser = document.getElementById("Input-Nombre-Corto-Usuario");
                const inputUser = document.getElementById("Input-Usuario");
                const inputPassword = document.getElementById("Input-Contraseña");

                // Menu
                const inputNameMenu = document.getElementById("Input-Nombre-Menu");

                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);

                const clickInsideInputs = 
                    // Usuario
                    (inputNameUser && inputNameUser.contains(event.target)) ||
                    (inputShortNameUser && inputShortNameUser.contains(event.target)) ||
                    (inputUser && inputUser.contains(event.target)) ||
                    (inputPassword && inputPassword.contains(event.target)) ||
                    
                    // Menu
                    (inputNameMenu && inputNameMenu.contains(event.target));
                if (!clickInsideInputs && !keyboard) {
                    setIsKeyboardView('');
                    setTimeout(() => {
                        setIsKeyboard(false);
                    }, 500);
                }
            }, 0);
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);
    // Hook con callback para escribir con el teclado
    const handleKeyboard = useCallback((newValue) => {
        switch (isKeyboardView) {
            case 'Nombre-Usuario':
                if (newValue.length > 150) return;
                setIsTextFieldsUser(prev => ({ ...prev, nombre: newValue }));
                break;
            case 'Nombre-Corto-Usuario':
                if (newValue.length > 50) return;
                setIsTextFieldsUser(prev => ({ ...prev, nombrecorto: newValue }));
                break;
            case 'Usuario':
                if (newValue.length > 25) return;
                setIsTextFieldsUser(prev => ({ ...prev, usuario: newValue }));
                break;
            case 'Contraseña':
                if (newValue.length > 15) return;
                setIsTextFieldsUser(prev => ({ ...prev, contrasena: newValue }));
                break;
            case 'Nombre-Menu':
                if (newValue.length > 100) return;
                setIsTextFieldsMenuType(prev => ({ ...prev, nombre: newValue }));
                break;
        }
    }, [isKeyboardView]);
    // Retorno de las funciónes del hook
    return { KeyboardView,KeyboardClick,handleKeyboard }
}
// Hook para cambiar la vista del sidebar ✔️
export const HandleSidebarView = () => {
    // Constantes con el valor de los contextos 
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    // Constantes con la funcionalidad de los hooks
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    const resetSelectedTables = ResetSelectedTables();
    // Función del hook
    const handleSidebarView = (View) => {
        setCurrentSView(View);
        resetSearchTerms();
        resetSelectedOptions();
        resetSelectedTables();
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
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    // Función del hook
    const handleModalView = (View) => {
        setIsModal(true);
        sessionStorage.setItem('Estado del Modal',true);
        const route = sessionStorage.getItem('Ruta');
        const sidebar = sessionStorage.getItem('Estado del Sidebar')
        // CERRAR SESIÓN
        if(currentMView === 'Cerrar-Sesión' && View === ''){
            setIsActionBlock(true);
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                if(sidebar === 'true'){setIsSidebar(true)};
                setIsActionBlock(false);
                return navigate(route,{ replace: true });
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