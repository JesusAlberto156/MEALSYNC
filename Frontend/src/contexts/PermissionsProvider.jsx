//____________IMPORT/EXPORT____________
// Hooks de React
import { createContext, useContext, useState, useEffect } from "react"
// Servicios
import { decryptData } from "../services/Crypto";
// Contextos
import { selectContext,checkboxContext } from "./FormsProvider";
import { modalViewContext } from "./ViewsProvider";
import { actionBlockContext,selectedRowContext } from "./VariablesProvider";
import { usersContext } from "./UsersProvider";
import { socketContext } from "./SocketProvider";
// Contextos personalizados
export const permissionsContext = createContext(null);
export const permissionContext = createContext(null);
export const permissionsAddContext = createContext(null);
export const permissionsEditContext = createContext(null);
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Función contexto para controlar los datos de la base de datos de los permisos de los usuarios
export const Permissions = ({ children }) => {
    // constantes con contextos perzonalizados
    const [socket] = useContext(socketContext);
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
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
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
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
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