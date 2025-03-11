import { createContext, useContext, useState,useEffect } from "react"
import { usersContext } from './UsersProvider'
import { permissionsContext } from './PermissionsProvider'
import { io } from "socket.io-client";

export const socketContext = createContext(null);

const socket = io('http://localhost:3500/');

export const SocketProvider = ({ children }) => {
    const [users,setUsers] = useContext(usersContext);
    const [permissions,setPermissions] = useContext(permissionsContext);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Conectado al servidor de socket.io");
        });
        socket.on('users',(result) => {
            console.log('Usuarios: ',result);
            setUsers(result);
        });
        socket.on('permissions',(result) => {
            console.log('Permisos: ',result);
            setPermissions(result);
        });

        socket.emit('users');
        socket.emit('permissions');

        return () => {
            socket.off('users');
            socket.off('permissions');
        }
    }, []);

    return (
        <socketContext.Provider value={[socket]}>
            {children}
        </socketContext.Provider>
    );
}