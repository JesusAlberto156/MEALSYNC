import { createContext, useState,useEffect,useContext } from "react"
import { decryptData } from "../services/Crypto";

export const logContext = createContext(null);
export const loggedContext = createContext(null);

import { socketContext } from "./SocketProvider";
import { userContext } from './UsersProvider';

export const Log = ({children}) => {

    const [isLog,setIsLog] = useState(() => {
        const log = sessionStorage.getItem('Log');

        if(log){
            try{
                const decryptedData = decryptData(log);

                if(decryptedData){
                    console.log('Sesión cargada correctamente...');
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

    return (
        <logContext.Provider value={[isLog,setIsLog]}>
            {children}
        </logContext.Provider>
    );
}

export const Logged = ({ children }) => {

    const [socket] = useContext(socketContext);
    const [isUser] = useContext(userContext);

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
        if(isLogged && isUser.length !== 0){
            socket.emit('statusLogin',isUser.idusuario,isUser.usuario);

            socket.on('statusLogin',(mensaje,usuario) => {
                console.log(mensaje,usuario);
                socket.emit('status');
            });

            return () => {
                socket.off('statusLogin');
            }
        }else if(!isLogged && isUser.length !== 0){
            socket.emit('statusLogout',isUser.idusuario,isUser.usuario);

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