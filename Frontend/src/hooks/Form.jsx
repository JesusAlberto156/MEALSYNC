//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { logContext } from "../contexts/SessionProvider";
import { nameContext,passwordContext,selectContext,radioContext,checkboxContext } from "../contexts/FormsProvider";
import { usersContext,userContext } from "../contexts/UsersProvider";
import { permissionsContext,permissionsAddContext,permissionsEditContext,permissionsEnableContext } from "../contexts/PermissionsProvider";
import { statusAllContext,statusAddContext,statusEnableContext } from '../contexts/StatusProvider';
import { formVerificationContext,actionBlockContext,selectedRowContext,viewPasswordContext } from "../contexts/VariablesProvider";
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

// Hook para cambiar la vista de las contraseñas de los usuarios
export const useChangeViewPassword = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isViewPassword,setIsViewPassword] = useContext(viewPasswordContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isFormVerification,setIsFormVerification] = useContext(formVerificationContext);
    // Función del hook
    const changeViewPassword = () => {
        if(currentNView === 'Principal' && currentSView === 'Users' && currentMView === 'Users-View'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(false);
                    setTimeout(() => {
                        resolve('¡Puedes ver las contraseñas!...');
                        setTimeout(() => {
                            setIsViewPassword(true);
                            setIsName('');
                            setIsPassword('');
                            setIsFormVerification(false);
                            setCurrentMView('');
                        },500);
                    },1000);
                }catch(error){
                    setIsActionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            })
            
            Alert_Verification(promise,'¡Mostrando contraseñas!...');
        }else{
            const promise = new Promise(async (resolve,reject) => {
                if(isViewPassword){
                    try{
                        setTimeout(() => {
                            resolve('¡Se ocultaron las contraseñas!...');
                            setTimeout(() => {
                                setIsViewPassword(false);
                            },500);
                        },1000);
                    }catch(error){
                        return reject('¡Ocurrio un error inesperado!...');
                    }
                }
            })
            if(isViewPassword){
                Alert_Verification(promise,'¡Ocultando contraseñas!...');
            }
        }
    }
    // Retorno de la función del hook
    return changeViewPassword;
}
// Hook para agregar los permisos a un usuario desde el modal
export const useChangePermissionsAdd = () => {
    // Constantes con el valor de los contextos 
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(permissionsAddContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView] = useContext(modalViewContext);
    const [isSelect] = useContext(selectContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    // Función del hook
    const changePermissionsAdd = () => {
        if(currentNView === 'Permissions' && currentSView === 'Users' && currentMView === 'Permissions-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelect.length === 0){
                            setIsActionBlock(false);
                            return reject('¡No ha seleccionado un usuario!...')
                        };

                        resolve('¡Usuario seleccionado!...');
                        
                        setTimeout(() => {
                            setIsPermissionsAdd(true);
                        },500)
                    },1000);
                }catch(error){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando usuario!...');
        }
    }
    // Retorno de la función del hook
    return changePermissionsAdd;
}
// Hook para editar los permisos a un usuario desde el modal
export const useChangePermissionsEdit = () => {
    // Constantes con el valor de los contextos 
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(permissionsEditContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView] = useContext(modalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    // Función del hook
    const changePermissionsEdit = () => {
        if(isSelectedRow !== null){
            if(currentNView === 'Permissions' && currentSView === 'Users' && currentMView === 'Permissions-Edit'){
                setIsActionBlock(true);
                setIsPermissionsEdit(true);
            }
        }
    }
    // Retorno de la función del hook
    return changePermissionsEdit;
}
// Hook para habilitar/deshabilitar el permiso de superadminitrador a un usuario desde el modal
export const useChangePermissionsEnable = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow] = useContext(selectedRowContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView] = useContext(modalViewContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(permissionsEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    // Función del hook
    const changePermissionsEnable = () => {
        if(isSelectedRow !== null){
            if(currentNView === 'Permissions' && currentSView === 'Users' && currentMView === 'Permissions-Super-Administrator'){
                setIsPermissionsEnable(isSelectedRow);
                setIsActionBlock(false);
            }
        }
    }
    // Retorno de la función del hook
    return changePermissionsEnable;
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
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    // Función del hook
    const changeStatusSAdd = () => {
        if(currentNView === 'Status' && currentSView === 'Users' && currentMView === 'Status-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelect.length === 0){
                            setIsActionBlock(false);
                            return reject('¡No ha seleccionado un usuario!...')
                        };
                        if(isRadio === ''){
                            setIsActionBlock(false);
                            return reject('¡No ha seleccionado un estado!...')
                        };

                        resolve('¡Campos verificados!...');
                        
                        setTimeout(() => {
                            setIsStatusAdd(true);
                        },500)
                    },1000);
                }catch(error){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
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
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [currentMView] = useContext(modalViewContext);
    // Función del hook
    const changeStatusEnable = () => {
        if(isSelectedRow !== null){
            if(currentNView === 'Status' && currentSView === 'Users' && currentMView === 'Status-Enable'){
                setIsStatusEnable(isSelectedRow);
                setIsActionBlock(false);
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
    const [isFormVerification,setIsFormVerification] = useContext(formVerificationContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    // Función del hook
    const sessionVerification = async () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setIsFormVerification(true);
                setTimeout(() => {
                    if(isUser.length !== 0){
                        if(isName === ''){
                            setIsFormVerification(false);
                            return reject('¡Falta escribir el nombre de usuario!...');
                        }
                        if(isPassowrd === ''){
                            setIsFormVerification(false);
                            return reject('¡Falta escribir la contraseña!...')
                        }
                        if(isName === isUser.usuario && isPassowrd === isUser.contrasena){
                            resolve('¡Bienvenido(a), puede proceder con la acción!...');
                            setIsActionBlock(true);
                        }else{
                            setIsFormVerification(false);
                            return reject('¡Nombre de usuario o contraseña incorrectos!...');
                        }
                    }
                },1000);
            } catch (error) {
                setIsFormVerification(false);
                return reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Verificando datos...');
    }
    // Retorno de la función del hook
    return sessionVerification;
}