import { createContext, useState } from "react"

export const loginContext = createContext(null);
export const toastContext = createContext(null);
export const visibleContext = createContext(null);
export const selectedRowContext = createContext(null);
export const searchTermContext = createContext(null);

export const Login = ({ children }) => {

    const [loadingOption,isLoadingOption] = useState(true);
    const [loadingAdministration,isLoadingAdministration] = useState(false);
    const [loadingKitchen,isLoadingKitchen] = useState(false);
    const [loadingLogin,isLoadingLogin] = useState(false);
    const [loadingLoginAdministration,isLoadingLoginAdministration] = useState(false);
    const [loadingLoginKitchen,isLoadingLoginKitchen] = useState(false);

    return (
        <loginContext.Provider value={
            {loadingOption,isLoadingOption,
            loadingAdministration,isLoadingAdministration,
            loadingKitchen,isLoadingKitchen,
            loadingLogin,isLoadingLogin,
            loadingLoginAdministration,isLoadingLoginAdministration,
            loadingLoginKitchen,isLoadingLoginKitchen}
        }>
            {children}
        </loginContext.Provider>
    );
}

export const Toast = ({ children }) => {

    const [toast,setToast] = useState(false);

    return (
        <toastContext.Provider value={[toast,setToast]}>
            {children}
        </toastContext.Provider>
    );
}

export const Visible = ({ children }) => {

    const [visible,setVisible] = useState(true);

    return (
        <visibleContext.Provider value={[visible,setVisible]}>
            {children}
        </visibleContext.Provider>
    );
}

export const SelectedRow = ({ children }) => {

    const [selectedRow,setSelectedRow] = useState(null);

    return (
        <selectedRowContext.Provider value={[selectedRow,setSelectedRow]}>
            {children}
        </selectedRowContext.Provider>
    );
}

export const SearchTerm = ({ children }) => {

    const [searchTerm,setSearchTerm] = useState('');

    return (
        <searchTermContext.Provider value={[searchTerm,setSearchTerm]}>
            {children}
        </searchTermContext.Provider>
    );
}