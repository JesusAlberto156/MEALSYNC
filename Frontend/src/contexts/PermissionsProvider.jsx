import { createContext, useState } from "react"

export const permissionsContext = createContext(null);

export const PermissionsProvider = ({ children }) => {

    const [permissions,setPermissions] = useState([]);

    return (
        <permissionsContext.Provider value={[permissions,setPermissions]}>
            {children}
        </permissionsContext.Provider>
    );
}