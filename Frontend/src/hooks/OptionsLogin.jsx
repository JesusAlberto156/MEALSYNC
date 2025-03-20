import { useContext } from "react";
import { loginContext } from "../contexts/VariablesProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

export const useOptionsLogin = ({ setName,setPassword}) => {

    const {
        loadingOption, isLoadingOption,
        loadingAdministration, isLoadingAdministration,
        loadingKitchen, isLoadingKitchen,
        loadingLogin, isLoadingLogin,
        loadingLoginAdministration, isLoadingLoginAdministration,
        loadingLoginKitchen, isLoadingLoginKitchen
    } = useContext(loginContext);

    const [typeUser,setTypeUser] = useContext(typeUserContext);

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