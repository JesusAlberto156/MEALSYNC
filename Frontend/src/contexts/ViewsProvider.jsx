//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const ThemeModeContext = createContext(null);
export const LoginViewContext = createContext(null);
export const NavbarViewContext = createContext(null);
export const SidebarViewContext = createContext(null);
export const SidebarContext = createContext(null);
export const ModalViewContext = createContext(null);
export const ModalContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función Contexto para controlar el modo de la página (Claro/Oscuro)
export const Theme_Mode = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [themeMode,setThemeMode] = useState(true);
    // Return para darle valor al contexto y heredarlo
    return(
        <ThemeModeContext.Provider value={[themeMode,setThemeMode]}>
            {children}
        </ThemeModeContext.Provider>
    );
}
// Función contexto para controlar la vista del login
export const Login_View = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [currentLView,setCurrentLView] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <LoginViewContext.Provider value={[currentLView,setCurrentLView]}>
            {children}
        </LoginViewContext.Provider>
    );
}
// Función contexto para controlar la vista del navbar
export const Navbar_View = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [currentNView,setCurrentNView] = useState(() => {
        const StoredData = sessionStorage.getItem('Navbar-View');

        if(StoredData){
            try{
                console.log('¡Tipo de usuario cargado correctamente!...');
                return StoredData;
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return '';
            }
        }else{
            return '';
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <NavbarViewContext.Provider value={[currentNView,setCurrentNView]}>
            {children}
        </NavbarViewContext.Provider>
    );
}
// Función contexto para controlar la vista del sidebar
export const Sidebar_View = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [currentSView,setCurrentSView] = useState(() => {
        const StoredData = sessionStorage.getItem('Sidebar-View');

        if(StoredData){
            try{
                console.log('¡Tipo de usuario cargado correctamente!...');
                return StoredData;
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return '';
            }
        }else{
            return '';
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <SidebarViewContext.Provider value={[currentSView,setCurrentSView]}>
            {children}
        </SidebarViewContext.Provider>
    );
}
// Función contexto para controlar la visibilidad del sidebar
export const Sidebar = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSidebar,setIsSidebar] = useState(() => {
        const sidebar = sessionStorage.getItem('Sidebar') === 'true';
        return sidebar;
    });
    // UseState para controlar el valor del contexto
    return (
        <SidebarContext.Provider value={[isSidebar,setIsSidebar]}>
            {children}
        </SidebarContext.Provider>
    );
}
// Función contexto para controlar el modal
export const Modal_View = ({children}) => {
    // UseState para controlar el valor del contexto
    const [currentMView,setCurrentMView] = useState('');
    // UseState para controlar el valor del contexto
    return (
        <ModalViewContext.Provider value={[currentMView,setCurrentMView]}>
            {children}
        </ModalViewContext.Provider>
    );
}
// Función contexto para controlar la visibilidad del modal
export const Modal = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isModal,setIsModal] = useState(false);
    // UseState para controlar el valor del contexto
    return (
        <ModalContext.Provider value={[isModal,setIsModal]}>
            {children}
        </ModalContext.Provider>
    );
}