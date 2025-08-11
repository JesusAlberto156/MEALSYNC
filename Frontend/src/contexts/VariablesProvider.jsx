//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const VerificationBlockContext = createContext(null);
export const AnimationContext = createContext(null);
export const ActionBlockContext = createContext(null);
export const FunctionBlockContext = createContext(null);
export const KeyboardContext = createContext(null);
export const KeyboardViewContext = createContext(null);
export const TouchContext = createContext(null);
export const UserUpdatedContext = createContext(null);
export const PermissionUpdatedContext = createContext(null);
export const IndexSearchContext = createContext(null);
export const IndexCountContext = createContext(null);
export const IndexDetailContext = createContext(null);
//____________IMPORT/EXPORT____________

// Todos los contextos para las variables generales para funcionalidades ✔️
export const Index_Variables = ({children}) => {
    return(
        <Verification_Block>
            <Animation>
                <Action_Block>
                    <Function_Action_Block>
                        <Keyboard>
                            <Keyboard_View>
                                <Touch>
                                    <User_Updated>
                                        <Permission_Updated>
                                            <Index_Search>
                                                <Index_Count>
                                                    <Index_Detail>
                                                        {children}
                                                    </Index_Detail>
                                                </Index_Count>
                                            </Index_Search>
                                        </Permission_Updated>
                                    </User_Updated>
                                </Touch>
                            </Keyboard_View>
                        </Keyboard>
                    </Function_Action_Block>
                </Action_Block>
            </Animation>
        </Verification_Block>
    );
}

// Función Contexto para controlar la verificación de inicio de sesión ✔️
export const Verification_Block = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isVerificationBlock,setIsVerificationBlock] = useState(() => {
        const verificationBlock = sessionStorage.getItem('Verificación del Bloqueo') === 'true';
        return verificationBlock;
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <VerificationBlockContext.Provider value={[isVerificationBlock,setIsVerificationBlock]}>
            {children}
        </VerificationBlockContext.Provider>
    );
}
// Función Contexto para controlar las animaciones de los objetos ✔️
export const Animation = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isAnimation,setIsAnimation] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <AnimationContext.Provider value={[isAnimation,setIsAnimation]}>
            {children}
        </AnimationContext.Provider>
    );
}
// Función Contexto para controlar el bloqueo de acciones ✔️
export const Action_Block = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isActionBlock,setIsActionBlock] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <ActionBlockContext.Provider value={[isActionBlock,setIsActionBlock]}>
            {children}
        </ActionBlockContext.Provider>
    );
}
// Función Contexto para controlar el bloqueo de la función ✔️
export const Function_Action_Block = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isFunctionBlock,setIsFunctionBlock] = useState(() => {
        const functionBlock = sessionStorage.getItem('Función del Bloqueo') === 'true';
        return functionBlock;
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <FunctionBlockContext.Provider value={[isFunctionBlock,setIsFunctionBlock]}>
            {children}
        </FunctionBlockContext.Provider>
    );
}
// Función Contexto para controlar la visibilidad del teclado ✔️
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
// Función Contexto para controlar donde va a escribir el teclado ✔️
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
// Función Contexto para controlar si es necesario abrir el teclado o no ✔️
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
// Función Contexto para controlar las alertas de los usuarios editados ✔️
export const User_Updated = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isUserUpdated,setIsUserUpdated] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <UserUpdatedContext.Provider value={[isUserUpdated,setIsUserUpdated]}>
            {children}
        </UserUpdatedContext.Provider>
    );
}
// Función Contexto para controlar las alertas de los permisos editados ✔️
export const Permission_Updated = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isPermissionUpdated,setIsPermissionUpdated] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <PermissionUpdatedContext.Provider value={[isPermissionUpdated,setIsPermissionUpdated]}>
            {children}
        </PermissionUpdatedContext.Provider>
    );
}
// Función Contexto para controlar el index del buscador ✔️
export const Index_Search = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isIndexSearch,setIsIndexSearch] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <IndexSearchContext.Provider value={[isIndexSearch,setIsIndexSearch]}>
            {children}
        </IndexSearchContext.Provider>
    );
}
// Función Contexto para controlar el index de la cantidad ✔️
export const Index_Count = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isIndexCount,setIsIndexCount] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <IndexCountContext.Provider value={[isIndexCount,setIsIndexCount]}>
            {children}
        </IndexCountContext.Provider>
    );
}
// Función Contexto para controlar el index del detalle ✔️
export const Index_Detail = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isIndexDetail,setIsIndexDetail] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <IndexDetailContext.Provider value={[isIndexDetail,setIsIndexDetail]}>
            {children}
        </IndexDetailContext.Provider>
    );
}