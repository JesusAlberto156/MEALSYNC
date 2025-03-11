import { createContext, useState } from "react"

export const modalOutLoginContext = createContext(null);
export const modalAlertMedicoContext = createContext(null);
export const modalShoppingCartContext = createContext(null);

export const ModalOutLoginProvider = ({ children }) => {

    const [isModal,setIsModal] = useState(false);

    return (
        <modalOutLoginContext.Provider value={[isModal,setIsModal]}>
            {children}
        </modalOutLoginContext.Provider>
    );
}
export const ModalAlertMedicoProvider = ({ children }) => {

    const [isModal,setIsModal] = useState(true);

    return (
        <modalAlertMedicoContext.Provider value={[isModal,setIsModal]}>
            {children}
        </modalAlertMedicoContext.Provider>
    );
}
export const ModalShoppingCartProvider = ({ children }) => {

    const [isModal,setIsModal] = useState(false);

    return (
        <modalShoppingCartContext.Provider value={[isModal,setIsModal]}>
            {children}
        </modalShoppingCartContext.Provider>
    );
}