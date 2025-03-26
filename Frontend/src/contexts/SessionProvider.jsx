import { createContext, useState,useEffect,useContext } from "react"
import { decryptData } from "../services/Crypto";

export const logContext = createContext(null);
export const loggedContext = createContext(null);
export const enableContext = createContext(null);
export const nameContext = createContext(null);
export const passwordContext = createContext(null);

import { socketContext } from "./SocketProvider";
import { userContext,usersContext } from './UsersProvider';

export const Log = ({children}) => {

    const [isLog,setIsLog] = useState(null);

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

export const Enable = ({ children }) => {
    
    const [isUsers] = useContext(usersContext);
    const [socket] = useContext(socketContext);

    const [isEnable,setIsEnable] = useState([]);

    useEffect(() => {
        if(isEnable.length !== 0){
            const enable = isUsers.find(user => user.idusuario === isEnable.idusuario);
            if(isEnable.habilitado){
                if(enable){
                    socket.emit('statusDisable',isEnable.idusuario,enable.usuario);

                    socket.on('statusDisable',(message,user) => {
                        console.log(message,user);
                        socket.emit('status');
                    });

                    return () => {
                        socket.off('statusDisable');
                    }
                }
            }else if(!isEnable.habilitado){
                if(enable){
                    socket.emit('statusEnable',isEnable.idusuario,enable.usuario);

                    socket.on('statusEnable',(message,user) => {
                        console.log(message,user);              
                        socket.emit('status');
                    });

                    return () => {
                        socket.off('statusEnable');
                    }
                }
            }
        }
    },[isEnable]);

    return (
        <enableContext.Provider value={[isEnable,setIsEnable]}>
            {children}
        </enableContext.Provider>
    );
}

export const Name = ({ children }) => {

    const [isName,setIsName] = useState('');

    return (
        <nameContext.Provider value={[isName,setIsName]}>
            {children}
        </nameContext.Provider>
    );
}

export const Password = ({ children }) => {

    const [isPassword,setIsPassword] = useState('');

    return (
        <passwordContext.Provider value={[isPassword,setIsPassword]}>
            {children}
        </passwordContext.Provider>
    );
}