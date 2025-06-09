//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const DishesContext = createContext(null);
export const DishAddContext = createContext(null);
export const DishEditContext = createContext(null);
export const DeletedDishesContext = createContext(null);
export const DishDeleteContext = createContext(null);
export const DishSpecificationsContext = createContext(null);
export const DishSpecificationsAddContext = createContext(null);
export const DishSpecificationsEditContext = createContext(null);
export const DishWarehouseContext = createContext(null);
export const DishWarehouseAddContext = createContext(null);
export const DishWarehouseEditContext = createContext(null);
export const DishWarehouseDeleteContext = createContext(null);
export const MealTypesContext = createContext(null);
export const MealTypeAddContext = createContext(null);
export const MealTypeDeleteContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los menús ✔️
export const Index_Dishes = ({children}) => {
    return(
        <Dishes>
            <Dish_Add>
                <Dish_Edit>
                    <Deleted_Dishes>
                        <Dish_Delete>
                            <Dish_Specifications>
                                <Dish_Specifications_Add>
                                    <Dish_Specifications_Edit>
                                        <Dish_Warehouse>
                                            <Dish_Warehouse_Add>
                                                <Dish_Warehouse_Edit>
                                                    <Dish_Warehouse_Delete>
                                                        <Meal_Types>
                                                            <Meal_Type_Add>
                                                                <Meal_Type_Delete>
                                                                    {children}
                                                                </Meal_Type_Delete>
                                                            </Meal_Type_Add>
                                                        </Meal_Types>
                                                    </Dish_Warehouse_Delete>
                                                </Dish_Warehouse_Edit>
                                            </Dish_Warehouse_Add>
                                        </Dish_Warehouse>
                                    </Dish_Specifications_Edit>
                                </Dish_Specifications_Add>
                            </Dish_Specifications>
                        </Dish_Delete>
                    </Deleted_Dishes>
                </Dish_Edit>
            </Dish_Add>
        </Dishes>
    );
}

// ---------- PLATILLOS
// Función contexto para controlar los datos de la base de datos de los platillos ✔️
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
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Platillos obtenidos!....')
                    setIsDishes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los platillos!...');
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
        <DishesContext.Provider value={[isDishes,setIsDishes]}>
            {children}
        </DishesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los platillos ✔️
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
// Función contexto para controlar los datos editados de los platillos ✔️
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
// ---------- PLATILLOS ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los platillos eliminados ✔️
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
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Platillos eliminados obtenidos!....')
                    setIsDeletedDishes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los platillos eliminados!...');
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
        <DeletedDishesContext.Provider value={[isDeletedDishes,setIsDeletedDishes]}>
            {children}
        </DeletedDishesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los platillos eliminados ✔️
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
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Especificaciones de platillos obtenidos!....')
                    setIsDishSpecifications(parsedData);
                }else{
                    console.log('¡Error al desencriptar las especificaciones de platillos!...');
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
        <DishSpecificationsContext.Provider value={[isDishSpecifications,setIsDishSpecifications]}>
            {children}
        </DishSpecificationsContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de las especificaciones de platillos ✔️
export const Dish_Specifications_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishSpecificationsAdd,setIsDishSpecificationsAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishSpecificationsAddContext.Provider value={[isDishSpecificationsAdd,setIsDishSpecificationsAdd]}>
            {children}
        </DishSpecificationsAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de las especificaciones de platillos ✔️
export const Dish_Specifications_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishSpecificationsEdit,setIsDishSpecificationsEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishSpecificationsEditContext.Provider value={[isDishSpecificationsEdit,setIsDishSpecificationsEdit]}>
            {children}
        </DishSpecificationsEditContext.Provider>
    );
}
// ---------- ESPECIFICACIONES DE PLATILLOS
// ---------- ALMACEN DE PLATILLOS
// Función contexto para controlar los datos de la base de datos del almacén de los platillos ✔️
export const Dish_Warehouse = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDishWarehouse,setIsDishWarehouse] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDishWarehouse = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Almacén de los platillos obtenidos!....')
                    setIsDishWarehouse(parsedData);
                }else{
                    console.log('¡Error al desencriptar el almacén de los platillos!...');
                    setIsDishWarehouse([]);
                }
            } catch (error) {
                console.error('Error al procesar el almacén de los platillos:', error);
                setIsDishWarehouse([]);
            }
        }

        socket.emit('Get-Dish-Warehouse');
        socket.on('Get-Dish-Warehouse',handleDishWarehouse);

        return () => {
            socket.off('Get-Dish-Warehouse',handleDishWarehouse);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishWarehouseContext.Provider value={[isDishWarehouse,setIsDishWarehouse]}>
            {children}
        </DishWarehouseContext.Provider>
    );
}
// Función contexto para controlar los datos agregados del almacén de los platillos ✔️
export const Dish_Warehouse_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishWarehouseAdd,setIsDishWarehouseAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishWarehouseAddContext.Provider value={[isDishWarehouseAdd,setIsDishWarehouseAdd]}>
            {children}
        </DishWarehouseAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados del almacén de los platillos ✔️
export const Dish_Warehouse_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishWarehouseEdit,setIsDishWarehouseEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishWarehouseEditContext.Provider value={[isDishWarehouseEdit,setIsDishWarehouseEdit]}>
            {children}
        </DishWarehouseEditContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados del almacén de los platillos ✔️
export const Dish_Warehouse_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isDishWarehouseDelete,setIsDishWarehouseDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <DishWarehouseDeleteContext.Provider value={[isDishWarehouseDelete,setIsDishWarehouseDelete]}>
            {children}
        </DishWarehouseDeleteContext.Provider>
    );
}
// ---------- ALMACEN DE PLATILLOS
// ---------- TIPOS DE PLATILLOS
// Función contexto para controlar los datos de la base de datos de los tipos de platillos ✔️
export const Meal_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMealTypes,setIsMealTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMealTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de platillos obtenidos!....')
                    setIsMealTypes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los tipos de platillos!...');
                    setIsMealTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de platillos:', error);
                setIsMealTypes([]);
            }
        }

        socket.emit('Get-Meal-Types');
        socket.on('Get-Meal-Types',handleMealTypes);

        return () => {
            socket.off('Get-Meal-Types',handleMealTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MealTypesContext.Provider value={[isMealTypes,setIsMealTypes]}>
            {children}
        </MealTypesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los tipos de platillos ✔️
export const Meal_Type_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isMealTypeAdd,setIsMealTypeAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <MealTypeAddContext.Provider value={[isMealTypeAdd,setIsMealTypeAdd]}>
            {children}
        </MealTypeAddContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de los tipos de platillos ✔️
export const Meal_Type_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isMealTypeDelete,setIsMealTypeDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <MealTypeDeleteContext.Provider value={[isMealTypeDelete,setIsMealTypeDelete]}>
            {children}
        </MealTypeDeleteContext.Provider>
    );
}
// ---------- TIPOS DE PLATILLOS