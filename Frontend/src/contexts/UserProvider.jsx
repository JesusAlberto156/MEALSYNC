import { createContext, useState } from "react"

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [user,setUser] = useState([]);

    return (
        <userContext.Provider value={[user,setUser]}>
            {children}
        </userContext.Provider>
    );
}