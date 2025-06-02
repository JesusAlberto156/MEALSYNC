//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect,useRef } from "react"
// Servicios
import { decryptData,encryptData } from "../services/Crypto";
// Contextos
export const UsersContext = createContext(null);
export const UserAddContext = createContext(null);
export const UserEditContext = createContext(null);
export const UserViewPasswordContext = createContext(null);
export const PermissionsContext = createContext(null);
export const PermissionsAddContext = createContext(null);
export const PermissionsEditContext = createContext(null);
export const PermissionsEnableContext = createContext(null);
export const StatusContext = createContext(null);
export const StatusAddContext = createContext(null);
export const StatusEnableContext = createContext(null);
export const UserTypesContext = createContext(null);
//__________IMAGES____________
import Logo_Warning_Light from '../components/imgs/Logo-Warning-Light.png';
import Logo_Warning_Dark from '../components/imgs/Logo-Warning-Dark.webp';
//__________IMAGES____________
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
import { LoggedLoggedContext,LoggedUserContext,LoggedTypeContext,LoggedLogContext,LoggedPermissionsContext } from "./SessionProvider";
import { ThemeModeContext } from "./ViewsProvider";
// Estilos personalizados
import { Alert_Warning } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los usuarios  ✔️
export const Index_Users = ({children}) => {
    return(
        <Users>
            <User_Add>
                <User_Edit>
                    <User_View_Password>
                        <Permissions>
                            <Permissions_Add>
                                <Permissions_Edit>
                                    <Permissions_Enable>
                                        <Status>
                                            <Status_Add>
                                                <Status_Enable>
                                                    <User_Types>
                                                        {children}
                                                    </User_Types>
                                                </Status_Enable>
                                            </Status_Add>
                                        </Status>
                                    </Permissions_Enable>
                                </Permissions_Edit>
                            </Permissions_Add>
                        </Permissions>
                    </User_View_Password>
                </User_Edit>
            </User_Add>
        </Users>
    );
}

// ---------- USUARIOS
// Función contexto para controlar los datos de la base de datos de usuarios ✔️
export const Users = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [themeMode] = useContext(ThemeModeContext);
    // UseState para controlar el valor del contexto
    const [isUsers,setIsUsers] = useState([]);
    // UseRef para las alertas
    const alertShow = useRef(false);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Users');

        socket.on('Users',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Usuarios obtenidos!...')
                setIsUsers(parsedData);
                
            }else{
                console.log('¡Error al desencriptar los usuarios!...');
                setIsUsers([]);
            }
        });

        return () => {
            socket.off('Users');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged  && isLoggedUser.length !== 0 && !alertShow.current){
            const user = isUsers.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                if(user.usuario !== isLoggedUser.usuario || user.contrasena !== isLoggedUser.contrasena){
                    const Image_Warning = themeMode ? Logo_Warning_Light : Logo_Warning_Dark;
                    alertShow.current = true;
                    Alert_Warning('MEALSYNC','¡Se han modificado los datos para iniciar sesión, por un administrador!...',themeMode,Image_Warning);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    },3000);
                }else{
                    const jsonUser = JSON.stringify(user);
                    const encryptedUser = encryptData(jsonUser);
                    if(encryptedUser){
                        sessionStorage.setItem('User',encryptedUser);
                        setIsLoggedUser(JSON.parse(jsonUser));
                    }else{
                        return console.log('¡Error al encriptar las credenciales!...');
                    }
                }
                const jsonUser = JSON.stringify(user);
                const encryptedUser = encryptData(jsonUser);
                if(encryptedUser){
                    sessionStorage.setItem('User',encryptedUser);
                    setIsLoggedUser(JSON.parse(jsonUser));
                }else{
                    return console.log('¡Error al encriptar las credenciales!...');
                }
            }
        }
    },[isUsers]);
    // Return para darle valor al contexto y heredarlo
    return (
        <UsersContext.Provider value={[isUsers,setIsUsers]}>
            {children}
        </UsersContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un usuario ✔️
export const User_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isUserAdd,setIsUserAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserAddContext.Provider value={[isUserAdd,setIsUserAdd]}>
            {children}
        </UserAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un usuario ✔️
export const User_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isUserEdit,setIsUserEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserEditContext.Provider value={[isUserEdit,setIsUserEdit]}>
            {children}
        </UserEditContext.Provider>
    );
}
// Función Contexto para controlar la vista de las contraseñas de los usuarios ✔️
export const User_View_Password = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isViewPassword,setIsViewPassword] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserViewPasswordContext.Provider value={[isViewPassword,setIsViewPassword]}>
            {children}
        </UserViewPasswordContext.Provider>
    );
}
// ---------- USUARIOS
// ---------- PERMISOS
// Función contexto para controlar los datos de la base de datos de los permisos de los usuarios ✔️
export const Permissions = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [themeMode] = useContext(ThemeModeContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext); 
    // UseRef para las alertas
    const alertShow = useRef(false);
    // UseState para controlar el valor del contexto
    const [isPermissions,setIsPermissions] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Permissions');

        socket.on('Permissions',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Permisos de usuarios obtenidos!...')
                setIsPermissions(parsedData);
            }else{
                console.log('¡Error al desencriptar los permisos!...');
                setIsPermissions([]);
            }
        });

        return () => {
            socket.off('Permissions');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged && isPermissions.length !== 0 && isLoggedUser.length !== 0 && !alertShow.current){
            const user = isPermissions.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                if(!user.superadministrador){
                    if(isLoggedType === 'Cook' && !user.cocinero || 
                        isLoggedType === 'Nutritionist' && !user.nutriologo ||
                        isLoggedType === 'Doctor' && !user.medico ||
                        isLoggedType === 'Administrator' && !user.administrador ||
                        isLoggedType === 'Chef' && !user.chef ||
                        isLoggedType === 'Storekeeper' && !user.almacenista){
                        const Image_Warning = themeMode ? Logo_Warning_Light : Logo_Warning_Dark;
                        alertShow.current = true;
                        Alert_Warning('MEALSYNC','¡Ha perdido su permiso de acceso, por un administrador!...',themeMode,Image_Warning);
                        setTimeout(() => {
                            setIsLoggedLog(true);
                        },3000);
                    }else{
                        const jsonPermission = JSON.stringify(user);
                        const encryptedPermission = encryptData(jsonPermission);
                        if(encryptedPermission){
                            sessionStorage.setItem('Permissions',encryptedPermission);
                            setIsLoggedPermissions(JSON.parse(jsonPermission));
                        }else{
                            return console.log('¡Error al encriptar las credenciales!...');
                        }
                    }
                }else{
                    const jsonPermission = JSON.stringify(user);
                    const encryptedPermission = encryptData(jsonPermission);
                    if(encryptedPermission){
                        sessionStorage.setItem('Permissions',encryptedPermission);
                        setIsLoggedPermissions(JSON.parse(jsonPermission));
                    }else{
                        return console.log('¡Error al encriptar las credenciales!...');
                    }
                }
                const jsonPermission = JSON.stringify(user);
                const encryptedPermission = encryptData(jsonPermission);
                if(encryptedPermission){
                    sessionStorage.setItem('Permissions',encryptedPermission);
                    setIsLoggedPermissions(JSON.parse(jsonPermission));
                }else{
                    return console.log('¡Error al encriptar las credenciales!...');
                }
            }
        }
    },[isPermissions]);
    // Return para darle valor al contexto y heredarlo
    return (
        <PermissionsContext.Provider value={[isPermissions,setIsPermissions]}>
            {children}
        </PermissionsContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los permisos de un usuario ✔️
export const Permissions_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isPermissionsAdd,setIsPermissionsAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <PermissionsAddContext.Provider value={[isPermissionsAdd,setIsPermissionsAdd]}>
            {children}
        </PermissionsAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de los permisos de un usuario ✔️
export const Permissions_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isPermissionsEdit,setIsPermissionsEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return(
        <PermissionsEditContext.Provider value={[isPermissionsEdit,setIsPermissionsEdit]}>
            {children}
        </PermissionsEditContext.Provider>
    );
}
// Función Contexto para controlar los datos habilitados en el permiso del superadministrador de un usuario ✔️
export const Permissions_Enable = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isPermissionsEnable,setIsPermissionsEnable] = useState([]);
    // Return para darle valor al contexto y heredarlo
    return(
        <PermissionsEnableContext.Provider value={[isPermissionsEnable,setIsPermissionsEnable]}>
            {children}
        </PermissionsEnableContext.Provider>
    );
}
// ---------- PERMISOS
// ---------- ESTATUS
// Función contexto para controlar los datos de la base de datos de estatus ✔️
export const Status = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [themeMode] = useContext(ThemeModeContext);
    const [socket] = useContext(SocketContext);
    // UseRef para las alertas
    const alertShow = useRef(false);
    // UseState para controlar el valor del contexto
    const [isStatus,setIsStatus] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Status');

        socket.on('Status',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Estatus de usuarios obtenidos!....')
                setIsStatus(parsedData);
            }else{
                console.log('¡Error al desencriptar los estatus!...');
                setIsStatus([]);
            }
        });

        return () => {
            socket.off('Status');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged && isStatus.length !== 0 && isLoggedUser.length !== 0 && !alertShow.current){
            const user = isStatus.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                if(!user.habilitado){
                    const Image_Warning = themeMode ? Logo_Warning_Light : Logo_Warning_Dark;
                    alertShow.current = true;
                    Alert_Warning('MEALSYNC','¡Ha sido deshabilitado(a) por un administrador!...',themeMode,Image_Warning);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    },3000);
                }
            }
        }
    },[isStatus]);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusContext.Provider value={[isStatus,setIsStatus]}>
            {children}
        </StatusContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los estatus de un usuario ✔️
export const Status_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isStatusAdd,setIsStatusAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusAddContext.Provider value={[isStatusAdd,setIsStatusAdd]}>
            {children}
        </StatusAddContext.Provider>
    );
}
// Función contexto para controlar los usuarios habilitados/deshabilitados ✔️
export const Status_Enable = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isStatusEnable,setIsStatusEnable] = useState([]);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusEnableContext.Provider value={[isStatusEnable,setIsStatusEnable]}>
            {children}
        </StatusEnableContext.Provider>
    );
}
// ---------- ESTATUS
// ---------- TIPOS DE USUARIOS
// Función contexto para controlar los datos de la base de datos de tipos de usuarios ✔️
export const User_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isUserTypes,setIsUserTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('User-Types');

        socket.on('User-Types',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Tipos de Usuarios obtenidos!...')
                setIsUserTypes(parsedData);
                
            }else{
                console.log('¡Error al desencriptar los usuarios!...');
                setIsUserTypes([]);
            }
        });

        return () => {
            socket.off('User-Types');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserTypesContext.Provider value={[isUserTypes,setIsUserTypes]}>
            {children}
        </UserTypesContext.Provider>
    );
}
// ---------- TIPOS DE USUARIOS