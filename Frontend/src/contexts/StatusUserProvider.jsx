import { createContext, useState } from "react"

export const statusUserContext = createContext(null);

export const StatusUserProvider = ({ children }) => {

    const [statusUser,setStatusUser] = useState([]);

    return (
        <statusUserContext.Provider value={[statusUser,setStatusUser]}>
            {children}
        </statusUserContext.Provider>
    );
}