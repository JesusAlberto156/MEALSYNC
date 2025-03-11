import { createContext, useState } from "react"

export const viewNavbarContext = createContext(null);

export const ViewNavbarProvider = ({ children }) => {

    const [viewNavbar,setViewNavbar] = useState('');

    return (
        <viewNavbarContext.Provider value={[viewNavbar,setViewNavbar]}>
            {children}
        </viewNavbarContext.Provider>
    );
}