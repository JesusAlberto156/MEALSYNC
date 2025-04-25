//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect,useRef } from "react"
import { Navigate } from "react-router-dom";
// Servicios
import { decryptData,encryptData } from "../services/Crypto";
// Contextos
export const UsersContext = createContext(null);
export const UserAddContext = createContext(null);
export const UserEditContext = createContext(null);
export const PermissionsContext = createContext(null);
export const PermissionsAddContext = createContext(null);
export const PermissionsEditContext = createContext(null);
export const PermissionsEnableContext = createContext(null);
export const StatusContext = createContext(null);
export const StatusAddContext = createContext(null);
export const StatusEnableContext = createContext(null);
export const UserTypesContext = createContext(null);
// Contextos personalizados
import { SocketContext } from "./SocketProvider";
import { LoggedLoggedContext,LoggedUserContext,LoggedTypeContext,LoggedLogContext,LoggedPermissionsContext } from "./SessionProvider";
import { ThemeModeContext,ModalViewContext,ModalContext } from "./ViewsProvider";
import { SelectContext,TextFieldsContext,RadioPermissionsContext,CheckboxContext,RadioStatusContext } from "./FormsProvider";
import { ActionBlockContext,SelectedRowContext,VerificationBlockContext,AnimationContext } from "./VariablesProvider";
// Estilos personalizados
import { Alert_Verification,Alert_Warning } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// ---------- USUARIOS
// Función contexto para controlar los datos de la base de datos de usuarios
export const Users = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isUsers,setIsUsers] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Users');

        socket.on('Users',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Usuarios obtenidos!...')
                setIsUsers(parsedData);
                
            }else{
                console.log('¡Error al desencriptar los usuarios!...');
                setIsUsers([]);
            }
        });

        return () => {
            socket.off('Users');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <UsersContext.Provider value={[isUsers,setIsUsers]}>
            {children}
        </UsersContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un usuario
export const User_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isUserAdd,setIsUserAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserAddContext.Provider value={[isUserAdd,setIsUserAdd]}>
            {children}
        </UserAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un usuario
export const User_Edit = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isUserEdit,setIsUserEdit] = useState(false);
    // UseEffect para editar datos a la base de datos
    
    // Return para darle valor al contexto y heredarlo
    return (
        <UserEditContext.Provider value={[isUserEdit,setIsUserEdit]}>
            {children}
        </UserEditContext.Provider>
    );
}
// ---------- USUARIOS
// ---------- PERMISOS
// Función contexto para controlar los datos de la base de datos de los permisos de los usuarios
export const Permissions = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [themeMode] = useContext(ThemeModeContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext); 
    // UseRef para las alertas
    const alertShow = useRef(false);
    // UseState para controlar el valor del contexto
    const [isPermissions,setIsPermissions] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Permissions');

        socket.on('Permissions',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Permisos de usuarios obtenidos!...')
                setIsPermissions(parsedData);
            }else{
                console.log('¡Error al desencriptar los permisos!...');
                setIsPermissions([]);
            }
        });

        return () => {
            socket.off('Permissions');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged && isPermissions.length !== 0 && isLoggedUser.length !== 0 && !alertShow.current){
            const user = isPermissions.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                if(!user.superadministrador){
                    if(isLoggedType === 'Cook' && !user.cocinero || 
                        isLoggedType === 'Nutritionist' && !user.nutriologo ||
                        isLoggedType === 'Doctor' && !user.medico ||
                        isLoggedType === 'Administrator' && !user.administrador ||
                        isLoggedType === 'Chef' && !user.chef ||
                        isLoggedType === 'Storekeeper' && !user.almacenista){
                        alertShow.current = true;
                        Alert_Warning('MEALSYNC','¡Ha perdido su permiso de acceso, por un administrador!...',themeMode);
                        setTimeout(() => {
                            setIsLoggedLog(true);
                        },3000);
                    }else{
                        const jsonPermission = JSON.stringify(user);
                        const encryptedPermission = encryptData(jsonPermission);
                        if(encryptedPermission){
                            sessionStorage.setItem('Permissions',encryptedPermission);
                            setIsLoggedPermissions(JSON.parse(jsonPermission));
                        }else{
                            return console.log('¡Error al encriptar las credenciales!...');
                        }
                    }
                }else{
                    const jsonPermission = JSON.stringify(user);
                    const encryptedPermission = encryptData(jsonPermission);
                    if(encryptedPermission){
                        sessionStorage.setItem('Permissions',encryptedPermission);
                        setIsLoggedPermissions(JSON.parse(jsonPermission));
                    }else{
                        return console.log('¡Error al encriptar las credenciales!...');
                    }
                }
            }
        }
    },[isPermissions]);
    // Return para darle valor al contexto y heredarlo
    return (
        <PermissionsContext.Provider value={[isPermissions,setIsPermissions]}>
            {children}
        </PermissionsContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los permisos de un usuario
export const Permissions_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isPermissionsAdd,setIsPermissionsAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <PermissionsAddContext.Provider value={[isPermissionsAdd,setIsPermissionsAdd]}>
            {children}
        </PermissionsAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de los permisos de un usuario
export const Permissions_Edit = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isCheckbox,setIsCheckbox] = useContext(CheckboxContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isUsers] = useContext(UsersContext);
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isPermissionsEdit,setIsPermissionsEdit] = useState(false);
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEdit){
            if(isCheckbox.length !== 0){
                const user = isUsers.find(user => user.idusuario === isCheckbox.idusuario);
                if(user){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setTimeout(() => {
                                socket.emit('Permissions-Update',isCheckbox.idusuario,user.usuario,isCheckbox.administrador,isCheckbox.chef,isCheckbox.almacenista,isCheckbox.cocinero,isCheckbox.nutriologo,isCheckbox.medico)
                                
                                socket.on('Permissions-Update',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('Permissions');
                                });
                                resolve('¡MEALSYNC edito los permisos al usuario!...')
                                
                                setTimeout(() => {
                                    setIsCheckbox([]);
                                    setIsActionBlock(false);
                                    setIsPermissionsEdit(false);
                                    setIsSelectedRow(null);
                                    setCurrentMView('');
                                },500);

                                return () => {
                                    socket.off('Permissions-Update');
                                }
                            },2000);
                        }catch(error){
                            setIsActionBlock(false);
                            setIsPermissionsEdit(false);
                            return reject('¡Ocurrio un error inesperado!...');
                        }
                    }); 
                    
                    Alert_Verification(promise,'¡Editando permisos a un usuario!...');
                }
            }
        }
    },[isPermissionsEdit]);
    // Return para darle valor al contexto y heredarlo
    return(
        <PermissionsEditContext.Provider value={[isPermissionsEdit,setIsPermissionsEdit]}>
            {children}
        </PermissionsEditContext.Provider>
    );
}
// Función Contexto para controlar los datos habilitados en el permiso del superadministrador de un usuario
export const Permissions_Enable = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isUsers] = useContext(UsersContext);
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isPermissionsEnable,setIsPermissionsEnable] = useState([]);
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEnable.length !== 0){
            const user = isUsers.find(user => user.idusuario === isPermissionsEnable.idusuario);
            if(user){
                if(isPermissionsEnable.superadministrador){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setTimeout(() => {
                                socket.emit('Permission-Update',isPermissionsEnable.idusuario,user.usuario,0);
                                
                                socket.on('Permission-Update',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('Permissions');
                                });
                                resolve('¡MEALSYNC deshabilito el permiso al usuario!...')
                                
                                setTimeout(() => {
                                    setIsActionBlock(false);
                                    setIsPermissionsEnable([]);
                                    setIsSelectedRow(null);
                                    setCurrentMView('');
                                    setIsVerificationBlock(false);
                                },500);

                                return () => {
                                    socket.off('Permission-Update');
                                }
                            },2000);
                        }catch(error){
                            setIsActionBlock(true);
                            setIsPermissionsEnable([]);
                            return reject('¡Ocurrio un error inesperado!...');
                        }
                    }); 
                    
                    Alert_Verification(promise,'¡Deshabilitando el permiso a un usuario!...');
                }else{
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setTimeout(() => {
                                socket.emit('Permission-Update',isPermissionsEnable.idusuario,user.usuario,1);
                                
                                socket.on('Permission-Update',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('Permissions');
                                });
                                resolve('¡MEALSYNC Habilito el permiso al usuario!...')
                                
                                setTimeout(() => {
                                    setIsActionBlock(false);
                                    setIsPermissionsEnable([]);
                                    setIsSelectedRow(null);
                                    setCurrentMView('');
                                    setIsVerificationBlock(false);
                                },500);

                                return () => {
                                    socket.off('Permission-Update');
                                }
                            },2000);
                        }catch(error){
                            setIsActionBlock(true);
                            setIsPermissionsEnable([]);
                            return reject('¡Ocurrio un error inesperado!...');
                        }
                    }); 
                    
                    Alert_Verification(promise,'¡Habilitando el permiso a un usuario!...');
                }
            }
        }
    },[isPermissionsEnable]);
    // Return para darle valor al contexto y heredarlo
    return(
        <PermissionsEnableContext.Provider value={[isPermissionsEnable,setIsPermissionsEnable]}>
            {children}
        </PermissionsEnableContext.Provider>
    );
}
// ---------- PERMISOS
// ---------- ESTATUS
export const Status = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [themeMode] = useContext(ThemeModeContext);
    const [socket] = useContext(SocketContext);
    // UseRef para las alertas
    const alertShow = useRef(false);
    // UseState para controlar el valor del contexto
    const [isStatus,setIsStatus] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('Status');

        socket.on('Status',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Estatus de usuarios obtenidos!....')
                setIsStatus(parsedData);
            }else{
                console.log('¡Error al desencriptar los estatus!...');
                setIsStatus([]);
            }
        });

        return () => {
            socket.off('Status');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged && isStatus.length !== 0 && isLoggedUser.length !== 0 && !alertShow.current){
            const user = isStatus.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                if(!user.habilitado){
                    alertShow.current = true;
                    Alert_Warning('MEALSYNC','¡Ha sido deshabilitado(a) por un administrador!...',themeMode);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    },3000);
                }
            }
        }
    },[isStatus]);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusContext.Provider value={[isStatus,setIsStatus]}>
            {children}
        </StatusContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los estatus de un usuario
export const Status_Add = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isStatusAdd,setIsStatusAdd] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusAddContext.Provider value={[isStatusAdd,setIsStatusAdd]}>
            {children}
        </StatusAddContext.Provider>
    );
}
// Función contexto para controlar los usuarios habilitados/deshabilitados 
export const Status_Enable = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isUsers] = useContext(UsersContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isStatusEnable,setIsStatusEnable] = useState([]);
    // UseEffect para actualizar datos a la base de datos
    useEffect(() => {
        if(isStatusEnable.length !== 0){
            const enable = isUsers.find(user => user.idusuario === isStatusEnable.idusuario);
            if(isStatusEnable.habilitado){
                if(enable){
                    const promise = new Promise(async (resolve,reject) => {
                        try{ 
                            setIsActionBlock(false); 
                            setTimeout(() => {
                                socket.emit('Status-Enable-Update',isStatusEnable.idusuario,enable.usuario,0);
        
                                socket.on('Status-Enable-Update',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('Status');
                                });
                                
                                resolve('¡MEALSYNC deshabilito al usuario!...')

                                setTimeout(() => {
                                    setCurrentMView('');
                                    setIsStatusEnable([]);
                                    setIsSelectedRow(null);
                                    setIsVerificationBlock(false);
                                },500);

                                return () => {
                                    socket.off('Status-Enable-Update');
                                }
                            },2000);
                        }catch(error){
                            setIsActionBlock(true);
                            reject('¡Ocurrio un error inesperado!...');
                        }
                    });

                    Alert_Verification(promise,'¡Deshabilitando usuario!...');
                }
            }else if(!isStatusEnable.habilitado){
                if(enable){
                    const promise = new Promise(async (resolve,reject) => {
                        try{  
                            setIsActionBlock(false);   
                            setTimeout(() => {
                                socket.emit('Status-Enable-Update',isStatusEnable.idusuario,enable.usuario,1);

                                socket.on('Status-Enable-Update',(message,user) => {
                                    console.log(message,user);              
                                    socket.emit('Status');
                                });

                                resolve('¡MEALSYNC habilito al usuario!...')
                                
                                setTimeout(() => {
                                    setCurrentMView('');
                                    setIsStatusEnable([]);
                                    setIsSelectedRow(null);
                                    setIsVerificationBlock(false);
                                },500);

                                return () => {
                                    socket.off('Status-Enable-Update');
                                }
                            },2000);
                        }catch(error){
                            setIsActionBlock(true);
                            reject('¡Ocurrio un error inesperado!...');
                        }
                    });

                    Alert_Verification(promise,'¡Habilitando usuario!...');
                }
            }
        }
    },[isStatusEnable]);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusEnableContext.Provider value={[isStatusEnable,setIsStatusEnable]}>
            {children}
        </StatusEnableContext.Provider>
    );
}
// ---------- ESTATUS
// ---------- TIPOS DE USUARIOS
// Función contexto para controlar los datos de la base de datos de tipos de usuarios
export const User_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isUserTypes,setIsUserTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('User-Types');

        socket.on('User-Types',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Tipos de Usuarios obtenidos!...')
                setIsUserTypes(parsedData);
                
            }else{
                console.log('¡Error al desencriptar los usuarios!...');
                setIsUserTypes([]);
            }
        });

        return () => {
            socket.off('User-Types');
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserTypesContext.Provider value={[isUserTypes,setIsUserTypes]}>
            {children}
        </UserTypesContext.Provider>
    );
}
// ---------- TIPOS DE USUARIOS