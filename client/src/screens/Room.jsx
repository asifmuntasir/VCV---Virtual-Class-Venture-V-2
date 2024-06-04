import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import ReactPlayer from 'react-player';
import peer from '../service/peer';
import BottomNavigation from '../subcomponenet/BottomNavigation';

const Room = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStram, setMyStream] = useState();
    const [remoteStram, setRemoteStream] = useState();


    const handleRequestJoin = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handlerUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });

        setMyStream(stream);

        console.log("Incoming Call", from, offer);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
    }, [socket]);

    // const sendStreams = useCallback(() => {
    //     for (const track of myStram.getTracks()) {
    //         peer.peer.addTrack(track, myStram);
    //     }
    // }, [myStram]);

    // // Share stream to 

    // const handleCallAccepted = useCallback(({ from, ans }) => {
    //     peer.setLocalDescription(ans);
    //     console.log('Call Accepted');
    //     sendStreams();
    // }, [sendStreams]);

    // const handleNegotiationNeed = useCallback(async () => {
    //     const offer = await peer.getOffer();
    //     socket.emit("peer:negotiationneeded", { offer, to: remoteSocketId });
    // }, [socket, remoteSocketId]);

    // useEffect(() => {
    //     peer.peer.addEventListener("negotiationneeded", handleNegotiationNeed);
    //     return () => {
    //         peer.peer.removeEventListener("negotiationneeded", handleNegotiationNeed)
    //     };
    // }, [handleNegotiationNeed]);


    // const handleNegotiationNeedComming = useCallback(async ({ from, offer }) => {
    //     const ans = await peer.getAnswer(offer);
    //     socket.emit("peer:negotiationDone", { to: from, ans });
    // }, [socket]);

    // const handleNegotiationFinal = useCallback(async ({ ans }) => {
    //     await peer.setLocalDescription(ans);
    // }, []);



    // useEffect(() => {
    //     peer.peer.addEventListener('track', async (ev) => {
    //         const remoteStram = ev.streams;
    //         setRemoteStream(remoteStram[0]);
    //     });

    // }, []);
    const sendStreams = useCallback(() => {
        for (const track of myStram.getTracks()) {
            peer.peer.addTrack(track, myStram);
        }
    }, [myStram]);

    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peer.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [sendStreams]
    );

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
            const ans = await peer.getAnswer(offer);
            socket.emit("peer:nego:done", { to: from, ans });
        },
        [socket]
    );

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    useEffect(() => {
        socket.on('user:joined', handlerUserJoined);
        socket.on("incoming:call", handleIncomingCall);
        // socket.on("call:accepted", handleCallAccepted);
        // socket.on("peer:negotiationneeded", handleNegotiationNeedComming);
        // socket.on("peer:negotiationfinal", handleNegotiationFinal);

        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);


        return () => {
            socket.off('user:joined', handlerUserJoined);
            socket.off("incoming:call", handleIncomingCall);
            // socket.off("call:accepted", handleCallAccepted);
            // socket.off("peer:negotiationneeded", handleNegotiationNeedComming);
            // socket.off("peer:negotiationfinal", handleNegotiationFinal);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        }
    }, [socket, handlerUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal])


    return (
        <div className='container p-4'>
            <h1 className='text-2xl text-accent my-3' disabled="disabled">Meeting Room </h1>
            {remoteSocketId ?
                <button className="btn btn-success mr-3">Connected</button>
                :
                <button className="btn btn-warning mr-3">No one in the room</button>
            }

            {remoteSocketId &&
                <button className="btn btn-neutral mr-3" onClick={handleRequestJoin}>Request for Join</button>
            }

            {myStram && <button onClick={sendStreams} className='btn btn-active btn-primary'>Send Stream</button>}

            <div className="grid grid-cols-2 gap-2 items-center mt-3 mb-5 grid-height">
                <div className='video-player w-full border-dashed border-2'>
                    <h1 className='text-2xl text-accent my-4 text-center'>My Stream</h1>
                    {myStram && <ReactPlayer playing muted url={myStram} />}
                </div>

                {/* Remote Stream window */}
                <div className='video-player m-3 border-dashed border-2'>
                    <h1 className='text-2xl text-accent my-4 text-center'>Remote Stream</h1>
                    {remoteStram && <ReactPlayer playing muted url={remoteStram} />}
                </div>
            </div>
            <BottomNavigation></BottomNavigation>
        </div>
    );
}

export default Room;
