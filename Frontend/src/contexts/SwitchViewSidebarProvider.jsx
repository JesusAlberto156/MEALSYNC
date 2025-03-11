import { createContext, useState } from "react"

export const viewSidebarContext = createContext(null);

export const ViewSidebarProvider = ({ children }) => {

    const [viewSidebar,setViewSidebar] = useState('');

    return (
        <viewSidebarContext.Provider value={[viewSidebar,setViewSidebar]}>
            {children}
        </viewSidebarContext.Provider>
    );
}