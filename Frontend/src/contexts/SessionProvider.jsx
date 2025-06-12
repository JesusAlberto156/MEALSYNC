//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useState,useEffect,useContext } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const LoggedUserContext = createContext(null);
export const LoggedPermissionsContext = createContext(null);
export const LoggedStatusContext = createContext(null);
export const LoggedLogContext = createContext(null);
export const LoggedLoggedContext = createContext(null);
export const LoggedTypeContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Todos los contextos para controlar los aspectos de inicio de session ✔️
export const Index_Sessions = ({children}) => {
    return(
        <Logged_Type>
            <Logged_User>
                <Logged_Permissions>
                    <Logged_Status>
                        <Logged_Log>
                            <Logged_Logged>
                                {children}
                            </Logged_Logged>
                        </Logged_Log>
                    </Logged_Status>
                </Logged_Permissions>
            </Logged_User>
        </Logged_Type>
    );
}

// Función contexto para controlar los datos del usuario activo ✔️
export const Logged_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedUser,setIsLoggedUser] = useState(() => {
        const StoredData = sessionStorage.getItem('Usuario');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('¡Datos de usuario cargados correctamente!...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('¡Error al desencriptar datos del sessionStorage!...');
                    return [];
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return [];
            }
        }else{
            return [];
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedUserContext.Provider value={[isLoggedUser,setIsLoggedUser]}>
            {children}
        </LoggedUserContext.Provider>
    );
}
// Función contexto para controlar los datos de los permisos del usuario activo ✔️
export const Logged_Permissions = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedPermissions,setIsLoggedPermissions] = useState(() => {
        const StoredData = sessionStorage.getItem('Permisos');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('¡Permisos del usuario cargados correctamente!...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('¡Error al desencriptar datos del sessionStorage!...');
                    return [];
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return [];
            }
        }else{
            return [];
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedPermissionsContext.Provider value={[isLoggedPermissions,setIsLoggedPermissions]}>
            {children}
        </LoggedPermissionsContext.Provider>
    );
}
// Función contexto para controlar los datos del estatus del usuario activo ✔️
export const Logged_Status = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedStatus,setIsLoggedStatus] = useState(() => {
        const StoredData = sessionStorage.getItem('Estatus');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('¡Estatus del usuario cargados correctamente!...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('¡Error al desencriptar datos del sessionStorage!...');
                    return [];
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return [];
            }
        }else{
            return [];
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedStatusContext.Provider value={[isLoggedStatus,setIsLoggedStatus]}>
            {children}
        </LoggedStatusContext.Provider>
    );
}
// Función contexto para controlarel el inicio de sesión en la página ✔️
export const Logged_Log = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isLoggedLog,setIsLoggedLog] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedLogContext.Provider value={[isLoggedLog,setIsLoggedLog]}>
            {children}
        </LoggedLogContext.Provider>
    );
}
// Función contexto para controlar el estado activo/inactivo de la sesión en la base de datos ✔️
export const Logged_Logged = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedStatus] = useContext(LoggedStatusContext);
    // UseState para controlar el valor del contexto
    const [isLoggedLogged,setIsLoggedLogged] = useState(() => {
        const logged = sessionStorage.getItem('Sesión') === 'true';
        if(logged){
            console.log('¡Inicio de sesión cargado correctamente!...');
        }
        return logged
    });
    // UseEffect para actualizar datos en la base de datos de la sesión activa/inactiva
    useEffect(() => {
        if(isLoggedLogged && isLoggedUser.length !== 0){
            if(sessionStorage.getItem('Login') === 'true') return
            socket.emit('Update-Status-Log',isLoggedUser.idusuario,isLoggedStatus.idestatus,1);
        }
        if(!isLoggedLogged && isLoggedUser.length !== 0){
            socket.emit('Update-Status-Log',isLoggedUser.idusuario,isLoggedStatus.idestatus,0);
        }
    },[isLoggedLogged]);
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedLoggedContext.Provider value={[isLoggedLogged,setIsLoggedLogged]}>
            {children}
        </LoggedLoggedContext.Provider>
    );
}
// Función Contexto para controlar el tipo de usuario ✔️
export const Logged_Type = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedType,setIsLoggedType] = useState(() => {
        const type = sessionStorage.getItem('Tipo de usuario');
        if(type !== null){
            console.log('¡Tipo de usuario cargado correctamente!...');
        }
        return type || '';
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedTypeContext.Provider value={[isLoggedType,setIsLoggedType]}>
            {children}
        </LoggedTypeContext.Provider>
    );
}