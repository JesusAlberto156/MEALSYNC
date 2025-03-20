import { createContext, useState } from "react"

export const navbarContext = createContext(null);
export const sidebarContext = createContext(null);
export const optionSidebarContext = createContext(null);

export const Navbar = ({ children }) => {

    const [navbar,setNavbar] = useState('');

    return (
        <navbarContext.Provider value={[navbar,setNavbar]}>
            {children}
        </navbarContext.Provider>
    );
}

export const Sidebar = ({ children }) => {

    const [sidebar,setSidebar] = useState('Inicio');

    return (
        <sidebarContext.Provider value={[sidebar,setSidebar]}>
            {children}
        </sidebarContext.Provider>
    );
}
