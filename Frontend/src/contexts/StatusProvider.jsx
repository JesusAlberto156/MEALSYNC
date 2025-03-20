import { createContext, useContext, useState, useEffect } from "react"
import { decryptData } from "../services/Crypto";

import { socketContext } from "./SocketProvider";

export const statusAllContext = createContext(null);
export const statusUserContext = createContext(null);

export const StatusAll = ({ children }) => {

    const [socket] = useContext(socketContext);

    const [statusAll,setStatusAll] = useState(() => {
        const StoredData = sessionStorage.getItem('StatusAll');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Estatus de usuarios cargados correctamente...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('Error al desencriptar los estatus...');
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

    useEffect(() => {
        const StoredData = sessionStorage.getItem('StatusAll');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Estatus de usuarios cargados correctamente...');
                    setStatusAll(decryptedData);
                }else{
                    console.log('Error al desencriptar los estatus...');
                    setStatusAll([]);
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                setStatusAll([]);
            }
        }else{
            socket.emit('status');

            socket.on('status',(result) => {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    sessionStorage.setItem('StatusAll',result);
                    setStatusAll(parsedData);
                }else{
                    console.log('Error al desencriptar estatus...');
                    setStatusAll([]);
                }
            });
        }

        return () => {
            socket.off('status');
        }

    },[socket]);

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
                    console.log('Estatus de sesión cargados correctamente...');
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