//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const SelectedRowContext = createContext(null);
export const SelectedRow1Context = createContext(null);
export const SelectedRow2Context = createContext(null);
//____________IMPORT/EXPORT____________

// Función Contexto para controlar el renglon seleccionado de una tabla ✔️
export const Selected_Row = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedRow,setIsSelectedRow] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedRowContext.Provider value={[isSelectedRow,setIsSelectedRow]}>
            {children}
        </SelectedRowContext.Provider>
    );
}
// Función Contexto para controlar el renglon seleccionado de la tabla 1 ✔️
export const Selected_Row_1 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedRow1,setIsSelectedRow1] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedRow1Context.Provider value={[isSelectedRow1,setIsSelectedRow1]}>
            {children}
        </SelectedRow1Context.Provider>
    );
}
// Función Contexto para controlar el renglon seleccionado de la tabla 2 ✔️
export const Selected_Row_2 = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedRow2,setIsSelectedRow2] = useState(null);
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedRow2Context.Provider value={[isSelectedRow2,setIsSelectedRow2]}>
            {children}
        </SelectedRow2Context.Provider>
    );
}