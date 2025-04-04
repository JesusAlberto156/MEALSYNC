//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useContext, useState, useEffect, useRef } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
export const statusAllContext = createContext(null);
export const statusUserContext = createContext(null);
export const statusAddContext = createContext(null);
export const statusEnableContext = createContext(null);
// Contextos personalizados
import { socketContext } from "./SocketProvider";
import { loggedContext,logContext } from "./SessionProvider";
import { modalViewContext } from "./ViewsProvider";
import { nameContext,passwordContext,selectContext,radioContext } from "./FormsProvider";
import { userContext,usersContext } from "./UsersProvider";
import { selectedRowContext,formComprobationContext,actionBlockContext } from "./VariablesProvider";
// Estilos personalizados
import { Alert_Verification,Alert_Warning } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Función contexto para controlar los datos de la base de datos del estatus de los usuarios
export const Status_All = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isLogged] = useContext(loggedContext); 
    const [isLog,setIsLog] = useContext(logContext);   
    const [isUser] = useContext(userContext);
    const [socket] = useContext(socketContext);
    const alertShown = useRef(false);
    // UseState para controlar el valor del contexto
    const [isStatusAll,setIsStatusAll] = useState([]);
    // UseEffect para obtener los datos desde la base de datos
    useEffect(() => {
        socket.emit('status');

        socket.on('status',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                console.log('¡Estatus de usuarios obtenidos!....')
                setIsStatusAll(parsedData);
            }else{
                console.log('¡Error al desencriptar los estatus!...');
                setIsStatusAll([]);
            }
        });

        return () => {
            socket.off('status');
        }
    },[]);
    // UseEffect para verificar que los datos existan
    useEffect(() => {
        if(isLogged && isStatusAll.length !== 0 && isUser.length !== 0 && !alertShown.current){
            const user = isStatusAll.find(user => user.idusuario === isUser.idusuario);
            if(user){
                if(!user.habilitado){
                    Alert_Warning('MEALSYNC','¡Ha sido deshabilitado(a) por un administrador!...');
                    setTimeout(() => {
                        setIsLog(true);
                    },3000);
                }
            }
        }
    },[isStatusAll]);
    // Return para darle valor al contexto y heredarlo
    return (
        <statusAllContext.Provider value={[isStatusAll,setIsStatusAll]}>
            {children}
        </statusAllContext.Provider>
    );
}
// Función contexto para controlar los datos del estatus del usuario activo
export const Status_User = ({ children }) => {
    // UseState para controlar el valor del contexto
    const [isStatusUser,setIsStatusUser] = useState(() => {
        const StoredData = sessionStorage.getItem('Status');

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
        <statusUserContext.Provider value={[isStatusUser,setIsStatusUser]}>
            {children}
        </statusUserContext.Provider>
    );
}
// Función contexto para controlar los datos agregados de los estatus de un usuario
export const Status_Add = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isSelect,setIsSelect] = useContext(selectContext);
    const [isRadio,setIsRadio] = useContext(radioContext);
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    const [isActiveBlock,setIsActiveBlock] = useContext(actionBlockContext);
    const [socket] = useContext(socketContext);
    // UseState para controlar el valor del contexto
    const [isStatusAdd,setIsStatusAdd] = useState(false);
    // UseEffect para agregar datos a la base de datos
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
                                setCurrentMView('');
                                setIsRadio('');
                                setIsSelect([]);
                                setIsStatusAdd(false);
                                setIsActiveBlock(false);
                            },500);

                            return () => {
                                socket.off('statusInsert');
                            }
                        },2000);
                    }catch(error){
                        setIsActiveBlock(false);
                        setIsStatusAdd(false);
                        reject('¡Ocurrio un error inesperado!...');
                    }
                });

                Alert_Verification(promise,'¡Agregando estatus a un usuario!...');
            }
        }
    },[isStatusAdd])
    // Return para darle valor al contexto y heredarlo
    return (
        <statusAddContext.Provider value={[isStatusAdd,setIsStatusAdd]}>
            {children}
        </statusAddContext.Provider>
    );
}
// Función contexto para controlar los usuarios habilitados/deshabilitados 
export const Status_Enable = ({ children }) => {
    // constantes con contextos perzonalizados
    const [isUsers] = useContext(usersContext);
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassowrd,setIsPassword] = useContext(passwordContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isFormComprobation,setIsFormComprobation] = useContext(formComprobationContext);
    const [isActiveBlock,setIsActiveBlock] = useContext(actionBlockContext);
    const [socket] = useContext(socketContext);
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
                            setIsFormComprobation(false); 
                            setTimeout(() => {
                                socket.emit('statusDisable',isStatusEnable.idusuario,enable.usuario);
        
                                socket.on('statusDisable',(message,user) => {
                                    console.log(message,user);
                                    socket.emit('status');
                                });
                                
                                resolve('¡MEALSYNC deshabilito al usuario!...')

                                setTimeout(() => {
                                    setCurrentMView('');
                                    setIsStatusEnable([]);
                                    setIsSelectedRow(null);
                                    setIsName('');
                                    setIsPassword('');
                                    setIsActiveBlock(false);
                                },500);

                                return () => {
                                    socket.off('statusDisable');
                                }
                            },2000);
                        }catch(error){
                            setIsFormComprobation(true);
                            reject('¡Ocurrio un error inesperado!...');
                        }
                    });

                    Alert_Verification(promise,'¡Deshabilitando usuario!...');
                }
            }else if(!isStatusEnable.habilitado){
                if(enable){
                    const promise = new Promise(async (resolve,reject) => {
                        try{  
                            setIsFormComprobation(false);   
                            setTimeout(() => {
                                socket.emit('statusEnable',isStatusEnable.idusuario,enable.usuario);

                                socket.on('statusEnable',(message,user) => {
                                    console.log(message,user);              
                                    socket.emit('status');
                                });

                                resolve('¡MEALSYNC habilito al usuario!...')
                                
                                setTimeout(() => {
                                    setCurrentMView('');
                                    setIsStatusEnable([]);
                                    setIsSelectedRow(null);
                                    setIsName('');
                                    setIsPassword('');
                                    setIsActiveBlock(false);
                                },500);

                                return () => {
                                    socket.off('statusEnable');
                                }
                            },2000);
                        }catch(error){
                            setIsFormComprobation(true);
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
        <statusEnableContext.Provider value={[isStatusEnable,setIsStatusEnable]}>
            {children}
        </statusEnableContext.Provider>
    );
}