import { createContext, useState } from "react"

export const statusUsersContext = createContext(null);

export const StatusUsersProvider = ({ children }) => {

    const [statusUsers,setStatusUsers] = useState([]);

    return (
        <statusUsersContext.Provider value={[statusUsers,setStatusUsers]}>
            {children}
        </statusUsersContext.Provider>
    );
}