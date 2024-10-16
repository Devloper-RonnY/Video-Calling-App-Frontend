import socketIoClient from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  Peer  from "peerjs"
import { v4 as UUIDv4 } from "uuid";

const ws_Server = "http://localhost:5500"; 

 export const SocketContext = createContext<any | null>(null);

const socket = socketIoClient(ws_Server);

interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState<Peer>()

    const navigate = useNavigate();

    useEffect(() => {

       const userId = UUIDv4();;
       const newPeer = new Peer(userId);

       setUser(newPeer);

        const enterRoom = ({ roomId} : {roomId : string}) => {
            navigate(`/room/${roomId}`)
        }
        socket.on("room-created", enterRoom)
        
    },[])

    return (
        <SocketContext.Provider value={{ socket, user }}>
            {children}
        </SocketContext.Provider>
    );
};
