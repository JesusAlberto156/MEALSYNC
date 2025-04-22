//____________IMPORT/EXPORT____________
// Hooks de React
import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
// Contextos
import { LoggedLoggedContext,LoggedTypeContext } from "../contexts/SessionProvider";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteKitchen = () => {
    // Constantes con el valor de los contextos 
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // Función del componente
    if(!isLoggedLogged) return <Navigate to={'/'}/>;
    return isLoggedType==='Cook' || isLoggedType==='Nutritionist' || isLoggedType==='Doctor' ? <Outlet/> : <Navigate to={'/'}/>;
}