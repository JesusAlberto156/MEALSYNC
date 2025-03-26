import { createContext, useContext, useState, useEffect } from "react"
import { decryptData } from "../services/Crypto";

export const usersContext = createContext(null);
export const userContext = createContext(null);

import { socketContext } from "./SocketProvider";

export const Users = ({ children }) => {

    const [socket] = useContext(socketContext);

    const [isUsers,setIsUsers] = useState([]);

    useEffect(() => {
        socket.emit('users');

        socket.on('users',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('Usuarios obtenidos...')
                setIsUsers(parsedData);
                
            }else{
                console.log('Error al desencriptar usuarios...');
                setIsUsers([]);
            }
        });

        return () => {
            socket.off('users');
        }
    },[]);

    return (
        <usersContext.Provider value={[isUsers,setIsUsers]}>
            {children}
        </usersContext.Provider>
    );
}

export const User = ({ children }) => {

    const [isUser,setIsUser] = useState(() => {
        const StoredData = sessionStorage.getItem('User');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Credenciales cargadas correctamente...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('Error al desencriptar las credenciales...');
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
        <userContext.Provider value={[isUser,setIsUser]}>
            {children}
        </userContext.Provider>
    );
}