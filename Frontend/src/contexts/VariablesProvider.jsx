//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const modeContext = createContext(null);
export const typeUserContext = createContext(null);
export const selectedRowContext = createContext(null);
export const searchTermContext = createContext(null);
export const modalContext = createContext(null);
export const optionModalContext = createContext(null);
export const comprobationContext = createContext(null);
export const blockContext = createContext(null);
export const enableContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función Contexto para controlar el tipo de usuario que es
export const Type_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTypeUser,setIsTypeUser] = useState(() => {
        const StoredData = sessionStorage.getItem('TypeUser');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Tipo de usuario cargado correctamente...');
                    return decryptedData;
                }else{
                    console.log('Error al desencriptar el tipo de usuario...');
                    return '';
                }
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
    const [isComprobation,setIsComprobation] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <comprobationContext.Provider value={[isComprobation,setIsComprobation]}>
            {children}
        </comprobationContext.Provider>
    );
}
// Función Contexto para controlar el bloqueo de acciones
export const Action_Block = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isBlock,setIsBlock] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <blockContext.Provider value={[isBlock,setIsBlock]}>
            {children}
        </blockContext.Provider>
    );
}
