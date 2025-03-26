import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";

import { loggedContext } from "../contexts/SessionProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const PrivateRouteAdministration = () => {

    const [isLogged] = useContext(loggedContext);
    const [typeUser] = useContext(typeUserContext);

    if(!isLogged) return <Navigate to={'/Login'}/>;
    return typeUser==='Administrador' || typeUser==='Chef' || typeUser==='Almacen' ? <Outlet/> : <Navigate to={'/Login'}/>;
}