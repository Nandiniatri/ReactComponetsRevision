// import { MdOutlineVideoCall } from "react-icons/md";
// import Peer from "peerjs";

// const VideoCall = () => {
//     // const peer

//     const handleVideoCall = () => {

//     }

//     return (
//         <div className="videocall-main-div">
//             <div className="videocall-header">
//                 <h1 className="videocall-title">Start a Video Call</h1>
//                 <button className="videoCall-button">
//                     <MdOutlineVideoCall size={30} onClick={handleVideoCall}/>
//                 </button>
//             </div>

//             <div className="videocall-body">
//                 <p>Video Call Here !</p>
//             </div>
//         </div>
//     );
// };

// export default VideoCall;








// import { useEffect, useRef, useState } from "react";
// import { MdOutlineVideoCall } from "react-icons/md";
// import Peer from "peerjs";

// const VideoCall = () => {
//     const [peerId, setPeerId] = useState(""); 
//     const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const peerInstance = useRef(null);
//     const currentCall = useRef(null);

//     useEffect(() => {
//         peerInstance.current = new Peer();

//         peerInstance.current.on("open", (id) => {
//             console.log("My peer ID is: " + id);
//             setPeerId(id);
//         });


//         peerInstance.current.on("call", (call) => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//                 .then((stream) => {
//                     localVideoRef.current.srcObject = stream;
//                     localVideoRef.current.play();

//                     call.answer(stream);

//                     call.on("stream", (remoteStream) => {
//                         remoteVideoRef.current.srcObject = remoteStream;
//                         remoteVideoRef.current.play();
//                     });

//                     currentCall.current = call;
//                 })
//                 .catch(err => {
//                     console.error("Failed to get local stream", err);
//                 });
//         });

//         return () => {
//             peerInstance.current.destroy();
//         };
//     }, []);

//     const startCall = () => {
//         if (!remotePeerIdValue) {
//             alert("Enter remote peer ID to call");
//             return;
//         }

//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 localVideoRef.current.srcObject = stream;
//                 localVideoRef.current.play();

//                 const call = peerInstance.current.call(remotePeerIdValue, stream);

//                 call.on("stream", (remoteStream) => {
//                     remoteVideoRef.current.srcObject = remoteStream;
//                     remoteVideoRef.current.play();
//                 });

//                 currentCall.current = call;
//             })
//             .catch(err => {
//                 console.error("Failed to get local stream", err);
//             });
//     };

//     return (
//         <div className="videocall-main-div">
//             <div className="videocall-header">
//                 <h1 className="videocall-title">Start a Video Call</h1>
//                 <div>
//                     <p>Your Peer ID: <b>{peerId}</b></p>
//                     <input
//                         type="text"
//                         placeholder="Enter remote peer ID"
//                         value={remotePeerIdValue}
//                         onChange={(e) => setRemotePeerIdValue(e.target.value)}
//                     />
//                     <button className="videoCall-button" onClick={startCall}>
//                         <MdOutlineVideoCall size={30} />
//                     </button>
//                 </div>
//             </div>

//             <div className="videocall-body" style={{ display: "flex", gap: "20px" }}>
//                 <div>
//                     <h3>Your Video</h3>
//                     <video ref={localVideoRef} muted style={{ width: "300px", borderRadius: "10px" }} />
//                 </div>
//                 <div>
//                     <h3>Remote Video</h3>
//                     <video ref={remoteVideoRef} style={{ width: "300px", borderRadius: "10px" }} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VideoCall;




import React, { useEffect, useRef, useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import Peer from "peerjs";

const VideoCall = () => {
    const [peerId, setPeerId] = useState("");
    const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const currentCall = useRef(null);

    useEffect(() => {
        peerInstance.current = new Peer();

        peerInstance.current.on("open", (id) => {
            console.log("My peer ID is: " + id);
            setPeerId(id);
        });

        peerInstance.current.on("call", (call) => {
            console.log("📞 Incoming call...");
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    localVideoRef.current.srcObject = stream;
                    localVideoRef.current.play();

                    call.answer(stream);

                    call.on("stream", (remoteStream) => {
                        remoteVideoRef.current.srcObject = remoteStream;
                        remoteVideoRef.current.play();
                        console.log("✅ Remote stream received");
                    });

                    call.on("close", () => {
                        console.log("🔴 Call ended by remote user");
                    });

                    call.on("error", (err) => {
                        console.error("⚠️ Call error:", err);
                    });

                    currentCall.current = call;
                })
                .catch((err) => {
                    console.error("❌ Failed to get local stream:", err);
                });
        });

        peerInstance.current.on("error", (err) => {
            console.error("⚠️ PeerJS error:", err);
        });

        return () => {
            if (peerInstance.current) {
                peerInstance.current.destroy();
            }
        };
    }, []);

    const startCall = () => {
        if (!remotePeerIdValue) {
            alert("❗ Please enter a valid remote peer ID.");
            return;
        }

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                localVideoRef.current.play();

                const call = peerInstance.current.call(remotePeerIdValue, stream);
                if (!call) {
                    console.error("❌ Unable to call the remote peer.");
                    return;
                }

                call.on("stream", (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                    console.log("✅ Remote stream received");
                });

                call.on("close", () => {
                    console.log("🔴 Call ended");
                });

                call.on("error", (err) => {
                    console.error("⚠️ Call error:", err);
                });

                currentCall.current = call;
            })
            .catch((err) => {
                console.error("❌ Failed to get local stream:", err);
            });
    };

    return (
        <div className="videocall-main-div" style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <div className="videocall-header" style={{ marginBottom: "20px" }}>
                <h1>📹 Start a Video Call</h1>
                <p>Your Peer ID: <b>{peerId}</b></p>
                <input
                    type="text"
                    placeholder="Enter remote peer ID"
                    value={remotePeerIdValue}
                    onChange={(e) => setRemotePeerIdValue(e.target.value)}
                    style={{ padding: "8px", marginRight: "10px", borderRadius: "5px" }}
                />
                <button onClick={startCall} style={{ padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                    <MdOutlineVideoCall size={24} />
                </button>
            </div>

            <div className="videocall-body" style={{ display: "flex", gap: "40px" }}>
                <div>
                    <h3>Your Video</h3>
                    <video ref={localVideoRef} muted autoPlay style={{ width: "300px", borderRadius: "10px", background: "#000" }} />
                </div>
                <div>
                    <h3>Remote Video</h3>
                    <video ref={remoteVideoRef} autoPlay style={{ width: "300px", borderRadius: "10px", background: "#000" }} />
                </div>
            </div>
        </div>
    );
};

export default VideoCall;
