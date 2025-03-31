//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { loadingOptionLoginContext } from "../contexts/VariablesProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { nameContext,passwordContext,logContext } from "../contexts/SessionProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para cambiar las opciones del login
export const useOptionsLogin = () => {
    // Constantes con el valor de los contextos 
    const [isLoadingOptionLogin,setIsLoadingOptionLogin] = useContext(loadingOptionLoginContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    // Función del hook
    const optionsLogin = (option,type) => {
        setIsLoadingOptionLogin(option);
        if(option === 'Administration' || option === 'Kitchen'){
            setIsName('');
            setIsPassword('');
            setIsTypeUser('');
        }
        if(option === 'Login') setIsTypeUser(type);
    }
    // Retorno de la función del hook
    return optionsLogin;
}
// Hook para iniciar sesión en el login
export const useLogin = () => {
    // Constantes con el valor de los contextos 
    const [isLog,setIsLog] = useContext(logContext);
    // Función del hook
    const login = () => {
        setIsLog(true);
    }
    // Retorno de la función del hook
    return login;
}

