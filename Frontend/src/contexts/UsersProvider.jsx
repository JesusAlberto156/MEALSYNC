import { createContext, useContext, useState, useEffect } from "react"
import { decryptData } from "../services/Crypto";

import { socketContext } from "./SocketProvider";

export const usersContext = createContext(null);
export const userContext = createContext(null);

export const Users = ({ children }) => {

    const [socket] = useContext(socketContext);

    const [users,setUsers] = useState([]);

    useEffect(() => {

        setTimeout(()=>{
        },2000)
        const StoredData = sessionStorage.getItem('Users');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Usuarios cargados correctamente...');
                    setUsers(JSON.parse(decryptedData));
                }else{
                    console.log('Error al desencriptar los usuarios...');
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                setUsers([]);
            }
        }else{
            socket.emit('users');

            socket.on('users',(result) => {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    sessionStorage.setItem('Users',result);
                    setUsers(parsedData);
                    
                }else{
                    console.log('Error al desencriptar usuarios...');
                    setUsers([]);
                }
            });
        }

        return () => {
            socket.off('users');
        }

    },[socket]);

    return (
        <usersContext.Provider value={[users,setUsers]}>
            {children}
        </usersContext.Provider>
    );
}

export const User = ({ children }) => {

    const [user,setUser] = useState(() => {
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
        <userContext.Provider value={[user,setUser]}>
            {children}
        </userContext.Provider>
    );
}