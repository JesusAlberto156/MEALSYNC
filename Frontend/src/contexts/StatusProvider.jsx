import { createContext, useContext, useState, useEffect } from "react"
import { decryptData } from "../services/Crypto";

export const statusAllContext = createContext(null);
export const statusUserContext = createContext(null);

import { socketContext } from "./SocketProvider";
import { loggedContext,logContext } from "./SessionProvider";
import { userContext } from "./UsersProvider";

export const StatusAll = ({ children }) => {

    const [socket] = useContext(socketContext);
    const [isLogged] = useContext(loggedContext); 
    const [isLog,setIsLog] = useContext(logContext);   
    const [isUser] = useContext(userContext);

    const [isStatusAll,setIsStatusAll] = useState([]);

    useEffect(() => {
        socket.emit('status');

        socket.on('status',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('Estatus de usuarios obtenidos....')
                setIsStatusAll(parsedData);
            }else{
                console.log('Error al desencriptar estatus...');
                setIsStatusAll([]);
            }
        });

        return () => {
            socket.off('status');
        }
    },[]);

    useEffect(() => {
        if(isLogged && isUser !== 0){
            const user = isStatusAll.find(user => user.idusuario === isUser.idusuario);
            if(user){
                if(!user.habilitado){
                    setIsLog(false);
                }
            }
        }
    },[isStatusAll]);

    return (
        <statusAllContext.Provider value={[isStatusAll,setIsStatusAll]}>
            {children}
        </statusAllContext.Provider>
    );
}

export const StatusUser = ({ children }) => {

    const [isStatusUser,setIsStatusUser] = useState(() => {
        const StoredData = sessionStorage.getItem('Status');

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
        <statusUserContext.Provider value={[isStatusUser,setIsStatusUser]}>
            {children}
        </statusUserContext.Provider>
    );
}