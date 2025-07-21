//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedUserContext,LoggedPermissionsContext } from "../../contexts/SessionProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext } from "../../contexts/FormsProvider";
import { UsersContext,DeletedUsersContext,UserAddContext,UserEditContext,UsersViewPasswordContext,UserDeleteContext,PermissionsContext,StatusContext,PermissionsAddContext,PermissionsEditContext,PermissionsEnableContext,StatusAddContext,StatusEnableContext } from "../../contexts/UsersProvider";
import { SelectedRowContext } from "../../contexts/SelectedesProvider";
import { VerificationBlockContext,ActionBlockContext,FunctionBlockContext } from "../../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext,ModalContext,SidebarContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Alert_Sonner_Promise } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para agregar un usuario desde el modal ✔️
export const HandleUserAdd = () => {
    // Constantes con el valor de los contextos 
    const [isUserAdd,setIsUserAdd] = useContext(UserAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isUsers] = useContext(UsersContext);
    // Función del hook
    const handleUserAdd = () => {
        if(currentNView === 'Usuarios' && currentSView === 'Usuarios' && currentMView === 'Usuario-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsUser.nombre === '' || isTextFieldsUser.nombrecorto === '' || isTextFieldsUser.usuario === '' || isTextFieldsUser.contrasena === '' || isTextFieldsUser.idtipo === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del usuario!')
                        };

                        if(isUsers.some(user => user.usuario === isTextFieldsUser.usuario)){
                            setIsActionBlock(false);
                            return reject('¡Usuario ya existente!');
                        }

                        const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexCredentials = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsUser.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!');
                        }

                        if(!regexNames.test(isTextFieldsUser.nombrecorto.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre corto no es válido, solo permite letras y espacios!');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.usuario.trim())){
                            setIsActionBlock(false);
                            return reject('¡El usuario no es válido, solo permite letras, números, espacios y algunos caracteres especiales!');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.contrasena.trim())){
                            setIsActionBlock(false);
                            return reject('¡La contraseña no es válida, solo permite letras, números, espacios y algunos caracteres especiales!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsUserAdd(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleUserAdd;
}
// Hook para cambiar la vista de las contraseñas de los usuarios ✔️
export const HandleViewPassword = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUsersViewPassword,setIsUsersViewPassword] = useContext(UsersViewPasswordContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Función del hook
    const handleViewPassword = () => {
        if(currentNView === 'Usuarios' && currentSView === 'Usuarios' && currentMView === 'Usuario-Ver-Contraseña'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        resolve('¡Puedes ver las contraseñas!');

                        const route = sessionStorage.getItem('Ruta');
                        const sidebar = sessionStorage.getItem('Estado del Sidebar');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            if(sidebar === 'true'){
                                setIsSidebar(true);
                            }
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsUsersViewPassword(true);
                            setIsVerificationBlock(false);
                            setIsFunctionBlock(false);
                            sessionStorage.removeItem('Función del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            })
            
            return Alert_Sonner_Promise(promise,'¡Mostrando contraseñas!','1');
        }else{
            const promise = new Promise((resolve,reject) => {
                if(isUsersViewPassword){
                    try{
                        setTimeout(() => {
                            resolve('¡Se ocultaron las contraseñas!');
                            setTimeout(() => {
                                return setIsUsersViewPassword(false);
                            },500);
                        },1000);
                    }catch(e){
                        return reject('¡Ocurrio un error inesperado!');
                    }
                }
            })
            if(isUsersViewPassword){
                return Alert_Sonner_Promise(promise,'¡Ocultando contraseñas!','2');
            }
        }
    }
    // Retorno de la función del hook
    return handleViewPassword;
}
// Hook para editar un usuario desde el modal ✔️
export const HandleUserEdit = () => {
    // Constantes con el valor de los contextos 
    const [isUserEdit,setIsUserEdit] = useContext(UserEditContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext)
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
    // Función del hook
    const handleUserEdit = () => {
        if(currentNView === 'Usuarios' && currentSView === 'Usuarios' && currentMView === 'Usuario-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isLoggedUser.idusuario  === isTextFieldsUser.idusuario){
                            setIsActionBlock(false);
                            return reject('¡No puede editar el usuario de la sesión!')
                        };

                        if(!isLoggedPermissions.superadministrador){
                            const exists = isPermissions.find((user) => user.idusuario === isTextFieldsUser.idusuario)

                            if(exists){
                                if(exists.superadministrador){
                                    setIsActionBlock(false);
                                    return reject('¡No puede editar al usuario con permisos de mayor jerarquía!')
                                }
                            }
                        }

                        if(isTextFieldsUser.nombre === isSelectedRow.nombre && isTextFieldsUser.nombrecorto === isSelectedRow.nombrecorto &&  isTextFieldsUser.usuario === isSelectedRow.usuario && isTextFieldsUser.contrasena === isSelectedRow.contrasena && isTextFieldsUser.idtipo === isSelectedRow.idtipo){
                            setIsActionBlock(false);
                            return reject('¡No hay información modificada!');
                        };
                        
                        if(isTextFieldsUser.nombre === '' || isTextFieldsUser.nombrecorto === '' || isTextFieldsUser.usuario === '' || isTextFieldsUser.contrasena === '' || isTextFieldsUser.idtipo === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del usuario!')
                        };

                        if(isSelectedRow.usuario !== isTextFieldsUser.usuario){
                            if(isUsers.some(user => user.usuario === isTextFieldsUser.usuario)){
                                setIsActionBlock(false);
                                return reject('¡Usuario ya existente!');
                            }
                        }

                        const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexCredentials = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(!regexNames.test(isTextFieldsUser.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!');
                        }

                        if(!regexNames.test(isTextFieldsUser.nombrecorto.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre corto no es válido, solo permite letras y espacios!');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.usuario.trim())){
                            setIsActionBlock(false);
                            return reject('¡El usuario no es válido, solo permite letras, números, espacios y algunos caracteres especiales!');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.contrasena.trim())){
                            setIsActionBlock(false);
                            return reject('¡La contraseña no es válida, solo permite letras, números, espacios y algunos caracteres especiales!');
                        }

                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsUserEdit(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleUserEdit;
}
// Hook para eliminar un usuario desde el modal ✔️
export const HandleUserDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isLoggedUser] = useContext(LoggedUserContext)
    const [isUserDelete,setIsUserDelete] = useContext(UserDeleteContext);
    // Función del hook
    const handleUserDelete = () => {
        if(currentNView === 'Usuarios' && currentSView === 'Usuarios' && currentMView === 'Usuario-Eliminar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isLoggedUser.idusuario  === isTextFieldsUser.idusuario){
                            setIsActionBlock(false);
                            return reject('¡No puede eliminar al usuario de la sesión!')
                        };
                        
                        resolve('¡Información verificada!');
                        
                        setTimeout(() => {
                            return setIsUserDelete(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleUserDelete;
}
// Hook para filtrar los usuarios cuando no tiene permisos ✔️
export const FilteredRecordsHasPermissions = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    // Función del hook
    const filteredRecordsHasPermissions = isUsers.filter((data) => {
        const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
        if (isDeleted) return false;

        return !isPermissions.some(permission => permission.idusuario === data.idusuario);
    });
    // Retorno de la función del hook
    return filteredRecordsHasPermissions;
}
// Hook para agregar los permisos a un usuario desde el modal ✔️
export const HandlePermissionsAdd = () => {
    // Constantes con el valor de los contextos 
    const [isPermissionsAdd,setIsPermissionsAdd] = useContext(PermissionsAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handlePermissionsAdd = () => {
        if(currentNView === 'Permisos' && currentSView === 'Usuarios' && currentMView === 'Permisos-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsPermissions.idusuario === 0 && isTextFieldsPermissions.usuario === ''){
                            setIsActionBlock(false);
                            return reject('¡No ha seleccionado un usuario!')
                        };

                        resolve('Información verificada!');
                        
                        setTimeout(() => {
                            return setIsPermissionsAdd(true);
                        },1000);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    }
    // Retorno de la función del hook
    return handlePermissionsAdd;
}
// Hook para editar los permisos a un usuario desde el modal ✔️
export const HandlePermissionsEdit = () => {
    // Constantes con el valor de los contextos 
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(PermissionsEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handlePermissionsEdit = () => {
        if(currentNView === 'Permisos' && currentSView === 'Usuarios' && currentMView === 'Permisos-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsPermissions.idusuario === isLoggedUser.idusuario){
                            setIsActionBlock(false);
                            return reject('¡No puede editar los permisos del usuario de la sesión!');
                        };

                        if(!isLoggedPermissions.superadministrador){
                            const exists = isPermissions.find((user) => user.idusuario === isTextFieldsPermissions.idusuario)

                            if(exists){
                                if(exists.superadministrador){
                                    setIsActionBlock(false);
                                    return reject('¡No puede editar los permisos a un usuario con permisos de mayor jerarquía!')
                                }
                            }
                        }
                        
                        if(isTextFieldsPermissions.administrador === isSelectedRow.administrador && isTextFieldsPermissions.chef === isSelectedRow.chef && isTextFieldsPermissions.almacenista === isSelectedRow.almacenista && isTextFieldsPermissions.cocinero === isSelectedRow.cocinero && isTextFieldsPermissions.nutriologo === isSelectedRow.nutriologo && isTextFieldsPermissions.medico === isSelectedRow.medico){
                            setIsActionBlock(false);
                            return reject('¡No hay información modificada!');
                        }

                        resolve('Información verificada!');
                        
                        setTimeout(() => {
                            return setIsPermissionsEdit(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    }
    // Retorno de la función del hook
    return handlePermissionsEdit;
}
// Hook para habilitar/deshabilitar el permiso de superadminitrador a un usuario desde el modal ✔️
export const HandlePermissionsEnable = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    // Función del hook
    const handlePermissionsEnable = () => {
        if(currentNView === 'Permisos' && currentSView === 'Usuarios' && currentMView === 'Permiso-Super-Administrador'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsPermissions.idusuario === isLoggedUser.idusuario){
                            setIsActionBlock(false);
                            return reject('¡No puede deshabilitar el permiso de super administrador al usuario de la sesión!');
                        };

                        resolve('Información verificada!');
                        
                        setTimeout(() => {
                            return setIsPermissionsEnable(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    }
    // Retorno de la función del hook
    return handlePermissionsEnable;
}
// Hook para filtrar los usuarios cuando no tiene estatus ✔️
export const FilteredRecordsHasStatus = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(UsersContext);
    const [isStatus] = useContext(StatusContext);
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    // Función del hook
    const filteredRecordsHasStatus = isUsers.filter((data) => {
        const isDeleted = isDeletedUsers.some(user => user.idusuario === data.idusuario);
        if (isDeleted) return false;

        return !isStatus.some(status => status.idusuario === data.idusuario);
    });
    // Retorno de la función del hook
    return filteredRecordsHasStatus;
}
// Hook para agregar un estatus a un usuario desde el modal ✔️
export const HandleStatusSAdd = () => {
    // Constantes con el valor de los contextos 
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [isTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleStatusAdd = () => {
        if(currentNView === 'Estatus' && currentSView === 'Usuarios' && currentMView === 'Estatus-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsStatus.idusuario === 0 && isTextFieldsStatus.usuario === ''){
                            setIsActionBlock(false);
                            return reject('¡No ha seleccionado un usuario!')
                        };

                        resolve('Información verificada!');
                        
                        setTimeout(() => {
                            return setIsStatusAdd(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    } 
    // Retorno de la función del hook
    return handleStatusAdd;
}
// Hook para habilitar a un usuario desde el modal ✔️
export const HandleStatusEnable = () => {
    // Constantes con el valor de los contextos 
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    // Función del hook
    const handleStatusEnable = () => {
        if(currentNView === 'Estatus' && currentSView === 'Usuarios' && currentMView === 'Estatus-Habilitar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsStatus.estatus === 'Habilitado'){
                            if(isTextFieldsStatus.idusuario === isLoggedUser.idusuario){
                                setIsActionBlock(false);
                                return reject('¡No puede deshabilitar el usuario de la sesión!');
                            };

                            
                            if(!isLoggedPermissions.superadministrador){
                                const exists = isPermissions.find((user) => user.idusuario === isTextFieldsStatus.idusuario)

                                if(exists){
                                    if(exists.superadministrador){
                                        setIsActionBlock(false);
                                        return reject('¡No puede deshabilitar a un usuario con permisos de mayor jerarquía!')
                                    }
                                }
                            }
                        }

                        resolve('Información verificada!');
                        
                        setTimeout(() => {
                            return setIsStatusEnable(true);
                        },1000)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            Alert_Sonner_Promise(promise,'¡Verificando información!','1');
        }
    }
    // Retorno de la función del hook
    return handleStatusEnable;
}