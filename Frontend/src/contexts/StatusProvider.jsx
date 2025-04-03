import { createContext, useContext, useState, useEffect, useRef } from "react"
import { decryptData } from "../services/Crypto";

export const statusAllContext = createContext(null);
export const statusUserContext = createContext(null);
export const statusAddContext = createContext(null);
export const statusEnableContext = createContext(null);
export const statusDeleteContext = createContext(null);

import { socketContext } from "./SocketProvider";
import { loggedContext,logContext } from "./SessionProvider";
import { modalViewContext } from "./ViewsProvider";
import { nameContext,passwordContext,selectContext,radioContext } from "./FormsProvider";
import { userContext,usersContext } from "./UsersProvider";
import { selectedRowContext,comprobationContext,blockContext } from "./VariablesProvider";

import { Alert_Verification,Alert_Warning } from "../components/styled/Alerts";

export const Status_All = ({ children }) => {

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
        if(isLogged && isStatusAll.length !== 0 && isLog && isUser.length !== 0 && !alertShown.current){
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

export const Status_User = ({ children }) => {

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

export const Status_Add = ({ children }) => {

    const [isSelect,setIsSelect] = useContext(selectContext);
    const [isRadio,setIsRadio] = useContext(radioContext);
    const [currentView,setCurrentView] = useContext(modalViewContext);
    const [isBlock,setIsBlock] = useContext(blockContext);
    const [socket] = useContext(socketContext);

    const [isStatusAdd,setIsStatusAdd] = useState(false);

    useEffect(() => {
        if(isStatusAdd){
            if(isSelect.length !== 0 && isRadio !== ''){
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setTimeout(() => {
                            socket.emit('statusInsert',isSelect.value,isRadio === 'Habilitado' ? 1:0,isSelect.label);

                            socket.on('statusInsert',(message,user) => {
                                console.log(message,user);
                                socket.emit('status');
                            });
                            
                            resolve('¡MEALSYNC agregó el status al usuario!...')
                            
                            setTimeout(() => {
                                setCurrentView('');
                                setIsRadio('');
                                setIsSelect([]);
                                setIsStatusAdd(false);
                                setIsBlock(false);
                            },500);

                            return () => {
                                socket.off('statusInsert');
                            }
                        },2000);
                    }catch(error){
                        setIsBlock(false);
                        setIsStatusAdd(false);
                        reject('¡Ocurrio un error inesperado!...');
                    }
                });

                Alert_Verification(promise,'¡Agregando estatus a un usuario!...');
            }
        }
    },[isStatusAdd])

    return (
        <statusAddContext.Provider value={[isStatusAdd,setIsStatusAdd]}>
            {children}
        </statusAddContext.Provider>
    );
}

export const Status_Enable = ({ children }) => {
    
    const [isUsers] = useContext(usersContext);
    const [currentView,setCurrentView] = useContext(modalViewContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isComprobation,setIsComprobation] = useContext(comprobationContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassowrd,setIsPassword] = useContext(passwordContext);
    const [isBlock,setIsBlock] = useContext(blockContext);
    const [socket] = useContext(socketContext);

    const [isStatusEnable,setIsStatusEnable] = useState([]);

    useEffect(() => {
        if(isStatusEnable.length !== 0){
            const enable = isUsers.find(user => user.idusuario === isStatusEnable.idusuario);
            if(isStatusEnable.habilitado){
                if(enable){
                    const promise = new Promise(async (resolve,reject) => {
                        try{
                            setIsComprobation(false); 
                            setTimeout(() => {
                                socket.emit('statusDisable',isStatusEnable.idusuario,enable.usuario);
        
                                socket.on('statusDisable',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('status');
                                });
                                
                                resolve('¡MEALSYNC deshabilito al usuario!...')

                                setTimeout(() => {
                                    setCurrentView('');
                                    setIsStatusEnable([]);
                                    setIsSelectedRow(null);
                                    setIsName('');
                                    setIsPassword('');
                                    setIsBlock(false);
                                },500);

                                return () => {
                                    socket.off('statusDisable');
                                }
                            },2000);
                        }catch(error){
                            setIsComprobation(true);
                            reject('¡Ocurrio un error inesperado!...');
                        }
                    });

                    Alert_Verification(promise,'¡Deshabilitando usuario!...');
                }
            }else if(!isStatusEnable.habilitado){
                if(enable){
                    const promise = new Promise(async (resolve,reject) => {
                        try{  
                            setIsComprobation(false);   
                            setTimeout(() => {
                                socket.emit('statusEnable',isStatusEnable.idusuario,enable.usuario);

                                socket.on('statusEnable',(message,user) => {
                                    console.log(message,user);              
                                    socket.emit('status');
                                });

                                resolve('¡MEALSYNC habilito al usuario!...')
                                
                                setTimeout(() => {
                                    setCurrentView('');
                                    setIsStatusEnable([]);
                                    setIsSelectedRow(null);
                                    setIsName('');
                                    setIsPassword('');
                                    setIsBlock(false);
                                },500);

                                return () => {
                                    socket.off('statusEnable');
                                }
                            },2000);
                        }catch(error){
                            setIsComprobation(true);
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