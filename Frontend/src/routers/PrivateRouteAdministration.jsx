import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { loggedContext } from "../contexts/LoggedProvider";
import { permissionContext } from "../contexts/PermissionProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const PrivateRouteAdministration = () => {
    const [isLogged] = useContext(loggedContext)
    const [permission] = useContext(permissionContext);
    const [typeUser] = useContext(typeUserContext);

    if(isLogged){
        if(permission.administrador || permission.almacen || permission.chef){
            if(typeUser === 'Administrador' || typeUser === 'Almacen' || typeUser === 'Chef'){
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