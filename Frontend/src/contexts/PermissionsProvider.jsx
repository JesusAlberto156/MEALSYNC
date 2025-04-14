//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useContext, useState, useEffect,useRef } from "react"
// Servicios
import { decryptData,encryptData } from "../services/Crypto";
// Contextos
import { selectContext,checkboxContext,nameContext,passwordContext } from "./FormsProvider";
import { modalViewContext,themeModeContext } from "./ViewsProvider";
import { actionBlockContext,selectedRowContext,verificationBlockContext,typeUserContext } from "./VariablesProvider";
import { usersContext,userContext } from "./UsersProvider";
import { logContext,loggedContext } from "./SessionProvider";
import { socketContext } from "./SocketProvider";
// Contextos personalizados
export const permissionsContext = createContext(null);
export const permissionContext = createContext(null);
export const permissionsAddContext = createContext(null);
export const permissionsEditContext = createContext(null);
export const permissionsEnableContext = createContext(null);
// Estilos personalizados
import { Alert_Verification,Alert_Warning } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Función contexto para controlar los datos de la base de datos de los permisos de los usuarios
export const Permissions = ({ children }) => {
    // constantes con contextos perzonalizados
    // constantes con contextos perzonalizados
    const [isLogged] = useContext(loggedContext); 
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isLog,setIsLog] = useContext(logContext);   
    const [isUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [themeMode] = useContext(themeModeContext);
    const [socket] = useContext(socketContext);
    const alertShown = useRef(false);
    // UseState para controlar el valor del contexto
    const [isPermissions,setIsPermissions] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('permissions');

        socket.on('permissions',(result) => {
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
            socket.off('permissions');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLogged && isPermissions.length !== 0 && isUser.length !== 0 && !alertShown.current){
            const user = isPermissions.find(user => user.idusuario === isUser.idusuario);
            if(user){
                if(!user.superadministrador){
                    if(isTypeUser === 'Cook' && !user.cocinero || 
                        isTypeUser === 'Nutritionist' && !user.nutriologo ||
                        isTypeUser === 'Doctor' && !user.medico ||
                        isTypeUser === 'Administrator' && !user.administrador ||
                        isTypeUser === 'Chef' && !user.chef ||
                        isTypeUser === 'Storekeeper' && !user.almacenista){
                        alertShown.current = true;
                        Alert_Warning('MEALSYNC','¡Ha perdido su permiso de acceso, por un administrador!...',themeMode);
                        setTimeout(() => {
                            setIsLog(true);
                        },3000);
                    }else{
                        const jsonPermission = JSON.stringify(user);
                        const encryptedPermission = encryptData(jsonPermission);
                        if(encryptedPermission){
                            sessionStorage.setItem('Permission',encryptedPermission);
                            setIsPermission(JSON.parse(jsonPermission));
                        }else{
                            return console.log('¡Error al encriptar las credenciales!...');
                        }
                    }
                }else{
                    const jsonPermission = JSON.stringify(user);
                    const encryptedPermission = encryptData(jsonPermission);
                    if(encryptedPermission){
                        sessionStorage.setItem('Permission',encryptedPermission);
                        setIsPermission(JSON.parse(jsonPermission));
                    }else{
                        return console.log('¡Error al encriptar las credenciales!...');
                    }
                }
            }
        }
    },[isPermissions]);
    // Return para darle valor al contexto y heredarlo
    return (
        <permissionsContext.Provider value={[isPermissions,setIsPermissions]}>
            {children}
        </permissionsContext.Provider>
    );
}
// Función contexto para controlar los datos de los permisos del usuario activo
export const Permission = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isPermission,setIsPermission] = useState(() => {
        const StoredData = sessionStorage.getItem('Permission');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('¡Datos de usuario cargados correctamente!...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('¡Error al desencriptar datos del sessionStorage!...');
                    return [];
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return [];
            }
        }else{
            return [];
        }
    });
    // Return para darle valor al contexto y heredarlo
    return (
        <permissionContext.Provider value={[isPermission,setIsPermission]}>
            {children}
        </permissionContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los permisos de un usuario
export const Permissions_Add = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isSelect,setIsSelect] = useContext(selectContext);
    const { currentMView,setCurrentMView,isModal,setIsModal } = useContext(modalViewContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isCheckbox,setIsCheckbox] = useContext(checkboxContext);
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isPermissionsAdd,setIsPermissionsAdd] = useState(false);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isPermissionsAdd){
            if(isSelect.length !== 0){
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setTimeout(() => {
                            if(isCheckbox.length !== 0){
                                let Administrator = 0,Chef = 0,Storekeeper = 0,Cook = 0,Nutritionist = 0,Doctor = 0;
                                isCheckbox.map(permission => {
                                    if(permission.name === 'Administrator' && permission.value) Administrator = 1 
                                    if(permission.name === 'Chef' && permission.value) Chef = 1 
                                    if(permission.name === 'Storekeeper' && permission.value) Storekeeper = 1 
                                    if(permission.name === 'Cook' && permission.value) Cook = 1 
                                    if(permission.name === 'Nutritionist' && permission.value) Nutritionist = 1 
                                    if(permission.name === 'Doctor' && permission.value) Doctor = 1 
                                });
                                socket.emit('permissionsInsert',isSelect.value,isSelect.label,Administrator,Chef,Storekeeper,Cook,Nutritionist,Doctor);
                                
                                socket.on('permissionsInsert',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('permissions');
                                });
                            }else{
                                socket.emit('permissionsInsert',isSelect.value,isSelect.label,0,0,0,0,0,0);

                                socket.on('permissionsInsert',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('permissions');
                                });
                            }
                            
                            resolve('¡MEALSYNC agregó los permisos al usuario!...')
                            
                            setTimeout(() => {
                                setCurrentMView('');
                                setIsSelect([]);
                                setIsCheckbox([]);
                                setIsPermissionsAdd(false);
                                setIsActionBlock(false);
                            },500);

                            return () => {
                                socket.off('permissionsInsert');
                            }
                        },2000);
                    }catch(error){
                        setIsActionBlock(false);
                        setIsStatusAdd(false);
                        return reject('¡Ocurrio un error inesperado!...');
                    }
                });

                Alert_Verification(promise,'¡Agregando permisos a un usuario!...');
            }
        }
    },[isPermissionsAdd]);
    // Return para darle valor al contexto y heredarlo
    return (
        <permissionsAddContext.Provider value={[isPermissionsAdd,setIsPermissionsAdd]}>
            {children}
        </permissionsAddContext.Provider>
    );
}
// Función contexto para controlar los datos editados de los permisos de un usuario
export const Permissions_Edit = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isCheckbox,setIsCheckbox] = useContext(checkboxContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const { currentMView,setCurrentMView,isModal,setIsModal } = useContext(modalViewContext);
    const [isUsers] = useContext(usersContext);
    const [socket] = useContext(socketContext);
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
                                socket.emit('permissionsUpdateAll',isCheckbox.idusuario,user.usuario,isCheckbox.administrador,isCheckbox.chef,isCheckbox.almacenista,isCheckbox.cocinero,isCheckbox.nutriologo,isCheckbox.medico)
                                
                                socket.on('permissionsUpdateAll',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('permissions');
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
                                    socket.off('permissionsUpdateAll');
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
        <permissionsEditContext.Provider value={[isPermissionsEdit,setIsPermissionsEdit]}>
            {children}
        </permissionsEditContext.Provider>
    );
}
// Función Contexto para controlar los datos habilitados en el permiso del superadministrador de un usuario
export const Permissions_Enable = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isCheckbox,setIsCheckbox] = useContext(checkboxContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const { currentMView,setCurrentMView,isModal,setIsModal } = useContext(modalViewContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassowrd,setIsPassword] = useContext(passwordContext);
    const [isFormVerification,setIsFormVerification] = useContext(verificationBlockContext);
    const [isUsers] = useContext(usersContext);
    const [socket] = useContext(socketContext);
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
                                socket.emit('permissionsUpdateSuperAdmon',isPermissionsEnable.idusuario,user.usuario,0);
                                
                                socket.on('permissionsUpdateSuperAdmon',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('permissions');
                                });
                                resolve('¡MEALSYNC deshabilito el permiso al usuario!...')
                                
                                setTimeout(() => {
                                    setIsActionBlock(false);
                                    setIsPermissionsEnable([]);
                                    setIsSelectedRow(null);
                                    setCurrentMView('');
                                    setIsName('');
                                    setIsPassword('');
                                    setIsFormVerification(false);
                                },500);

                                return () => {
                                    socket.off('permissionsUpdateSuperAdmon');
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
                                socket.emit('permissionsUpdateSuperAdmon',isPermissionsEnable.idusuario,user.usuario,1);
                                
                                socket.on('permissionsUpdateSuperAdmon',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('permissions');
                                });
                                resolve('¡MEALSYNC Habilito el permiso al usuario!...')
                                
                                setTimeout(() => {
                                    setIsActionBlock(false);
                                    setIsPermissionsEnable([]);
                                    setIsSelectedRow(null);
                                    setCurrentMView('');
                                    setIsName('');
                                    setIsPassword('');
                                    setIsFormVerification(false);
                                },500);

                                return () => {
                                    socket.off('permissionsUpdateSuperAdmon');
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
        <permissionsEnableContext.Provider value={[isPermissionsEnable,setIsPermissionsEnable]}>
            {children}
        </permissionsEnableContext.Provider>
    );
}