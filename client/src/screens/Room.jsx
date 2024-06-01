import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';

const Room = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStram, setMyStream] = useState();

    const handlerUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    const handleRequestJoin = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        setMyStream(stream);
    }, []);

    useEffect(() => {
        socket.on('user:joined', handlerUserJoined);

        return () => {
            socket.off('user:joined', handlerUserJoined)
        }
    }, [])

    return (
        <div>
            <h1>Room page</h1>
            <h4>{remoteSocketId ? 'User connected' : 'No one in the room'}</h4>
            {/* {remoteSocketId && <button onClick={handleRequestJoin}>Request for Join</button>} */}
        </div>
    );
}

export default Room;
