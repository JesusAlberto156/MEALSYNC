//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedLogContext,LoggedUserContext } from "../contexts/SessionProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext,TextFieldsSupplierContext,TextFieldsSupplyContext } from "../contexts/FormsProvider";
import { UsersContext,UserAddContext,UserEditContext,PermissionsContext,StatusContext,PermissionsAddContext,PermissionsEditContext,PermissionsEnableContext,StatusAddContext,StatusEnableContext } from "../contexts/UsersProvider";
import { SuppliersContext,SupplierAddContext,SupplierEditContext } from "../contexts/SuppliersProvider";
import { SuppliesContext,SupplyAddContext,SupplyEditContext } from "../contexts/WarehouseProvider";
import { VerificationBlockContext,ActionBlockContext,SelectedRowContext,ViewPasswordContext } from "../contexts/VariablesProvider";
import { NavbarViewContext,SidebarViewContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
// Hooks personalizados
import { ResetTextFieldsUser } from "./Texts";
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
// Hook para comprobar el inicio de sesión
export const HandleVerificationBlock = () => {
    // Constantes con el valor de los contextos 
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleVerificationBlock = async () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setIsVerificationBlock(true);
                setTimeout(() => {
                    if(isLoggedUser.length !== 0){
                        if(isTextFieldsUser.user === '' || isTextFieldsUser.password === ''){
                            setIsVerificationBlock(false);
                            return reject('¡Falta escribir el nombre de usuario o la contraseña del usuario!...');
                        }
                        if(isTextFieldsUser.user === isLoggedUser.usuario && isTextFieldsUser.password === isLoggedUser.contrasena){
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
// Hook para agregar un usuario desde el modal
export const HandleUserAdd = () => {
    // Constantes con el valor de los contextos 
    const [isUserAdd,setIsUserAdd] = useContext(UserAddContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    // Función del hook
    const handleUserAdd = () => {
        if(currentNView === 'Users' && currentSView === 'Users' && currentMView === 'User-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsUser.name === '' || isTextFieldsUser.shortName === '' || isTextFieldsUser.user === '' || isTextFieldsUser.password === '' || isTextFieldsUser.userTypes === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del usuario!...')
                        };
                        if(isTextFieldsUser.permissions === ''){
                            setIsActionBlock(false);
                            return reject('¡Los permisos del usuario no han sido seleccionados!...')
                        };

                        if(isTextFieldsUser.status === ''){
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
// Hook para editar un usuario desde el modal
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
    // Función del hook
    const handleUserAdd = () => {
        if(currentNView === 'Users' && currentSView === 'Users' && currentMView === 'User-Edit'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsUser.name === '' || isTextFieldsUser.shortName === '' || isTextFieldsUser.user === '' || isTextFieldsUser.password === '' || isTextFieldsUser.userTypes === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del usuario!...')
                        };
                        if(isTextFieldsUser.name === isSelectedRow.nombre && isTextFieldsUser.shortName === isSelectedRow.nombrecorto &&  isTextFieldsUser.user === isSelectedRow.usuario && isTextFieldsUser.password === isSelectedRow.contrasena && isTextFieldsUser.userTypes === isSelectedRow.idtipo){
                            setIsActionBlock(false);
                            return reject('¡No hay información del usuario modificada!...')
                        };

                        if(isSelectedRow.usuario !== isTextFieldsUser.user){
                            if(isUsers.some(user => user.usuario === isTextFieldsUser.user)){
                                setIsActionBlock(false);
                                return reject('¡Usuario ya existente!...');
                            }
                        }
                        
                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsUserEdit(true);
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetTextFieldsUser = ResetTextFieldsUser();
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
                            
                            resetTextFieldsUser();
                            setIsModal(false);
                            navigate('/Administration/Index/Users',{ replace: true });
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
// Hook para filtrar los usuarios cuando no tiene permisos
export const FilteredRecordsHasPermissions = () => {
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
// Hook para agregar los permisos a un usuario desde el modal
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
        if(currentNView === 'Permissions' && currentSView === 'Users' && currentMView === 'Permissions-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsPermissions.iduser === 0 && isTextFieldsPermissions.user === ''){
                            setIsActionBlock(false);
                            return reject('¡No ha seleccionado un usuario!...')
                        };

                        resolve('¡Usuario seleccionado!...');
                        
                        setTimeout(() => {
                            setIsPermissionsAdd(true);
                        },500);
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
    return handlePermissionsAdd;
}
// Hook para editar los permisos a un usuario desde el modal
export const HandlePermissionsEdit = () => {
    // Constantes con el valor de los contextos 
    const [isPermissionsEdit,setIsPermissionsEdit] = useContext(PermissionsEditContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handlePermissionsEdit = () => {
        if(isSelectedRow !== null){
            if(currentNView === 'Permissions' && currentSView === 'Users' && currentMView === 'Permissions-Edit'){
                setIsActionBlock(true);
                setIsPermissionsEdit(true);
            }
        }
    }
    // Retorno de la función del hook
    return handlePermissionsEdit;
}
// Hook para habilitar/deshabilitar el permiso de superadminitrador a un usuario desde el modal
export const HandlePermissionsEnable = () => {
    // Constantes con el valor de los contextos 
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handlePermissionsEnable = () => {
        if(isSelectedRow !== null){
            if(currentNView === 'Permissions' && currentSView === 'Users' && currentMView === 'Permissions-Enable'){
                setIsPermissionsEnable(isSelectedRow);
                setIsActionBlock(false);
            }
        }
    }
    // Retorno de la función del hook
    return handlePermissionsEnable;
}
// Hook para filtrar los usuarios cuando no tiene estatus
export const FilteredRecordsHasStatus = () => {
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
// Hook para agregar un estatus a un usuario desde el modal
export const HandleStatusSAdd = () => {
    // Constantes con el valor de los contextos 
    const [isStatusAdd,setIsStatusAdd] = useContext(StatusAddContext);
    const [isTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // Función del hook
    const handleStatusSAdd = () => {
        if(currentNView === 'Status' && currentSView === 'Users' && currentMView === 'Status-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsStatus.iduser === 0 && isTextFieldsStatus.user === ''){
                            setIsActionBlock(false);
                            return reject('¡No ha seleccionado un usuario!...')
                        };
                        if(isTextFieldsStatus.status === ''){
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
    return handleStatusSAdd;
}
// Hook para habilitar a un usuario desde el modal
export const HandleStatusEnable = () => {
    // Constantes con el valor de los contextos 
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentMView] = useContext(ModalViewContext);
    // Función del hook
    const handleStatusEnable = () => {
        if(isSelectedRow !== null){
            if(currentNView === 'Status' && currentSView === 'Users' && currentMView === 'Status-Enable'){
                setIsStatusEnable(isSelectedRow);
                setIsActionBlock(false);
            }
        }
    }
    // Retorno de la función del hook
    return handleStatusEnable;
}
// Hook para agregar un porveedor desde el modal
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
        if(currentNView === 'Suppliers' && currentSView === 'Suppliers' && currentMView === 'Supplier-Add'){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupplier.name === '' || isTextFieldsSupplier.rfc === '' || isTextFieldsSupplier.address === '' || isTextFieldsSupplier.phone === '' || isTextFieldsSupplier.email === ''){
                            setIsActionBlock(false);
                            return reject('¡Falta información del proveedor!...')
                        };

                        if(isSuppliers.some(supplier => supplier.nombre === isTextFieldsSupplier.name)){
                            setIsActionBlock(false);
                            return reject('¡Proveedor ya existente!...');
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplierAdd(true);
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
    return handleSupplierAdd;
}
// Hook para editar un porveedor desde el modal
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
        if(isSelectedRow !== null){
            if(currentNView === 'Suppliers' && currentSView === 'Suppliers' && currentMView === 'Supplier-Edit'){
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setIsActionBlock(true);
                        setTimeout(() => {
                            if(isTextFieldsSupplier.name === '' || isTextFieldsSupplier.rfc === '' || isTextFieldsSupplier.address === '' || isTextFieldsSupplier.phone === '' || isTextFieldsSupplier.email === ''){
                                setIsActionBlock(false);
                                return reject('¡Falta información del proveedor!...')
                            };
    
                            if(isTextFieldsSupplier.name === isSelectedRow.nombre && isTextFieldsSupplier.rfc === isSelectedRow.rfc &&  isTextFieldsSupplier.address === isSelectedRow.domicilio && isTextFieldsSupplier.phone === isSelectedRow.telefono && isTextFieldsSupplier.email === isSelectedRow.correo){
                                setIsActionBlock(false);
                                return reject('¡No hay información del proveedor modificada!...')
                            };

                            if(isSelectedRow.nombre !== isTextFieldsSupplier.name){
                                if(isSuppliers.some(supplier => supplier.nombre === isTextFieldsSupplier.name)){
                                    setIsActionBlock(false);
                                    return reject('¡Proveedor ya existente!...');
                                }
                            }
                            
                            resolve('¡Información verificada!...');
                            
                            setTimeout(() => {
                                setIsSupplierEdit(true);
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
    }
    // Retorno de la función del hook
    return handleSupplierEdit;
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
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupply.name === '' || isTextFieldsSupply.description === '' || isTextFieldsSupply.image === '' || isTextFieldsSupply.supplier === 0 || isTextFieldsSupply.type === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del insumo!...');
                        };

                        const exists = isSupplies.some(supply => supply.nombre === isTextFieldsSupply.name && supply.idproveedor === isTextFieldsSupply.supplier);
                        
                        if(exists){
                            setIsActionBlock(false);
                            return reject('¡Insumo con el proveedor ya existente!...');
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplyAdd(true);
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
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        if(isTextFieldsSupply.name === '' || isTextFieldsSupply.description === '' || isTextFieldsSupply.image === '' || isTextFieldsSupply.supplier === 0 || isTextFieldsSupply.type === 0){
                            setIsActionBlock(false);
                            return reject('¡Falta información del insumo!...');
                        };

                        if(isTextFieldsSupply.name === isSelectedRow.nombre && isTextFieldsSupply.description === isSelectedRow.descripcion && isTextFieldsSupply.image === isSelectedRow.imagen && isTextFieldsSupply.supplier === isSelectedRow.idproveedor && isTextFieldsSupply.type === isSelectedRow.idtipo){
                            setIsActionBlock(false);
                            return reject('¡No hay información del insumo modificada!...')
                        }

                        if(isTextFieldsSupply.name !== isSelectedRow.nombre){
                            const exists = isSupplies.some(supply => supply.nombre === isTextFieldsSupply.name && supply.idproveedor === isTextFieldsSupply.supplier);
                        
                            if(exists){
                                setIsActionBlock(false);
                                return reject('¡Insumo con el proveedor ya existente!...');
                            }
                        }

                        resolve('¡Información verificada!...');
                        
                        setTimeout(() => {
                            setIsSupplyEdit(true);
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
     return handleSupplyEdit
}