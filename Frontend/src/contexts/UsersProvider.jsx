//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useContext, useState, useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const usersContext = createContext(null);
export const userContext = createContext(null);
export const userAddContext = createContext(null);
export const userEditContext = createContext(null);
export const userDeleteContext = createContext(null);
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
// Función contexto para controlar los datos agregados de un usuario
export const User_Add = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isUserAdd,setIsUserAdd] = useState(false);
    // UseEffect para agregar datos a la base de datos
    
    // Return para darle valor al contexto y heredarlo
    return (
        <userAddContext.Provider value={[isUserAdd,setIsUserAdd]}>
            {children}
        </userAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un usuario
export const User_Edit = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isUserEdit,setIsUserEdit] = useState(false);
    // UseEffect para editar datos a la base de datos
    
    // Return para darle valor al contexto y heredarlo
    return (
        <userEditContext.Provider value={[isUserEdit,setIsUserEdit]}>
            {children}
        </userEditContext.Provider>
    );
}
// Función contexto para controlar los datos eliminados de un usuario
export const User_Delete = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isUserDelete,setIsUserDelete] = useState(false);
    // UseEffect para eliminar datos a la base de datos
    
    // Return para darle valor al contexto y heredarlo
    return (
        <userDeleteContext.Provider value={[isUserDelete,setIsUserDelete]}>
            {children}
        </userDeleteContext.Provider>
    );
}