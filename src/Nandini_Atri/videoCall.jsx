// // src/VideoCall.js
// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';

// const VideoCalls = () => {
//   const [peerId, setPeerId] = useState('');
//   const [remoteId, setRemoteId] = useState('');
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerRef = useRef(null);
//   const currentCall = useRef(null);

//   useEffect(() => {
//     const peer = new Peer(); // Auto-generates ID using PeerJS cloud server
//     peerRef.current = peer;

//     peer.on('open', (id) => {
//       setPeerId(id);
//     });

//     peer.on('call', (call) => {
//       navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//         localVideoRef.current.srcObject = stream;
//         call.answer(stream);

//         call.on('stream', (remoteStream) => {
//           remoteVideoRef.current.srcObject = remoteStream;
//         });

//         currentCall.current = call;
//       });
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, []);

//   const callUser = () => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       const call = peerRef.current.call(remoteId, stream);

//       call.on('stream', (remoteStream) => {
//         remoteVideoRef.current.srcObject = remoteStream;
//       });

//       currentCall.current = call;
//     });
//   };

//   const endCall = () => {
//     if (currentCall.current) {
//       currentCall.current.close();
//     }
//   };

//   return (
//     <div>
//       <h2>My Peer ID: {peerId}</h2>
//       <input
//         type="text"
//         value={remoteId}
//         onChange={(e) => setRemoteId(e.target.value)}
//         placeholder="Enter remote peer ID"
//       />
//       <button onClick={callUser}>Call</button>
//       <button onClick={endCall}>End Call</button>

//       <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
//         <div>
//           <h3>My Video</h3>
//           <video ref={localVideoRef} autoPlay playsInline muted width={300} />
//         </div>
//         <div>
//           <h3>Remote Video</h3>
//           <video ref={remoteVideoRef} autoPlay playsInline width={300} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCalls;



import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const VideoCalls = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const currentCall = useRef(null);

    const [peerId, setPeerId] = useState("");
    const [inputPeerId, setInputPeerId] = useState("");


    useEffect(() => {
        // TURN + STUN servers config
        const peer = new Peer({
            config: {
                iceServers: [
                    { urls: "stun:stun.l.google.com:19302" },
                    {
                        urls: "turn:global.xirsys.net:3478?transport=udp",
                        username: "NandiniAtri",
                        credential: "75655126-3595-11f0-a5e5-0242ac150003",
                    },
                ],
            },
        });

        peerInstance.current = peer;

        peer.on("open", (id) => {
            console.log("My peer ID is: " + id);
            setPeerId(id);
        });

        peer.on("call", async (call) => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                localVideoRef.current.srcObject = stream;
                localVideoRef.current.play();

                call.answer(stream); // Answer incoming call with own stream
                currentCall.current = call;

                call.on("stream", (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });

                call.on("close", () => {
                    console.log("Call ended.");
                    remoteVideoRef.current.srcObject = null;
                });
            } catch (err) {
                if (err.name === "AbortError") {
                    console.warn("User media request was aborted.");
                } else {
                    console.error("Failed to get local stream", err);
                }
            }
        });

        return () => {
            if (currentCall.current) {
                currentCall.current.close();
            }
            peer.destroy();
        };
    }, []);

    const callUser = async () => {
        if (!inputPeerId) {
            alert("Please enter a Peer ID to call.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            localVideoRef.current.srcObject = stream;
            localVideoRef.current.play();

            const call = peerInstance.current.call(inputPeerId, stream);
            currentCall.current = call;

            call.on("stream", (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
            });

            call.on("close", () => {
                console.log("Call ended.");
                remoteVideoRef.current.srcObject = null;
            });
        } catch (err) {
            if (err.name === "AbortError") {
                console.warn("User media request was aborted.");
            } else {
                console.error("Failed to get local stream", err);
            }
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>📞 Video Calling App</h2>
            <p>
                <strong>My Peer ID:</strong> {peerId}
            </p>

            <input
                type="text"
                value={inputPeerId}
                onChange={(e) => setInputPeerId(e.target.value)}
                placeholder="Enter Peer ID to call"
            />
            <button onClick={callUser} style={{ marginLeft: 10 }}>
                Call
            </button>

            <div style={{ marginTop: 20, display: "flex", gap: 20 }}>
                <div>
                    <h4>👤 Local Video</h4>
                    <video ref={localVideoRef} width="300" autoPlay muted />
                </div>
                <div>
                    <h4>👥 Remote Video</h4>
                    <video ref={remoteVideoRef} width="300" autoPlay />
                </div>
            </div>
        </div>
    );
};

export default VideoCalls;
