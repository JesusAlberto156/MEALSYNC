import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { loggedContext } from "../contexts/LoggedProvider";
import { permissionContext } from "../contexts/PermissionProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const PrivateRouteKitchen = () => {
    const [isLogged] = useContext(loggedContext)
    const [permission] = useContext(permissionContext);
    const [typeUser] = useContext(typeUserContext);

    if(isLogged){
        if(permission.cocinero || permission.nutriologo || permission.medico){
            if(typeUser === 'Cocinero' || typeUser === 'Nutriologo' || typeUser === 'Medico'){
                return <Outlet/>;
            }else{
                return <Navigate to={'/Login'}/>;
            }
        }else{
            return <Navigate to={'/Login'}/>;
        }
    }else{
        return <Navigate to={'/Login'}/>;
    }
}