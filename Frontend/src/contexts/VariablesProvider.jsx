//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const SelectedRowContext = createContext(null);
export const SelectedRow1Context = createContext(null);
export const SelectedRow2Context = createContext(null);
export const SearchTermContext = createContext(null);
export const SearchTerm1Context = createContext(null);
export const SearchTerm2Context = createContext(null);
export const VerificationBlockContext = createContext(null);
export const AnimationContext = createContext(null);
export const ActionBlockContext = createContext(null);
export const ViewPasswordContext = createContext(null);
export const KeyboardContext = createContext(null);
export const KeyboardViewContext = createContext(null);
export const TouchContext = createContext(null);
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
// Función Contexto para controlar el renglon seleccionado de la tabla 1
export const Selected_Row_1 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedRow1,setIsSelectedRow1] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedRow1Context.Provider value={[isSelectedRow1,setIsSelectedRow1]}>
            {children}
        </SelectedRow1Context.Provider>
    );
}
// Función Contexto para controlar el renglon seleccionado de la tabla 2
export const Selected_Row_2 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedRow2,setIsSelectedRow2] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedRow2Context.Provider value={[isSelectedRow2,setIsSelectedRow2]}>
            {children}
        </SelectedRow2Context.Provider>
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
// Función Contexto para controlar el buscador 1
export const Search_Term_1 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm1,setIsSearchTerm1] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SearchTerm1Context.Provider value={[isSearchTerm1,setIsSearchTerm1]}>
            {children}
        </SearchTerm1Context.Provider>
    );
}
// Función Contexto para controlar el buscador 2
export const Search_Term_2 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm2,setIsSearchTerm2] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SearchTerm2Context.Provider value={[isSearchTerm2,setIsSearchTerm2]}>
            {children}
        </SearchTerm2Context.Provider>
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
// Función Contexto para controlar la visibilidad del teclado
export const Keyboard = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isKeyboard,setIsKeyboard] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <KeyboardContext.Provider value={[isKeyboard,setIsKeyboard]}>
            {children}
        </KeyboardContext.Provider>
    );
}
// Función Contexto para controlar donde va a escribir el teclado
export const Keyboard_View = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isKeyboardView,setIsKeyboardView] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <KeyboardViewContext.Provider value={[isKeyboardView,setIsKeyboardView]}>
            {children}
        </KeyboardViewContext.Provider>
    );
}
// Función Contexto para controlar si es necesario abrir el teclado o no
export const Touch = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isTouch,setIsTouch] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <TouchContext.Provider value={[isTouch,setIsTouch]}>
            {children}
        </TouchContext.Provider>
    );
}