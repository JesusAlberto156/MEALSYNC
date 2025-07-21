//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const MenusContext = createContext(null);
export const MenuTypesContext = createContext(null);
export const MenuTypeAddContext = createContext(null);
export const MenuTypeEditContext = createContext(null);
export const DeletedMenuTypesContext = createContext(null);
export const MenuTypeDeleteContext = createContext(null);
export const MenuTypeUbicationsContext = createContext(null);
export const MenuUbicationsContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los menús  ✔️
export const Index_Menus = ({children}) => {
    return(
        <Menus>   
            <Menu_Types>
                <Menu_Type_Add>
                    <Menu_Type_Edit>
                        <Deleted_Menu_Types>
                            <Menu_Type_Delete>
                                <Menu_Type_Ubications>
                                    <Menu_Ubications>
                                        {children}
                                    </Menu_Ubications>
                                </Menu_Type_Ubications>
                            </Menu_Type_Delete>
                        </Deleted_Menu_Types>
                    </Menu_Type_Edit>
                </Menu_Type_Add>
            </Menu_Types>               
        </Menus>
    );
}

// ---------- MENUS
// Función contexto para controlar los datos de la base de datos de menús ✔️
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
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Menús obtenidos!');
                    setIsMenus(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los menús!');
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
        <MenusContext.Provider value={[isMenus]}>
            {children}
        </MenusContext.Provider>
    );
}
// ---------- MENUS
// ---------- TIPOS DE MENUS
// Función contexto para controlar los datos de la base de datos de tipos de menú ✔️
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
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú obtenidos!');
                    setIsMenuTypes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los tipos de menú!');
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
        <MenuTypesContext.Provider value={[isMenuTypes]}>
            {children}
        </MenuTypesContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un tipo de menú ✔️
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
// Función contexto para controlar los datos editados de un tipo de menú ✔️
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
// Función contexto para controlar los datos de la base de datos de tipos de menú eliminados ✔️
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
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú eliminados obtenidos!');
                    setIsDeletedMenuTypes(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los tipos de menú eliminados!');
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
        <DeletedMenuTypesContext.Provider value={[isDeletedMenuTypes]}>
            {children}
        </DeletedMenuTypesContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un tipo de menú ✔️
export const Menu_Type_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isMenuTypeDelete,setIsMenuTypeDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeDeleteContext.Provider value={[isMenuTypeDelete,setIsMenuTypeDelete]}>
            {children}
        </MenuTypeDeleteContext.Provider>
    );
}
// ---------- TIPOS DE MENUS ELIMINADOS
// ---------- TIPOS DE MENUS UBICACION
// Función contexto para controlar los datos de la base de datos de tipos de menú con su ubicación ✔️
export const Menu_Type_Ubications = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuTypeUbications,setIsMenuTypeUbications] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuTypeUbications = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de menú con ubicación obtenidos!');
                    setIsMenuTypeUbications(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los tipos de menú con ubicación!');
                    setIsMenuTypeUbications([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de menú con ubicación:', error);
                setIsMenuTypeUbications([]);
            }
        }

        socket.emit('Get-Menu-Type-Ubications');
        socket.on('Get-Menu-Type-Ubications',handleMenuTypeUbications);

        return () => {
            socket.off('Get-Menu-Type-Ubications',handleMenuTypeUbications);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuTypeUbicationsContext.Provider value={[isMenuTypeUbications]}>
            {children}
        </MenuTypeUbicationsContext.Provider>
    );
}
// ---------- TIPOS DE MENUS UBICACION
// ---------- MENUS UBICACION
// Función contexto para controlar los datos de la base de datos de las ubicaciones de menús ✔️
export const Menu_Ubications = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isMenuUbications,setIsMenuUbications] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleMenuUbications = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Ubicaciones de menús obtenidos!');
                    setIsMenuUbications(parsedData);
                } else {
                    console.warn('¡Error al desencriptar las ubicaciones de los menús!');
                    setIsMenuUbications([]);
                }
            } catch (error) {
                console.error('Error al procesar las ubicaciones de los menús:', error);
                setIsMenuUbications([]);
            }
        }

        socket.emit('Get-Menu-Ubications');
        socket.on('Get-Menu-Ubications',handleMenuUbications);

        return () => {
            socket.off('Get-Menu-Ubications',handleMenuUbications);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <MenuUbicationsContext.Provider value={[isMenuUbications]}>
            {children}
        </MenuUbicationsContext.Provider>
    );
}
// ---------- MENUS UBICACION