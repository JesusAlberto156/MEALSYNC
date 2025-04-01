import { useContext } from "react";

import { usersContext,userContext } from "../contexts/UsersProvider";
import { statusAllContext } from '../contexts/StatusProvider';
import { selectContext,radioContext,comprobationContext } from "../contexts/VariablesProvider";
import { nameContext,passwordContext } from "../contexts/SessionProvider";

import { Alert_Verification } from "../components/styled/Alerts";

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
    const [isComprobation,setIsComprobation] = useContext(comprobationContext);

    const comprobation = async () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setTimeout(() => {
                    if(isUser.length !== 0){
                        if(isName === ''){
                            reject('¡Falta escribir el nombre de usuario!...');
                        }
                        if(isPassowrd === ''){
                            reject('¡Falta escribir la contraseña!...')
                        }
                        if(isName === isUser.usuario && isPassowrd === isUser.contrasena){
                            resolve('¡Bienvenido(a), puede proceder con la acción!...');
                            setIsComprobation(true);
                        }else{
                            reject('¡Nombre de usuario o contraseña incorrectos!...')
                        }
                    }
                },1000);
            } catch (error) {
                reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Verificando datos...')
    }

    return comprobation;
}