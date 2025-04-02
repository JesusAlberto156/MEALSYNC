//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useRef } from "react"
// Contextos
export const searchContext = createContext(null);
export const formContext = createContext(null);
export const statusModalContext = createContext(null);
//____________IMPORT/EXPORT____________

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