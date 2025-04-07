//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Servicios

// Contextos
export const typeUserContext = createContext(null);
export const selectedRowContext = createContext(null);
export const searchTermContext = createContext(null);
export const formComprobationContext = createContext(null);
export const actionBlockContext = createContext(null);
// Contextos personalizados

// Estilos personalizados

//____________IMPORT/EXPORT____________

// Función Contexto para controlar el tipo de usuario que es
export const Type_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTypeUser,setIsTypeUser] = useState(() => {
        const StoredData = sessionStorage.getItem('Type-User');

        if(StoredData){
            try{
                console.log('¡Tipo de usuario cargado correctamente!...');
                return StoredData;
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return '';
            }
        }else{
            return '';
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <typeUserContext.Provider value={[isTypeUser,setIsTypeUser]}>
            {children}
        </typeUserContext.Provider>
    );
}
// Función Contexto para controlar el renglon seleccionado de una tabla
export const Selected_Row = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedRow,setIsSelectedRow] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <selectedRowContext.Provider value={[isSelectedRow,setIsSelectedRow]}>
            {children}
        </selectedRowContext.Provider>
    );
}
// Función Contexto para controlar el buscador
export const Search_Term = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSearchTerm,setIsSearchTerm] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <searchTermContext.Provider value={[isSearchTerm,setIsSearchTerm]}>
            {children}
        </searchTermContext.Provider>
    );
}
// Función Contexto para controlar la comprobación de inicio de sesión
export const Form_Comprobation = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isFormComprobation,setIsFormComprobation] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <formComprobationContext.Provider value={[isFormComprobation,setIsFormComprobation]}>
            {children}
        </formComprobationContext.Provider>
    );
}
// Función Contexto para controlar el bloqueo de acciones
export const Action_Block = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isActiveBlock,setIsActiveBlock] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <actionBlockContext.Provider value={[isActiveBlock,setIsActiveBlock]}>
            {children}
        </actionBlockContext.Provider>
    );
}