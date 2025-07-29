//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const SupplyOrdersContext = createContext(null);
export const SupplyOrderAddContext = createContext(null);
export const SupplyOrderEditContext = createContext(null);
export const SupplyOrderEditStateContext = createContext(null);
export const SupplyOrderObservationsContext = createContext(null);
export const SupplyOrderObservationAddContext = createContext(null);
export const DeletedSupplyOrdersContext = createContext(null);
export const SupplyOrderDeleteContext = createContext(null);
export const WarhouseCategoriesContext = createContext(null);
export const WarehouseSupplyTypesContext = createContext(null);
export const WarhouseSupplyTypeAddContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los usuarios  ✔️
export const Index_Warehouse = ({children}) => {
    return(
        <Supply_Orders>
            <Supply_Order_Add>
                <Supply_Order_Edit>
                    <Supply_Order_Edit_State>
                        <Supply_Order_Observations>
                            <Supply_Order_Observation_Add>
                                <Deleted_Supply_Orders>
                                    <Supply_Order_Delete>
                                        <Warehouse_Categories>
                                            <Warehouse_Supply_Types>
                                                <Warehouse_Supply_Type_Add>
                                                    {children}
                                                </Warehouse_Supply_Type_Add>
                                            </Warehouse_Supply_Types>
                                        </Warehouse_Categories>
                                    </Supply_Order_Delete>
                                </Deleted_Supply_Orders>
                            </Supply_Order_Observation_Add>
                        </Supply_Order_Observations>
                    </Supply_Order_Edit_State>
                </Supply_Order_Edit>
            </Supply_Order_Add>
        </Supply_Orders>
    );
}

//---------- PEDIDOS DE INSUMO
// Función contexto para controlar los datos de la base de datos de los pedidos de insumos ✔️
export const Supply_Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplyOrders,setIsSupplyOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        if(!socket) return;
        const handleSupplyOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos de insumos obtenidos!');
                    setIsSupplyOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los pedidos de insumos!');
                    setIsSupplyOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos de insumos:', error);
                setIsSupplyOrders([]);
            }
        }

        socket.emit('Get-Supply-Orders');
        socket.on('Get-Supply-Orders',handleSupplyOrders);

        return () => {
            socket.off('Get-Supply-Orders',handleSupplyOrders);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrdersContext.Provider value={[isSupplyOrders,setIsSupplyOrders]}>
            {children}
        </SupplyOrdersContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un pedido de insumo ✔️
export const Supply_Order_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyOrderAdd,setIsSupplyOrderAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrderAddContext.Provider value={[isSupplyOrderAdd,setIsSupplyOrderAdd]}>
            {children}
        </SupplyOrderAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un pedido de insumo ✔️
export const Supply_Order_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyOrderEdit,setIsSupplyOrderEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrderEditContext.Provider value={[isSupplyOrderEdit,setIsSupplyOrderEdit]}>
            {children}
        </SupplyOrderEditContext.Provider>
    );
}
// Función contexto para controlar los datos editados del estado de un pedido de insumo ✔️
export const Supply_Order_Edit_State = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyOrderEditState,setIsSupplyOrderEditState] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrderEditStateContext.Provider value={[isSupplyOrderEditState,setIsSupplyOrderEditState]}>
            {children}
        </SupplyOrderEditStateContext.Provider>
    );
}
//---------- PEDIDOS DE INSUMO
//---------- OBSERVACIONES DE LOS PEDIDOS DE LOS INSUMOS
// Función contexto para controlar los datos de la base de datos de las observaciones de los pedidos de insumos ✔️
export const Supply_Order_Observations = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplyOrderObservations,setIsSupplyOrderObservations] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        if(!socket) return;
        const handleSupplyOrderObservations = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Observaciones de los pedidos de insumos obtenidas!');
                    setIsSupplyOrderObservations(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las observaciones de los pedidos de insumos!');
                    setIsSupplyOrderObservations([]);
                }
            } catch (error) {
                console.error('Error al procesar las observaciones de los pedidos de insumos:', error);
                setIsSupplyOrderObservations([]);
            }
        }

        socket.emit('Get-Supply-Order-Observations');
        socket.on('Get-Supply-Order-Observations',handleSupplyOrderObservations);

        return () => {
            socket.off('Get-Supply-Order-Observations',handleSupplyOrderObservations);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrderObservationsContext.Provider value={[isSupplyOrderObservations,setIsSupplyOrderObservations]}>
            {children}
        </SupplyOrderObservationsContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de una observacion de un pedido de insumo ✔️
export const Supply_Order_Observation_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyOrderObservationAdd,setIsSupplyOrderObservationAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrderObservationAddContext.Provider value={[isSupplyOrderObservationAdd,setIsSupplyOrderObservationAdd]}>
            {children}
        </SupplyOrderObservationAddContext.Provider>
    );
}
//---------- OBSERVACIONES DE LOS PEDIDOS DE LOS INSUMOS
//---------- PEDIDOS DE INSUMO ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los pedidos de insumos eliminados ✔️
export const Deleted_Supply_Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedSupplyOrders,setIsDeletedSupplyOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        if(!socket) return;
        const handleDeletedSupplyOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos de insumos eliminados obtenidos!');
                    setIsDeletedSupplyOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los pedidos de insumos eliminados!');
                    setIsDeletedSupplyOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos de insumos eliminados:', error);
                setIsDeletedSupplyOrders([]);
            }
        }

        socket.emit('Get-Deleted-Supply-Orders');
        socket.on('Get-Deleted-Supply-Orders',handleDeletedSupplyOrders);

        return () => {
            socket.off('Get-Deleted-Supply-Orders',handleDeletedSupplyOrders);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedSupplyOrdersContext.Provider value={[isDeletedSupplyOrders,setIsDeletedSupplyOrders]}>
            {children}
        </DeletedSupplyOrdersContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un pedido de insumo ✔️
export const Supply_Order_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyOrderDelete,setIsSupplyOrderDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrderDeleteContext.Provider value={[isSupplyOrderDelete,setIsSupplyOrderDelete]}>
            {children}
        </SupplyOrderDeleteContext.Provider>
    );
}
//---------- PEDIDOS DE INSUMO ELIMINADOS
//---------- ALMACEN DE CATEGORIAS
// Función contexto para controlar los datos de la base de datos de los almacenes por categorias ✔️
export const Warehouse_Categories = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseCategories,setIsWarehouseCategories] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        if(!socket) return;
        const handleWarehouseCategories = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacen por categorías obtenido!');
                    setIsWarehouseCategories(parsedData);
                } else {
                    console.warn('¡Error al desencriptar el almacén por categorías!');
                    setIsWarehouseCategories([]);
                }
            } catch (error) {
                console.error('Error al procesar el almacén por categorías:', error);
                setIsWarehouseCategories([]);
            }
        }

        socket.emit('Get-Warehouse-Categories');
        socket.on('Get-Warehouse-Categories',handleWarehouseCategories);

        return () => {
            socket.off('Get-Warehouse-Categories',handleWarehouseCategories);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarhouseCategoriesContext.Provider value={[isWarehouseCategories,setIsWarehouseCategories]}>
            {children}
        </WarhouseCategoriesContext.Provider>
    );
}
//---------- ALMACEN DE CATEGORIAS
//---------- ALMACEN DE TIPOS DE INSUMO
// Función contexto para controlar los datos de la base de datos de los almacenes por tipos de insumo ✔️
export const Warehouse_Supply_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseSupplyTypes,setIsWarehouseSupplyTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        if(!socket) return;
        const handleWarehouseSupplyTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacen por tipos de insumo obtenido!');
                    setIsWarehouseSupplyTypes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar el almacén por tipos de insumo!');
                    setIsWarehouseSupplyTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar el almacén por tipos de insumo:', error);
                setIsWarehouseSupplyTypes([]);
            }
        }

        socket.emit('Get-Warehouse-Supply-Types');
        socket.on('Get-Warehouse-Supply-Types',handleWarehouseSupplyTypes);

        return () => {
            socket.off('Get-Warehouse-Supply-Types',handleWarehouseSupplyTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarehouseSupplyTypesContext.Provider value={[isWarehouseSupplyTypes,setIsWarehouseSupplyTypes]}>
            {children}
        </WarehouseSupplyTypesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un almacen por tipos de insumo ✔️
export const Warehouse_Supply_Type_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isWarehouseSupplyTypeAdd,setIsWarehouseSupplyTypeAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarhouseSupplyTypeAddContext.Provider value={[isWarehouseSupplyTypeAdd,setIsWarehouseSupplyTypeAdd]}>
            {children}
        </WarhouseSupplyTypeAddContext.Provider>
    );
}
//---------- ALMACEN DE TIPOS DE INSUMO