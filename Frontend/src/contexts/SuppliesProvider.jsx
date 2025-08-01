//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const SuppliesContext = createContext(null);
export const SupplyAddContext = createContext(null);
export const SupplyEditContext = createContext(null);
export const DeletedSuppliesContext = createContext(null);
export const SupplyDeleteContext = createContext(null);
export const SupplyTypesContext = createContext(null);
export const SupplyTypeAddContext = createContext(null);
export const SupplyTypeEditContext = createContext(null);
export const CountSupplyTypesContext = createContext(null);
export const SupplyTypeCountAddContext = createContext(null);
export const DeletedSupplyTypesContext = createContext(null);
export const SupplyTypeDeleteContext = createContext(null);
export const SupplyCategoriesContext = createContext(null);
export const SupplyCategoryAddContext = createContext(null);
export const SupplyCategoryEditContext = createContext(null);
export const DeletedSupplyCategoriesContext = createContext(null);
export const SupplyCategoryDeleteContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de insumos ✔️
export const Index_Supplies = ({children}) => {
    return(
        <Supplies>
            <Supply_Add>
                <Supply_Edit>
                    <Deleted_Supplies>
                        <Supply_Delete>
                            <Supply_Types>
                                <Supply_Type_Add>
                                    <Supply_Type_Edit>
                                        <Count_Supply_Types>
                                            <Supply_Type_Count_Add>
                                                <Deleted_Supply_Types>
                                                    <Supply_Type_Delete>
                                                        <Supply_Categories>
                                                            <Supply_Category_Add>
                                                                <Supply_Category_Edit>
                                                                    <Deleted_Supply_Categories>
                                                                        <Supply_Category_Delete>
                                                                            {children}
                                                                        </Supply_Category_Delete>
                                                                    </Deleted_Supply_Categories>
                                                                </Supply_Category_Edit>
                                                            </Supply_Category_Add>
                                                        </Supply_Categories>
                                                    </Supply_Type_Delete>
                                                </Deleted_Supply_Types>
                                            </Supply_Type_Count_Add>
                                        </Count_Supply_Types>
                                    </Supply_Type_Edit>
                                </Supply_Type_Add>
                            </Supply_Types>
                        </Supply_Delete>
                    </Deleted_Supplies>
                </Supply_Edit>
            </Supply_Add>
        </Supplies>
    );
}

//---------- INSUMOS
// Función contexto para controlar los datos de la base de datos de los insumos ✔️
export const Supplies = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplies,setIsSupplies] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSupplies = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Insumos obtenidos!')
                    setIsSupplies(parsedData);
                }else{
                    console.log('¡Error al desencriptar los insumos!');
                    setIsSupplies([]);
                }
            } catch (error) {
                console.error('Error al procesar los insumos:', error);
                setIsSupplies([]);
            }
        }

        socket.emit('Get-Supplies');
        socket.on('Get-Supplies',handleSupplies);

        return () => {
            socket.off('Get-Supplies',handleSupplies);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SuppliesContext.Provider value={[isSupplies]}>
            {children}
        </SuppliesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un insumo ✔️
export const Supply_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyAdd,setIsSupplyAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyAddContext.Provider value={[isSupplyAdd,setIsSupplyAdd]}>
            {children}
        </SupplyAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un insumo ✔️
export const Supply_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyEdit,setIsSupplyEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyEditContext.Provider value={[isSupplyEdit,setIsSupplyEdit]}>
            {children}
        </SupplyEditContext.Provider>
    );
}
//---------- INSUMOS
//---------- INSUMOS ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los insumos eliminados ✔️
export const Deleted_Supplies = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedSupplies,setIsDeletedSupplies] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedSupplies = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Insumos eliminados obtenidos!')
                    setIsDeletedSupplies(parsedData);
                }else{
                    console.log('¡Error al desencriptar los insumos eliminados!');
                    setIsDeletedSupplies([]);
                }
            } catch (error) {
                console.error('Error al procesar los insumos eliminados:', error);
                setIsDeletedSupplies([]);
            }
        }

        socket.emit('Get-Deleted-Supplies');
        socket.on('Get-Deleted-Supplies',handleDeletedSupplies);

        return () => {
            socket.off('Get-Deleted-Supplies',handleDeletedSupplies);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedSuppliesContext.Provider value={[isDeletedSupplies]}>
            {children}
        </DeletedSuppliesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un insumo ✔️
export const Supply_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyDelete,setIsSupplyDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyDeleteContext.Provider value={[isSupplyDelete,setIsSupplyDelete]}>
            {children}
        </SupplyDeleteContext.Provider>
    );
}
//---------- INSUMOS ELIMINADOS
//---------- TIPO DE INSUMOS
// Función contexto para controlar los datos de la base de datos de los tipos de insumo ✔️
export const Supply_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplyTypes,setIsSupplyTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSupplyTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de insumo obtenidos!')
                    setIsSupplyTypes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los tipos de insumo!');
                    setIsSupplyTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de insumo:', error);
                setIsSupplyTypes([]);
            }
        }

        socket.emit('Get-Supply-Types');
        socket.on('Get-Supply-Types',handleSupplyTypes);

        return () => {
            socket.off('Get-Supply-Types',handleSupplyTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyTypesContext.Provider value={[isSupplyTypes]}>
            {children}
        </SupplyTypesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un tipo de insumo ✔️
export const Supply_Type_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyTypeAdd,setIsSupplyTypeAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyTypeAddContext.Provider value={[isSupplyTypeAdd,setIsSupplyTypeAdd]}>
            {children}
        </SupplyTypeAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un tipo de insumo ✔️
export const Supply_Type_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyTypeEdit,setIsSupplyTypeEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyTypeEditContext.Provider value={[isSupplyTypeEdit,setIsSupplyTypeEdit]}>
            {children}
        </SupplyTypeEditContext.Provider>
    );
}
//---------- TIPO DE INSUMOS
//---------- CANTIDAD DE TIPOS DE INSUMO
// Función contexto para controlar los datos de la base de datos de las cantidades de los tipos de insumo ✔️
export const Count_Supply_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isCountSupplyTypes,setIsCountSupplyTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleCountSupplyTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Cantidades de los tipos de insumo obtenidas!')
                    setIsCountSupplyTypes(parsedData);
                }else{
                    console.log('¡Error al desencriptar las cantidades de los tipos de insumo!');
                    setIsCountSupplyTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar las cantidades de los tipos de insumo:', error);
                setIsCountSupplyTypes([]);
            }
        }

        socket.emit('Get-Count-Supply-Types');
        socket.on('Get-Count-Supply-Types',handleCountSupplyTypes);

        return () => {
            socket.off('Get-Count-Supply-Types',handleCountSupplyTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <CountSupplyTypesContext.Provider value={[isCountSupplyTypes]}>
            {children}
        </CountSupplyTypesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de la cantidades de un tipo de insumo ✔️
export const Supply_Type_Count_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyTypeCountAdd,setIsSupplyTypeCountAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyTypeCountAddContext.Provider value={[isSupplyTypeCountAdd,setIsSupplyTypeCountAdd]}>
            {children}
        </SupplyTypeCountAddContext.Provider>
    );
}
//---------- CANTIDAD DE TIPOS DE INSUMO
//---------- TIPOS DE INSUMO ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los tipos de insumo eliminados ✔️
export const Deleted_Supply_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedSupplyTypes,setIsDeletedSupplyTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedSupplyTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de insumo eliminados obtenidos!')
                    setIsDeletedSupplyTypes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los tipos de insumo eliminados!');
                    setIsDeletedSupplyTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de insumo eliminados:', error);
                setIsDeletedSupplyTypes([]);
            }
        }

        socket.emit('Get-Deleted-Supply-Types');
        socket.on('Get-Deleted-Supply-Types',handleDeletedSupplyTypes);

        return () => {
            socket.off('Get-Deleted-Supply-Types',handleDeletedSupplyTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedSupplyTypesContext.Provider value={[isDeletedSupplyTypes]}>
            {children}
        </DeletedSupplyTypesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un tipo de insumo ✔️
export const Supply_Type_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyTypeDelete,setIsSupplyTypeDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyTypeDeleteContext.Provider value={[isSupplyTypeDelete,setIsSupplyTypeDelete]}>
            {children}
        </SupplyTypeDeleteContext.Provider>
    );
}
//---------- TIPOS DE INSUMO ELIMINADOS
//---------- CATEGORIAS DE INSUMO
// Función contexto para controlar los datos de la base de datos de las categorias por insumo ✔️
export const Supply_Categories = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isSupplyCategories,setIsSupplyCategories] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleSupplyCategories = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Categorías por insumo obtenidas!')
                    setIsSupplyCategories(parsedData);
                }else{
                    console.log('¡Error al desencriptar las categorías por insumo!');
                    setIsSupplyCategories([]);
                }
            } catch (error) {
                console.error('Error al procesar las categorías por insumo:', error);
                setIsSupplyCategories([]);
            }
        }

        socket.emit('Get-Supply-Categories');
        socket.on('Get-Supply-Categories',handleSupplyCategories);

        return () => {
            socket.off('Get-Supply-Categories',handleSupplyCategories);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyCategoriesContext.Provider value={[isSupplyCategories]}>
            {children}
        </SupplyCategoriesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de una categoria por insumo ✔️
export const Supply_Category_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyCategoryAdd,setIsSupplyCategoryAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyCategoryAddContext.Provider value={[isSupplyCategoryAdd,setIsSupplyCategoryAdd]}>
            {children}
        </SupplyCategoryAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de una categoria por insumo ✔️
export const Supply_Category_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyCategoryEdit,setIsSupplyCategoryEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyCategoryEditContext.Provider value={[isSupplyCategoryEdit,setIsSupplyCategoryEdit]}>
            {children}
        </SupplyCategoryEditContext.Provider>
    );
}
//---------- CATEGORIAS DE INSUMO
//---------- CATEGORIAS DE INSUMO ELIMINADAS
// Función contexto para controlar los datos de la base de datos de las categorias por insumo eliminadas ✔️
export const Deleted_Supply_Categories = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedSupplyCategories,setIsDeletedSupplyCategories] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedSupplyCategories = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Categorías por insumo eliminadas obtenidas!')
                    setIsDeletedSupplyCategories(parsedData);
                }else{
                    console.log('¡Error al desencriptar las categorías por insumo eliminadas!');
                    setIsDeletedSupplyCategories([]);
                }
            } catch (error) {
                console.error('Error al procesar las categorías por insumo eliminadas:', error);
                setIsDeletedSupplyCategories([]);
            }
        }

        socket.emit('Get-Deleted-Supply-Categories');
        socket.on('Get-Deleted-Supply-Categories',handleDeletedSupplyCategories);

        return () => {
            socket.off('Get-Deleted-Supply-Categories',handleDeletedSupplyCategories);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedSupplyCategoriesContext.Provider value={[isDeletedSupplyCategories]}>
            {children}
        </DeletedSupplyCategoriesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de una categoria por insumo ✔️
export const Supply_Category_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isSupplyCategoryDelete,setIsSupplyCategoryDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <SupplyCategoryDeleteContext.Provider value={[isSupplyCategoryDelete,setIsSupplyCategoryDelete]}>
            {children}
        </SupplyCategoryDeleteContext.Provider>
    );
}
//---------- CATEGORIAS DE INSUMO ELIMINADAS