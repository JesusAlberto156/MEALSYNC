//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const KeyContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
//____________IMPORT/EXPORT____________

// Contexto de la clave de autorización  ✔️
export const Index_Key = ({children}) => {
    return(
        <Key>   
            {children}        
        </Key>
    );
}

// ---------- CLAVES
// Función contexto para controlar los datos de la clave de autorización ✔️
export const Key = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isKey,setIsKey] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleKey = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Clave de autorización obtenida!');
                    setIsKey(parsedData);
                } else {
                    console.warn('¡Error al desencriptar la clave de autorización!');
                    setIsKey([]);
                }
            } catch (error) {
                console.error('Error al procesar la clave de autorización:', error);
                setIsKey([]);
            }
        }

        socket.emit('Get-Key');
        socket.on('Get-Key',handleKey);

        return () => {
            socket.off('Get-Key',handleKey);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <KeyContext.Provider value={[isKey]}>
            {children}
        </KeyContext.Provider>
    );
}
// ---------- CLAVES