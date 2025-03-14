import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
import { loggedContext } from "../contexts/LoggedProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const PrivateRouteAdministration = () => {
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [typeUser,setTypeUser] = useContext(typeUserContext);

    if(!isLogged) return <Navigate to={'/Login'}/>;
    return typeUser==='Administrador' || typeUser==='Chef' || typeUser==='Almacen' ? <Outlet/> : <Navigate to={'/Login'}/>;
}