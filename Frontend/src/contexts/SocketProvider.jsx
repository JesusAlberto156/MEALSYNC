//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext } from "react"
// Servicios
import { io } from "socket.io-client";
// Contextos
export const socketContext = createContext(null);
// Contextos personalizados

// Estilos personalizados

//____________IMPORT/EXPORT____________

// Función contexto para controlar la conexión a la base de datos
export const Socket = ({ children }) => {
    // Constante para controlar el valor del contexto
    const socket = io('http://localhost:3600/');
    // Return para darle valor al contexto y heredarlo
    return (
        <socketContext.Provider value={[socket]}>
            {children}
        </socketContext.Provider>
    );
}