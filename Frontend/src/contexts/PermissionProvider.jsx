import { createContext, useState } from "react"

export const permissionContext = createContext(null);

export const PermissionProvider = ({ children }) => {

    const [permission,setPermission] = useState([]);

    return (
        <permissionContext.Provider value={[permission,setPermission]}>
            {children}
        </permissionContext.Provider>
    );
}