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
export const RefObservationsContext = createContext(null);
export const RefSuppliesContext = createContext(null);
export const RefSupplyTypesContext = createContext(null);
export const RefUnitsContext = createContext(null);
//____________IMPORT/EXPORT____________

// Todos los contextos para los Ref ✔️
export const Index_Refs = ({children}) => {
    return(
        <Ref_Alert_Greeting>
            <Ref_Keyboard>
                <Ref_Users>
                    <Ref_Permissions>
                        <Ref_Status>
                            <Ref_Suppliers>
                                <Ref_Observations>
                                    <Ref_Supplies>
                                        <Ref_Supply_Types>
                                            <Ref_Units>
                                                {children}
                                            </Ref_Units>
                                        </Ref_Supply_Types>
                                    </Ref_Supplies>
                                </Ref_Observations>
                            </Ref_Suppliers>
                        </Ref_Status>
                    </Ref_Permissions>
                </Ref_Users>
            </Ref_Keyboard>
        </Ref_Alert_Greeting>
    );
}

// Función contexto para controlar las alertas de bienvenida de la pagina ✔️
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
// Función contexto para controlar la tabla de usuarios con referencias ✔️
export const Ref_Users = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isUsers = {
        Modal_Users: useRef(null),
        Form_Users: useRef(null),
        Button_Edit_Users: useRef(null),
        Button_Delete_Users: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefUsersContext.Provider value={isUsers}>
            {children}
        </RefUsersContext.Provider>
    );
}
// Función contexto para controlar la tabla de permisos con referencias ✔️
export const Ref_Permissions = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isPermissions = {
        Modal_Permissions: useRef(null),
        Form_Permissions: useRef(null),
        Button_Edit_Permissions: useRef(null),
        Button_Enable_Permissions: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefPermissionsContext.Provider value={isPermissions}>
            {children}
        </RefPermissionsContext.Provider>
    );
}
// Función contexto para controlar la tabla de estatus con referencias ✔️
export const Ref_Status = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isStatus = {
        Modal_Status: useRef(null),
        Form_Status: useRef(null),
        Button_Enable_Status: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefStatusContext.Provider value={isStatus}>
            {children}
        </RefStatusContext.Provider>
    );
}
// Función contexto para controlar la tabla de proveedores con referencias ✔️
export const Ref_Suppliers = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSuppliers = {
        Modal_Suppliers: useRef(null),
        Form_Suppliers: useRef(null),
        Button_Edit_Suppliers: useRef(null),
        Button_Delete_Suppliers: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSuppliersContext.Provider value={isSuppliers}>
            {children}
        </RefSuppliersContext.Provider>
    );
}
// Función contexto para controlar la tabla de las observaciones a proveedor con referencias ✔️
export const Ref_Observations = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isObservations = {
        Modal_Observations: useRef(null),
        Form_Observations: useRef(null),
        Button_Detail_Observations: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefObservationsContext.Provider value={isObservations}>
            {children}
        </RefObservationsContext.Provider>
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