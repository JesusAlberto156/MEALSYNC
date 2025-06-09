//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const MenusContext = createContext(null);
export const MenuTypesContext = createContext(null);
export const MenuTypeAddContext = createContext(null);
export const MenuTypeEditContext = createContext(null);
export const DeletedMenuTypesContext = createContext(null);
export const MenuTypeDeleteContext = createContext(null);
export const MenuTypeLocationContext = createContext(null);
export const MenuLocationsContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los menús ✔️
export const Index_Menus = ({children}) => {
    return(
        <Menus>
            <Menu_Types>
                <Menu_Type_Add>
                    <Menu_Type_Edit>
                        <Deleted_Menu_Types>
                            <Menu_Type_Delete>
                                <Menu_Type_Location>
                                    <Menu_Locations>
                                        {children}
                                    </Menu_Locations>
                                </Menu_Type_Location>
                            </Menu_Type_Delete>
                        </Deleted_Menu_Types>
                    </Menu_Type_Edit>
                </Menu_Type_Add>
            </Menu_Types>
        </Menus>
    );
}

// ---------- MENUS
// Función contexto para controlar los datos de la base de datos de los menús ✔️
export const Menus = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenus,setIsMenus] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenus = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Menús obtenidos!....')
                    setIsMenus(parsedData);
                }else{
                    console.log('¡Error al desencriptar los menús!...');
                    setIsMenus([]);
                }
            } catch (error) {
                console.error('Error al procesar los menús:', error);
                setIsMenus([]);
            }
        }

        socket.emit('Get-Menus');
        socket.on('Get-Menus',handleMenus);

        return () => {
            socket.off('Get-Menus',handleMenus);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenusContext.Provider value={[isMenus,setIsMenus]}>
            {children}
        </MenusContext.Provider>
    );
}
// ---------- MENUS
// ---------- TIPOS DE MENUS
// Función contexto para controlar los datos de la base de datos de los tipos de menú ✔️
export const Menu_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuTypes,setIsMenuTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú obtenidos!....')
                    setIsMenuTypes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los tipos de menú!...');
                    setIsMenuTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de menú:', error);
                setIsMenuTypes([]);
            }
        }

        socket.emit('Get-Menu-Types');
        socket.on('Get-Menu-Types',handleMenuTypes);

        return () => {
            socket.off('Get-Menu-Types',handleMenuTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypesContext.Provider value={[isMenuTypes,setIsMenuTypes]}>
            {children}
        </MenuTypesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los tipos de menú ✔️
export const Menu_Type_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isMenuTypeAdd,setIsMenuTypeAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeAddContext.Provider value={[isMenuTypeAdd,setIsMenuTypeAdd]}>
            {children}
        </MenuTypeAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de los tipos de menú ✔️
export const Menu_Type_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isMenuTypeEdit,setIsMenuTypeEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeEditContext.Provider value={[isMenuTypeEdit,setIsMenuTypeEdit]}>
            {children}
        </MenuTypeEditContext.Provider>
    );
}
// ---------- TIPOS DE MENUS
// ---------- TIPOS DE MENUS ELIMINADOS
// Función contexto para controlar los datos de la base de datos de los tipos de menú eliminados ✔️
export const Deleted_Menu_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isDeletedMenuTypes,setIsDeletedMenuTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedMenuTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú eliminados obtenidos!....')
                    setIsDeletedMenuTypes(parsedData);
                }else{
                    console.log('¡Error al desencriptar los tipos de menú eliminados!...');
                    setIsDeletedMenuTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de menú eliminados:', error);
                setIsDeletedMenuTypes([]);
            }
        }

        socket.emit('Get-Deleted-Menu-Types');
        socket.on('Get-Deleted-Menu-Types',handleDeletedMenuTypes);

        return () => {
            socket.off('Get-Deleted-Menu-Types',handleDeletedMenuTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedMenuTypesContext.Provider value={[isDeletedMenuTypes,setIsDeletedMenuTypes]}>
            {children}
        </DeletedMenuTypesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los tipos de menú eliminados ✔️
export const Menu_Type_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isMenuTypeDelete,setIsMenuTypeDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeAddContext.Provider value={[isMenuTypeDelete,setIsMenuTypeDelete]}>
            {children}
        </MenuTypeAddContext.Provider>
    );
}
// ---------- TIPOS DE MENUS ELIMINADOS
// ---------- TIPOS DE MENUS UBICACION
// Función contexto para controlar los datos de la base de datos de los tipos de menú y ubicación ✔️
export const Menu_Type_Location = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuTypeLocation,setIsMenuTypeLocation] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuTypeLocation = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú con su ubicación obtenidos!....')
                    setIsMenuTypeLocation(parsedData);
                }else{
                    console.log('¡Error al desencriptar los tipos de menú con su ubicación!...');
                    setIsMenuTypeLocation([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de menú con su ubicación:', error);
                setIsMenuTypeLocation([]);
            }
        }

        socket.emit('Get-Menu-Type-Location');
        socket.on('Get-Menu-Type-Location',handleMenuTypeLocation);

        return () => {
            socket.off('Get-Menu-Type-Location',handleMenuTypeLocation);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeLocationContext.Provider value={[isMenuTypeLocation,setIsMenuTypeLocation]}>
            {children}
        </MenuTypeLocationContext.Provider>
    );
}
// ---------- TIPOS DE MENUS UBICACION
// ---------- MENUS UBICACION
// Función contexto para controlar los datos de la base de datos de las ubicaciones de menú ✔️
export const Menu_Locations = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuLocations,setIsMenuLocations] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuLocations = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Ubicaciones de los menús obtenidas!....')
                    setIsMenuLocations(parsedData);
                }else{
                    console.log('¡Error al desencriptar las ubicaciones de los menús!...');
                    setIsMenuLocations([]);
                }
            } catch (error) {
                console.error('Error al procesar las ubicaciones de los menús:', error);
                setIsMenuLocations([]);
            }
        }

        socket.emit('Get-Menu-Locations');
        socket.on('Get-Menu-Locations',handleMenuLocations);

        return () => {
            socket.off('Get-Menu-Locations',handleMenuLocations);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuLocationsContext.Provider value={[isMenuLocations,setIsMenuLocations]}>
            {children}
        </MenuLocationsContext.Provider>
    );
}
// ---------- MENUS UBICACION