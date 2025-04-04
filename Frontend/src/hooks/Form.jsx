import { useContext } from "react";

import { logContext } from "../contexts/SessionProvider";

import { nameContext,passwordContext,selectContext,radioContext } from "../contexts/FormsProvider";
import { usersContext,userContext } from "../contexts/UsersProvider";
import { statusAllContext } from '../contexts/StatusProvider';
import { formComprobationContext,actionBlockContext } from "../contexts/VariablesProvider";

import { Alert_Verification } from "../components/styled/Alerts";

// Hook para empezar el inicio de sesión en el formulario de login
export const useChangeLog = () => {
    // Constantes con el valor de los contextos 
    const [isLog,setIsLog] = useContext(logContext);
    // Función del hook
    const changeLog = () => {
        setIsLog(!isLog);
    }
    // Retorno de la función del hook
    return changeLog;
}

export const useFilteredRecordsHasStatus = () => {

    const [isUsers] = useContext(usersContext);
    const [isStatusAll] = useContext(statusAllContext);

    const filteredRecordsHasStatus = isUsers.filter((data) => {
        return !isStatusAll.some(status => status.idusuario === data.idusuario);
    });

    return filteredRecordsHasStatus;
}

export const useHandleSelectChange = () => {

    const [isSelect,setIsSelect] = useContext(selectContext);

    const handleSelectChange = (selectOption) => {
        setIsSelect(selectOption);
    }

    return handleSelectChange;
}

export const useHandleRadioChange = () => {

    const [isRadio,setIsRadio] = useContext(radioContext);
    
    const handleRadioChange = (radioOption) => {
        setIsRadio(radioOption.target.value);
    }

    return handleRadioChange;
}

export const useComprobation = () => {

    const [isName] = useContext(nameContext);
    const [isPassowrd] = useContext(passwordContext);
    const [isUser] = useContext(userContext);
    const [isComprobation,setIsComprobation] = useContext(formComprobationContext);
    const [isBlock,setIsBlock] = useContext(actionBlockContext);

    const comprobation = async () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setIsBlock(true);
                setTimeout(() => {
                    if(isUser.length !== 0){
                        if(isName === ''){
                            setIsBlock(false);
                            reject('¡Falta escribir el nombre de usuario!...');
                        }
                        if(isPassowrd === ''){
                            setIsBlock(false);
                            reject('¡Falta escribir la contraseña!...')
                        }
                        if(isName === isUser.usuario && isPassowrd === isUser.contrasena){
                            resolve('¡Bienvenido(a), puede proceder con la acción!...');
                            setIsComprobation(true);
                        }else{
                            setIsBlock(false);
                            reject('¡Nombre de usuario o contraseña incorrectos!...');
                        }
                    }
                },1000);
            } catch (error) {
                setIsBlock(false);
                reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Verificando datos...');
    }

    return comprobation;
}