//____________IMPORT/EXPORT____________
// Hooks de React
import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
// Contextos
import { loggedContext } from "../contexts/SessionProvider";
import { typeUserContext } from "../contexts/VariablesProvider";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteKitchen = () => {
    // Constantes con el valor de los contextos 
    const [isLogged] = useContext(loggedContext);
    const [typeUser] = useContext(typeUserContext);
    // Función del componente
    if(!isLogged) return <Navigate to={'/'}/>;
    return typeUser==='Cook' || typeUser==='Nutritionist' || typeUser==='Doctor' ? <Outlet/> : <Navigate to={'/'}/>;
}