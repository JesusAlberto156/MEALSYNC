//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useRef } from "react"
// Contextos
export const refKeyboardContext = createContext(null);
export const refFormUsersContext = createContext(null);
export const refButtonUsersContext = createContext(null);
export const refFormPermissionsContext = createContext(null);
export const refButtonPermissionsContext = createContext(null);
export const refFormStatusContext = createContext(null);
export const refButtonStatusContext = createContext(null);
//____________IMPORT/EXPORT____________

export const Ref_Keyboard = ({ children }) => {

    const isKeyboard = {
        user: useRef(null),
        password: useRef(null),
    };

    return(
        <refKeyboardContext.Provider value={isKeyboard}>
            {children}
        </refKeyboardContext.Provider>
    );
}
export const Ref_Form_Users = ({ children }) => {

    const isForm = {
        Modal: useRef(null),
        Form: useRef(null),
    };

    return(
        <refFormUsersContext.Provider value={isForm}>
            {children}
        </refFormUsersContext.Provider>
    );
}

export const Ref_Button_Users = ({ children }) => {

    const isButtons = {
        Button_Edit_U: useRef(null),
        Button_Delete_U: useRef(null),
    };

    return(
        <refButtonUsersContext.Provider value={isButtons}>
            {children}
        </refButtonUsersContext.Provider>
    );
}

export const Ref_Form_Permissions = ({ children }) => {

    const isForm = {
        Modal: useRef(null),
        Form: useRef(null),
    };

    return(
        <refFormPermissionsContext.Provider value={isForm}>
            {children}
        </refFormPermissionsContext.Provider>
    );
}

export const Ref_Button_Permissions = ({ children }) => {

    const isButtons = {
        Button_Edit_P: useRef(null),
        Button_Super_P: useRef(null),
    };

    return(
        <refButtonPermissionsContext.Provider value={isButtons}>
            {children}
        </refButtonPermissionsContext.Provider>
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