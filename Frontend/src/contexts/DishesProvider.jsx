//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const DishesContext = createContext(null);
export const DishAddContext = createContext(null);
export const DishEditContext = createContext(null);
export const DishSpecificationsContext = createContext(null);
export const DeletedDishesContext = createContext(null);
export const DishDeleteContext = createContext(null);
export const WarehouseDishesContext = createContext(null);
export const MenuTypeDishesContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los platillos  ✔️
export const Index_Dishes = ({children}) => {
    return(
        <Dishes>   
            <Dish_Add>
                <Dish_Edit>
                    <Dish_Specifications>
                        <Deleted_Dishes>
                            <Dish_Delete>
                                <Warehouse_Dishes>
                                    <Menu_Type_Dishes>
                                        {children}
                                    </Menu_Type_Dishes>
                                </Warehouse_Dishes>
                            </Dish_Delete>
                        </Deleted_Dishes>
                    </Dish_Specifications>
                </Dish_Edit>
            </Dish_Add>               
        </Dishes>
    );
}

// ---------- PLATILLOS
// Función contexto para controlar los datos de la base de datos de platillos ✔️
export const Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDishes,setIsDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Platillos obtenidos!');
                    setIsDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los platillos!');
                    setIsDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar los platillos:', error);
                setIsDishes([]);
            }
        }

        socket.emit('Get-Dishes');
        socket.on('Get-Dishes',handleDishes);

        return () => {
            socket.off('Get-Dishes',handleDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishesContext.Provider value={[isDishes]}>
            {children}
        </DishesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un platillo ✔️
export const Dish_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishAdd,setIsDishAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishAddContext.Provider value={[isDishAdd,setIsDishAdd]}>
            {children}
        </DishAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un platillo ✔️
export const Dish_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishEdit,setIsDishEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishEditContext.Provider value={[isDishEdit,setIsDishEdit]}>
            {children}
        </DishEditContext.Provider>
    );
}
// ---------- PLATILLOS
// ---------- ESPECIFICACIONES DE PLATILLOS
// Función contexto para controlar los datos de la base de datos de las especificaciones de platillos ✔️
export const Dish_Specifications = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDishSpecifications,setIsDishSpecifications] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDishSpecifications = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Especificaciones de platillos obtenidas!');
                    setIsDishSpecifications(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las especificaciones de platillos!');
                    setIsDishSpecifications([]);
                }
            } catch (error) {
                console.error('Error al procesar las especificaciones de platillos:', error);
                setIsDishSpecifications([]);
            }
        }

        socket.emit('Get-Dish-Specifications');
        socket.on('Get-Dish-Specifications',handleDishSpecifications);

        return () => {
            socket.off('Get-Dish-Specifications',handleDishSpecifications);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishSpecificationsContext.Provider value={[isDishSpecifications]}>
            {children}
        </DishSpecificationsContext.Provider>
    );
}
// ---------- ESPECIFICACIONES DE PLATILLOS
// ---------- PLATILLOS ELIMINADOS
// Función contexto para controlar los datos de la base de datos de platillos eliminados ✔️
export const Deleted_Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedDishes,setIsDeletedDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Platillos eliminados obtenidos!');
                    setIsDeletedDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los platillos eliminados!');
                    setIsDeletedDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar los platillos eliminados:', error);
                setIsDeletedDishes([]);
            }
        }

        socket.emit('Get-Deleted-Dishes');
        socket.on('Get-Deleted-Dishes',handleDeletedDishes);

        return () => {
            socket.off('Get-Deleted-Dishes',handleDeletedDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedDishesContext.Provider value={[isDeletedDishes]}>
            {children}
        </DeletedDishesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un platillo ✔️
export const Dish_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishDelete,setIsDishDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishDeleteContext.Provider value={[isDishDelete,setIsDishDelete]}>
            {children}
        </DishDeleteContext.Provider>
    );
}
// ---------- PLATILLOS ELIMINADOS
// ---------- ALMACÉN DE PLATILLOS
// Función contexto para controlar los datos de la base de datos de los almacenes de platillos ✔️
export const Warehouse_Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseDishes,setIsWarehouseDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleWarehouseDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacenes de platillos obtenidos!');
                    setIsWarehouseDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los almacenes de platillos!');
                    setIsWarehouseDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar los almacenes de platillos:', error);
                setIsWarehouseDishes([]);
            }
        }

        socket.emit('Get-Warehouse-Dishes');
        socket.on('Get-Warehouse-Dishes',handleWarehouseDishes);

        return () => {
            socket.off('Get-Warehouse-Dishes',handleWarehouseDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarehouseDishesContext.Provider value={[isWarehouseDishes]}>
            {children}
        </WarehouseDishesContext.Provider>
    );
}
// ---------- ALMACÉN DE PLATILLOS
// ---------- TIPO DE MENU PLATILLOS
// Función contexto para controlar los datos de la base de datos de los tipos de menú de platillos ✔️
export const Menu_Type_Dishes = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuTypeDishes,setIsMenuTypeDishes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuTypeDishes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú de platillos obtenidos!');
                    setIsMenuTypeDishes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los tipos de menú de platillos!');
                    setIsMenuTypeDishes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de menú de platillos:', error);
                setIsMenuTypeDishes([]);
            }
        }

        socket.emit('Get-Menu-Type-Dishes');
        socket.on('Get-Menu-Type-Dishes',handleMenuTypeDishes);

        return () => {
            socket.off('Get-Menu-Type-Dishes',handleMenuTypeDishes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeDishesContext.Provider value={[isMenuTypeDishes]}>
            {children}
        </MenuTypeDishesContext.Provider>
    );
}
// ---------- TIPO DE MENU PLATILLOS