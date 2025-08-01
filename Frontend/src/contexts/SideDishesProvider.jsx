//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const SideDishesContext = createContext(null);
export const SideDishAddContext = createContext(null);
export const SideDishEditContext = createContext(null);
export const SideDishSpecificationsContext = createContext(null);
export const DeletedSideDishesContext = createContext(null);
export const SideDishDeleteContext = createContext(null);
export const WarehouseSideDishesContext = createContext(null);
export const MenuTypeSideDishesContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de las guarniciones  ✔️
export const Index_Side_Dishes = ({children}) => {
    return(
        <Side_Dishes>   
            <Side_Dish_Add>
                <Side_Dish_Edit>
                    <Side_Dish_Specifications>
                        <Deleted_Side_Dishes>
                            <Side_Dish_Delete>
                                <Warehouse_Side_Dishes>
                                    <Menu_Type_Side_Dishes>
                                        {children}
                                    </Menu_Type_Side_Dishes>
                                </Warehouse_Side_Dishes>
                            </Side_Dish_Delete>
                        </Deleted_Side_Dishes>
                    </Side_Dish_Specifications>
                </Side_Dish_Edit>
            </Side_Dish_Add>               
        </Side_Dishes>
    );
}

// ---------- GUARNICIONES
// Función contexto para controlar los datos de la base de datos de guarniciones ✔️
export const Side_Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSideDishes,setIsSideDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSideDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Guarniciones obtenidos!');
                    setIsSideDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las guarniciones!');
                    setIsSideDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar las guarniciones:', error);
                setIsSideDishes([]);
            }
        }

        socket.emit('Get-Side-Dishes');
        socket.on('Get-Side-Dishes',handleSideDishes);

        return () => {
            socket.off('Get-Side-Dishes',handleSideDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SideDishesContext.Provider value={[isSideDishes]}>
            {children}
        </SideDishesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de una guarnición ✔️
export const Side_Dish_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSideDishAdd,setIsSideDishAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SideDishAddContext.Provider value={[isSideDishAdd,setIsSideDishAdd]}>
            {children}
        </SideDishAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de una guarnición ✔️
export const Side_Dish_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSideDishEdit,setIsSideDishEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SideDishEditContext.Provider value={[isSideDishEdit,setIsSideDishEdit]}>
            {children}
        </SideDishEditContext.Provider>
    );
}
// ---------- GUARNICIONES
// ---------- ESPECIFICACIONES DE GUARNICIONES
// Función contexto para controlar los datos de la base de datos de las especificaciones de guarniciones ✔️
export const Side_Dish_Specifications = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSideDishSpecifications,setIsSideDishSpecifications] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSideDishSpecifications = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Especificaciones de guarniciones obtenidas!');
                    setIsSideDishSpecifications(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las especificaciones de guarniciones!');
                    setIsSideDishSpecifications([]);
                }
            } catch (error) {
                console.error('Error al procesar las especificaciones de guarniciones:', error);
                setIsSideDishSpecifications([]);
            }
        }

        socket.emit('Get-Side-Dish-Specifications');
        socket.on('Get-Side-Dish-Specifications',handleSideDishSpecifications);

        return () => {
            socket.off('Get-Side-Dish-Specifications',handleSideDishSpecifications);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SideDishSpecificationsContext.Provider value={[isSideDishSpecifications]}>
            {children}
        </SideDishSpecificationsContext.Provider>
    );
}
// ---------- ESPECIFICACIONES DE GUARNICIONES
// ---------- GUARNICIONES ELIMINADAS
// Función contexto para controlar los datos de la base de datos de guarniciones eliminadas ✔️
export const Deleted_Side_Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedSideDishes,setIsDeletedSideDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedSideDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Guarniciones eliminadas obtenidas!');
                    setIsDeletedSideDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las guarniciones eliminadas!');
                    setIsDeletedSideDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar las guarniciones eliminadas:', error);
                setIsDeletedSideDishes([]);
            }
        }

        socket.emit('Get-Deleted-Side-Dishes');
        socket.on('Get-Deleted-Side-Dishes',handleDeletedSideDishes);

        return () => {
            socket.off('Get-Deleted-Side-Dishes',handleDeletedSideDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedSideDishesContext.Provider value={[isDeletedSideDishes]}>
            {children}
        </DeletedSideDishesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de una guarnición ✔️
export const Side_Dish_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSideDishDelete,setIsSideDishDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SideDishDeleteContext.Provider value={[isSideDishDelete,setIsSideDishDelete]}>
            {children}
        </SideDishDeleteContext.Provider>
    );
}
// ---------- GUARNICIONES ELIMINADAS
// ---------- ALMACÉN DE GUARNICIONES
// Función contexto para controlar los datos de la base de datos de los almacenes de guarniciones ✔️
export const Warehouse_Side_Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseSideDishes,setIsWarehouseSideDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleWarehouseSideDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacenes de guarniciones obtenidos!');
                    setIsWarehouseSideDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los almacenes de guarniciones!');
                    setIsWarehouseSideDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar los almacenes de guarniciones:', error);
                setIsWarehouseSideDishes([]);
            }
        }

        socket.emit('Get-Warehouse-Side-Dishes');
        socket.on('Get-Warehouse-Side-Dishes',handleWarehouseSideDishes);

        return () => {
            socket.off('Get-Warehouse-Side-Dishes',handleWarehouseSideDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarehouseSideDishesContext.Provider value={[isWarehouseSideDishes]}>
            {children}
        </WarehouseSideDishesContext.Provider>
    );
}
// ---------- ALMACÉN DE GUARNICIONES
// ---------- TIPO DE MENU GUARNICIONES
// Función contexto para controlar los datos de la base de datos de los tipos de menú de guarniciones ✔️
export const Menu_Type_Side_Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuTypeSideDishes,setIsMenuTypeSideDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuTypeSideDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú de guarniciones obtenidos!');
                    setIsMenuTypeSideDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los tipos de menú de guarniciones!');
                    setIsMenuTypeSideDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de menú de guarniciones:', error);
                setIsMenuTypeSideDishes([]);
            }
        }

        socket.emit('Get-Menu-Type-Side-Dishes');
        socket.on('Get-Menu-Type-Side-Dishes',handleMenuTypeSideDishes);

        return () => {
            socket.off('Get-Menu-Type-Side-Dishes',handleMenuTypeSideDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeSideDishesContext.Provider value={[isMenuTypeSideDishes]}>
            {children}
        </MenuTypeSideDishesContext.Provider>
    );
}
// ---------- TIPO DE MENU GUARNICIONES