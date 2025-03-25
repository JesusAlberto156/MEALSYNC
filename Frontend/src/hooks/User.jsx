import { useContext } from "react";
import { enableUserContext,enableContext } from "../contexts/SessionProvider";
import { userContext } from "../contexts/UsersProvider";

export const useEnable = () => {

    const [enableUser,setEnableUser] = useContext(enableUserContext);

    const enable = async () => {
        setEnableUser([]);
    }

    return enable;
}

export const useDisable = () => {

    const [enableUser,setEnableUser] = useContext(enableUserContext);
    const [isEnable,setIsEnable] = useContext(enableContext);
    const [user] = useContext(userContext);

    const disable = async () => {
        if(enableUser.idusuario === user.idusuario){
            setIsEnable(null);
        }else{
            setEnableUser([]);
        }
    }

    return disable;
}