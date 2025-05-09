//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const TextFieldsUserContext = createContext(null);
export const TextFieldsSupplierContext = createContext(null);
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
// Función contexto para controlar los campos de registro de un formulario de usuario
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