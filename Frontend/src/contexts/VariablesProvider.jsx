//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const modeContext = createContext(null);
export const loadingOptionLoginContext = createContext(null);
export const visibleContext = createContext(null);
export const selectedRowContext = createContext(null);
export const searchTermContext = createContext(null);
export const modalContext = createContext(null);
export const optionModalContext = createContext(null);
export const selectContext = createContext(null);
export const radioContext = createContext(null);
export const comprobationContext = createContext(null);
export const blockContext = createContext(null);
export const enableContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función Contexto de cambio de modo de las interfaces (Claro/Oscuro)
export const Mode = ({ children }) => {

    const [isMode,setIsMode] = useState(true);

    return(
        <modeContext.Provider value={[isMode,setIsMode]}>
            {children}
        </modeContext.Provider>
    );
}

export const LoadingOptionLogin = ({ children }) => {

    const [isLoadingOptionLogin,setIsLoadingOptionLogin] = useState('');

    return (
        <loadingOptionLoginContext.Provider value={[isLoadingOptionLogin,setIsLoadingOptionLogin]}>
            {children}
        </loadingOptionLoginContext.Provider>
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

export const Comprobation = ({children}) => {

    const [isComprobation,setIsComprobation] = useState(false);

    return (
        <comprobationContext.Provider value={[isComprobation,setIsComprobation]}>
            {children}
        </comprobationContext.Provider>
    );
}

export const Block = ({children}) => {

    const [isBlock,setIsBlock] = useState(false);

    return (
        <blockContext.Provider value={[isBlock,setIsBlock]}>
            {children}
        </blockContext.Provider>
    );
}

export const Enable = ({children}) => {

    const [isEnable,setIsEnable] = useState(false);

    return (
        <enableContext.Provider value={[isEnable,setIsEnable]}>
            {children}
        </enableContext.Provider>
    );
}