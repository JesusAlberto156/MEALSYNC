//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect } from "react"
// Contextos
export const TextFieldsUserContext = createContext(null);
export const TextFieldsPermissionsContext = createContext(null);
export const TextFieldsStatusContext = createContext(null);
export const TextFieldsSupplierContext = createContext(null);
export const TextFieldsObservationContext = createContext(null);
export const TextFieldsSupplyCategoryContext = createContext(null);
export const TextFieldsSupplyTypesContext = createContext(null);
export const TextFieldsSupplyContext = createContext(null);
export const TextFieldsCleaningCategoryContext = createContext(null);
export const TextFieldsCleaningTypeContext = createContext(null);
export const TextFieldsCleaningSupplyContext = createContext(null);
export const TextFieldsFixedExpenseContext = createContext(null);
export const TextFieldsWarehouseOrderContext = createContext(null);
export const TextFieldsWarehouseFixedExpenseContext = createContext(null);
export const TextFieldsWarehouseSupplyContext = createContext(null);
export const TextFieldsWarehouseCleaningContext = createContext(null);
export const TextFieldsSearchDateContext = createContext(null);
export const TextFieldsMenuTypeContext = createContext(null);
export const TextFieldsDishContext = createContext(null);
export const TextFieldsSideDishContext = createContext(null);
export const TextFieldsDrinkContext = createContext(null);
export const TextFieldsSearchOrdersContext = createContext(null);
export const TextFieldsOrderKitchenContext = createContext(null);
export const TextFieldsKitchenContext = createContext(null);
export const TextFieldsOrderDoctorContext = createContext(null);
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
                                        <Text_Fields_Cleaning_Category>
                                            <Text_Fields_Cleaning_Type>
                                                <Text_Fields_Cleaning_Supply>
                                                    <Text_Fields_Fixed_Expense>
                                                        <Text_Fields_Warehouse_Order>
                                                            <Text_Fields_Warehouse_Fixed_Expense>
                                                                <Text_Fields_Warehouse_Supply>
                                                                    <Text_Fields_Warehouse_Cleaning>
                                                                        <Text_Fields_Search_Date>
                                                                            <Text_Fields_Menu_Type>
                                                                                <Text_Fields_Dish>
                                                                                    <Text_Fields_Side_Dish>
                                                                                        <Text_Fields_Drink>
                                                                                            <Text_Fields_Search_Orders>
                                                                                                <Text_Fields_Order_Kitchen>
                                                                                                    <Text_Fields_Kitchen>
                                                                                                        <Text_Fields_Order_Doctor>
                                                                                                            {children}
                                                                                                        </Text_Fields_Order_Doctor>
                                                                                                    </Text_Fields_Kitchen>
                                                                                                </Text_Fields_Order_Kitchen>
                                                                                            </Text_Fields_Search_Orders>
                                                                                        </Text_Fields_Drink>
                                                                                    </Text_Fields_Side_Dish>
                                                                                </Text_Fields_Dish>
                                                                            </Text_Fields_Menu_Type>
                                                                        </Text_Fields_Search_Date>
                                                                    </Text_Fields_Warehouse_Cleaning>
                                                                </Text_Fields_Warehouse_Supply>
                                                            </Text_Fields_Warehouse_Fixed_Expense>
                                                        </Text_Fields_Warehouse_Order>
                                                    </Text_Fields_Fixed_Expense>
                                                </Text_Fields_Cleaning_Supply>
                                            </Text_Fields_Cleaning_Type> 
                                        </Text_Fields_Cleaning_Category>
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
        idpedido: 0,
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
        limite: '',
        cantidades: [
            {
                cantidad: '',
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
        codigo: '',
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
// Función contexto para controlar los campos de registro de un formulario de una categoria de limpieza ✔️
export const Text_Fields_Cleaning_Category = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsCleaningCategory,setIsTextFieldsCleaningCategory] = useState({
        idcategoria: 0,
        nombre: '',
        descripcion: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsCleaningCategoryContext.Provider value={[isTextFieldsCleaningCategory,setIsTextFieldsCleaningCategory]}> 
            {children}
        </TextFieldsCleaningCategoryContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario del tipo de limpieza ✔️
export const Text_Fields_Cleaning_Type = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsCleaningType,setIsTextFieldsCleaningType] = useState({
        idtipo: 0,
        tipo: '',
        descripcion: '',
        unidad: '',
        idcategoria: 0,
        limite: '',
        cantidades: [
            {
                cantidad: '',
            }
        ],
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsCleaningTypeContext.Provider value={[isTextFieldsCleaningType,setIsTextFieldsCleaningType]}> 
            {children}
        </TextFieldsCleaningTypeContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un suministro de limpieza ✔️
export const Text_Fields_Cleaning_Supply = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsCleaningSupply,setIsTextFieldsCleaningSupply] = useState({
        codigo: '',
        idsuministro: 0,
        nombre: '',
        descripcion: '',
        imagen: '',
        idproveedor: 0,
        idcategoria: 0,
        idtipo: 0,
        idcantidad: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsCleaningSupplyContext.Provider value={[isTextFieldsCleaningSupply,setIsTextFieldsCleaningSupply]}> 
            {children}
        </TextFieldsCleaningSupplyContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un gasto fijo ✔️
export const Text_Fields_Fixed_Expense = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsFixedExpense,setIsTextFieldsFixedExpense] = useState({
        idgasto: 0,
        nombre: '',
        descripcion: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsFixedExpenseContext.Provider value={[isTextFieldsFixedExpense,setIsTextFieldsFixedExpense]}> 
            {children}
        </TextFieldsFixedExpenseContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un pedido de almacén ✔️
export const Text_Fields_Warehouse_Order = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useState({
        idpedido: '',
        fecha: '',
        campus: '',
        precio: '',
        estado: '',
        idproveedor: 0,
        idusuario: 0,
        tipo: '',
        insumos: [{
            idpedidoindividual: 0,
            fecha: '',
            idinsumo: 0,
            idtipo: 0,
            idcategoria: 0,
            cantidadreal: 0,
            cantidad: '',
            preciounitario: '',
            preciototal: '',
            idpedido: '',
            estado: '',
            mensajes: [{
                idmensaje: 0,
                fecha: '',
                mensaje: '',
                idpedidoindividual: 0,
                tipo: '',
                estado: '',
            }],
        }],
        suministros: [{
            idpedidoindividual: 0,
            fecha: '',
            idsuministro: 0,
            idtipo: 0,
            idcategoria: 0,
            cantidadreal: 0,
            cantidad: '',
            preciounitario: '',
            preciototal: '',
            idpedido: '',
            estado: '',
            mensajes: [{
                idmensaje: 0,
                fecha: '',
                mensaje: '',
                idpedidoindividual: 0,
                tipo: '',
                estado: '',
            }],
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseOrderContext.Provider value={[isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder]}> 
            {children}
        </TextFieldsWarehouseOrderContext.Provider>
    );
}
// Función contexto para controlar los campos de de registro de un formulario de compra de gasto fijo
export const Text_Fields_Warehouse_Fixed_Expense = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouseFixedExpense,setIsTextFieldsWarehouseFixedExpense] = useState({
        idalmacen: 0,
        precio: '',
        idgasto: 0,
        fecha: '',
        transaccion: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseFixedExpenseContext.Provider value={[isTextFieldsWarehouseFixedExpense,setIsTextFieldsWarehouseFixedExpense]}> 
            {children}
        </TextFieldsWarehouseFixedExpenseContext.Provider>
    );
}
// Función contexto para controlar los campos de de registro de un formulario de venta de insumo
export const Text_Fields_Warehouse_Supply = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouseSupply,setIsTextFieldsWarehouseSupply] = useState({
        idalmacen: 0,
        precio: '',
        cantidadreal:'',
        idtipo: 0,
        idcategoria: 0,
        unidad: '',
        cantidadtotal: 0,
        preciototal: 0,
        preciounitario: 0,
        fecha: '',
        transaccion: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseSupplyContext.Provider value={[isTextFieldsWarehouseSupply,setIsTextFieldsWarehouseSupply]}> 
            {children}
        </TextFieldsWarehouseSupplyContext.Provider>
    );
}
// Función contexto para controlar los campos de de registro de un formulario de venta de suministro
export const Text_Fields_Warehouse_Cleaning = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsWarehouseCleaning,setIsTextFieldsWarehouseCleaning] = useState({
        idalmacen: 0,
        precio: '',
        cantidadreal:'',
        idtipo: 0,
        idcategoria: 0,
        unidad: '',
        cantidadtotal: 0,
        preciototal: 0,
        preciounitario: 0,
        fecha: '',
        transaccion: '',
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsWarehouseCleaningContext.Provider value={[isTextFieldsWarehouseCleaning,setIsTextFieldsWarehouseCleaning]}> 
            {children}
        </TextFieldsWarehouseCleaningContext.Provider>
    );
}
// Función contexto para controlar los campos de busqueda para fecha
export const Text_Fields_Search_Date = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSearchDate,setIsTextFieldsSearchDate] = useState({
        año: 0,
        mes: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSearchDateContext.Provider value={[isTextFieldsSearchDate,setIsTextFieldsSearchDate]}> 
            {children}
        </TextFieldsSearchDateContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un tipo de menú ✔️
export const Text_Fields_Menu_Type = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsMenuType,setIsTextFieldsMenuType] = useState({
        idtipo: 0,
        nombre: '',
        cocina: 0,
        nutriologia: 0,
        areaMedica: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsMenuTypeContext.Provider value={[isTextFieldsMenuType,setIsTextFieldsMenuType]}> 
            {children}
        </TextFieldsMenuTypeContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un platillo ✔️
export const Text_Fields_Dish = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsDish,setIsTextFieldsDish] = useState({
        idplatillo: 0,
        nombre: '',
        idmenu: 0,
        idespecificacion: 0,
        descripcion: '',
        precio: '',
        preparacion: '',
        imagen: '',
        tipos: [{
            idtipo: 0,
        }],
        ingredientes: [{
            idalmacen: 0,
            idplatillo: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsDishContext.Provider value={[isTextFieldsDish,setIsTextFieldsDish]}> 
            {children}
        </TextFieldsDishContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de una guarnicion ✔️
export const Text_Fields_Side_Dish = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSideDish,setIsTextFieldsSideDish] = useState({
        idguarnicion: 0,
        nombre: '',
        idmenu: 0,
        idespecificacion: 0,
        descripcion: '',
        precio: '',
        preparacion: '',
        imagen: '',
        tipos: [{
            idtipo: 0,
        }],
        ingredientes: [{
            idalmacen: 0,
            idguarnicion: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSideDishContext.Provider value={[isTextFieldsSideDish,setIsTextFieldsSideDish]}> 
            {children}
        </TextFieldsSideDishContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de una bebida ✔️
export const Text_Fields_Drink = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsDrink,setIsTextFieldsDrink] = useState({
        idbebida: 0,
        nombre: '',
        idmenu: 0,
        idespecificacion: 0,
        descripcion: '',
        precio: '',
        preparacion: '',
        imagen: '',
        tipos: [{
            idtipo: 0,
        }],
        ingredientes: [{
            idalmacen: 0,
            idbebida: 0,
            cantidad: '',
            idtipo: 0,
            unidad: '',
            buscador: '',
        }]
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsDrinkContext.Provider value={[isTextFieldsDrink,setIsTextFieldsDrink]}> 
            {children}
        </TextFieldsDrinkContext.Provider>
    );
}
// Función contexto para controlar los campos de busqueda para los pedidos en los menus ✔️
export const Text_Fields_Search_Orders = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsSearchOrders,setIsTextFieldsSearchOrders] = useState({
        idtipo: 0,
        fecha: '',
        tiempo: '',
    });
    // Funcion para formatear la fecha
    function getFormattedDateTime() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // UseEffect para obtener la hora a tiepo real
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTextFieldsSearchOrders((prev) => ({
                ...prev,
                fecha: getFormattedDateTime()
            }));
        }, 1000);

        return () => clearInterval(interval);
    },[]);
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsSearchOrdersContext.Provider value={[isTextFieldsSearchOrders,setIsTextFieldsSearchOrders]}> 
            {children}
        </TextFieldsSearchOrdersContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un pedido de cocina ✔️
export const Text_Fields_Order_Kitchen = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsOrderKitchen,setIsTextFieldsOrderKitchen] = useState({
        idpedido: 0,
        tipoubicacion: '',
        ubicacion: '',
        encargado: '',
        precio: '',
        idusuario: 0,
        pedidos: []
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsOrderKitchenContext.Provider value={[isTextFieldsOrderKitchen,setIsTextFieldsOrderKitchen]}> 
            {children}
        </TextFieldsOrderKitchenContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de cocina ✔️
export const Text_Fields_Kitchen = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsKitchen,setIsTextFieldsKitchen] = useState({
        idpedidoindividual: 0,
        cantidad: '',
        estado: '',
        idplatillo: 0,
        idguarnicion: 0,
        idbebida: 0,
        idpedido: 0,
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsKitchenContext.Provider value={[isTextFieldsKitchen,setIsTextFieldsKitchen]}> 
            {children}
        </TextFieldsKitchenContext.Provider>
    );
}
// Función contexto para controlar los campos de registro de un formulario de un pedido de medicos ✔️
export const Text_Fields_Order_Doctor = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isTextFieldsOrderDoctor,setIsTextFieldsOrderDoctor] = useState({
        idpedido: 0,
        fecha: '',
        sala: '',
        idcirugia: 0,
        cirugia: '',
        medico: '',
        solicitante: '',
        idusuario: 0,
        precio: '',
        pedidos: []
    });
    // Return para darle valor al contexto y heredarlo
    return(
        <TextFieldsOrderDoctorContext.Provider value={[isTextFieldsOrderDoctor,setIsTextFieldsOrderDoctor]}> 
            {children}
        </TextFieldsOrderDoctorContext.Provider>
    );
}