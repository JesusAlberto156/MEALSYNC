//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const VerificationBlockContext = createContext(null);
export const AnimationContext = createContext(null);
export const ActionBlockContext = createContext(null);
export const KeyboardContext = createContext(null);
export const KeyboardViewContext = createContext(null);
export const TouchContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función Contexto para controlar la verificación de inicio de sesión ✔️
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
// Función Contexto para controlar las animaciones de los objetos ✔️
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
// Función Contexto para controlar el bloqueo de acciones ✔️
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