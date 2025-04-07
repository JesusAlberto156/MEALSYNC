//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { logContext } from "../contexts/SessionProvider";
import { nameContext,passwordContext,selectContext,radioContext,checkboxContext } from "../contexts/FormsProvider";
import { usersContext,userContext } from "../contexts/UsersProvider";
import { permissionsContext } from "../contexts/PermissionsProvider";
import { statusAllContext,statusAddContext,statusEnableContext } from '../contexts/StatusProvider';
import { formComprobationContext,actionBlockContext,selectedRowContext } from "../contexts/VariablesProvider";
import { navbarViewContext,sidebarViewContext,modalViewContext } from "../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para empezar el inicio de sesión en el formulario de login o cerrar sesión
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
// Hook para agregar un estatus a un usuario desde el modal
export const useChangePermissionAdd = () => {
    // Constantes con el valor de los contextos 
    
    const [isSelectedRow] = useContext(selectedRowContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView] = useContext(modalViewContext);
    // Función del hook
    const changePermissionAdd = () => {
        if(currentNView === 'Status' && currentSView === 'Users' && currentMView === 'Permissions-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActiveBlock(true);
                    setTimeout(() => {
                        if(isSelect.length === 0){
                            setIsActiveBlock(false);
                            reject('¡No ha seleccionado un usuario!...')
                            return
                        };
                        if(isRadio === ''){
                            setIsActiveBlock(false);
                            reject('¡No ha seleccionado un estado!...')
                            return
                        };

                        resolve('¡Campos verificados!...');
                        
                        setTimeout(() => {
                            setIsStatusAdd(true);
                        },500)
                    },1000);
                }catch(error){
                    setIsActiveBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando campos!...');
        }
    }
    // Retorno de la función del hook
    return changePermissionAdd;
}
// Hook para agregar un estatus a un usuario desde el modal
export const useChangeStatusSAdd = () => {
    // Constantes con el valor de los contextos 
    const [isStatusAdd,setIsStatusAdd] = useContext(statusAddContext);
    const [isSelect] = useContext(selectContext);
    const [isRadio] = useContext(radioContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView] = useContext(modalViewContext);
    const [isActiveBlock,setIsActiveBlock] = useContext(actionBlockContext);
    // Función del hook
    const changeStatusSAdd = () => {
        if(currentNView === 'Status' && currentSView === 'Users' && currentMView === 'Status-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActiveBlock(true);
                    setTimeout(() => {
                        if(isSelect.length === 0){
                            setIsActiveBlock(false);
                            reject('¡No ha seleccionado un usuario!...')
                            return
                        };
                        if(isRadio === ''){
                            setIsActiveBlock(false);
                            reject('¡No ha seleccionado un estado!...')
                            return
                        };

                        resolve('¡Campos verificados!...');
                        
                        setTimeout(() => {
                            setIsStatusAdd(true);
                        },500)
                    },1000);
                }catch(error){
                    setIsActiveBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando campos!...');
        }
    } 
    // Retorno de la función del hook
    return changeStatusSAdd;
}
// Hook para habilitar a un usuario desde el modal
export const useChangeStatusEnable = () => {
    // Constantes con el valor de los contextos 
    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView] = useContext(modalViewContext);
    // Función del hook
    const changeStatusEnable = () => {
        if(isSelectedRow !== null){
            if(currentNView === 'Status' && currentSView === 'Users' && currentMView === 'Status-Enable'){
                setIsStatusEnable(isSelectedRow);
            }
        }
    }
    // Retorno de la función del hook
    return changeStatusEnable;
}
// Hook para filtrar los usuarios cuando no tiene permisos
export const useFilteredRecordsHasPermissions = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(usersContext);
    const [isPermissions] = useContext(permissionsContext);
    // Función del hook
    const filteredRecordsHasPermissions = isUsers.filter((data) => {
        return !isPermissions.some(permission => permission.idusuario === data.idusuario);
    });
    // Retorno de la función del hook
    return filteredRecordsHasPermissions;
}
// Hook para filtrar los usuarios cuando no tiene estatus
export const useFilteredRecordsHasStatus = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(usersContext);
    const [isStatusAll] = useContext(statusAllContext);
    // Función del hook
    const filteredRecordsHasStatus = isUsers.filter((data) => {
        return !isStatusAll.some(status => status.idusuario === data.idusuario);
    });
    // Retorno de la función del hook
    return filteredRecordsHasStatus;
}
// Hook para darle valor al contexto del select
export const useHandleSelectChange = () => {

    const [isSelect,setIsSelect] = useContext(selectContext);

    const handleSelectChange = (selectOption) => {
        setIsSelect(selectOption);
    }

    return handleSelectChange;
}
// Hook para darle valor al contexto del radio
export const useHandleRadioChange = () => {
    // Constantes con el valor de los contextos 
    const [isRadio,setIsRadio] = useContext(radioContext);
    // Función del hook
    const handleRadioChange = (radioOption) => {
        setIsRadio(radioOption.target.value);
    }
    // Retorno de la función del hook
    return handleRadioChange;
}
// Hook para darle valor al contexto del checkbox
export const useHandleCheckboxChange = () => {
    // Constantes con el valor de los contextos 
    const [isCheckbox,setIsCheckbox] = useContext(checkboxContext);
    // Función del hook
    const handleCheckboxChange = (option,value) => {
        const newCheckboxValue = {
            name: option,
            value: value.target.checked,
        };
        setIsCheckbox(prevState => {
            const existingCheckboxIndex = prevState.findIndex(item => item.name === option);
            if (existingCheckboxIndex >= 0) {
                // Si el checkbox ya existe, actualizar su valor
                const updatedState = [...prevState];
                updatedState[existingCheckboxIndex] = newCheckboxValue;
                return updatedState;
            } else {
                // Si no existe, agregarlo al estado
                return [...prevState, newCheckboxValue];
            }
        });
    }
    // Retorno de la función del hook
    return handleCheckboxChange;
}
// Hook para comprobar el inicio de sesión
export const useSessionVerification = () => {
    // Constantes con el valor de los contextos 
    const [isName] = useContext(nameContext);
    const [isPassowrd] = useContext(passwordContext);
    const [isUser] = useContext(userContext);
    const [isFormComprobation,setIsFormComprobation] = useContext(formComprobationContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    // Función del hook
    const sessionVerification = async () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setIsFormComprobation(true);
                setTimeout(() => {
                    if(isUser.length !== 0){
                        if(isName === ''){
                            setIsFormComprobation(false);
                            reject('¡Falta escribir el nombre de usuario!...');
                        }
                        if(isPassowrd === ''){
                            setIsFormComprobation(false);
                            reject('¡Falta escribir la contraseña!...')
                        }
                        if(isName === isUser.usuario && isPassowrd === isUser.contrasena){
                            resolve('¡Bienvenido(a), puede proceder con la acción!...');
                            setIsActionBlock(true);
                        }else{
                            setIsFormComprobation(false);
                            reject('¡Nombre de usuario o contraseña incorrectos!...');
                        }
                    }
                },1000);
            } catch (error) {
                setIsFormComprobation(false);
                reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Verificando datos...');
    }
    // Retorno de la función del hook
    return sessionVerification;
}