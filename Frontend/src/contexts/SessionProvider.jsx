import { createContext, useState,useEffect,useContext } from "react"
import { decryptData } from "../services/Crypto";

import { socketContext } from "./SocketProvider";
import { userContext,usersContext } from './UsersProvider';

export const loggedContext = createContext(null);
export const enableUserContext = createContext(null);
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
        if(isLogged && user.length !== 0){
            socket.emit('statusLogin',user.idusuario,user.usuario);

            socket.on('statusLogin',(mensaje,usuario) => {
                console.log(mensaje,usuario);
                socket.emit('status');
            });

            return () => {
                socket.off('statusLogin');
            }
        }else if(user.length !== 0){
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

export const EnableUser = ({ children }) => {
    
    const [users] = useContext(usersContext);
    const [socket] = useContext(socketContext);

    const [enableUser,setEnableUser] = useState([]);

    useEffect(() => {
        if(enableUser.length !== 0){
            if(enableUser.habilitado){
                const userEnable = users.find(user => user.idusuario === enableUser.idusuario);
                if(userEnable){
                    socket.emit('statusDisable',enableUser.idusuario,userEnable.usuario);

                    socket.on('statusDisable',(message,user) => {
                        console.log(message,user);
                        socket.emit('status');
                    });

                    return () => {
                        socket.off('statusDisable');
                    }
                }
            }else{
                const userEnable = users.find(user => user.idusuario === enableUser.idusuario);
                if(userEnable){
                    socket.emit('statusEnable',enableUser.idusuario,userEnable.usuario);

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
    },[enableUser]);

    return (
        <enableUserContext.Provider value={[enableUser,setEnableUser]}>
            {children}
        </enableUserContext.Provider>
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