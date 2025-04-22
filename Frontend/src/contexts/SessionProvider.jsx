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

// Función contexto para controlar los datos del usuario activo
export const Logged_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedUser,setIsLoggedUser] = useState(() => {
        const StoredData = sessionStorage.getItem('User');

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
// Función contexto para controlar los datos de los permisos del usuario activo
export const Logged_Permissions = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedPermissions,setIsLoggedPermissions] = useState(() => {
        const StoredData = sessionStorage.getItem('Permissions');

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
// Función contexto para controlar los datos del estatus del usuario activo
export const Logged_Status = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedStatus,setIsLoggedStatus] = useState(() => {
        const StoredData = sessionStorage.getItem('Status');

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
// Función contexto para controlarel el inicio de sesión en la página
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
// Función contexto para controlar el estado activo/inactivo de la sesión en la base de datos
export const Logged_Logged = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    // UseState para controlar el valor del contexto
    const [isLoggedLogged,setIsLoggedLogged] = useState(() => {
        const logged = sessionStorage.getItem('Logged');

        if(logged){
            try{
                if(logged === 'true'){
                    console.log('¡Inicio de sesión cargado correctamente!...');
                    return true;
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return false;
            }
        }
        return false;
    });
    // UseEffect para actualizar datos en la base de datos de la sesión activa/inactiva
    useEffect(() => {
        if(isLoggedLogged && isLoggedUser.length !== 0){
            socket.emit('Status-Log-Update',isLoggedUser.idusuario,isLoggedUser.usuario,1);

            socket.on('Status-Log-Update',(mensaje,usuario) => {
                console.log(mensaje,usuario);
                socket.emit('Status');
            });

            return () => {
                socket.off('Status-Log-Update');
            }
        }
        if(!isLoggedLogged && isLoggedUser.length !== 0){
            socket.emit('Status-Log-Update',isLoggedUser.idusuario,isLoggedUser.usuario,0);

            socket.on('Status-Log-Update',(mensaje,usuario) => {
                console.log(mensaje,usuario);
                socket.emit('Status');
            });

            return () => {
                socket.off('Status-Log-Update');
            }
        }
    },[isLoggedLogged]);
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedLoggedContext.Provider value={[isLoggedLogged,setIsLoggedLogged]}>
            {children}
        </LoggedLoggedContext.Provider>
    );
}
// Función Contexto para controlar el tipo de usuario
export const Logged_Type = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLoggedType,setIsLoggedType] = useState(() => {
        const StoredData = sessionStorage.getItem('Type');

        if(StoredData){
            try{
                console.log('¡Tipo de usuario cargado correctamente!...');
                return StoredData;
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return '';
            }
        }else{
            return '';
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <LoggedTypeContext.Provider value={[isLoggedType,setIsLoggedType]}>
            {children}
        </LoggedTypeContext.Provider>
    );
}