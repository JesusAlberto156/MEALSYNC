//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedLogContext,LoggedUserContext } from "../contexts/SessionProvider";
import { SelectContext,RadioStatusContext,RadioPermissionsContext,CheckboxContext,TextFieldsContext } from "../contexts/FormsProvider";
import { UsersContext,UserAddContext,PermissionsContext,StatusContext,PermissionsAddContext,PermissionsEditContext,PermissionsEnableContext,StatusAddContext,StatusEnableContext } from "../contexts/UsersProvider";
import { VerificationBlockContext,ActionBlockContext,SelectedRowContext,ViewPasswordContext } from "../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para empezar el inicio de sesión en el formulario de login o cerrar sesión
export const HandleLoggedLog = () => {
    // Constantes con el valor de los contextos 
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    // Función del hook
    const handleLoggedLog = () => {
        setIsLoggedLog(!isLoggedLog);
    }
    // Retorno de la función del hook
    return handleLoggedLog;
}
// Hook para agregar un usuario desde el modal
export const HandleUserAdd = () => {
    // Constantes con el valor de los contextos 
    const [isUserAdd,setIsUserAdd] = useContext(UserAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFields] = useContext(TextFieldsContext);
    const [isRadioPermissions] = useContext(RadioPermissionsContext);
    const [isRadioStatus] = useContext(RadioStatusContext);
    // Función del hook
    const handleUserAdd = () => {
        if(currentNView === 'Users' && currentSView === 'Users' && currentMView === 'User-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFields.name === '' || isTextFields.shortName === '' || isTextFields.user === '' || isTextFields.password === '' || isTextFields.userTypes === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del usuario!...')
                        };
                        if(isRadioPermissions === ''){
                            setIsActionBlock(false);
                            return reject('¡Los permisos del usuario no han sido seleccionados!...')
                        };

                        if(isRadioStatus === ''){
                            setIsActionBlock(false);
                            return reject('¡El estatus del usuario no han sido seleccionado!...')
                        };
                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUserAdd(true);
                        },500)
                    },1000);
                }catch(error){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    } 
    // Retorno de la función del hook
    return handleUserAdd;
}

// Hook para cambiar la vista de las contraseñas de los usuarios
export const HandleViewPassword = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isViewPassword,setIsViewPassword] = useContext(ViewPasswordContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    // Estados iniciales de los contextos
    const initialTextFields = {
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
    };
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Función del hook
    const handleViewPassword = () => {
        if(currentNView === 'Users' && currentSView === 'Users' && currentMView === 'User-View'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(false);
                    setTimeout(() => {
                        resolve('¡Puedes ver las contraseñas!...');
                        setCurrentMView('');
                        setTimeout(() => {
                            setIsViewPassword(true);
                            setIsVerificationBlock(false);
                            sessionStorage.removeItem('Action-Block');
                            sessionStorage.removeItem('Verification-Block');
                            sessionStorage.setItem('Modal-View','');
                            sessionStorage.setItem('Modal',false);
                            
                            setIsTextFields(initialTextFields);
                            setIsModal(false);
                            navigate('/Administration/Users/Users',{ replace: true });
                        },750);
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
    return handleViewPassword;
}
// Hook para agregar los permisos a un usuario desde el modal
export const useChangePermissionsAdd = () => {
    // Constantes con el valor de los contextos 
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(PermissionsAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isSelect] = useContext(SelectContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
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
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(PermissionsEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
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
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
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
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [isSelect] = useContext(SelectContext);
    const [isRadio] = useContext(RadioContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
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
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
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
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
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
    const [isUsers] = useContext(UsersContext);
    const [isStatusAll] = useContext(StatusContext);
    // Función del hook
    const filteredRecordsHasStatus = isUsers.filter((data) => {
        return !isStatusAll.some(status => status.idusuario === data.idusuario);
    });
    // Retorno de la función del hook
    return filteredRecordsHasStatus;
}
// Hook para darle valor al contexto del select
export const useHandleSelectChange = () => {

    const [isSelect,setIsSelect] = useContext(SelectContext);

    const handleSelectChange = (selectOption) => {
        setIsSelect(selectOption);
    }

    return handleSelectChange;
}
// Hook para darle valor al contexto del radio
export const useHandleRadioChange = () => {
    // Constantes con el valor de los contextos 
    const [isRadio,setIsRadio] = useContext(RadioStatusContext);
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
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
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
export const HandleVerificationBlock = () => {
    // Constantes con el valor de los contextos 
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFields] = useContext(TextFieldsContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleVerificationBlock = async () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setIsVerificationBlock(true);
                setTimeout(() => {
                    if(isLoggedUser.length !== 0){
                        if(isTextFields.user === '' || isTextFields.password === ''){
                            setIsVerificationBlock(false);
                            return reject('¡Falta escribir el nombre de usuario o la contraseña del usuario!...');
                        }
                        if(isTextFields.user === isLoggedUser.usuario && isTextFields.password === isLoggedUser.contrasena){
                            resolve('¡Bienvenido(a), puede proceder con la acción!...');
                            setIsActionBlock(true);
                            sessionStorage.setItem('Verification-Block',true);
                            sessionStorage.setItem('Action-Block',true);
                        }else{
                            setIsVerificationBlock(false);
                            return reject('¡Nombre de usuario o contraseña incorrectos!...');
                        }
                    }
                },1000);
            } catch (error) {
                setIsVerificationBlock(false);
                return reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Verificando datos...');
    }
    // Retorno de la función del hook
    return handleVerificationBlock;
}