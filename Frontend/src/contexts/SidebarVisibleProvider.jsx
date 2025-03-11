import { createContext, useState } from "react"

export const sidebarVisibleContext = createContext(null);

export const SidebarVisibleProvider = ({ children }) => {

    const [sidebarVisible,setSidebarVisible] = useState(true);

    return (
        <sidebarVisibleContext.Provider value={[sidebarVisible,setSidebarVisible]}>
            {children}
        </sidebarVisibleContext.Provider>
    );
}