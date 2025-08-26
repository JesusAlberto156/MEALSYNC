//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
// Service
import { socket } from "../services/Socket";
// Estilos personalizados
import { Alert_Sonner_Error } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteServer = () => {
    const [redirect,setredirect] = useState(false);
    const [status, setStatus] = useState({
        connected: socket.connected,
        expired: false,
    });

    useEffect(() => {
        let timeoutId; 

        timeoutId = setTimeout(() => {
            if (!socket.connected) {
                Alert_Sonner_Error('¡Servidor desconectado!');
                setredirect(true);
            }
        }, 500);

        const handleConnect = () => setStatus({ connected: true, expired: false });

        const handleDisconnect = () => {
            setStatus({ connected: false, expired: false });
            Alert_Sonner_Error('¡Servidor desconectado!');
            timeoutId = setTimeout(() => setredirect(true),3000);
        }

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            clearTimeout(timeoutId);
        };
    }, []);

    // Redirige si está desconectado o la sesión expiró
    if (!status.connected && redirect) {
        return <Navigate to="/Disconect" replace />;
    }

    return <Outlet />;
}