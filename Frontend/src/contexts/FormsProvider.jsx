//____________IMPORT/EXPORT____________
// Hooks de React
import { Children, createContext, useState } from "react"
// Servicios

// Contextos
export const formTextContext = createContext(null);
export const nameContext = createContext(null);
export const passwordContext = createContext(null);
export const selectContext = createContext(null);
export const radioContext = createContext(null);
export const radioUsersContext = createContext(null);
export const checkboxContext = createContext(null);
// Contextos personalizados

// Estilos personalizados

//____________IMPORT/EXPORT____________

// Función contexto para controlar los campos de registro de un formulario
export const Form_Text = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isFormText,setIsFormText] = useState({
        user: '',
        password: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <formTextContext.Provider value={[isFormText,setIsFormText]}> 
            {children}
        </formTextContext.Provider>
    );
}
// Función Contexto para controlar el valor en el campo de nombre de usuario en el formulario
export const Name = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isName,setIsName] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <nameContext.Provider value={[isName,setIsName]}>
            {children}
        </nameContext.Provider>
    );
}
// Función Contexto para controlar el valor en el campo de contraseña en el formulario
export const Password = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isPassword,setIsPassword] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <passwordContext.Provider value={[isPassword,setIsPassword]}>
            {children}
        </passwordContext.Provider>
    );
}
// Función Contexto para controlar el valor en el campo de un select en el formulario
export const Select = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isSelect,setIsSelect] = useState([]);
    // Return para darle valor al contexto y heredarlo
    return (
        <selectContext.Provider value={[isSelect,setIsSelect]}>
            {children}
        </selectContext.Provider>
    );
}
// Función Contexto para controlar el valor en el campo de un radio en el formulario
export const Radio = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isRadio,setIsRadio] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <radioContext.Provider value={[isRadio,setIsRadio]}>
            {children}
        </radioContext.Provider>
    );
}
// Función Contexto para controlar el valor en el campo de un radio en el formulario de los usuarios
export const Radio_Users = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isRadioUsers,setIsRadioUsers] = useState({
        tipo: '', 
        estatus: ''
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <radioUsersContext.Provider value={[isRadioUsers,setIsRadioUsers]}>
            {children}
        </radioUsersContext.Provider>
    );
}
// Función contexto para controlar el valor en el campo de un checkbox en el formulario
export const Checkbox = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isCheckbox,setIsCheckbox] = useState([]);
    // Return para darle valor al contexto y heredarlo
    return (
        <checkboxContext.Provider value={[isCheckbox,setIsCheckbox]}>
            {children}
        </checkboxContext.Provider>
    );
}