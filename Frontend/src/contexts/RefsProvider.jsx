//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useRef } from "react"
// Contextos
export const RefAlertGreetingContext = createContext(null);
export const RefKeyboardContext = createContext(null);
export const RefUsersContext = createContext(null);
export const RefPermissionsContext = createContext(null);
export const RefStatusContext = createContext(null);
export const RefSuppliersContext = createContext(null);
export const RefSuppliesContext = createContext(null);
export const RefSupplyTypesContext = createContext(null);
export const RefUnitsContext = createContext(null);
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
// Función contexto para controlar la tabla de estatus
export const Ref_Status = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isStatus = {
        Modal: useRef(null),
        Form: useRef(null),
        Button_Enable_S: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefStatusContext.Provider value={isStatus}>
            {children}
        </RefStatusContext.Provider>
    );
}
// Función contexto para controlar la grafica de proveedores
export const Ref_Suppliers = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSuppliers = {
        Modal: useRef(null),
        Form: useRef(null),
        Button_Edit_S: useRef(null),
        Button_Delete_S: useRef(null),
        Button_Details_S: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSuppliersContext.Provider value={isSuppliers}>
            {children}
        </RefSuppliersContext.Provider>
    );
}
// Función contexto para controlar la tabla de insumos
export const Ref_Supplies = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplies = {
        Modal: useRef(null),
        Form: useRef(null),
        Button_Edit_Su: useRef(null),
        Button_Delete_Su: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSuppliesContext.Provider value={isSupplies}>
            {children}
        </RefSuppliesContext.Provider>
    );
}
// Función contexto para controlar la tabla de tipos de insumos
export const Ref_Supply_Types = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplies = {
        Modal_ST: useRef(null),
        Form_ST: useRef(null),
        Button_Edit_ST: useRef(null),
        Button_Delete_ST: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSupplyTypesContext.Provider value={isSupplies}>
            {children}
        </RefSupplyTypesContext.Provider>
    );
}
// Función contexto para controlar la tabla de mediciones
export const Ref_Units = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isUnits = {
        Modal_Un: useRef(null),
        Form_Un: useRef(null),
        Button_Edit_Un: useRef(null),
        Button_Delete_Un: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefUnitsContext.Provider value={isUnits}>
            {children}
        </RefUnitsContext.Provider>
    );
}