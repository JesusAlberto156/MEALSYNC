import { createContext, useContext, useState, useEffect } from "react"
import { decryptData } from "../services/Crypto";

import { socketContext } from "./SocketProvider";
import { loggedContext } from "./SessionProvider";
import { userContext } from "./UsersProvider";

export const statusAllContext = createContext(null);
export const statusUserContext = createContext(null);

export const StatusAll = ({ children }) => {

    const [socket] = useContext(socketContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);    
    const [isUser] = useContext(userContext);

    const [statusAll,setStatusAll] = useState([]);

    useEffect(() => {
        socket.emit('status');

        socket.on('status',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('Estatus de usuarios obtenidos....')
                setStatusAll(parsedData);
            }else{
                console.log('Error al desencriptar estatus...');
                setStatusAll([]);
            }
        });

        return () => {
            socket.off('status');
        }
    },[]);

    useEffect(() => {
        if(isLogged && isUser !== 0){
            const user = statusAll.find(user => user.idusuario === isUser.idusuario);
            if(user){
                if(!user.habilitado){
                    setIsLogged(false);
                }
            }
        }
    },[statusAll]);

    return (
        <statusAllContext.Provider value={[statusAll,setStatusAll]}>
            {children}
        </statusAllContext.Provider>
    );
}

export const StatusUser = ({ children }) => {

    const [statusUser,setStatusUser] = useState(() => {
        const StoredData = sessionStorage.getItem('StatusUser');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Estatus de la sesión cargados correctamente...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('Error al desencriptar el estatus de la sesión...');
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
        <statusUserContext.Provider value={[statusUser,setStatusUser]}>
            {children}
        </statusUserContext.Provider>
    );
}