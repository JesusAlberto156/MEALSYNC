import { useContext } from "react";
import { loginContext } from "../contexts/VariablesProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { nameContext,passwordContext } from "../contexts/SessionProvider";

export const useOptionsLogin = () => {

    const {
        loadingOption, isLoadingOption,
        loadingAdministration, isLoadingAdministration,
        loadingKitchen, isLoadingKitchen,
        loadingLogin, isLoadingLogin,
        loadingLoginAdministration, isLoadingLoginAdministration,
        loadingLoginKitchen, isLoadingLoginKitchen
    } = useContext(loginContext);

    const [typeUser,setTypeUser] = useContext(typeUserContext);
    const [name,setName] = useContext(nameContext);
    const [password,setPassword] = useContext(passwordContext);
    
    const useOptionTypeUsers = (type) => {
        if(type === 'Administracion'){
            isLoadingAdministration(!loadingAdministration);
        }else{
            isLoadingKitchen(!loadingKitchen);
        }
        isLoadingOption(!loadingOption);
    }
    const useOptionUsers = (type,user) => {
        if(type === 'Administracion'){
            isLoadingLoginAdministration(!loadingLoginAdministration);
            isLoadingAdministration(!loadingAdministration);
        }else{
            isLoadingLoginKitchen(!loadingLoginKitchen);
            isLoadingKitchen(!loadingKitchen);
        }
        isLoadingLogin(!loadingLogin);
        setTypeUser(user);
    }
    const useBackLogin = (type) => {
        if(type === 'Administracion'){
            isLoadingLoginAdministration(!loadingLoginAdministration);
            isLoadingAdministration(!loadingAdministration);
        }else{
            isLoadingLoginKitchen(!loadingLoginKitchen);
            isLoadingKitchen(!loadingKitchen);
        }
        isLoadingLogin(!loadingLogin);
        setTypeUser('');
        setName('');
        setPassword('');
    }

    return { useOptionTypeUsers,useOptionUsers,useBackLogin }
}