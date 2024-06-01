import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    const navigate = useNavigate()

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            if (socket) {
                console.log('Socket is available:', socket);
                socket.emit("room:join", { email, room });
            } else {
                console.error('Socket is not available');
            }
        },
        [email, room, socket]
    );

    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data;
        navigate(`/room/${room}`)
    }, []);

    useEffect(() => {
        // socket.on('room:join', (data) => {
        //     console.log(`Data from BE ${data}`);
        // });

        if (socket) {
            // console.log('Socket is available:', socket);
            socket.on('room:join', handleJoinRoom);
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        } else {
            console.error('Socket is not available');
        }

        return () => {
            if (socket) {
                socket.off('room:join', handleJoinRoom);
            }
        }
    }, [socket, handleJoinRoom]);

    return (
        <div>
            <h1>Lobby Room</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email ID</label>
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="room">Room Number</label>
                <input type="text" id='room' value={room} onChange={(e) => setRoom(e.target.value)} />
                <br />
                <button>Join</button>
            </form>
        </div>
    );
}

export default Lobby;
