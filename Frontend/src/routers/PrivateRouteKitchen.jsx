import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
import { loggedContext } from "../contexts/SessionProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const PrivateRouteKitchen = () => {
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [typeUser,setTypeUser] = useContext(typeUserContext);

    if(!isLogged) return <Navigate to={'/Login'}/>;
    return typeUser==='Cocinero' || typeUser==='Nutriologo' || typeUser==='Medico' ? <Outlet/> : <Navigate to={'/Login'}/>;
}