//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const SelectedRowContext = createContext(null);
export const SelectedOptionSearchContext = createContext(null);
export const SelectedOptionOrderContext = createContext(null);
export const SelectedOptionOrderPlusContext = createContext(null);
export const SelectedOptionOrderPlusUltraContext = createContext(null);
export const SelectedOptionOrderPlusUltra1Context = createContext(null);
export const SelectedOptionOrderPlusUltra2Context = createContext(null);
export const SelectedOptionOrderPlusUltra3Context = createContext(null);
export const SelectedOptionOrderDirectionContext = createContext(null);
//____________IMPORT/EXPORT____________
// Todos los contextos para lo que se seleccione de varias opciones ✔️
export const Index_Selectedes = ({children}) => {
    return(
        <Selected_Row>
            <Selected_Option_Search>
                <Selected_Option_Order>
                    <Selected_Option_Order_Plus>
                        <Selected_Option_Order_Plus_Ultra>
                            <Selected_Option_Order_Direction>
                                {children}
                            </Selected_Option_Order_Direction>
                        </Selected_Option_Order_Plus_Ultra>
                    </Selected_Option_Order_Plus>
                </Selected_Option_Order>
            </Selected_Option_Search>
        </Selected_Row>
    );
}

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
// Función Contexto para controlar la opcion seleccionada en el buscador ✔️
export const Selected_Option_Search = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useState('General');
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedOptionSearchContext.Provider value={[isSelectedOptionSearch,setIsSelectedOptionSearch]}>
            {children}
        </SelectedOptionSearchContext.Provider>
    );
}
// Función Contexto para controlar la opcion seleccionada en el ordenamiento ✔️
export const Selected_Option_Order = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedOptionOrderContext.Provider value={[isSelectedOptionOrder,setIsSelectedOptionOrder]}>
            {children}
        </SelectedOptionOrderContext.Provider>
    );
}
// Función Contexto para controlar la opcion seleccionada en el ordenamiento mas especifico ✔️
export const Selected_Option_Order_Plus = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useState('Normal');
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedOptionOrderPlusContext.Provider value={[isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus]}>
            {children}
        </SelectedOptionOrderPlusContext.Provider>
    );
}
// Función Contexto para controlar la opcion seleccionada en el ordenamiento mucho mas especifico ✔️
export const Selected_Option_Order_Plus_Ultra = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedOptionOrderPlusUltra,setIsSelectedOptionOrderPlusUltra] = useState('');
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedOptionOrderPlusUltraContext.Provider value={[isSelectedOptionOrderPlusUltra,setIsSelectedOptionOrderPlusUltra]}>
            {children}
        </SelectedOptionOrderPlusUltraContext.Provider>
    );
}
// Función Contexto para controlar la direccion en el ordenamiento ✔️
export const Selected_Option_Order_Direction = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useState('Asc');
    // Return para darle valor al contexto y heredarlo
    return (
        <SelectedOptionOrderDirectionContext.Provider value={[isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection]}>
            {children}
        </SelectedOptionOrderDirectionContext.Provider>
    );
}