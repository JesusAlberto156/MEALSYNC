//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext,useContext,useState,useEffect } from "react"
// Servicios
import { decryptData,encryptData } from "../services/Crypto";
// Contextos
export const UsersContext = createContext(null);
export const UserAddContext = createContext(null);
export const UsersViewPasswordContext = createContext(null);
export const UserEditContext = createContext(null);
export const DeletedUsersContext = createContext(null);
export const UserDeleteContext = createContext(null);
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
import { UserUpdatedContext,PermissionUpdatedContext,ActionBlockContext } from "./VariablesProvider";
// Estilos personalizados
import { Alert_Swal_Warning,Alert_Swal_Success,Alert_Swal_Error } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Todos los contextos para las funcionalidades de las tablas de los usuarios  ✔️
export const Index_Users = ({children}) => {
    return(
        <Users>
            <User_Add>
                <Users_View_Password>
                    <User_Edit>
                        <Deleted_Users>
                            <User_Delete>
                                <Permissions>
                                    <Permissions_Add>
                                        <Permissions_Edit>
                                            <Permissions_Enable>
                                                <Status>
                                                    <Status_Add>
                                                        <Status_Enable>
                                                            <User_Types>
                                                                {children}
                                                            </User_Types>
                                                        </Status_Enable>
                                                    </Status_Add>
                                                </Status>
                                            </Permissions_Enable>
                                        </Permissions_Edit>
                                    </Permissions_Add>
                                </Permissions>
                            </User_Delete>
                        </Deleted_Users>
                    </User_Edit>
                </Users_View_Password>
            </User_Add>
        </Users>
    );
}

// ---------- USUARIOS
// Función contexto para controlar los datos de la base de datos de usuarios ✔️
export const Users = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // UseState para controlar el valor del contexto
    const [isUsers,setIsUsers] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleUsers = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Usuarios obtenidos!');
                    setIsUsers(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los usuarios!');
                    setIsUsers([]);
                }
            } catch (error) {
                console.error('Error al procesar los usuarios:', error);
                setIsUsers([]);
            }
        }

        socket.emit('Get-Users');
        socket.on('Get-Users',handleUsers);

        return () => {
            socket.off('Get-Users',handleUsers);
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged  && isLoggedUser.length !== 0){
            const user = isUsers.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                const userHasChanged = (
                    user.usuario !== isLoggedUser.usuario ||
                    user.contrasena !== isLoggedUser.contrasena
                );
                if (userHasChanged) {
                    Alert_Swal_Warning('¡Se han modificado los datos para iniciar sesión, por un administrador!');
                    setIsActionBlock(true);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    },3000);
                }
                if (!userHasChanged) {
                    const jsonUser = JSON.stringify(user);
                    const encryptedUser = encryptData(jsonUser);
                    if(encryptedUser){
                        sessionStorage.setItem('Usuario',encryptedUser);
                        setIsLoggedUser(JSON.parse(jsonUser));
                    }else{
                        return console.log('¡Error al encriptar las credenciales!');
                    }
                }
            }
        }
    },[isUsers]);
    // Return para darle valor al contexto y heredarlo
    return (
        <UsersContext.Provider value={[isUsers]}>
            {children}
        </UsersContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un usuario ✔️
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
// Función Contexto para controlar la vista de las contraseñas de los usuarios ✔️
export const Users_View_Password = ({children}) => {
    // UseState para controlar el valor del contexto
    const [isUsersViewPassword,setIsUsersViewPassword] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <UsersViewPasswordContext.Provider value={[isUsersViewPassword,setIsUsersViewPassword]}>
            {children}
        </UsersViewPasswordContext.Provider>
    );
}
// Función contexto para controlar los datos editados de un usuario ✔️
export const User_Edit = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isUserEdit,setIsUserEdit] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserEditContext.Provider value={[isUserEdit,setIsUserEdit]}>
            {children}
        </UserEditContext.Provider>
    );
}
// ---------- USUARIOS
// ---------- USUARIOS ELIMINADOS
// Función contexto para controlar los datos de la base de datos de usuarios eliminados ✔️
export const Deleted_Users = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext); 
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // UseState para controlar el valor del contexto
    const [isDeletedUsers,setIsDeletedUsers] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleDeletedUsers = (result) => {
            try {
                const decryptedData = decryptData(result);
                if (decryptedData) {
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Usuarios eliminados obtenidos!');
                    setIsDeletedUsers(parsedData);
                } else {
                    console.warn('¡Error al desencriptar los usuarios eliminados!');
                    setIsDeletedUsers([]);
                }
            } catch (error) {
                console.error('Error al procesar los usuarios eliminados:', error);
                setIsDeletedUsers([]);
            }
        }

        socket.emit('Get-Deleted-Users');
        socket.on('Get-Deleted-Users',handleDeletedUsers);

        return () => {
            socket.off('Get-Deleted-Users',handleDeletedUsers);
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged && isDeletedUsers.length !== 0 && isLoggedUser.length !== 0){
            const user = isDeletedUsers.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                Alert_Swal_Error('¡Su usuario ha sido eliminado, por un administrador!');
                setIsActionBlock(true);
                setTimeout(() => {
                    setIsLoggedLog(true);
                },3000);
            }
        }
    },[isDeletedUsers]);
    // Return para darle valor al contexto y heredarlo
    return (
        <DeletedUsersContext.Provider value={[isDeletedUsers]}>
            {children}
        </DeletedUsersContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de un usuario eliminado ✔️
export const User_Delete = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isUserDelete,setIsUserDelete] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserDeleteContext.Provider value={[isUserDelete,setIsUserDelete]}>
            {children}
        </UserDeleteContext.Provider>
    );
}
// ---------- USUARIOS ELIMINADOS
// ---------- PERMISOS
// Función contexto para controlar los datos de la base de datos de los permisos de los usuarios ✔️
export const Permissions = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext); 
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    const [isPermissionUpdated] = useContext(PermissionUpdatedContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // UseState para controlar el valor del contexto
    const [isPermissions,setIsPermissions] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handlePermissions = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Permisos de usuarios obtenidos!')
                    setIsPermissions(parsedData);
                }else{
                    console.log('¡Error al desencriptar los permisos!');
                    setIsPermissions([]);
                }
            } catch (error) {
                console.error('Error al procesar los permisos de los usuarios:', error);
                setIsPermissions([]);
            }
        }

        socket.emit('Get-Permissions');
        socket.on('Get-Permissions',handlePermissions);

        return () => {
            socket.off('Get-Permissions',handlePermissions);
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if (isLoggedLogged && isPermissionUpdated === 'super administrador') {
            const user = isPermissions.find(user => user.idusuario === isLoggedUser.idusuario && isLoggedUser.usuario === isUserUpdated);
            if (user) {
                

                if (!user.superadministrador) {
                    setIsUserUpdated('');
                    Alert_Swal_Warning('¡El super administrador ha sido deshabilitado!');
                    setIsActionBlock(true);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    }, 3000);
                    return;
                } 
                if(user.superadministrador) {
                    setIsUserUpdated('');
                    Alert_Swal_Success('¡El super administrador ha sido habilitado!');
                    setIsActionBlock(true);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    }, 3000);
                    return;
                }
            }
        }
        if (isLoggedLogged && isPermissionUpdated === 'permisos') {
            const user = isPermissions.find(user => user.idusuario === isLoggedUser.idusuario && isLoggedUser.usuario === isUserUpdated);
            if (user) {

                if (!user.superadministrador) {
                    if (
                        (isLoggedType === 'Cocinero' && !user.cocinero) ||
                        (isLoggedType === 'Nutriólogo' && !user.nutriologo) ||
                        (isLoggedType === 'Médico' && !user.medico) ||
                        (isLoggedType === 'Administrador' && !user.administrador) ||
                        (isLoggedType === 'Chef' && !user.chef) ||
                        (isLoggedType === 'Almacenista' && !user.almacenista)
                    ) {
                        Alert_Swal_Warning('¡Ha perdido su permiso de acceso, por un administrador!');
                        setIsActionBlock(true);
                        setTimeout(() => {
                            setIsLoggedLog(true);
                        }, 3000);
                        return;
                    }
                } 
                
                const jsonPermission = JSON.stringify(user);
                const encryptedPermission = encryptData(jsonPermission);
                if (encryptedPermission) {
                    sessionStorage.setItem('Permisos', encryptedPermission);
                    setIsLoggedPermissions(JSON.parse(jsonPermission));
                } else {
                    return console.log('¡Error al encriptar las credenciales!');
                }
            }
        }
    }, [isPermissions,isUserUpdated,isPermissionUpdated]);
    // Return para darle valor al contexto y heredarlo
    return (
        <PermissionsContext.Provider value={[isPermissions]}>
            {children}
        </PermissionsContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los permisos de un usuario ✔️
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
// Función contexto para controlar los datos editados de los permisos de un usuario ✔️
export const Permissions_Edit = ({ children }) => {
    // Constantes con el valor de los contextos
    const [socket] = useContext(SocketContext);
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    const [isPermissionUpdated,setIsPermissionUpdated] = useContext(PermissionUpdatedContext);
    // UseState para controlar el valor del contexto
    const [isPermissionsEdit,setIsPermissionsEdit] = useState(false);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleUpdatePermissions = (message1,permission,message2,user) => {
            console.log(message1,permission,message2,user);
            setIsUserUpdated(user);
            setIsPermissionUpdated(permission)
            socket.emit('Get-Permissions')
        };

        socket.on('Update-Permissions',handleUpdatePermissions);
        
        return () => {
            socket.off('Update-Permissions',handleUpdatePermissions);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return(
        <PermissionsEditContext.Provider value={[isPermissionsEdit,setIsPermissionsEdit]}>
            {children}
        </PermissionsEditContext.Provider>
    );
}
// Función Contexto para controlar los datos habilitados en el permiso del superadministrador de un usuario ✔️
export const Permissions_Enable = ({ children }) => {
    // Constantes con el valor de los contextos
    const [socket] = useContext(SocketContext);
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    const [isPermissionUpdated,setIsPermissionUpdated] = useContext(PermissionUpdatedContext)
    // UseState para controlar el valor del contexto
    const [isPermissionsEnable,setIsPermissionsEnable] = useState(false);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleUpdatePermission = (message1,user,message2,permission) => {
            console.log(message1,user,message2,permission);
            setIsUserUpdated(user);
            setIsPermissionUpdated(permission)
            socket.emit('Get-Permissions');
        };

        socket.on('Update-Permission',handleUpdatePermission);

        return () => {
            socket.off('Update-Permission',handleUpdatePermission);
        }
    },[])
    // Return para darle valor al contexto y heredarlo
    return(
        <PermissionsEnableContext.Provider value={[isPermissionsEnable,setIsPermissionsEnable]}>
            {children}
        </PermissionsEnableContext.Provider>
    );
}
// ---------- PERMISOS
// ---------- ESTATUS
// Función contexto para controlar los datos de la base de datos de estatus de usuarios✔️
export const Status = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [socket] = useContext(SocketContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    // UseState para controlar el valor del contexto
    const [isStatus,setIsStatus] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleStatus = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Estatus de usuarios obtenidos!')
                    setIsStatus(parsedData);
                }else{
                    console.log('¡Error al desencriptar los estatus!');
                    setIsStatus([]);
                }
            } catch (error) {
                console.error('Error al procesar los estatus de los usuario:', error);
                setIsStatus([]);
            }
        }

        socket.emit('Get-Status');
        socket.on('Get-Status',handleStatus);

        return () => {
            socket.off('Get-Status',handleStatus);
            socket.off('Update-Status-Log');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLoggedLogged && isStatus.length !== 0 && isLoggedUser.length !== 0){
            const user = isStatus.find(user => user.idusuario === isLoggedUser.idusuario);
            if(user){
                if(!user.habilitado){
                    Alert_Swal_Warning('¡Ha sido deshabilitado(a) por un administrador!');
                    setIsActionBlock(true);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    },3000);
                }
                if(!user.activo){
                    Alert_Swal_Warning('¡Parece que has iniciado sesión en otra pestaña o ha expirado su sesión!');
                    setIsActionBlock(true);
                    setTimeout(() => {
                        setIsLoggedLog(true);
                    },3000);
                }
            }
        }
    },[isStatus]);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusContext.Provider value={[isStatus]}>
            {children}
        </StatusContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los estatus de un usuario ✔️
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
// Función contexto para controlar los usuarios habilitados/deshabilitados ✔️
export const Status_Enable = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isStatusEnable,setIsStatusEnable] = useState(false);
    // Return para darle valor al contexto y heredarlo
    return (
        <StatusEnableContext.Provider value={[isStatusEnable,setIsStatusEnable]}>
            {children}
        </StatusEnableContext.Provider>
    );
}
// ---------- ESTATUS
// ---------- TIPOS DE USUARIOS
// Función contexto para controlar los datos de la base de datos de tipos de usuarios ✔️
export const User_Types = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(SocketContext);
    // UseState para controlar el valor del contexto
    const [isUserTypes,setIsUserTypes] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        const handleUserTypes = (result) => {
            try {
                const decryptedData = decryptData(result);
                if(decryptedData){
                    const parsedData = JSON.parse(decryptedData);
                    console.log('¡Tipos de usuario obtenidos!')
                    setIsUserTypes(parsedData);
                    
                }else{
                    console.log('¡Error al desencriptar los tipos de usuario!');
                    setIsUserTypes([]);
                }
            } catch (error) {
                console.error('Error al procesar los tipos de usuario:', error);
                setIsUserTypes([]);
            }
        }

        socket.emit('Get-User-Types');
        socket.on('Get-User-Types',handleUserTypes);

        return () => {
            socket.off('Get-User-Types',handleUserTypes);
        }
    },[]);
    // Return para darle valor al contexto y heredarlo
    return (
        <UserTypesContext.Provider value={[isUserTypes]}>
            {children}
        </UserTypesContext.Provider>
    );
}
// ---------- TIPOS DE USUARIOS