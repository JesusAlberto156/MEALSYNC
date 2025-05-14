//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const TextFieldsUserContext = createContext(null);
export const TextFieldsPermissionsContext = createContext(null);
export const TextFieldsStatusContext = createContext(null);
export const TextFieldsSupplierContext = createContext(null);
export const TextFieldsSupplyContext = createContext(null);
export const SelectContext = createContext(null);
export const RadioPermissionsContext = createContext(null);
export const RadioStatusContext = createContext(null);
export const CheckboxContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función contexto para controlar los campos de registro de un formulario de usuario
export const Text_Fields_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsUser,setIsTextFieldsUser] = useState({
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsUserContext.Provider value={[isTextFieldsUser,setIsTextFieldsUser]}> 
            {children}
        </TextFieldsUserContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de permisos
export const Text_Fields_Permissions = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useState({
        user: 0,
        administrator: 0,
        chef: 0,
        storekeeper: 0,
        cook: 0,
        nutritionist: 0,
        doctor: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsPermissionsContext.Provider value={[isTextFieldsPermissions,setIsTextFieldsPermissions]}> 
            {children}
        </TextFieldsPermissionsContext.Provider>
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
// Función contexto para controlar los campos de registro de un formulario de insumos
export const Text_Fields_Supply = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useState({
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
// Función Contexto para controlar el valor en el campo de un select en el formulario
export const Select = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isSelect,setIsSelect] = useState([]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectContext.Provider value={[isSelect,setIsSelect]}>
            {children}
        </SelectContext.Provider>
    );
}
// Función Contexto para controlar el valor en el campo de un radio en el formulario
export const Radio_Permissions = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isRadioPermissions,setIsRadioPermissions] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <RadioPermissionsContext.Provider value={[isRadioPermissions,setIsRadioPermissions]}>
            {children}
        </RadioPermissionsContext.Provider>
    );
}
// Función Contexto para controlar el valor en el campo de un radio en el formulario
export const Radio_Status = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isRadioStatus,setIsRadioStatus] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <RadioStatusContext.Provider value={[isRadioStatus,setIsRadioStatus]}>
            {children}
        </RadioStatusContext.Provider>
    );
}
// Función contexto para controlar el valor en el campo de un checkbox en el formulario
export const Checkbox = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isCheckbox,setIsCheckbox] = useState([]);
    // Return para darle valor al contexto y heredarlo
    return (
        <CheckboxContext.Provider value={[isCheckbox,setIsCheckbox]}>
            {children}
        </CheckboxContext.Provider>
    );
}