import { createContext,useEffect } from "react"

import { io } from "socket.io-client";

export const socketContext = createContext(null);

const socket = io('http://localhost:3500/');

export const Socket = ({ children }) => {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Conectado al servidor de socket.io");
        });

        return () => {
            socket.disconnect();
            console.log("Desconectado del servidor de socket.io");
        };
    },[]);

    return (
        <socketContext.Provider value={[socket]}>
            {children}
        </socketContext.Provider>
    );
}