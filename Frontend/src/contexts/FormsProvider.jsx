//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const TextFieldsUserContext = createContext(null);
export const TextFieldsPermissionsContext = createContext(null);
export const TextFieldsStatusContext = createContext(null);
export const TextFieldsSupplierContext = createContext(null);
export const TextFieldsWarehouseContext = createContext(null);
export const TextFieldsSupplyContext = createContext(null);
export const TextFieldsSupplyTypesContext = createContext(null);
export const TextFieldsUnitsContext = createContext(null);
//____________IMPORT/EXPORT____________

// Todos los contextos para los campos de texto para los formularios ✔️
export const Index_Text_Fields = ({children}) => {
    return(
        <Text_Fields_User>
            <Text_Fields_Permissions>
                <Text_Fields_Status>
                    <Text_Fields_Supplier>
                        <Text_Fields_Warehouse>
                            <Text_Fields_Supply>
                                <Text_Fields_Supply_Types>
                                    <Text_Fields_Units>
                                        {children}
                                    </Text_Fields_Units>
                                </Text_Fields_Supply_Types>
                            </Text_Fields_Supply>
                        </Text_Fields_Warehouse>
                    </Text_Fields_Supplier>
                </Text_Fields_Status>
            </Text_Fields_Permissions>
        </Text_Fields_User>
    );
}

// Función contexto para controlar los campos de registro de un formulario de usuario ✔️
export const Text_Fields_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsUser,setIsTextFieldsUser] = useState({
        idusuario: 0,
        nombre: '',
        nombrecorto: '',
        usuario: '',
        contrasena: '',
        idtipo: 0,
        permisos: '',
        estatus: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsUserContext.Provider value={[isTextFieldsUser,setIsTextFieldsUser]}> 
            {children}
        </TextFieldsUserContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de permisos ✔️
export const Text_Fields_Permissions = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useState({
        idpermiso: 0,
        administrador: 0,
        chef: 0,
        almacenista: 0,
        cocinero: 0,
        nutriologo: 0,
        medico: 0,
        superadministrador: 0,
        idusuario: 0,
        usuario: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsPermissionsContext.Provider value={[isTextFieldsPermissions,setIsTextFieldsPermissions]}> 
            {children}
        </TextFieldsPermissionsContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de estatus ✔️
export const Text_Fields_Status = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useState({
        idusuario: 0,
        usuario: '',
        idestatus: 0,
        estatus: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsStatusContext.Provider value={[isTextFieldsStatus,setIsTextFieldsStatus]}> 
            {children}
        </TextFieldsStatusContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de proveedor 
export const Text_Fields_Supplier = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useState({
        name: '',
        rfc: '',
        address: '',
        phone: '',
        email: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplierContext.Provider value={[isTextFieldsSupplier,setIsTextFieldsSupplier]}> 
            {children}
        </TextFieldsSupplierContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de pedidos para el inventario 
export const Text_Fields_Warehouse = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouse,setIsTextFieldsWarehouse] = useState({
        dateA: '',
        dateP: null,
        hour: '',
        minutes: '',
        supplies: [{
            idsupply: 0,
            idsupplier: 0,
            amount: 0,
            unitprice: '',
            price: 0, 
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseContext.Provider value={[isTextFieldsWarehouse,setIsTextFieldsWarehouse]}> 
            {children}
        </TextFieldsWarehouseContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de insumos 
export const Text_Fields_Supply = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useState({
        idsupply: 0,
        name: '',
        description: '',
        image: '',
        supplier: 0,
        type: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplyContext.Provider value={[isTextFieldsSupply,setIsTextFieldsSupply]}> 
            {children}
        </TextFieldsSupplyContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de tipos de insumos 
export const Text_Fields_Supply_Types = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupplyTypes,setIsTextFieldsSupplyTypes] = useState({
        idtype: 0,
        type: '',
        description: '',
        idunits: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplyTypesContext.Provider value={[isTextFieldsSupplyTypes,setIsTextFieldsSupplyTypes]}> 
            {children}
        </TextFieldsSupplyTypesContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de tipos de insumos 
export const Text_Fields_Units = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsUnits,setIsTextFieldsUnits] = useState({
        idextent: 0,
        extent: '',
        unit: '',
        amount: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsUnitsContext.Provider value={[isTextFieldsUnits,setIsTextFieldsUnits]}> 
            {children}
        </TextFieldsUnitsContext.Provider>
    );
}