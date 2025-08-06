//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const WarehouseCategoriesContext = createContext(null);
export const WarehouseSupplyTypesContext = createContext(null);
export const WarehouseCleaningContext = createContext(null);
export const WarehouseFixedExpensesContext = createContext(null);
export const OrdersContext = createContext(null);
export const DeletedOrdersContext = createContext(null);
export const OrderDeleteContext = createContext(null);
export const SupplyOrderDeleteContext = createContext(null);
export const CleaningSupplyOrderDeleteContext = createContext(null);
export const SupplyOrdersContext = createContext(null);
export const SupplyOrderAddContext = createContext(null);
export const SupplyOrderVerificationAddContext = createContext(null);
export const CleaningSupplyOrdersContext = createContext(null);
export const CleaningSupplyOrderAddContext = createContext(null);
export const MessageSupplyOrdersContext = createContext(null);
export const MessageCleaningSupplyOrdersContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los usuarios  ✔️
export const Index_Warehouse = ({children}) => {
    return(
        <Warehouse_Categories>
            <Warehouse_Supply_Types>
                <Warehouse_Cleaning>
                    <Warehouse_Fixed_Expenses>
                        <Orders>
                            <Deleted_Orders>
                                <Order_Delete>
                                    <Supply_Order_Delete>
                                        <Cleaning_Supply_Order_Delete>
                                            <Supply_Orders>
                                                <Supply_Order_Add>
                                                    <Cleaning_Supply_Orders>
                                                        <Cleaning_Supply_Order_Add>
                                                            <Message_Supply_Orders>
                                                                <Message_Cleaning_Supply_Orders>
                                                                    {children}
                                                                </Message_Cleaning_Supply_Orders>
                                                            </Message_Supply_Orders>
                                                        </Cleaning_Supply_Order_Add>
                                                    </Cleaning_Supply_Orders>
                                                </Supply_Order_Add>
                                            </Supply_Orders>
                                        </Cleaning_Supply_Order_Delete>
                                    </Supply_Order_Delete>
                                </Order_Delete>
                            </Deleted_Orders>
                        </Orders>
                    </Warehouse_Fixed_Expenses>
                </Warehouse_Cleaning>
            </Warehouse_Supply_Types>
        </Warehouse_Categories>
    );
}

//---------- ALMACEN DE CATEGORIAS
// Función contexto para controlar los datos de la base de datos de los almacenes por categorias ✔️
export const Warehouse_Categories = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseCategories,setIsWarehouseCategories] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleWarehouseCategories = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacén por categorías obtenido!');
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
        <WarehouseCategoriesContext.Provider value={[isWarehouseCategories]}>
            {children}
        </WarehouseCategoriesContext.Provider>
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
        const handleWarehouseSupplyTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacén por tipos de insumo obtenido!');
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
//---------- ALMACEN DE TIPOS DE INSUMO 
//---------- ALMACEN DE LIMPIEZA
// Función contexto para controlar los datos de la base de datos de los almacenes por limpieza ✔️
export const Warehouse_Cleaning = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseCleaning,setIsWarehouseCleaning] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleWarehouseCleaning = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacén por limpieza obtenido!');
                    setIsWarehouseCleaning(parsedData);
                } else {
                    console.warn('¡Error al desencriptar el almacén por limpieza!');
                    setIsWarehouseCleaning([]);
                }
            } catch (error) {
                console.error('Error al procesar el almacén por limpieza:', error);
                setIsWarehouseCleaning([]);
            }
        }

        socket.emit('Get-Warehouse-Cleaning');
        socket.on('Get-Warehouse-Cleaning',handleWarehouseCleaning);

        return () => {
            socket.off('Get-Warehouse-Cleaning',handleWarehouseCleaning);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarehouseCleaningContext.Provider value={[isWarehouseCleaning]}>
            {children}
        </WarehouseCleaningContext.Provider>
    );
}
//---------- ALMACEN DE LIMPIEZA
//---------- ALMACEN DE GASTOS FIJOS
// Función contexto para controlar los datos de la base de datos de los almacenes por gastos fijos ✔️
export const Warehouse_Fixed_Expenses = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseFixedExpenses,setIsWarehouseFixedExpenses] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleWarehouseFixedExpenses = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacén por gastos fijos obtenido!');
                    setIsWarehouseFixedExpenses(parsedData);
                } else {
                    console.warn('¡Error al desencriptar el almacén por gastos fijos!');
                    setIsWarehouseFixedExpenses([]);
                }
            } catch (error) {
                console.error('Error al procesar el almacén por gastos fijos:', error);
                setIsWarehouseFixedExpenses([]);
            }
        }

        socket.emit('Get-Warehouse-Fixed-Expenses');
        socket.on('Get-Warehouse-Fixed-Expenses',handleWarehouseFixedExpenses);

        return () => {
            socket.off('Get-Warehouse-Fixed-Expenses',handleWarehouseFixedExpenses);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarehouseFixedExpensesContext.Provider value={[isWarehouseFixedExpenses]}>
            {children}
        </WarehouseFixedExpensesContext.Provider>
    );
}
//---------- ALMACEN DE GASTOS FIJOS
//---------- PEDIDOS
// Función contexto para controlar los datos de la base de datos de los pedidos ✔️
export const Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isOrders,setIsOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos del almacén obtenidos!');
                    setIsOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los pedidos del almacén!');
                    setIsOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos del almacén:', error);
                setIsOrders([]);
            }
        }

        socket.emit('Get-Orders');
        socket.on('Get-Orders',handleOrders);

        return () => {
            socket.off('Get-Orders',handleOrders);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <OrdersContext.Provider value={[isOrders]}>
            {children}
        </OrdersContext.Provider>
    );
}
//---------- PEDIDOS
//---------- PEDIDOS ELIMINADOS 
// Función contexto para controlar los datos de la base de datos de los pedidos eliminados ✔️
export const Deleted_Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedOrders,setIsDeletedOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos del almacén eliminados obtenidos!');
                    setIsDeletedOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los pedidos del almacén eliminados!');
                    setIsDeletedOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos del almacén eliminados:', error);
                setIsDeletedOrders([]);
            }
        }

        socket.emit('Get-Deleted-Orders');
        socket.on('Get-Deleted-Orders',handleDeletedOrders);

        return () => {
            socket.off('Get-Deleted-Orders',handleDeletedOrders);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedOrdersContext.Provider value={[isDeletedOrders]}>
            {children}
        </DeletedOrdersContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un pedido ✔️
export const Order_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isOrderDelete,setIsOrderDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <OrderDeleteContext.Provider value={[isOrderDelete,setIsOrderDelete]}>
            {children}
        </OrderDeleteContext.Provider>
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
// Función contexto para controlar los datos eliminados de un pedido de suministro ✔️
export const Cleaning_Supply_Order_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningSupplyOrderDelete,setIsCleaningSupplyOrderDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningSupplyOrderDeleteContext.Provider value={[isCleaningSupplyOrderDelete,setIsCleaningSupplyOrderDelete]}>
            {children}
        </CleaningSupplyOrderDeleteContext.Provider>
    );
}
//---------- PEDIDOS ELIMINADOS 
//---------- PEDIDOS DE INSUMOS
// Función contexto para controlar los datos de la base de datos de los pedidos de insumos ✔️
export const Supply_Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplyOrders,setIsSupplyOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSupplyOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos del almacén de insumos obtenidos!');
                    setIsSupplyOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los pedidos del almacén de insumos!');
                    setIsSupplyOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos del almacén de insumos:', error);
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
        <SupplyOrdersContext.Provider value={[isSupplyOrders]}>
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
// Función contexto para controlar los datos agregados de una revisión pedido de insumo ✔️
export const Supply_Order_Verification_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyOrderVerificationAdd,setIsSupplyOrderVerificationAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyOrderVerificationAddContext.Provider value={[isSupplyOrderVerificationAdd,setIsSupplyOrderVerificationAdd]}>
            {children}
        </SupplyOrderVerificationAddContext.Provider>
    );
}
//---------- PEDIDOS DE INSUMOS
//---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA
// Función contexto para controlar los datos de la base de datos de los pedidos de suministros ✔️
export const Cleaning_Supply_Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isCleaningSupplyOrders,setIsCleaningSupplyOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleCleaningSupplyOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Pedidos del almacén de suministros obtenidos!');
                    setIsCleaningSupplyOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los pedidos del almacén de suministros!');
                    setIsCleaningSupplyOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los pedidos del almacén de suministros:', error);
                setIsCleaningSupplyOrders([]);
            }
        }

        socket.emit('Get-Cleaning-Supply-Orders');
        socket.on('Get-Cleaning-Supply-Orders',handleCleaningSupplyOrders);

        return () => {
            socket.off('Get-Cleaning-Supply-Orders',handleCleaningSupplyOrders);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningSupplyOrdersContext.Provider value={[isCleaningSupplyOrders]}>
            {children}
        </CleaningSupplyOrdersContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un pedido de suministro ✔️
export const Cleaning_Supply_Order_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isCleaningSupplyOrderAdd,setIsCleaningSupplyOrderAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <CleaningSupplyOrderAddContext.Provider value={[isCleaningSupplyOrderAdd,setIsCleaningSupplyOrderAdd]}>
            {children}
        </CleaningSupplyOrderAddContext.Provider>
    );
}
//---------- PEDIDOS DE SUMINISTROS DE LIMPIEZA
//---------- MENSAJES PEDIDOS DE INSUMOS
// Función contexto para controlar los datos de la base de datos de los mensajes de pedidos de insumos ✔️
export const Message_Supply_Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMessageSupplyOrders,setIsMessageSupplyOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMessageSupplyOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Mensajes de pedidos del almacén de insumos obtenidos!');
                    setIsMessageSupplyOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los mensajes de pedidos del almacén de insumos!');
                    setIsMessageSupplyOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los mensajes de pedidos del almacén de insumos:', error);
                setIsMessageSupplyOrders([]);
            }
        }

        socket.emit('Get-Message-Supply-Orders');
        socket.on('Get-Message-Supply-Orders',handleMessageSupplyOrders);

        return () => {
            socket.off('Get-Message-Supply-Orders',handleMessageSupplyOrders);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MessageSupplyOrdersContext.Provider value={[isMessageSupplyOrders]}>
            {children}
        </MessageSupplyOrdersContext.Provider>
    );
}
//---------- MENSAJES PEDIDOS DE INSUMOS
//---------- MENSAJES PEDIDOS DE SUMINISTROS DE LIMPIEZA
// Función contexto para controlar los datos de la base de datos de los mensajes de pedidos de suministros ✔️
export const Message_Cleaning_Supply_Orders = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMessageCleaningSupplyOrders,setIsMessageCleaningSupplyOrders] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMessageCleaningSupplyOrders = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Mensajes de pedidos del almacén de suministros obtenidos!');
                    setIsMessageCleaningSupplyOrders(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los mensajes de pedidos del almacén de suministros!');
                    setIsMessageCleaningSupplyOrders([]);
                }
            } catch (error) {
                console.error('Error al procesar los mensajes de pedidos del almacén de suministros:', error);
                setIsMessageCleaningSupplyOrders([]);
            }
        }

        socket.emit('Get-Message-Cleaning-Supply-Orders');
        socket.on('Get-Message-Cleaning-Supply-Orders',handleMessageCleaningSupplyOrders);

        return () => {
            socket.off('Get-Message-Cleaning-Supply-Orders',handleMessageCleaningSupplyOrders);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MessageCleaningSupplyOrdersContext.Provider value={[isMessageCleaningSupplyOrders]}>
            {children}
        </MessageCleaningSupplyOrdersContext.Provider>
    );
}
//---------- MENSAJES PEDIDOS DE SUMINISTROS DE LIMPIEZA