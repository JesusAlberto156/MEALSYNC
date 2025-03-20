import { createContext, useContext, useState, useEffect } from "react"
import { decryptData } from "../services/Crypto";

import { socketContext } from "./SocketProvider";

export const permissionsContext = createContext(null);
export const permissionContext = createContext(null);

export const Permissions = ({ children }) => {

    const [socket] = useContext(socketContext);
    
    const [permissions,setPermissions] = useState([]);

    useEffect(() => {
        const StoredData = sessionStorage.getItem('Permissions');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Permisos de usuarios cargados correctamente...');
                    setPermissions(JSON.parse(decryptedData));
                }else{
                    console.log('Error al desencriptar los permisos...');
                    setPermissions([]);
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                setPermissions([]);
            }
        }else{
            socket.emit('permissions');

            socket.on('permissions',(result) => {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    sessionStorage.setItem('Permissions',result);
                    setPermissions(parsedData);
                }else{
                    console.log('Error al desencriptar permisos...');
                    setPermissions([]);
                }
            });
        }

        return () => {
            socket.off('permissions');
        }

    },[socket]);

    return (
        <permissionsContext.Provider value={[permissions,setPermissions]}>
            {children}
        </permissionsContext.Provider>
    );
}

export const Permission = ({ children }) => {

    const [permission,setPermission] = useState(() => {
        const StoredData = sessionStorage.getItem('Permission');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Permisos de la sesión cargados correctamente...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('Error al desencriptar los permisos de la sesión...');
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

    return (
        <permissionContext.Provider value={[permission,setPermission]}>
            {children}
        </permissionContext.Provider>
    );
}