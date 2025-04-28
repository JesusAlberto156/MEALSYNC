//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useEffect } from "react"
// Servicios
import { io } from "socket.io-client";
// Contextos
export const SocketContext = createContext(null);
//____________IMPORT/EXPORT____________

// Función contexto para controlar la conexión a la base de datos
export const Socket = ({ children }) => {
    // Constante para controlar el valor del contexto
    const socket = io('http://localhost:3500/');
    // UseEffect para cargar el tema de la página
    useEffect(() => {
        sessionStorage.setItem('Theme-Mode',true);
        sessionStorage.setItem('Sidebar',true);
        sessionStorage.setItem('Modal-View','');
        sessionStorage.setItem('Modal',false);
        sessionStorage.setItem('Navbar-View','');
        sessionStorage.setItem('Sidebar-View','');
    },[])
    // Return para darle valor al contexto y heredarlo
    return (
        <SocketContext.Provider value={[socket]}>
            {children}
        </SocketContext.Provider>
    );
}