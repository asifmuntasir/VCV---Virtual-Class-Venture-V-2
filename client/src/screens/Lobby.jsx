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
        <div className='container meeting-rrom'>
            <h1 className='text-5xl m-4 text-center text-accent font-bold'>Meeting Room</h1>
            {/* <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email ID</label>
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="room">Room Number</label>
                <input type="text" id='room' value={room} onChange={(e) => setRoom(e.target.value)} />
                <br />
                <button>Join</button>
            </form> */}

            <form onSubmit={handleSubmitForm} className='border-dashed border-2 p-5 border-accent-500 input-section--field'>
                <label className="input input-bordered text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="email" id='email' className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="input input-bordered text-white mt-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" id='room' className="grow" placeholder="Room ID" value={room} onChange={(e) => setRoom(e.target.value)} />
                </label>
                <button className="btn btn-neutral mt-3">Join</button>
            </form>
        </div>
    );
}

export default Lobby;
