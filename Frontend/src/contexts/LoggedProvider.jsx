import { createContext, useState } from "react"

export const loggedContext = createContext(null);

export const LoggedProvider = ({ children }) => {

    const [isLogged,setIsLogged] = useState(false);

    return (
        <loggedContext.Provider value={[isLogged,setIsLogged]}>
            {children}
        </loggedContext.Provider>
    );
}