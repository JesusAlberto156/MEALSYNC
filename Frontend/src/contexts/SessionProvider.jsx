//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useState,useEffect,useContext } from "react"

// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const logContext = createContext(null);
export const loggedContext = createContext(null);
// Contextos personalizados
import { socketContext } from "./SocketProvider";
import { userContext } from './UsersProvider';
// Estilos personalizados

//____________IMPORT/EXPORT____________

// Función contexto para controlarel el inicio de sesión en la página
export const Log = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isLog,setIsLog] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <logContext.Provider value={[isLog,setIsLog]}>
            {children}
        </logContext.Provider>
    );
}
// Función contexto para controlar el estado activo/inactivo de la sesión en la base de datos
export const Logged = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
    const [isUser] = useContext(userContext);
    // UseState para controlar el valor del contexto
    const [isLogged,setIsLogged] = useState(() => {
        const logged = sessionStorage.getItem('Logged');

        if(logged){
            try{
                const decryptedData = decryptData(logged);

                if(decryptedData){
                    console.log('¡Inicio de sesión cargado correctamente!...');
                    return true;
                }else{
                    console.log('¡Error al desencriptar datos del sessionStorage!...');
                    return false;
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return false;
            }
        }
        return false;
    });
    // UseEffect para actualizar datos en la base de datos de la sesión activa/inactiva
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
    // Return para darle valor al contexto y heredarlo
    return (
        <loggedContext.Provider value={[isLogged,setIsLogged]}>
            {children}
        </loggedContext.Provider>
    );
}