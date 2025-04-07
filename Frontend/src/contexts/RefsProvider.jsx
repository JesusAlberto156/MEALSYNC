//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useRef } from "react"
// Contextos
export const refFormContext = createContext(null);
export const searchContext = createContext(null);
export const formContext = createContext(null);
export const statusModalContext = createContext(null);
//____________IMPORT/EXPORT____________

export const Ref_Form = ({ children }) => {

    const isForm = {
        Modal: useRef(null),
        Form: useRef(null),
        Button: useRef(null),
    };

    return(
        <refFormContext.Provider value={isForm}>
            {children}
        </refFormContext.Provider>
    );
}