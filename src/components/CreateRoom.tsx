import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        console.log("initializing a create room request", socket);
        socket.emit("create-room"); // Corrected event emit
    };

    return (
        <button className="btn btn-secondary" onClick={initRoom}>
            Start a new meeting in a new room
        </button>
    );
};

export default CreateRoom;
