import { createContext, useState,useEffect, useContext } from "react"
import { decryptData } from "../services/Crypto";

import { socketContext } from "./SocketProvider";
import { statusAllContext,statusUserContext } from "./StatusProvider";

export const loggedContext = createContext(null);
export const enableContext = createContext(null);
export const nameContext = createContext(null);
export const passwordContext = createContext(null);

export const Logged = ({ children }) => {

    const [statusAll,setStatusAll] = useContext(statusAllContext);
    const [statusUser,setStatusUser] = useContext(statusUserContext);

    const [socket] = useContext(socketContext);

    const [isLogged,setIsLogged] = useState(() => {
        const logged = sessionStorage.getItem('Logged');

        if(logged){
            try{
                const decryptedData = decryptData(logged);

                if(decryptedData){
                    console.log('Inicio de sesión cargado correctamente.');
                    return true;
                }else{
                    console.log('Error al desencriptar datos almacenados.');
                    return false;
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return false;
            }
        }
        return false;
    });

    useEffect(() => {
        if(statusUser && statusUser.length > 0 && statusUser[0].idusuario){
            if(!isLogged){
                socket.emit('statusLogout',statusUser.idusuario)

                socket.on('statusLogout',(result) => {
                    console.log('Sesión desactivada:', result);
                    
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

                return () => {
                    socket.off('statusLogout');
                };
            }else{
                socket.emit('statusLogin',statusUser.idusuario)

                socket.on('statusLogoin',(result) => {
                    console.log('Sesión activada:', result);
                    
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

                return () => {
                    socket.off('statusLogin');
                };
            }
        }
    },[isLogged]);

    return (
        <loggedContext.Provider value={[isLogged,setIsLogged]}>
            {children}
        </loggedContext.Provider>
    );
}

export const Enable = ({ children }) => {

    const [isEnable,setIsEnable] = useState(() => {
        const enable = sessionStorage.getItem('Enable');

        if(enable){
            try{
                const decryptedData = decryptData(enable);

                if(decryptedData){
                    console.log('Estado de sesión cargado correctamente.');
                    if(decryptedData === 'false'){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    console.log('Error al desencriptar datos almacenados.');
                    return false;
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return false;
            }
        }
        return false;
    });

    return (
        <enableContext.Provider value={[isEnable,setIsEnable]}>
            {children}
        </enableContext.Provider>
    );
}

export const Name = ({ children }) => {

    const [name,setName] = useState('');

    return (
        <nameContext.Provider value={[name,setName]}>
            {children}
        </nameContext.Provider>
    );
}

export const Password = ({ children }) => {

    const [password,setPassword] = useState('');

    return (
        <passwordContext.Provider value={[password,setPassword]}>
            {children}
        </passwordContext.Provider>
    );
}