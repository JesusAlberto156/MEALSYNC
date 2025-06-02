//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext } from "react"
// Servicios
import { io } from "socket.io-client";
// Contextos
export const SocketContext = createContext(null);
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