//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useContext, useState, useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const usersContext = createContext(null);
export const userContext = createContext(null);
// Contextos personalizados
import { socketContext } from "./SocketProvider";
// Estilos personalizados

//____________IMPORT/EXPORT____________

// Función contexto para controlar los datos de la base de datos de usuarios
export const Users = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isUsers,setIsUsers] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('users');

        socket.on('users',(result) => {
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
            socket.off('users');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <usersContext.Provider value={[isUsers,setIsUsers]}>
            {children}
        </usersContext.Provider>
    );
}
// Función contexto para controlar los datos del usuario activo
export const User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isUser,setIsUser] = useState(() => {
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
        <userContext.Provider value={[isUser,setIsUser]}>
            {children}
        </userContext.Provider>
    );
}