//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { LoggedLogContext,LoggedUserContext } from "../contexts/SessionProvider";
import { TextFieldsUserContext } from "../contexts/FormsProvider";
import { VerificationBlockContext,FunctionBlockContext,ActionBlockContext } from "../contexts/VariablesProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para empezar el inicio de sesión en el formulario de login o cerrar sesión ✔️
export const HandleLoggedLog = () => {
    // Constantes con el valor de los contextos 
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleLoggedLog = () => {
        setIsLoggedLog(!isLoggedLog);
        setIsActionBlock(false);
    }
    // Retorno de la función del hook
    return handleLoggedLog;
}
// Hook para comprobar el inicio de sesión ✔️
export const HandleVerificationBlock = () => {
    // Constantes con el valor de los contextos 
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    // Función del hook
    const handleVerificationBlock = () => {
        const promise = new Promise((resolve,reject) => {
            try{
                setIsVerificationBlock(true);
                setTimeout(() => {
                    if(isLoggedUser.length !== 0){
                        if(isTextFieldsUser.usuario === '' || isTextFieldsUser.contrasena === ''){
                            setIsVerificationBlock(false);
                            return reject('¡Falta escribir el nombre de usuario o la contraseña del usuario!');
                        }
                        if(isTextFieldsUser.usuario === isLoggedUser.usuario && isTextFieldsUser.contrasena === isLoggedUser.contrasena){
                            setIsFunctionBlock(true);
                            sessionStorage.setItem('Verificación del Bloqueo',true);
                            sessionStorage.setItem('Función del Bloqueo',true);
                            return resolve('¡Bienvenido(a), puede proceder con la acción!');
                        }else{
                            setIsVerificationBlock(false);
                            return reject('¡Nombre de usuario o contraseña incorrectos!');
                        }
                    }
                },1000);
            } catch (e) {
                setIsVerificationBlock(false);
                return reject('¡Ocurrio un error inseperado!');
            }
        });

        return Alert_Sonner_Promise(promise,'¡Verificando datos!','1');
    }
    // Retorno de la función del hook
    return handleVerificationBlock;
}