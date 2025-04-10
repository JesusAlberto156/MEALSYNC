//____________IMPORT/EXPORT____________
// Hooks de React
import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
// Contextos
import { loggedContext } from "../contexts/SessionProvider";
import { typeUserContext } from "../contexts/VariablesProvider";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteAdministration = () => {
    // Constantes con el valor de los contextos 
    const [isLogged] = useContext(loggedContext);
    const [isTypeUser] = useContext(typeUserContext);
    // Función del componente
    if(!isLogged) return <Navigate to={'/'}/>;
    return isTypeUser==='Administrator' || isTypeUser==='Chef' || isTypeUser==='Storekeeper' ? <Outlet/> : <Navigate to={'/'}/>;
}