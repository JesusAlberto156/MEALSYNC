//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useRef } from "react"
// Contextos
export const RefAlertGreetingContext = createContext(null);
export const RefKeyboardContext = createContext(null);
export const RefUsersContext = createContext(null);
export const RefPermissionsContext = createContext(null);

export const refFormStatusContext = createContext(null);
export const refButtonStatusContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función contexto para controlar las alertas de bienvenida de la pagina
export const Ref_Alert_Greeting = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isAlertGreeting = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefAlertGreetingContext.Provider value={isAlertGreeting}>
            {children}
        </RefAlertGreetingContext.Provider>
    );
}
// Función contexto para controlar el teclado de la pagina
export const Ref_Keyboard = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isKeyboard = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefKeyboardContext.Provider value={isKeyboard}>
            {children}
        </RefKeyboardContext.Provider>
    );
}
// Función contexto para controlar la tabla de usuarios
export const Ref_Users = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isUsers = {
        Modal: useRef(null),
        Form: useRef(null),
        Button_Edit_U: useRef(null),
        Button_Delete_U: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefUsersContext.Provider value={isUsers}>
            {children}
        </RefUsersContext.Provider>
    );
}
// Función contexto para controlar la tabla de permisos
export const Ref_Permissions = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isPermissions = {
        Modal: useRef(null),
        Form: useRef(null),
        Button_Edit_P: useRef(null),
        Button_Enable_P: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefPermissionsContext.Provider value={isPermissions}>
            {children}
        </RefPermissionsContext.Provider>
    );
}

export const Ref_Form_Status = ({ children }) => {

    const isForm = {
        Modal: useRef(null),
        Form: useRef(null),
    };

    return(
        <refFormStatusContext.Provider value={isForm}>
            {children}
        </refFormStatusContext.Provider>
    );
}

export const Ref_Button_Status = ({ children }) => {

    const isButtonS = useRef(null);

    return(
        <refButtonStatusContext.Provider value={isButtonS}>
            {children}
        </refButtonStatusContext.Provider>
    );
}