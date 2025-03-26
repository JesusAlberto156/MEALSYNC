import { createContext, useState } from "react"

export const navbarContext = createContext(null);
export const sidebarContext = createContext(null);
export const optionSidebarContext = createContext(null);

export const Navbar = ({ children }) => {

    const [isNavbar,setIsNavbar] = useState('');

    return (
        <navbarContext.Provider value={[isNavbar,setIsNavbar]}>
            {children}
        </navbarContext.Provider>
    );
}

export const Sidebar = ({ children }) => {

    const [isSidebar,setIsSidebar] = useState('Inicio');

    return (
        <sidebarContext.Provider value={[isSidebar,setIsSidebar]}>
            {children}
        </sidebarContext.Provider>
    );
}
