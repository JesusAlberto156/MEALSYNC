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
        Input: useRef(null),
        Keyboard: useRef(null),
        Key: useRef(null),
    };

    return(
        <refFormContext.Provider value={isForm}>
            {children}
        </refFormContext.Provider>
    );
}

export const Search = ({ children }) => {

    const isSearch = useRef(null);

    return(
        <searchContext.Provider value={isSearch}>
            {children}
        </searchContext.Provider>
    );
}

export const Form = ({ children }) => {

    const isForm = useRef(null);

    return(
        <formContext.Provider value={isForm}>
            {children}
        </formContext.Provider>
    );
}

export const StatusModal = ({ children }) => {

    const isStatusModal = {
        modal: useRef(null),
        form: useRef(null),
        tooltips: useRef([]),
    }

    return(
        <statusModalContext.Provider value={isStatusModal}>
            {children}
        </statusModalContext.Provider>
    );
}