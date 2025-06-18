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
export const RefSupplierObservationsContext = createContext(null);
export const RefSupplyCategoriesContext = createContext(null);
export const RefSupplyTypesContext = createContext(null);
export const RefSuppliesContext = createContext(null);
export const RefSupplyOrdersContext = createContext(null);
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
                                <Ref_Suppliers_Observations>
                                    <Ref_Supply_Categories>
                                        <Ref_Supply_Types>
                                            <Ref_Supplies>
                                                <Ref_Supply_Orders>
                                                    {children}
                                                </Ref_Supply_Orders>
                                            </Ref_Supplies>
                                        </Ref_Supply_Types>
                                    </Ref_Supply_Categories>
                                </Ref_Suppliers_Observations>
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
export const Ref_Suppliers_Observations = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplierObservations = {
        Modal_Supplier_Observations: useRef(null),
        Form_Supplier_Observations: useRef(null),
        Button_Detail_Supplier_Observations: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSupplierObservationsContext.Provider value={isSupplierObservations}>
            {children}
        </RefSupplierObservationsContext.Provider>
    );
}
// Función contexto para controlar la tabla de las categorias por insumos con referencias ✔️
export const Ref_Supply_Categories = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplyCategories = {
        Modal_Supply_Categories: useRef(null),
        Form_Supply_Categories: useRef(null),
        Button_Edit_Supply_Categories: useRef(null),
        Button_Delete_Supply_Categories: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSupplyCategoriesContext.Provider value={isSupplyCategories}>
            {children}
        </RefSupplyCategoriesContext.Provider>
    );
}
// Función contexto para controlar la tabla de los tipos de insumo con referencias ✔️
export const Ref_Supply_Types = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplyTypes = {
        Modal_Supply_Types: useRef(null),
        Form_Supply_Types: useRef(null),
        Button_Edit_Supply_Types: useRef(null),
        Button_Add_Supply_Types: useRef(null),
        Button_Delete_Supply_Types: useRef(null),
        Button_Count_Supply_Types: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSupplyTypesContext.Provider value={isSupplyTypes}>
            {children}
        </RefSupplyTypesContext.Provider>
    );
}
// Función contexto para controlar la tabla de los insumos con referencias ✔️
export const Ref_Supplies = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplies = {
        Modal_Supplies: useRef(null),
        Form_Supplies: useRef(null),
        Button_Edit_Supplies: useRef(null),
        Button_Delete_Supplies: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSuppliesContext.Provider value={isSupplies}>
            {children}
        </RefSuppliesContext.Provider>
    );
}
// Función contexto para controlar la tabla de los pedidos por insumo con referencias ✔️
export const Ref_Supply_Orders = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplyOrders = {
        Modal_Suppy_Orders: useRef(null),
        Form_Supply_Orders: useRef(null),
        Button_Edit_Supply_Orders: useRef(null),
        Button_Edit_State_Supply_Orders: useRef(null),
        Button_Add_Supply_Order_Observations: useRef(null),
        Button_View_Supply_Order_Observations: useRef(null),
        Button_Delete_Supply_Orders: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSupplyOrdersContext.Provider value={isSupplyOrders}>
            {children}
        </RefSupplyOrdersContext.Provider>
    );
}