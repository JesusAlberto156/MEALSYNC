//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const DrinksContext = createContext(null);
export const DrinkAddContext = createContext(null);
export const DrinkEditContext = createContext(null);
export const DrinkSpecificationsContext = createContext(null);
export const DeletedDrinksContext = createContext(null);
export const DrinkDeleteContext = createContext(null);
export const WarehouseDrinksContext = createContext(null);
export const MenuTypeDrinksContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de las bebidas  ✔️
export const Index_Drinks = ({children}) => {
    return(
        <Drinks>   
            <Drink_Add>
                <Drink_Edit>
                    <Drink_Specifications>
                        <Deleted_Drinks>
                            <Drink_Delete>
                                <Warehouse_Drinks>
                                    <Menu_Type_Drinks>
                                        {children}
                                    </Menu_Type_Drinks>
                                </Warehouse_Drinks>
                            </Drink_Delete>
                        </Deleted_Drinks>
                    </Drink_Specifications>
                </Drink_Edit>
            </Drink_Add>               
        </Drinks>
    );
}

// ---------- BEBIDAS
// Función contexto para controlar los datos de la base de datos de bebidas ✔️
export const Drinks = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDrinks,setIsDrinks] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDrinks = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Bebidas obtenidas!');
                    setIsDrinks(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las bebidas!');
                    setIsDrinks([]);
                }
            } catch (error) {
                console.error('Error al procesar las bebidas:', error);
                setIsDrinks([]);
            }
        }

        socket.emit('Get-Drinks');
        socket.on('Get-Drinks',handleDrinks);

        return () => {
            socket.off('Get-Drinks',handleDrinks);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DrinksContext.Provider value={[isDrinks]}>
            {children}
        </DrinksContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de una bebida ✔️
export const Drink_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDrinkAdd,setIsDrinkAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DrinkAddContext.Provider value={[isDrinkAdd,setIsDrinkAdd]}>
            {children}
        </DrinkAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de una bebida ✔️
export const Drink_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDrinkEdit,setIsDrinkEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DrinkEditContext.Provider value={[isDrinkEdit,setIsDrinkEdit]}>
            {children}
        </DrinkEditContext.Provider>
    );
}
// ---------- BEBIDAS
// ---------- ESPECIFICACIONES DE BEBIDAS
// Función contexto para controlar los datos de la base de datos de las especificaciones de bebidas ✔️
export const Drink_Specifications = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDrinkSpecifications,setIsDrinkSpecifications] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDrinkSpecifications = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Especificaciones de bebidas obtenidas!');
                    setIsDrinkSpecifications(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las especificaciones de bebidas!');
                    setIsDrinkSpecifications([]);
                }
            } catch (error) {
                console.error('Error al procesar las especificaciones de bebidas:', error);
                setIsDrinkSpecifications([]);
            }
        }

        socket.emit('Get-Drink-Specifications');
        socket.on('Get-Drink-Specifications',handleDrinkSpecifications);

        return () => {
            socket.off('Get-Drink-Specifications',handleDrinkSpecifications);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DrinkSpecificationsContext.Provider value={[isDrinkSpecifications]}>
            {children}
        </DrinkSpecificationsContext.Provider>
    );
}
// ---------- ESPECIFICACIONES DE BEBIDAS
// ---------- BEBIDAS ELIMINADAS
// Función contexto para controlar los datos de la base de datos de bebidas eliminadas ✔️
export const Deleted_Drinks = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedDrinks,setIsDeletedDrinks] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedDrinks = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Bebidas eliminadas obtenidas!');
                    setIsDeletedDrinks(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las bebidas eliminadas!');
                    setIsDeletedDrinks([]);
                }
            } catch (error) {
                console.error('Error al procesar las bebidas eliminadas:', error);
                setIsDeletedDrinks([]);
            }
        }

        socket.emit('Get-Deleted-Drinks');
        socket.on('Get-Deleted-Drinks',handleDeletedDrinks);

        return () => {
            socket.off('Get-Deleted-Drinks',handleDeletedDrinks);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedDrinksContext.Provider value={[isDeletedDrinks]}>
            {children}
        </DeletedDrinksContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de una bebida ✔️
export const Drink_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDrinkDelete,setIsDrinkDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DrinkDeleteContext.Provider value={[isDrinkDelete,setIsDrinkDelete]}>
            {children}
        </DrinkDeleteContext.Provider>
    );
}
// ---------- BEBIDAS ELIMINADAS
// ---------- ALMACÉN DE BEBIDAS
// Función contexto para controlar los datos de la base de datos de los almacenes de bebidas ✔️
export const Warehouse_Drinks = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isWarehouseDrinks,setIsWarehouseDrinks] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleWarehouseDrinks = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacenes de bebidas obtenidos!');
                    setIsWarehouseDrinks(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los almacenes de bebidas!');
                    setIsWarehouseDrinks([]);
                }
            } catch (error) {
                console.error('Error al procesar los almacenes de bebidas:', error);
                setIsWarehouseDrinks([]);
            }
        }

        socket.emit('Get-Warehouse-Drinks');
        socket.on('Get-Warehouse-Drinks',handleWarehouseDrinks);

        return () => {
            socket.off('Get-Warehouse-Drinks',handleWarehouseDrinks);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <WarehouseDrinksContext.Provider value={[isWarehouseDrinks]}>
            {children}
        </WarehouseDrinksContext.Provider>
    );
}
// ---------- ALMACÉN DE BEBIDAS
// ---------- TIPO DE MENU BEBIDAS
// Función contexto para controlar los datos de la base de datos de los tipos de menú de bebidas ✔️
export const Menu_Type_Drinks = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuTypeDrinks,setIsMenuTypeDrinks] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuTypeDrinks = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú de bebidas obtenidos!');
                    setIsMenuTypeDrinks(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los tipos de menú de bebidas!');
                    setIsMenuTypeDrinks([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de menú de bebidas:', error);
                setIsMenuTypeDrinks([]);
            }
        }

        socket.emit('Get-Menu-Type-Drinks');
        socket.on('Get-Menu-Type-Drinks',handleMenuTypeDrinks);

        return () => {
            socket.off('Get-Menu-Type-Drinks',handleMenuTypeDrinks);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeDrinksContext.Provider value={[isMenuTypeDrinks]}>
            {children}
        </MenuTypeDrinksContext.Provider>
    );
}
// ---------- TIPO DE MENU BEBIDAS