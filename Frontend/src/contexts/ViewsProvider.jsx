//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useState } from "react"
// Contextos
export const themeModeContext = createContext(null);
export const loginViewContext = createContext(null);
export const navbarViewContext = createContext(null);
export const sidebarViewContext = createContext(null);
export const sidebarVisibleContext = createContext(null);
export const modalViewContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función Contexto para controlar el modo de la página (Claro/Oscuro)
export const Theme_Mode = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [themeMode,setThemeMode] = useState(true);
    // Return para darle valor al contexto y heredarlo
    return(
        <themeModeContext.Provider value={[themeMode,setThemeMode]}>
            {children}
        </themeModeContext.Provider>
    );
}
// Función contexto para controlar la vista del login
export const Login_View = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [currentView,setCurrentView] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <loginViewContext.Provider value={[currentView,setCurrentView]}>
            {children}
        </loginViewContext.Provider>
    );
}
// Función contexto para controlar la vista del navbar
export const Navbar_View = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [currentView,setCurrentView] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <navbarViewContext.Provider value={[currentView,setCurrentView]}>
            {children}
        </navbarViewContext.Provider>
    );
}
// Función contexto para controlar la vista del sidebar
export const Sidebar_View = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [currentView,setCurrentView] = useState('Home');
    // Return para darle valor al contexto y heredarlo
    return (
        <sidebarViewContext.Provider value={[currentView,setCurrentView]}>
            {children}
        </sidebarViewContext.Provider>
    );
}
// Función contexto para controlar la visibilidad del sidebar
export const Sidebar_Visible = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSidebarVisible,setIsSidebarVisible] = useState(true);
    // UseState para controlar el valor del contexto
    return (
        <sidebarVisibleContext.Provider value={[isSidebarVisible,setIsSidebarVisible]}>
            {children}
        </sidebarVisibleContext.Provider>
    );
}
// Función contexto para controlar la visibilidad del modal
export const Modal_View = ({children}) => {

    const [currentView,setCurrentView] = useState('');

    return (
        <modalViewContext.Provider value={[currentView,setCurrentView]}>
            {children}
        </modalViewContext.Provider>
    );
}