//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const TextFieldsContext = createContext(null);
export const SelectContext = createContext(null);
export const RadioContext = createContext(null);
export const CheckboxContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función contexto para controlar los campos de registro de un formulario
export const Text_Fields = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFields,setIsTextFields] = useState({
        user: '',
        password: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsContext.Provider value={[isTextFields,setIsTextFields]}> 
            {children}
        </TextFieldsContext.Provider>
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
export const Radio = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isRadio,setIsRadio] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <RadioContext.Provider value={[isRadio,setIsRadio]}>
            {children}
        </RadioContext.Provider>
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