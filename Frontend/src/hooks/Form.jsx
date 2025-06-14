//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedLogContext,LoggedUserContext,LoggedPermissionsContext } from "../contexts/SessionProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext,TextFieldsSupplierContext,TextFieldsSupplyContext,TextFieldsSupplyTypesContext,TextFieldsUnitsContext } from "../contexts/FormsProvider";
import { UsersContext,DeletedUsersContext,UserAddContext,UserEditContext,UsersViewPasswordContext,UserDeleteContext,PermissionsContext,StatusContext,PermissionsAddContext,PermissionsEditContext,PermissionsEnableContext,StatusAddContext,StatusEnableContext } from "../contexts/UsersProvider";
import { SuppliersContext,SupplierAddContext,SupplierEditContext } from "../contexts/SuppliersProvider";
import { SearchTermContext,SearchTerm1Context,SearchTerm2Context } from "../contexts/SearchsProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context } from "../contexts/SelectedesProvider";
import { SuppliesContext,SupplyAddContext,SupplyEditContext,SupplyTypesContext,SupplyTypeAddContext,SupplyTypeEditContext,UnitsContext,UnitAddContext,UnitEditContext } from "../contexts/WarehouseProvider";
import { VerificationBlockContext,ActionBlockContext,UserUpdatedContext } from "../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
// Hooks personalizados
import { ResetTextFieldsUser } from "./Texts";
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Hook para empezar el inicio de sesión en el formulario de login o cerrar sesión ✔️
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
// Hook para comprobar el inicio de sesión ✔️
export const HandleVerificationBlock = () => {
    // Constantes con el valor de los contextos 
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleVerificationBlock = () => {
        const promise = new Promise((resolve,reject) => {
            try{
                setIsVerificationBlock(true);
                setTimeout(() => {
                    if(isLoggedUser.length !== 0){
                        if(isTextFieldsUser.usuario === '' || isTextFieldsUser.contrasena === ''){
                            setIsVerificationBlock(false);
                            return reject('¡Falta escribir el nombre de usuario o la contraseña del usuario!...');
                        }
                        if(isTextFieldsUser.usuario === isLoggedUser.usuario && isTextFieldsUser.contrasena === isLoggedUser.contrasena){
                            resolve('¡Bienvenido(a), puede proceder con la acción!...');
                            setIsActionBlock(true);
                            sessionStorage.setItem('Verificación del Bloqueo',true);
                            sessionStorage.setItem('Acción del Bloqueo',true);
                        }else{
                            setIsVerificationBlock(false);
                            return reject('¡Nombre de usuario o contraseña incorrectos!...');
                        }
                    }
                },1000);
            } catch (e) {
                setIsVerificationBlock(false);
                return reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Verificando datos...');
    }
    // Retorno de la función del hook
    return handleVerificationBlock;
}
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
                            return reject('¡Falta información del usuario!...')
                        };

                        if(isUsers.some(user => user.usuario === isTextFieldsUser.usuario)){
                            setIsActionBlock(false);
                            setIsUserAdd(false);
                            return reject('¡Usuario ya existente!...');
                        }

                        const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexCredentials = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(isTextFieldsUser.nombre.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexNames.test(isTextFieldsUser.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!...');
                        }

                        if(isTextFieldsUser.nombrecorto.length > 50){
                            setIsActionBlock(false);
                            return reject('¡El nombre corto sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexNames.test(isTextFieldsUser.nombrecorto.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre corto no es válido, solo permite letras y espacios!...');
                        }

                        if(isTextFieldsUser.usuario.length > 25){
                            setIsActionBlock(false);
                            return reject('¡El usuario sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.usuario.trim())){
                            setIsActionBlock(false);
                            return reject('¡El usuario no es válido, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }
                        
                        if(isTextFieldsUser.contrasena.length > 15){
                            setIsActionBlock(false);
                            return reject('¡La contraseña sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.contrasena.trim())){
                            setIsActionBlock(false);
                            return reject('¡La contraseña no es válida, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUserAdd(true);
                        },500)
                    },1000);
                }catch(e){
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Función del hook
    const handleViewPassword = () => {
        if(currentNView === 'Usuarios' && currentSView === 'Usuarios' && currentMView === 'Usuario-Ver-Contraseña'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(false);
                    setTimeout(() => {
                        resolve('¡Puedes ver las contraseñas!...');
                        setCurrentMView('');
                        setTimeout(() => {
                            setIsUsersViewPassword(true);
                            setIsVerificationBlock(false);
                            sessionStorage.removeItem('Acción del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            sessionStorage.setItem('Vista del Modal','');
                            sessionStorage.setItem('Estado del Modal',false);
                            
                            resetTextFieldsUser();
                            setIsModal(false);
                            navigate('/Administration/Index/Users',{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            })
            
            Alert_Verification(promise,'¡Mostrando contraseñas!...');
        }else{
            const promise = new Promise((resolve,reject) => {
                if(isUsersViewPassword){
                    try{
                        setTimeout(() => {
                            resolve('¡Se ocultaron las contraseñas!...');
                            setTimeout(() => {
                                setIsUsersViewPassword(false);
                            },500);
                        },1000);
                    }catch(e){
                        return reject('¡Ocurrio un error inesperado!...');
                    }
                }
            })
            if(isUsersViewPassword){
                Alert_Verification(promise,'¡Ocultando contraseñas!...');
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
    const [isLoggedUser] = useContext(LoggedUserContext)
    // Función del hook
    const handleUserEdit = () => {
        if(currentNView === 'Usuarios' && currentSView === 'Usuarios' && currentMView === 'Usuario-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isLoggedUser.idusuario  === isTextFieldsUser.idusuario){
                            setIsActionBlock(false);
                            return reject('¡No puede editar el usuario de la sesión!...')
                        };

                        if(isTextFieldsUser.nombre === isSelectedRow.nombre && isTextFieldsUser.nombrecorto === isSelectedRow.nombrecorto &&  isTextFieldsUser.usuario === isSelectedRow.usuario && isTextFieldsUser.contrasena === isSelectedRow.contrasena && isTextFieldsUser.idtipo === isSelectedRow.idtipo){
                            setIsActionBlock(false);
                            return reject('¡No hay información del usuario modificada!...')
                        };
                        
                        if(isTextFieldsUser.nombre === '' || isTextFieldsUser.nombrecorto === '' || isTextFieldsUser.usuario === '' || isTextFieldsUser.contrasena === '' || isTextFieldsUser.idtipo === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del usuario!...')
                        };

                        if(isSelectedRow.usuario !== isTextFieldsUser.usuario){
                            if(isUsers.some(user => user.usuario === isTextFieldsUser.usuario)){
                                setIsActionBlock(false);
                                return reject('¡Usuario ya existente!...');
                            }
                        }

                        const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexCredentials = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(isTextFieldsUser.nombre.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexNames.test(isTextFieldsUser.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!...');
                        }

                        if(isTextFieldsUser.nombrecorto.length > 50){
                            setIsActionBlock(false);
                            return reject('¡El nombre corto sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexNames.test(isTextFieldsUser.nombrecorto.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre corto no es válido, solo permite letras y espacios!...');
                        }

                        if(isTextFieldsUser.usuario.length > 25){
                            setIsActionBlock(false);
                            return reject('¡El usuario sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.usuario.trim())){
                            setIsActionBlock(false);
                            return reject('¡El usuario no es válido, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }
                        
                        if(isTextFieldsUser.contrasena.length > 15){
                            setIsActionBlock(false);
                            return reject('¡La contraseña sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexCredentials.test(isTextFieldsUser.contrasena.trim())){
                            setIsActionBlock(false);
                            return reject('¡La contraseña no es válida, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUserEdit(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
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
                    setIsActionBlock(false);
                    setTimeout(() => {
                        if(isLoggedUser.idusuario  === isTextFieldsUser.idusuario){
                            setIsActionBlock(true);
                            return reject('¡No puede eliminar el usuario de la sesión!...')
                        };
                        
                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUserDelete(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
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
                            return reject('¡No ha seleccionado un usuario!...')
                        };

                        resolve('Información verificada!...');
                        
                        setTimeout(() => {
                            setIsPermissionsAdd(true);
                        },500);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
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
                        if(isTextFieldsPermissions.administrador === isSelectedRow.administrador && isTextFieldsPermissions.chef === isSelectedRow.chef && isTextFieldsPermissions.almacenista === isSelectedRow.almacenista && isTextFieldsPermissions.cocinero === isSelectedRow.cocinero && isTextFieldsPermissions.nutriologo === isSelectedRow.nutriologo && isTextFieldsPermissions.medico === isSelectedRow.medico){
                            setIsActionBlock(false);
                            return reject('¡No hay permisos modificados!...');
                        }

                        if(isTextFieldsPermissions.idusuario === isLoggedUser.idusuario){
                            setIsActionBlock(false);
                            return reject('¡No se puede editar los permisos del usuario de la sesión!...');
                        };

                        
                        if(!isLoggedPermissions.superadministrador){
                            const exists = isPermissions.find((user) => user.idusuario === isTextFieldsPermissions.idusuario)

                            if(exists){
                                if(exists.superadministrador){
                                    setIsActionBlock(false);
                                    return reject('¡No se puede editar los permisos a un usuario con permisos de mayor jerarquía!...')
                                }
                            }
                        }

                        resolve('Información verificada!...');
                        
                        setTimeout(() => {
                            setIsPermissionsEdit(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
    // Retorno de la función del hook
    return handlePermissionsEdit;
}
// Hook para habilitar/deshabilitar el permiso de superadminitrador a un usuario desde el modal ✔️
export const HandlePermissionsEnable = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    // Función del hook
    const handlePermissionsEnable = () => {
        if(currentNView === 'Permisos' && currentSView === 'Usuarios' && currentMView === 'Permiso-Super-Administrador'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(false);
                    setTimeout(() => {
                        if(isTextFieldsPermissions.idusuario === isLoggedUser.idusuario){
                            setIsActionBlock(true);
                            return reject('¡No se puede deshabilitar el permiso de super administrador al usuario de la sesión!...');
                        };

                        resolve('Información verificada!...');
                        
                        setTimeout(() => {
                            setIsPermissionsEnable(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
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
                        if(isTextFieldsStatus.idusuario === 0 && isTextFieldsStatus.usuario === '' || isTextFieldsStatus.estatus === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del estatus del usuario!...')
                        };

                        resolve('Información verificada!...');
                        
                        setTimeout(() => {
                            setIsStatusAdd(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
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
                    setIsActionBlock(false);
                    setTimeout(() => {
                        if(isTextFieldsStatus.estatus === 'Habilitado'){
                            if(isTextFieldsStatus.idusuario === isLoggedUser.idusuario){
                                setIsActionBlock(true);
                                return reject('¡No se puede deshabilitar el usuario de la sesión!...');
                            };

                            
                            if(!isLoggedPermissions.superadministrador){
                                const exists = isPermissions.find((user) => user.idusuario === isTextFieldsStatus.idusuario)

                                if(exists){
                                    if(exists.superadministrador){
                                        setIsActionBlock(true);
                                        return reject('¡No se puede deshabilitar a un usuario con permisos de mayor jerarquía!...')
                                    }
                                }
                            }
                        }

                        resolve('Información verificada!...');
                        
                        setTimeout(() => {
                            setIsStatusEnable(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
    // Retorno de la función del hook
    return handleStatusEnable;
}
// Hook para agregar un proveedor desde el modal ✔️
export const HandleSupplierAdd = () => {
    // Constantes con el valor de los contextos 
    const [isSupplierAdd,setIsSupplierAdd] = useContext(SupplierAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // Función del hook
    const handleSupplierAdd = () => {
        if(currentNView === 'Proveedores' && currentSView === 'Proveedores' && currentMView === 'Proveedor-Agregar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplier.nombre === '' || isTextFieldsSupplier.rfc === '' || isTextFieldsSupplier.domicilio === '' || isTextFieldsSupplier.telefono === '' || isTextFieldsSupplier.correo === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del proveedor!...')
                        };

                        if(isSuppliers.some(supplier => supplier.nombre === isTextFieldsSupplier.nombre)){
                            setIsActionBlock(false);
                            return reject('¡Proveedor ya existente!...');
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]*$/
                        const regexRFC = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/
                        const regexAddress = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,#\-\/°()]+$/
                        const regexPhone = /^\d{7}$|^\d{8}$|^\d{10}$/
                        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if(isTextFieldsSupplier.nombre.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexNames.test(isTextFieldsSupplier.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupplier.rfc.length > 30){
                            setIsActionBlock(false);
                            return reject('¡El RFC sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexRFC.test(isTextFieldsSupplier.rfc.trim())){
                            setIsActionBlock(false);
                            return reject('¡El RFC no es válido, solo acepta un RFC que inicia con 3 o 4 letras mayúsculas (incluye Ñ y &), seguido de 6 dígitos para la fecha, y termina con 3 caracteres alfanuméricos en mayúsculas o números!...');
                        }

                        if(isTextFieldsSupplier.domicilio.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El domicilio sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexAddress.test(isTextFieldsSupplier.domicilio.trim())){
                            setIsActionBlock(false);
                            return reject('¡El domicilio no es válido, solo acepta letras (mayúsculas y minúsculas, incluidas vocales con acentos y la Ñ), números, espacios y los caracteres especiales: punto, coma, numeral (#), guion, barra, símbolo de grado (°) y paréntesis!...');
                        }

                        if(isTextFieldsSupplier.telefono.length > 20){
                            setIsActionBlock(false);
                            return reject('¡El teléfono sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexPhone.test(isTextFieldsSupplier.telefono.trim())){
                            setIsActionBlock(false);
                            return reject('¡El teléfono no es válido, solo permite números de 7, 8 o 10 dígitos!...');
                        }
                        if(isTextFieldsSupplier.correo.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El correo sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexEmail.test(isTextFieldsSupplier.correo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El correo no es válido, solo acepta una cadena sin espacios ni arrobas en la parte antes del @, seguida de un @, luego otra cadena sin espacios ni arrobas, un punto y finalmente otra cadena sin espacios ni arrobas!...');
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplierAdd(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
    // Retorno de la función del hook
    return handleSupplierAdd;
}
// Hook para editar un porveedor desde el modal ✔️
export const HandleSupplierEdit = () => {
    // Constantes con el valor de los contextos 
    const [isSupplierEdit,setIsSupplierEdit] = useContext(SupplierEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplier] = useContext(TextFieldsSupplierContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // Función del hook
    const handleSupplierEdit = () => {
        if(currentNView === 'Proveedores' && currentSView === 'Proveedores' && currentMView === 'Proveedor-Editar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplier.nombre === isSelectedRow.nombre && isTextFieldsSupplier.rfc === isSelectedRow.rfc &&  isTextFieldsSupplier.domicilio === isSelectedRow.domicilio && isTextFieldsSupplier.telefono === isSelectedRow.telefono && isTextFieldsSupplier.correo === isSelectedRow.correo){
                            setIsActionBlock(false);
                            return reject('¡No hay información del proveedor modificada!...')
                        };

                        if(isTextFieldsSupplier.nombre === '' || isTextFieldsSupplier.rfc === '' || isTextFieldsSupplier.domicilio === '' || isTextFieldsSupplier.telefono === '' || isTextFieldsSupplier.correo === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del proveedor!...')
                        };

                        if(isSelectedRow.nombre !== isTextFieldsSupplier.nombre){
                            if(isSuppliers.some(supplier => supplier.nombre === isTextFieldsSupplier.nombre)){
                                setIsActionBlock(false);
                                return reject('¡Proveedor ya existente!...');
                            }
                        }

                        const regexNames = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s\-.,&()]*$/
                        const regexRFC = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/
                        const regexAddress = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,#\-\/°()]+$/
                        const regexPhone = /^\d{7}$|^\d{8}$|^\d{10}$/
                        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if(isTextFieldsSupplier.nombre.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexNames.test(isTextFieldsSupplier.nombre.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupplier.rfc.length > 30){
                            setIsActionBlock(false);
                            return reject('¡El RFC sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexRFC.test(isTextFieldsSupplier.rfc.trim())){
                            setIsActionBlock(false);
                            return reject('¡El RFC no es válido, solo acepta un RFC que inicia con 3 o 4 letras mayúsculas (incluye Ñ y &), seguido de 6 dígitos para la fecha, y termina con 3 caracteres alfanuméricos en mayúsculas o números!...');
                        }

                        if(isTextFieldsSupplier.domicilio.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El domicilio sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexAddress.test(isTextFieldsSupplier.domicilio.trim())){
                            setIsActionBlock(false);
                            return reject('¡El domicilio no es válido, solo acepta letras (mayúsculas y minúsculas, incluidas vocales con acentos y la Ñ), números, espacios y los caracteres especiales: punto, coma, numeral (#), guion, barra, símbolo de grado (°) y paréntesis!...');
                        }

                        if(isTextFieldsSupplier.telefono.length > 20){
                            setIsActionBlock(false);
                            return reject('¡El teléfono sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexPhone.test(isTextFieldsSupplier.telefono.trim())){
                            setIsActionBlock(false);
                            return reject('¡El teléfono no es válido, solo permite números de 7, 8 o 10 dígitos!...');
                        }
                        if(isTextFieldsSupplier.correo.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El correo sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexEmail.test(isTextFieldsSupplier.correo.trim())){
                            setIsActionBlock(false);
                            return reject('¡El correo no es válido, solo acepta una cadena sin espacios ni arrobas en la parte antes del @, seguida de un @, luego otra cadena sin espacios ni arrobas, un punto y finalmente otra cadena sin espacios ni arrobas!...');
                        }
                        
                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplierEdit(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
    // Retorno de la función del hook
    return handleSupplierEdit;
}
// Hook para eliminar un proveedor desde el modal ✔️
export const HandleSupplierDelete = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUserDelete,setIsUserDelete] = useContext(UserDeleteContext);
    // Función del hook
    const handleSupplierDelete = () => {
        if(currentNView === 'Proveedores' && currentSView === 'Proveedores' && currentMView === 'Proveedor-Eliminar'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(false);
                    setTimeout(() => {
                        
                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUserDelete(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(true);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    } 
    // Retorno de la función del hook
    return handleSupplierDelete;
}
// Hook para agregar una onservación de proveedor desde el modal 

//Hook para agregar un insumo desde el modal 
export const HandleWarehouseAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isSupplyAdd,setIsSupplyAdd] = useContext(SupplyAddContext);
    // Función del hook
    const handleWarehouseAdd = () => {
        if(currentNView === 'Warehouse' && currentSView === 'Warehouse' && currentMView === 'Warehouse-Add'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupply.name === '' || isTextFieldsSupply.supplier === 0 || isTextFieldsSupply.type === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del insumo!...');
                        };

                        const exists = isSupplies.some(supply => supply.nombre === isTextFieldsSupply.name && supply.idproveedor === isTextFieldsSupply.supplier);
                        
                        if(exists){
                            setIsActionBlock(false);
                            return reject('¡Insumo con el proveedor ya existente!...');
                        }

                        const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,()-]+$/;
                        const regexDescription = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(isTextFieldsSupply.name.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexName.test(isTextFieldsSupply.name.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupply.description.length > 250){
                            setIsActionBlock(false);
                            return reject('¡La descripción sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexDescription.test(isTextFieldsSupply.description.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupply.image){
                            try{
                                new URL(isTextFieldsSupply.image.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!...');
                            }
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplyAdd(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
     // Retorno de la función del hook
     return handleWarehouseAdd
}
//Hook para agregar un insumo desde el modal 
export const HandleSupplyAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isSupplyAdd,setIsSupplyAdd] = useContext(SupplyAddContext);
    // Función del hook
    const handleSupplyAdd = () => {
        if(currentNView === 'Supplies' && currentSView === 'Warehouse' && currentMView === 'Supply-Add'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupply.name === '' || isTextFieldsSupply.supplier === 0 || isTextFieldsSupply.type === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del insumo!...');
                        };

                        const exists = isSupplies.some(supply => supply.nombre === isTextFieldsSupply.name && supply.idproveedor === isTextFieldsSupply.supplier);
                        
                        if(exists){
                            setIsActionBlock(false);
                            return reject('¡Insumo con el proveedor ya existente!...');
                        }

                        const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,()-]+$/;
                        const regexDescription = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(isTextFieldsSupply.name.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexName.test(isTextFieldsSupply.name.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupply.description.length > 250){
                            setIsActionBlock(false);
                            return reject('¡La descripción sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexDescription.test(isTextFieldsSupply.description.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupply.image){
                            try{
                                new URL(isTextFieldsSupply.image.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!...');
                            }
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplyAdd(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
     // Retorno de la función del hook
     return handleSupplyAdd
}
//Hook para editar un insumo desde el modal 
export const HandleSupplyEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isSupplyEdit,setIsSupplyEdit] = useContext(SupplyEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    // Función del hook
    const handleSupplyEdit = () => {
        if(currentNView === 'Supplies' && currentSView === 'Warehouse' && currentMView === 'Supply-Edit'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupply.name === isSelectedRow.nombre && isTextFieldsSupply.description === isSelectedRow.descripcion && isTextFieldsSupply.image === isSelectedRow.imagen && isTextFieldsSupply.supplier === isSelectedRow.idproveedor && isTextFieldsSupply.type === isSelectedRow.idtipo){
                            setIsActionBlock(false);
                            return reject('¡No hay información del insumo modificada!...')
                        }

                        if(isTextFieldsSupply.name === '' || isTextFieldsSupply.supplier === 0 || isTextFieldsSupply.type === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del insumo!...');
                        };

                        if(isTextFieldsSupply.name !== isSelectedRow.nombre){
                            const exists = isSupplies.some(supply => supply.nombre === isTextFieldsSupply.name && supply.idproveedor === isTextFieldsSupply.supplier);
                        
                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Insumo con el proveedor ya existente!...');
                            }
                        }

                        const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,()-]+$/;
                        const regexDescription = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(isTextFieldsSupply.name.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexName.test(isTextFieldsSupply.name.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupply.description.length > 250){
                            setIsActionBlock(false);
                            return reject('¡La descripción sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexDescription.test(isTextFieldsSupply.description.trim())){
                            setIsActionBlock(false);
                            return reject('¡La descripción no es válida, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        if(isTextFieldsSupply.image){
                            try{
                                new URL(isTextFieldsSupply.image.trim());
                            }catch(e){
                                setIsActionBlock(false);
                                return reject('¡La dirección URL de la imagen no es valida!...');
                            }
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplyEdit(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
     // Retorno de la función del hook
     return handleSupplyEdit
}
//Hook para agregar un tipo de insumo desde el modal 
export const HandleSupplyTypeAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplyTypes] = useContext(TextFieldsSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSupplyTypeAdd,setIsSupplyTypeAdd] = useContext(SupplyTypeAddContext);
    // Función del hook
    const handleSupplyTypeAdd = (state) => {
        if(currentNView === 'Supply-Types' && currentSView === 'Warehouse' && currentMView === 'Supply-Type-Add'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplyTypes.type === '' || isTextFieldsSupplyTypes.idunits === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del tipo de insumo!...');
                        };
                        
                        if(state === 'Nuevo'){
                            const exists = isSupplyTypes.some(type => type.tipo === isTextFieldsSupplyTypes.type);

                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Tipo de insumo ya existente!...');
                            }
                        }

                        if(state === 'Existente'){
                            const exists = isSupplyTypes.some(type => type.tipo === isTextFieldsSupplyTypes.type && type.idmedida === isTextFieldsSupplyTypes.idunits);
                        
                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Tipo de insumo ya existente!...');
                            }
                        }

                        const regexType = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexDescription = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(isTextFieldsSupplyTypes.type.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexType.test(isTextFieldsSupplyTypes.type.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!...');
                        }

                        if(isTextFieldsSupplyTypes.description.length > 250){
                            setIsActionBlock(false);
                            return reject('¡La descripción sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexDescription.test(isTextFieldsSupplyTypes.description.trim())){
                            setIsActionBlock(false);
                            return reject('¡El descripción no es válida, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplyTypeAdd(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
     // Retorno de la función del hook
     return handleSupplyTypeAdd
}
// Hook para filtrar los proveedores por su nombre ✔️
export const FilteredRecordsSuppliers = () => {
    // Constantes con el valor de los contextos
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSearchTerm2] = useContext(SearchTerm2Context);
    // Filtrado de datos
    const filteredRecordsSuppliers = isSuppliers.filter((data) => {
        return data.nombre.toLowerCase().includes(isSearchTerm2.toLowerCase());
    });
    // Retorno de la función del hook
    return filteredRecordsSuppliers
}
//Hook para editar un tipo de insumo desde el modal ✔️
export const HandleSupplyTypeEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsSupplyTypes] = useContext(TextFieldsSupplyTypesContext);
    const [isSupplyTypeEdit,setIsSupplyTypeEdit] = useContext(SupplyTypeEditContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSelectedRow1] = useContext(SelectedRow1Context);
    // Función del hook
    const handleSupplyTypeEdit = () => {
        if(currentNView === 'Supply-Types' && currentSView === 'Warehouse' && currentMView === 'Supply-Type-Edit'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplyTypes.type === isSelectedRow1.tipo && isTextFieldsSupplyTypes.description === isSelectedRow1.descripcion && isTextFieldsSupplyTypes.idunits === isSelectedRow1.idmedida){
                            setIsActionBlock(false);
                            return reject('¡No hay modificaciones en los datos!...');
                        }
                        
                        if(isTextFieldsSupplyTypes.type === '' || isTextFieldsSupplyTypes.idunits === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del tipo de insumo!...');
                        };

                        if(isSelectedRow1.tipo !== isTextFieldsSupplyTypes.type){
                            const exists = isSupplyTypes.some(type => type.tipo === isTextFieldsSupplyTypes.type);

                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Tipo de insumo ya existente!...');
                            }
                        }

                        if(isSelectedRow1.idmedida !== isTextFieldsSupplyTypes.idunits){
                            const exists = isSupplyTypes.some(type => type.tipo === isTextFieldsSupplyTypes.type && type.idmedida === isTextFieldsSupplyTypes.idunits);

                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Tipo de insumo ya existente!...');
                            }
                        }

                        const regexType = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexDescription = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9.,;:()\- ]*$/;

                        if(isTextFieldsSupplyTypes.type.length > 150){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexType.test(isTextFieldsSupplyTypes.type.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!...');
                        }

                        if(isTextFieldsSupplyTypes.description.length > 250){
                            setIsActionBlock(false);
                            return reject('¡La descripción sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexDescription.test(isTextFieldsSupplyTypes.description.trim())){
                            setIsActionBlock(false);
                            return reject('¡El descripción no es válida, solo permite letras, números, espacios y algunos caracteres especiales!...');
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplyTypeEdit(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
     // Retorno de la función del hook
     return handleSupplyTypeEdit
}
//Hook para agregar una medida desde el modal ✔️
export const HandleUnitAdd = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsUnits] = useContext(TextFieldsUnitsContext);
    const [isUnits] = useContext(UnitsContext);
    const [isUnitAdd,setIsUnitAdd] = useContext(UnitAddContext);
    // Función del hook
    const handleUnitAdd = (state) => {
        if(currentNView === 'Supply-Types' && currentSView === 'Warehouse' && currentMView === 'Unit-Add'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsUnits.extent === '' || isTextFieldsUnits.unit === '' || isTextFieldsUnits.amount === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la medida!...');
                        };


                        if(state === 'Nuevo'){
                            const exists = isUnits.some(unit => unit.medida === isTextFieldsUnits.extent);
                            
                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Medida ya existente!...');
                            }
                        }
                        
                        if(state === 'Existente'){
                            const exists = isUnits.some(unit => unit.medida === isTextFieldsUnits.extent && unit.cantidad === isTextFieldsUnits.amount);

                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Medida ya existente!...');
                            }
                        }

                        const regexExtent = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexAmount = /^\d+\.\d+$/;
                        
                        if(isTextFieldsUnits.extent.length > 20){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexExtent.test(isTextFieldsUnits.extent.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!...');
                        }

                        if(parseFloat(isTextFieldsUnits.amount) <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, debe ser mayor a 0!...');
                        }

                        if(isTextFieldsUnits.amount > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede el valor máximo permitido!...')
                        }

                        if(!regexAmount.test(isTextFieldsUnits.amount)){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, solo permite números decimales!...')
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUnitAdd(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
     // Retorno de la función del hook
     return handleUnitAdd
}
//Hook para editar una medida desde el modal ✔️
export const HandleUnitEdit = () => {
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsUnits] = useContext(TextFieldsUnitsContext);
    const [isUnits] = useContext(UnitsContext);
    const [isUnitEdit,setIsUnitEdit] = useContext(UnitEditContext);
    const [isSelectedRow2] = useContext(SelectedRow2Context);
    // Función del hook
    const handleUnitEdit = () => {
        if(currentNView === 'Supply-Types' && currentSView === 'Warehouse' && currentMView === 'Unit-Edit'){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isSelectedRow2.medida === isTextFieldsUnits.extent && isSelectedRow2.unidad === isTextFieldsUnits.unit && isSelectedRow2.cantidad === isTextFieldsUnits.amount){
                            setIsActionBlock(false);
                            return reject('¡No hay modificaciones en los datos!...');
                        }

                        if(isTextFieldsUnits.extent === '' || isTextFieldsUnits.unit === '' || isTextFieldsUnits.amount === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información de la medida!...');
                        };

                        if(isTextFieldsUnits.extent !== isSelectedRow2.medida){
                            const exists = isUnits.some(unit => unit.medida === isTextFieldsUnits.extent);
                        
                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Medida ya existente!...');
                            }
                        }

                        if(isTextFieldsUnits.extent === isSelectedRow2.medida){
                            const exists = isUnits.some(unit => unit.medida === isTextFieldsUnits.extent && unit.cantidad === isTextFieldsUnits.amount && unit.unidad === isTextFieldsUnits.unit);

                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Medida ya existente!...');
                            }
                        }

                        const regexExtent = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
                        const regexAmount = /^\d+\.\d+$/;

                        if(isTextFieldsUnits.extent.length > 20){
                            setIsActionBlock(false);
                            return reject('¡El nombre sobrepasa el límite de caracteres permitido!...');
                        }

                        if(!regexExtent.test(isTextFieldsUnits.extent.trim())){
                            setIsActionBlock(false);
                            return reject('¡El nombre no es válido, solo permite letras y espacios!...');
                        }

                        if(parseFloat(isTextFieldsUnits.amount) <= 0){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, debe ser mayor a 0!...');
                        }

                        if(isTextFieldsUnits.amount > 999999.9999){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, excede el valor máximo permitido!...')
                        }

                        if(!regexAmount.test(isTextFieldsUnits.amount)){
                            setIsActionBlock(false);
                            return reject('¡La cantidad no es válida, solo permite números decimales!...')
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUnitEdit(true);
                        },500)
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando información!...');
        }
    }
     // Retorno de la función del hook
     return handleUnitEdit
}