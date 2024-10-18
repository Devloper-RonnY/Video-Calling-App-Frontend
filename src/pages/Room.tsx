import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../components/UserFeedPlayer";

const Room: React.FC = () => {
    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);

    useEffect(() => {
        // Emit event when a user joins the room
        if (user) {
            // console.log("User object:", user); // Log the entire user object
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", { roomId: id, peerId: user._id });
        }
        console.log(peers);
        
    }, [id, user, socket, peers]);

    return (
        <div>
            room: {id}
            <br />
            Your own user feed
            <UserFeedPlayer stream={stream} />
            <div>
                Other Users feed
                {Object.keys(peers).map((peerId) => (
                    <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
                ))}
            </div>
        </div>
    )
}

export default Room;
