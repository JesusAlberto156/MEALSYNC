import { createContext,useEffect } from "react"

import { io } from "socket.io-client";

export const socketContext = createContext(null);

export const Socket = ({ children }) => {

    const socket = io('http://localhost:3500/');

    return (
        <socketContext.Provider value={[socket]}>
            {children}
        </socketContext.Provider>
    );
}