import { createContext, useState } from "react"

export const usersContext = createContext(null);

export const UsersProvider = ({ children }) => {

    const [users,setUsers] = useState([]);

    return (
        <usersContext.Provider value={[users,setUsers]}>
            {children}
        </usersContext.Provider>
    );
}