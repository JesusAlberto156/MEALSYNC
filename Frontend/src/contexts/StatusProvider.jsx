import { createContext, useContext, useState, useEffect, useRef } from "react"
import { decryptData } from "../services/Crypto";

export const statusAllContext = createContext(null);
export const statusUserContext = createContext(null);
export const statusAddContext = createContext(null);
export const statusEnableContext = createContext(null);
export const statusDeleteContext = createContext(null);

import { socketContext } from "./SocketProvider";
import { loggedContext,logContext } from "./SessionProvider";
import { userContext,usersContext } from "./UsersProvider";
import { toastContext } from "./VariablesProvider";

import { Alert_Verification,Alert_Warning } from "../components/styled/Notifications";

export const StatusAll = ({ children }) => {

    const [socket] = useContext(socketContext);
    const [isLogged] = useContext(loggedContext); 
    const [isLog,setIsLog] = useContext(logContext);   
    const [isUser] = useContext(userContext);

    const [isStatusAll,setIsStatusAll] = useState([]);

    useEffect(() => {
        socket.emit('status');

        socket.on('status',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('Estatus de usuarios obtenidos....')
                setIsStatusAll(parsedData);
            }else{
                console.log('Error al desencriptar estatus...');
                setIsStatusAll([]);
            }
        });

        return () => {
            socket.off('status');
        }
    },[]);

    const alertShown = useRef(false);

    useEffect(() => {
        if(isLogged && isUser !== 0 && !alertShown.current){
            const user = isStatusAll.find(user => user.idusuario === isUser.idusuario);
            if(user){
                if(!user.habilitado){
                    Alert_Warning('MEALSYNC','¡Ha sido deshabilitado(a) por un administrador!...');
                    setTimeout(() => {
                        setIsLog(false);
                    },3000);
                }
            }else if (!user){
                Alert_Warning('MEALSYNC','¡Ha perdido su estatus por un administrador!...');
                setTimeout(() => {
                    setIsLog(false);
                },3000);
            }
        }
    },[isStatusAll]);

    return (
        <statusAllContext.Provider value={[isStatusAll,setIsStatusAll]}>
            {children}
        </statusAllContext.Provider>
    );
}

export const StatusUser = ({ children }) => {

    const [isStatusUser,setIsStatusUser] = useState(() => {
        const StoredData = sessionStorage.getItem('Status');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Estatus de la sesión cargados correctamente...');
                    return JSON.parse(decryptedData);
                }else{
                    console.log('Error al desencriptar el estatus de la sesión...');
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

    return (
        <statusUserContext.Provider value={[isStatusUser,setIsStatusUser]}>
            {children}
        </statusUserContext.Provider>
    );
}

export const StatusAdd = ({ children }) => {

    const [isStatusAdd,setIsStatusAdd] = useState([]);

    

    return (
        <statusAddContext.Provider value={[isStatusAdd,setIsStatusAdd]}>
            {children}
        </statusAddContext.Provider>
    );
}

export const StatusEnable = ({ children }) => {
    
    const [isUsers] = useContext(usersContext);
    const [isToast,setIsToast] = useContext(toastContext);
    const [socket] = useContext(socketContext);

    const [isStatusEnable,setIsStatusEnable] = useState([]);

    useEffect(() => {
        if(isStatusEnable.length !== 0){
            const enable = isUsers.find(user => user.idusuario === isStatusEnable.idusuario);
            if(isStatusEnable.habilitado){
                if(enable){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setIsToast(true);
        
                            setTimeout(() => {
                                socket.emit('statusDisable',isStatusEnable.idusuario,enable.usuario);
        
                                socket.on('statusDisable',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('status');
                                });
                                
                                resolve('¡MEALSYNC deshabilito al usuario!...')

                                return () => {
                                    socket.off('statusDisable');
                                }
                            },500);
        
                            setTimeout(() => {
                                setIsToast(false);
                            },1800);
        
                        }catch(error){
                            reject('¡Ocurrio un error inesperado!...');
                        }
                    });
        
                    Alert_Verification(promise,'¡Deshabilitando usuario!...');
                }
            }else if(!isStatusEnable.habilitado){
                if(enable){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setIsToast(true);
        
                            setTimeout(() => {
                                socket.emit('statusEnable',isStatusEnable.idusuario,enable.usuario);

                                socket.on('statusEnable',(message,user) => {
                                    console.log(message,user);              
                                    socket.emit('status');
                                });

                                resolve('¡MEALSYNC habilito al usuario!...')

                                return () => {
                                    socket.off('statusEnable');
                                }
                            },500);
        
                            setTimeout(() => {
                                setIsToast(false);
                            },1800);
        
                        }catch(error){
                            reject('¡Ocurrio un error inesperado!...');
                        }
                    });
        
                    Alert_Verification(promise,'¡Habilitando usuario!...');
                }
            }
        }
    },[isStatusEnable]);

    return (
        <statusEnableContext.Provider value={[isStatusEnable,setIsStatusEnable]}>
            {children}
        </statusEnableContext.Provider>
    );
}

export const StatusDelete = ({ children }) => {

    const [isUsers] = useContext(usersContext);
    const [isToast,setIsToast] = useContext(toastContext);
    const [socket] = useContext(socketContext);

    const [isStatusDelete,setIsStatusDelete] = useState([]);

    useEffect(() => {
        if(isStatusDelete.length !== 0){
            const Delete = isUsers.find(user => user.idusuario === isStatusDelete.idusuario);
            if(Delete){
                const promise = new Promise(async (resolve,reject) => {
                    try{
    
                        setIsToast(true);
    
                        setTimeout(() => {
                            resolve('¡MEALSYNC elimino el estatus del usuario!...')
                        },1000);
    
                        setTimeout(() => {
                            setIsToast(false);
    
                            socket.emit('statusDelete',isStatusDelete.idusuario,Delete.usuario);
    
                            socket.on('statusDelete',(message,user) => {
                                console.log(message,user);
                                socket.emit('status');
                            });
    
                            return () => {
                                socket.off('statusDelete');
                            }
                        },2000);
    
                    }catch(error){
                        reject('¡Ocurrio un error inesperado!...');
                    }
                });
    
                Alert_Verification(promise,'¡Eliminado el estatus usuario!...');
            }
        }
    },[isStatusDelete]);

    return (
        <statusDeleteContext.Provider value={[isStatusDelete,setIsStatusDelete]}>
            {children}
        </statusDeleteContext.Provider>
    );
}