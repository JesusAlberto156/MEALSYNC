import { createContext, useState,useEffect, useContext } from "react"
import { decryptData } from "../services/Crypto";

import { socketContext } from "./SocketProvider";
import { userContext } from './UsersProvider';

export const loggedContext = createContext(null);
export const enableContext = createContext(null);
export const nameContext = createContext(null);
export const passwordContext = createContext(null);

export const Logged = ({ children }) => {

    const [socket] = useContext(socketContext);
    const [user] = useContext(userContext);
    const [isLogged,setIsLogged] = useState(() => {
        const logged = sessionStorage.getItem('Logged');

        if(logged){
            try{
                const decryptedData = decryptData(logged);

                if(decryptedData){
                    console.log('Inicio de sesión cargado correctamente...');
                    return true;
                }else{
                    console.log('Error al desencriptar datos almacenados...');
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
        if(isLogged){
            socket.emit('statusLogin',user.idusuario,user.usuario);

            socket.on('statusLogin',(mensaje,usuario) => {
                console.log(mensaje,usuario);
                socket.emit('status');
            });

            return () => {
                socket.off('statusLogin');
            }
        }else{
            socket.emit('statusLogout',user.idusuario,user.usuario);

            socket.on('statusLogout',(mensaje,usuario) => {
                console.log(mensaje,usuario);
                socket.emit('status');
            });

            return () => {
                socket.off('statusLogout');
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

    const [isLogged] = useContext(loggedContext);
    const [isEnable,setIsEnable] = useState(() => {
        const enable = sessionStorage.getItem('Enable');

        if(enable){
            try{
                const decryptedData = decryptData(enable);

                if(decryptedData){
                    console.log('Estado de sesión cargado correctamente...');
                    if(decryptedData === 'false'){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    console.log('Error al desencriptar datos almacenados...');
                    return null;
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        if(isLogged){
            if(isEnable){
                
            }else{

            }
        }
    },[isEnable])

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