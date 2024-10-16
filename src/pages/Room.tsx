import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";

const Room: React.FC = () => {
    
    const {id} = useParams();
    const {socket, user} = useContext(SocketContext);

    const fetchParticipantList = ({roomId, participants}: {roomId: string, participants: string[]}) => {
        console.log("fetch room participants");
        console.log(roomId, participants);
    }
    

    useEffect(() => {
        if (user && user.id) {  // Ensure peerId is available
            console.log("Emitting join-room event with peerId:", user.id);
            socket.emit("join-room", { roomId: id, peerId: user.id });
        } else {
            console.log("Peer ID not available yet");
        }
        socket.on("get-users", fetchParticipantList)
        
    }, [id, user, socket]);  // Depend on `user` to wait for initialization
    
    

    return(
        <div>
            room : {id}
        </div>
    )
}
export default Room;