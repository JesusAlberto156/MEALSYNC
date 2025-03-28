import { createContext,useState } from "react"

export const loadingOptionLoginContext = createContext(null);
export const toastContext = createContext(null);
export const visibleContext = createContext(null);
export const selectedRowContext = createContext(null);
export const searchTermContext = createContext(null);
export const modalContext = createContext(null);
export const optionModalContext = createContext(null);
export const selectContext = createContext(null);
export const radioContext = createContext(null);

export const LoadingOptionLogin = ({ children }) => {

    const [isLoadingOptionLogin,setIsLoadingOptionLogin] = useState('');

    return (
        <loadingOptionLoginContext.Provider value={[isLoadingOptionLogin,setIsLoadingOptionLogin]}>
            {children}
        </loadingOptionLoginContext.Provider>
    );
}

export const Toast = ({ children }) => {

    const [isToast,setIsToast] = useState(false);

    return (
        <toastContext.Provider value={[isToast,setIsToast]}>
            {children}
        </toastContext.Provider>
    );
}

export const Visible = ({ children }) => {

    const [isVisible,setIsVisible] = useState(true);

    return (
        <visibleContext.Provider value={[isVisible,setIsVisible]}>
            {children}
        </visibleContext.Provider>
    );
}

export const SelectedRow = ({ children }) => {

    const [isSelectedRow,setIsSelectedRow] = useState(null);

    return (
        <selectedRowContext.Provider value={[isSelectedRow,setIsSelectedRow]}>
            {children}
        </selectedRowContext.Provider>
    );
}

export const SearchTerm = ({ children }) => {

    const [isSearchTerm,setIsSearchTerm] = useState('');

    return (
        <searchTermContext.Provider value={[isSearchTerm,setIsSearchTerm]}>
            {children}
        </searchTermContext.Provider>
    );
}

export const Modal = ({children}) => {

    const [isModal,setIsModal] = useState(false);

    return (
        <modalContext.Provider value={[isModal,setIsModal]}>
            {children}
        </modalContext.Provider>
    );
}

export const OptionModal = ({children}) => {

    const [isOptionModal,setIsOptionModal] = useState('');

    return (
        <optionModalContext.Provider value={[isOptionModal,setIsOptionModal]}>
            {children}
        </optionModalContext.Provider>
    );
}

export const Select = ({children}) => {

    const [isSelect,setIsSelect] = useState([]);

    return (
        <selectContext.Provider value={[isSelect,setIsSelect]}>
            {children}
        </selectContext.Provider>
    );
}

export const Radio = ({children}) => {

    const [isRadio,setIsRadio] = useState('');

    return (
        <radioContext.Provider value={[isRadio,setIsRadio]}>
            {children}
        </radioContext.Provider>
    );
}