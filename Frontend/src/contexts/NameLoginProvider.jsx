import { createContext, useState } from "react"

export const nameLoginContext = createContext(null);

export const NameLoginProvider = ({ children }) => {

    const [nameLogin,setNameLogin] = useState('');

    return (
        <nameLoginContext.Provider value={[nameLogin,setNameLogin]}>
            {children}
        </nameLoginContext.Provider>
    );
}