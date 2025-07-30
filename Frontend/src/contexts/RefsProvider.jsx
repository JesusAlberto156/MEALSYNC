//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useRef,useContext } from "react"
// Contextos
export const RefAlertsContext = createContext(null);
export const RefKeyboardContext = createContext(null);
export const RefKeyboardTouchContext = createContext(null);
export const RefKeyboardWritingContext = createContext(null);
export const RefModalContext = createContext(null);
export const RefFormContext = createContext(null);
export const RefButtonAddContext = createContext(null);
export const RefButtonEditContext = createContext(null);
export const RefButtonDeleteContext = createContext(null);
export const RefButtonEnableContext = createContext(null);
export const RefButtonDisableContext = createContext(null);
export const RefButtonViewContext = createContext(null);
export const RefButtonDetailContext = createContext(null);
export const RefSuppliersContext = createContext(null);
export const RefSupplyOrdersContext = createContext(null);
// Contextos personalizados
import { TouchContext } from "./VariablesProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para los Ref ✔️
export const Index_Refs = ({children}) => {
    return(
        <Ref_Alerts>
            <Ref_Keyboard>
                <Ref_Keyboard_Touch>
                    <Ref_Keyboard_Writing>
                        <Ref_Modals>
                            <Ref_Form>
                                <Ref_Button_Add>
                                    <Ref_Button_Edit>
                                        <Ref_Button_Delete>
                                            <Ref_Button_Enable>
                                                <Ref_Button_Disable>
                                                    <Ref_Button_View>
                                                        <Ref_Button_Detail>
                                                            <Ref_Suppliers>
                                                                    <Ref_Supply_Orders>
                                                                        {children}
                                                                    </Ref_Supply_Orders>
                                                            </Ref_Suppliers>
                                                        </Ref_Button_Detail>
                                                    </Ref_Button_View>
                                                </Ref_Button_Disable>
                                            </Ref_Button_Enable>
                                        </Ref_Button_Delete>
                                    </Ref_Button_Edit>
                                </Ref_Button_Add>
                            </Ref_Form>
                        </Ref_Modals>
                    </Ref_Keyboard_Writing>
                </Ref_Keyboard_Touch>
            </Ref_Keyboard>
        </Ref_Alerts>
    );
}

// Función contexto para controlar las alertas de la pagina ✔️
export const Ref_Alerts = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isAlert = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefAlertsContext.Provider value={isAlert}>
            {children}
        </RefAlertsContext.Provider>
    );
}
// Función contexto para controlar el teclado de la pagina ✔️
export const Ref_Keyboard = ({ children }) => {
    // constantes con el valor de los contextos
    const [isTouch] = useContext(TouchContext);
    // UseRef para controlar el valor del contexto
    const isKeyboard = useRef(isTouch);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefKeyboardContext.Provider value={isKeyboard}>
            {children}
        </RefKeyboardContext.Provider>
    );
}
// Función contexto para controlar el touch referente al teclado de la pagina ✔️
export const Ref_Keyboard_Touch = ({ children }) => {
    // constantes con el valor de los contextos
    const [isTouch] = useContext(TouchContext);
    // UseRef para controlar el valor del contexto
    const isKeyboardTouch = useRef(isTouch);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefKeyboardTouchContext.Provider value={isKeyboardTouch}>
            {children}
        </RefKeyboardTouchContext.Provider>
    );
}
// Función contexto para controlar la escritura del teclado ✔️
export const Ref_Keyboard_Writing = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isKeyboardWriting = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefKeyboardWritingContext.Provider value={isKeyboardWriting}>
            {children}
        </RefKeyboardWritingContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del modal ✔️
export const Ref_Modals = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isModal =  useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefModalContext.Provider value={isModal}>
            {children}
        </RefModalContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del formulario ✔️
export const Ref_Form = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isForm =  useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefFormContext.Provider value={isForm}>
            {children}
        </RefFormContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del boton de agregar ✔️
export const Ref_Button_Add = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isButtonAdd =  useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefButtonAddContext.Provider value={isButtonAdd}>
            {children}
        </RefButtonAddContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del boton de editar ✔️
export const Ref_Button_Edit = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isButtonEdit =  useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefButtonEditContext.Provider value={isButtonEdit}>
            {children}
        </RefButtonEditContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del boton de eliminar ✔️
export const Ref_Button_Delete = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isButtonDelete = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefButtonDeleteContext.Provider value={isButtonDelete}>
            {children}
        </RefButtonDeleteContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del boton de habilitar ✔️
export const Ref_Button_Enable = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isButtonEnable = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefButtonEnableContext.Provider value={isButtonEnable}>
            {children}
        </RefButtonEnableContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del boton de deshabilitar ✔️
export const Ref_Button_Disable = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isButtonDisable = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefButtonDisableContext.Provider value={isButtonDisable}>
            {children}
        </RefButtonDisableContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del boton de visualizar ✔️
export const Ref_Button_View = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isButtonView = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefButtonViewContext.Provider value={isButtonView}>
            {children}
        </RefButtonViewContext.Provider>
    );
}
// Función contexto para controlar las tablas con referencia a traves del boton de detalles ✔️
export const Ref_Button_Detail = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isButtonDetail = useRef(null);
    // Return para darle valor al contexto y heredarlo
    return(
        <RefButtonDetailContext.Provider value={isButtonDetail}>
            {children}
        </RefButtonDetailContext.Provider>
    );
}

// Función contexto para controlar la tabla de proveedores con referencias ✔️
export const Ref_Suppliers = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSuppliers = {
        Modal_Suppliers: useRef(null),
        Form_Suppliers: useRef(null),
        Button_Edit_Suppliers: useRef(null),
        Button_Delete_Suppliers: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSuppliersContext.Provider value={isSuppliers}>
            {children}
        </RefSuppliersContext.Provider>
    );
}
// Función contexto para controlar la tabla de los pedidos por insumo con referencias ✔️
export const Ref_Supply_Orders = ({ children }) => {
    // UseRef para controlar el valor del contexto
    const isSupplyOrders = {
        Modal_Suppy_Orders: useRef(null),
        Form_Supply_Orders: useRef(null),
        Button_Edit_Supply_Orders: useRef(null),
        Button_Edit_State_Supply_Orders: useRef(null),
        Button_Add_Supply_Order_Observations: useRef(null),
        Button_View_Supply_Order_Observations: useRef(null),
        Button_Delete_Supply_Orders: useRef(null),
    };
    // Return para darle valor al contexto y heredarlo
    return(
        <RefSupplyOrdersContext.Provider value={isSupplyOrders}>
            {children}
        </RefSupplyOrdersContext.Provider>
    );
}