//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState } from "react"
// Contextos
export const TextFieldsUserContext = createContext(null);
export const TextFieldsPermissionsContext = createContext(null);
export const TextFieldsStatusContext = createContext(null);
export const TextFieldsSupplierContext = createContext(null);
export const TextFieldsObservationContext = createContext(null);
export const TextFieldsSupplyCategoryContext = createContext(null);
export const TextFieldsSupplyTypesContext = createContext(null);
export const TextFieldsSupplyContext = createContext(null);
export const TextFieldsSupplyOrderContext = createContext(null);
export const TextFieldsSupplyOrderObservationContext = createContext(null);
export const TextFieldsWarehouseCategoryContext = createContext(null);
export const TextFieldsWarehouseSupplyTypeContext = createContext(null);
export const TextFieldsWarehouseSalesSupplyTypeContext = createContext(null);
//____________IMPORT/EXPORT____________

// Todos los contextos para los campos de texto para los formularios ✔️
export const Index_Text_Fields = ({children}) => {
    return(
        <Text_Fields_User>
            <Text_Fields_Permissions>
                <Text_Fields_Status>
                    <Text_Fields_Supplier>
                        <Text_Fields_Supplier_Observation>
                            <Text_Fields_Supply_Category>
                                <Text_Fields_Supply_Type>
                                    <Text_Fields_Supply>
                                        <Text_Fields_Supply_Order>
                                            <Text_Fields_Supply_Order_Observation>
                                                <Text_Fields_Warehouse_Category>
                                                    <Text_Fields_Warehouse_Supply_Type>
                                                        <Text_Fields_Warehouse_Sales_Supply_Type>
                                                            {children}
                                                        </Text_Fields_Warehouse_Sales_Supply_Type>
                                                    </Text_Fields_Warehouse_Supply_Type>
                                                </Text_Fields_Warehouse_Category>
                                            </Text_Fields_Supply_Order_Observation>
                                        </Text_Fields_Supply_Order>
                                    </Text_Fields_Supply>
                                </Text_Fields_Supply_Type>
                            </Text_Fields_Supply_Category>
                        </Text_Fields_Supplier_Observation>
                    </Text_Fields_Supplier>
                </Text_Fields_Status>
            </Text_Fields_Permissions>
        </Text_Fields_User>
    );
}

// Función contexto para controlar los campos de registro de un formulario de usuario ✔️
export const Text_Fields_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsUser,setIsTextFieldsUser] = useState({
        idusuario: 0,
        nombre: '',
        nombrecorto: '',
        usuario: '',
        contrasena: '',
        idtipo: 0,
        permisos: '',
        estatus: '',
        ideliminado: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsUserContext.Provider value={[isTextFieldsUser,setIsTextFieldsUser]}> 
            {children}
        </TextFieldsUserContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de permisos ✔️
export const Text_Fields_Permissions = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useState({
        idpermiso: 0,
        administrador: 0,
        chef: 0,
        almacenista: 0,
        cocinero: 0,
        nutriologo: 0,
        medico: 0,
        superadministrador: 0,
        idusuario: 0,
        usuario: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsPermissionsContext.Provider value={[isTextFieldsPermissions,setIsTextFieldsPermissions]}> 
            {children}
        </TextFieldsPermissionsContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de estatus ✔️
export const Text_Fields_Status = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useState({
        idusuario: 0,
        usuario: '',
        idestatus: 0,
        estatus: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsStatusContext.Provider value={[isTextFieldsStatus,setIsTextFieldsStatus]}> 
            {children}
        </TextFieldsStatusContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de proveedor ✔️
export const Text_Fields_Supplier = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupplier,setIsTextFieldsSupplier] = useState({
        idproveedor: 0,
        nombre: '',
        rfc: '',
        domicilio: '',
        telefono: '',
        correo: '',
        calificacion: 0,
        ideliminado: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplierContext.Provider value={[isTextFieldsSupplier,setIsTextFieldsSupplier]}> 
            {children}
        </TextFieldsSupplierContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de la observacion a proveedor ✔️
export const Text_Fields_Supplier_Observation = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsObservation,setIsTextFieldsObservation] = useState({
        idobservacion: 0,
        observacion: '',
        calificacion: 0,
        fecha: '',
        idproveedor: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsObservationContext.Provider value={[isTextFieldsObservation,setIsTextFieldsObservation]}> 
            {children}
        </TextFieldsObservationContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de la categoria por insumo ✔️
export const Text_Fields_Supply_Category = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useState({
        idcategoria: 0,
        nombre: '',
        descripcion: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplyCategoryContext.Provider value={[isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory]}> 
            {children}
        </TextFieldsSupplyCategoryContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario del tipo de insumo ✔️
export const Text_Fields_Supply_Type = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useState({
        idtipo: 0,
        tipo: '',
        descripcion: '',
        unidad: '',
        idcategoria: 0,
        cantidades: [
            {
                cantidad: 0,
            }
        ],
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplyTypesContext.Provider value={[isTextFieldsSupplyType,setIsTextFieldsSupplyType]}> 
            {children}
        </TextFieldsSupplyTypesContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un insumo ✔️
export const Text_Fields_Supply = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useState({
        idinsumo: 0,
        nombre: '',
        descripcion: '',
        imagen: '',
        idproveedor: 0,
        idtipo: 0,
        idcategoria: 0,
        idcantidad: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplyContext.Provider value={[isTextFieldsSupply,setIsTextFieldsSupply]}> 
            {children}
        </TextFieldsSupplyContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de pedido de insumo ✔️
export const Text_Fields_Supply_Order = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupplyOrder,setIsTextFieldsSupplyOrder] = useState({
        numeroPedido: '',
        fechaA: '',
        fechaP: null,
        hora: '',
        minutos: '',
        insumos: [{
            idpedido: 0,
            idinsumo: 0,
            cantidad: 0,
            precioUnitario: 0,
            precioTotal: 0,
            estado: '', 
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplyOrderContext.Provider value={[isTextFieldsSupplyOrder,setIsTextFieldsSupplyOrder]}> 
            {children}
        </TextFieldsSupplyOrderContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de una observacion de un pedido de insumo ✔️
export const Text_Fields_Supply_Order_Observation = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSupplyOrderObservation,setIsTextFieldsSupplyOrderObservation] = useState({
        numeroPedido: '',
        idpedido: 0,
        observaciones: [{
            fechaA: '',
            fechaP: null,
            hora: '',
            minutos: '',
            idobservacion: 0,
            observacion: '',
            categoria: '',
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSupplyOrderObservationContext.Provider value={[isTextFieldsSupplyOrderObservation,setIsTextFieldsSupplyOrderObservation]}> 
            {children}
        </TextFieldsSupplyOrderObservationContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un almacen por categoria ✔️
export const Text_Fields_Warehouse_Category = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouseCategory,setIsTextFieldsWarehouseCategory] = useState({
        cantidadRealTotal: 0,
        precioTotal: 0,
        idcategoria: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseCategoryContext.Provider value={[isTextFieldsWarehouseCategory,setIsTextFieldsWarehouseCategory]}> 
            {children}
        </TextFieldsWarehouseCategoryContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un almacen de tipo de insumo ✔️
export const Text_Fields_Warehouse_Supply_Type = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouseSupplyType,setIsTextFieldsWarehouseSupplyType] = useState({
        cantidadRealTotal: 0,
        precioTotal: 0,
        idtipo: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseSupplyTypeContext.Provider value={[isTextFieldsWarehouseSupplyType,setIsTextFieldsWarehouseSupplyType]}> 
            {children}
        </TextFieldsWarehouseSupplyTypeContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un almacen de ventas de tipo de insumo ✔️
export const Text_Fields_Warehouse_Sales_Supply_Type = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouseSalesSupplyType,setIsTextFieldsWarehouseSalesSupplyType] = useState({
        tipos:[{
            idtipo: 0,
            cantidadReal: 0,
            precio: 0,
            transaccion: 'Venta',
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseSalesSupplyTypeContext.Provider value={[isTextFieldsWarehouseSalesSupplyType,setIsTextFieldsWarehouseSalesSupplyType]}> 
            {children}
        </TextFieldsWarehouseSalesSupplyTypeContext.Provider>
    );
}