//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const ItemDateContext = createContext(null);
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las graficas ✔️
export const Index_Charts = ({children}) => {
    return(
        <Item_Date>
            {children}
        </Item_Date>
    );
}

// Función contexto para controlar la fecha seleccionada de un caledario de un grafico ✔️
export const Item_Date = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isItemDate,setIsItemDate] = useState([]);
    // Return para darle valor al contexto y heredarlo
    return(
        <ItemDateContext.Provider value={[isItemDate,setIsItemDate]}> 
            {children}
        </ItemDateContext.Provider>
    );
}