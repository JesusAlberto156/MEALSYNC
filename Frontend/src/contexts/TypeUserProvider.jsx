import { createContext, useState } from "react"

export const typeUserContext = createContext(null);

export const TypeUserProvider = ({ children }) => {

    const [typeUser,setTypeUser] = useState('');

    return (
        <typeUserContext.Provider value={[typeUser,setTypeUser]}>
            {children}
        </typeUserContext.Provider>
    );
}