import { createContext, useContext,useEffect } from "react"
import { usersContext } from './UsersProvider'
import { permissionsContext } from './PermissionsProvider'
import { statusUsersContext } from './StatusUsersProvider';

import { decryptData } from "../services/Crypto";

import { io } from "socket.io-client";

export const socketContext = createContext(null);

const socket = io('http://localhost:3500/');

export const SocketProvider = ({ children }) => {
    const [users,setUsers] = useContext(usersContext);
    const [permissions,setPermissions] = useContext(permissionsContext);
    const [statusUsers,setStatusUsers] = useContext(statusUsersContext);

    useEffect(() => {

        const StoredUsers = sessionStorage.getItem('Users');
        const StoredPermissions = sessionStorage.getItem('Permissions');
        const StoredStatusUsers = sessionStorage.getItem('StatusUsers');

        if(StoredUsers && StoredPermissions && StoredStatusUsers){
            try{
                const decryptedUsers = decryptData(StoredUsers);
                const decryptedPermissions = decryptData(StoredPermissions);
                const decryptedStatusUsers = decryptData(StoredStatusUsers);

                if(decryptedUsers && decryptedPermissions && decryptedStatusUsers){
                    setUsers(JSON.parse(decryptedUsers));
                    setPermissions(JSON.parse(decryptedPermissions));
                    setStatusUsers(JSON.parse(decryptedStatusUsers));

                    console.log('Datos cargados correctamente.');
                    return;
                }else{
                    console.log('Error al desencriptar datos almacenados.');
                    return;
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
            }
        }

        socket.on("connect", () => {
            console.log("Conectado al servidor de socket.io");
        });
        socket.on('users',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                setUsers(parsedData);
                sessionStorage.setItem('Users',result);
            }else{
                console.log('Error al desencriptar usuarios');
            }
        });
        socket.on('permissions',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                setPermissions(parsedData);
                sessionStorage.setItem('Permissions',result);
            }else{
                console.log('Error al desencriptar permisos');
            }
        });
        socket.on('status',(result) => {
            const decryptedData = decryptData(result);
            if(decryptedData){
                const parsedData = JSON.parse(decryptedData);
                setStatusUsers(parsedData);
                sessionStorage.setItem('StatusUsers',result);
            }else{
                console.log('Error al desencriptar estatus');
            }
        });

        socket.emit('users');
        socket.emit('permissions');
        socket.emit('status');

        return () => {
            socket.off('users');
            socket.off('permissions');
            socket.off('status');
        }
    },[]);

    return (
        <socketContext.Provider value={[socket]}>
            {children}
        </socketContext.Provider>
    );
}