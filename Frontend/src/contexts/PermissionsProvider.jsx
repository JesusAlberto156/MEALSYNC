//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useContext, useState, useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos

// Contextos personalizados
export const permissionsContext = createContext(null);
export const permissionContext = createContext(null);
// Estilos personalizados
import { socketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Función contexto para controlar los datos de la base de datos de los permisos de los usuarios
export const Permissions = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isPermissions,setIsPermissions] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('permissions');

        socket.on('permissions',(result) => {
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
            socket.off('permissions');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <permissionsContext.Provider value={[isPermissions,setIsPermissions]}>
            {children}
        </permissionsContext.Provider>
    );
}
// Función contexto para controlar los datos de los permisos del usuario activo
export const Permission = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isPermission,setIsPermission] = useState(() => {
        const StoredData = sessionStorage.getItem('Permission');

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
        <permissionContext.Provider value={[isPermission,setIsPermission]}>
            {children}
        </permissionContext.Provider>
    );
}