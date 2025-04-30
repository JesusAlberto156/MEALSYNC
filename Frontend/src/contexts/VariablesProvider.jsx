//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const SelectedRowContext = createContext(null);
export const SearchTermContext = createContext(null);
export const VerificationBlockContext = createContext(null);
export const AnimationContext = createContext(null);
export const ActionBlockContext = createContext(null);
export const ViewPasswordContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función Contexto para controlar el renglon seleccionado de una tabla
export const Selected_Row = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedRow,setIsSelectedRow] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedRowContext.Provider value={[isSelectedRow,setIsSelectedRow]}>
            {children}
        </SelectedRowContext.Provider>
    );
}
// Función Contexto para controlar el buscador
export const Search_Term = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm,setIsSearchTerm] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SearchTermContext.Provider value={[isSearchTerm,setIsSearchTerm]}>
            {children}
        </SearchTermContext.Provider>
    );
}
// Función Contexto para controlar la verificación de inicio de sesión
export const Verification_Block = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isVerificationBlock,setIsVerificationBlock] = useState(() => {
        const verificationBlock = sessionStorage.getItem('Verification-Block') === 'true';
        return verificationBlock;
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <VerificationBlockContext.Provider value={[isVerificationBlock,setIsVerificationBlock]}>
            {children}
        </VerificationBlockContext.Provider>
    );
}
// Función Contexto para controlar las animaciones de los objetos
export const Animation = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isAnimation,setIsAnimation] = useState(() => {
        const animation = sessionStorage.getItem('Animation') === 'true';
        return animation;
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <AnimationContext.Provider value={[isAnimation,setIsAnimation]}>
            {children}
        </AnimationContext.Provider>
    );
}
// Función Contexto para controlar el bloqueo de acciones
export const Action_Block = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isActiveBlock,setIsActiveBlock] = useState(() => {
        const activeBlock = sessionStorage.getItem('Action-Block') === 'true';
        return activeBlock;
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <ActionBlockContext.Provider value={[isActiveBlock,setIsActiveBlock]}>
            {children}
        </ActionBlockContext.Provider>
    );
}
// Función Contexto para controlar la vista de las contraseñas de los usuarios
export const View_Password = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isViewPassword,setIsViewPassword] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <ViewPasswordContext.Provider value={[isViewPassword,setIsViewPassword]}>
            {children}
        </ViewPasswordContext.Provider>
    );
}