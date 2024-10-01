import socketIoClient from "socket.io-client";
import React, { createContext } from "react";

const ws_Server = "http://localhost:5500"; 

const SocketContext = createContext<any | null>(null);

const socket = socketIoClient(ws_Server);

interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
