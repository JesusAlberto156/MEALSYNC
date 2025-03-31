//____________IMPORT/EXPORT____________
// Hooks de React
import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { loggedContext } from "../contexts/SessionProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteAdministration = () => {
    // Constantes con el valor de los contextos 
    const [isLogged] = useContext(loggedContext);
    const [typeUser] = useContext(typeUserContext);
    // Función del componente
    if(!isLogged) return <Navigate to={'/Login'}/>;
    return typeUser==='Administrator' || typeUser==='Chef' || typeUser==='Storekeeper' ? <Outlet/> : <Navigate to={'/Login'}/>;
}