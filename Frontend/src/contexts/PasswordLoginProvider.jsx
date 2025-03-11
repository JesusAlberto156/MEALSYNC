import { createContext, useState } from "react"

export const passwordLoginContext = createContext(null);

export const PasswordLoginProvider = ({ children }) => {

    const [passwordLogin,setPasswordLogin] = useState('');

    return (
        <passwordLoginContext.Provider value={[passwordLogin,setPasswordLogin]}>
            {children}
        </passwordLoginContext.Provider>
    );
}