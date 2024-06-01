// import React, { createContext, useContext, useMemo } from "react";
// import { io } from 'socket.io-client';

// const SocketContext = createContext(null);

// export const useSocket = () => {
//     const socket = useContext(SocketContext);
//     return socket;
// }

// export const SocketProvider = (props) => {

//     const socket = useMemo(() => io("http://localhost:8000"), [])

//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {props.children}
//         </SocketContext.Provider>
//     )
// }

// --------------------------------------------------------------------

// SocketProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000'); // or your server URL
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
