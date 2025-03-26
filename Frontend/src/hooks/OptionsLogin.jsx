import { useContext } from "react";
import { loadingOptionLoginContext } from "../contexts/VariablesProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { nameContext,passwordContext,logContext } from "../contexts/SessionProvider";

export const useOptionsLogin = () => {

    const [isLoadingOptionLogin,setIsLoadingOptionLogin] = useContext(loadingOptionLoginContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    
    const optionsLogin = (option,type) => {
        setIsLoadingOptionLogin(option);
        if(option === 'Administration' || option === 'Kitchen'){
            setIsName('');
            setIsPassword('');
            setIsTypeUser('');
        }
        if(option === 'Login') setIsTypeUser(type);
    }

    return optionsLogin;
}

export const useLogin = () => {

    const [isLog,setIsLog] = useContext(logContext);

    const login = async () => {
        setIsLog(true);
    }

    return login;
}

export const useLogout = () => {

    const [isLog,setIsLog] = useContext(logContext);

    const logout = async () => {
        setIsLog(false);
    }

    return logout;
}