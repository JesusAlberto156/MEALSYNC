//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useEffect,useContext,useState } from "react"
// Servicios
import { io } from "socket.io-client";
import { decryptData } from "../services/Crypto";
// Contextos
export const SocketContext = createContext(null);
export const LogsContext = createContext(null);
export const LogAddContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función contexto para controlar la conexión a la base de datos ✔️
export const Socket = ({ children }) => {
    // Constante para controlar el valor del contexto
    const socket = io('http://localhost:3500/');
    // Return para darle valor al contexto y heredarlo
    return (
        <SocketContext.Provider value={[socket]}>
            {children}
        </SocketContext.Provider>
    );
}
// Función contexto para controlar los datos del historial de registros de la base de datos ✔️
export const Logs = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isLogs,setIsLogs] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleLogs = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Registros obtenidos!...');
                    setIsLogs(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los registros!...');
                    setIsLogs([]);
                }
            } catch (error) {
                console.error('Error al procesar los registros:', error);
                setIsLogs([]);
            }
        }

        socket.emit('Get-Logs');
        socket.on('Get-Logs',handleLogs);

        return () => {
            socket.off('Get-Logs',handleLogs);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <LogsContext.Provider value={[isLogs,setIsLogs]}>
            {children}
        </LogsContext.Provider>
    );
}
// Función contexto para controlar los datos agregados del historial de registros de la base de datos ✔️
export const Log_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isLogAdd,setIsLogAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <LogAddContext.Provider value={[isLogAdd,setIsLogAdd]}>
            {children}
        </LogAddContext.Provider>
    );
}