// import { useEffect, useRef, useState } from "react";
// import { MdOutlineVideoCall } from "react-icons/md";
// import Peer from "peerjs";

// const VideoCall1 = () => {
//   const [peerId, setPeerId] = useState("");
//   const [remoteId, setRemoteId] = useState("");
//   const localRef = useRef(null);
//   const remoteRef = useRef(null);
//   const peer = useRef(null);
//   const callRef = useRef(null);

//   const safePlay = async (video) => {
//     if (!video) return;
//     try {
//       await video.play();
//     } catch (error) {
//       if (error.name !== "AbortError") {
//         console.error("Video play error:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const newPeer = new Peer(undefined, {
//   config: {
//     iceServers: [
//       { urls: "stun:stun.l.google.com:19302" },
//       {
//         urls: "turn:global.xirsys.net:3478?transport=udp",
//         username: "NandiniAtri",
//         credential: "75655126-3595-11f0-a5e5-0242ac150003",
//       },
//     ],
//   },
// }); 

//     peer.current = newPeer;

//     newPeer.on("open", (id) => {
//       console.log("My peer ID is: ", id);
//       setPeerId(id);
//     });

//     newPeer.on("call", async (call) => {
//       console.log("Incoming call received.");
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         if (callRef.current) callRef.current.close();

//         localRef.current.srcObject = stream;
//         await safePlay(localRef.current);

//         call.answer(stream);

//         call.on("stream", async (remoteStream) => {
//           console.log("Remote stream received.");
//           remoteRef.current.srcObject = remoteStream;
//           await safePlay(remoteRef.current);
//         });

//         callRef.current = call;
//       } catch (err) {
//         console.error("Error answering call: ", err);
//       }
//     });

//     return () => {
//       if (peer.current && !peer.current.destroyed) {
//         peer.current.destroy();
//       }
//     };
//   }, []);

//   const startCall = async () => {
//     if (!remoteId) {
//       alert("Please enter remote peer ID.");
//       return;
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       if (callRef.current) callRef.current.close();

//       localRef.current.srcObject = stream;
//       await safePlay(localRef.current);

//       const call = peer.current.call(remoteId, stream);

//       call.on("stream", async (remoteStream) => {
//         console.log("Received remote stream from call.");
//         remoteRef.current.srcObject = remoteStream;
//         await safePlay(remoteRef.current);
//       });

//       callRef.current = call;
//     } catch (err) {
//       console.error("Error starting call: ", err);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🎥 Video Call</h2>
//       <p>
//         Your ID: <b>{peerId}</b>
//       </p>

//       <input
//         type="text"
//         value={remoteId}
//         onChange={(e) => setRemoteId(e.target.value)}
//         placeholder="Enter Remote ID"
//       />
//       <button onClick={startCall} disabled={!peerId || !remoteId}>
//         <MdOutlineVideoCall size={24} />
//       </button>

//       <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
//         <video
//           ref={localRef}
//           muted
//           autoPlay
//           playsInline
//           style={{ width: 300, background: "#000" }}
//         />
//         <video
//           ref={remoteRef}
//           autoPlay
//           playsInline
//           style={{ width: 300, background: "#000" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoCall1;



import { useEffect, useRef, useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import Peer from "peerjs";

const VideoCall1 = () => {
  const [peerId, setPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const peer = useRef(null);
  const callRef = useRef(null);

  const safePlay = async (video) => {
    if (!video) return;
    try {
      await video.play();
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Video play error:", error);
      }
    }
  };

  useEffect(() => {
    const newPeer = new Peer(undefined, {
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

    peer.current = newPeer;

    newPeer.on("open", (id) => {
      console.log("My peer ID is:", id);
      setPeerId(id);
    });

    newPeer.on("call", async (call) => {
      console.log("Incoming call received.");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (callRef.current) callRef.current.close();

        localRef.current.srcObject = stream;
        await safePlay(localRef.current);

        call.answer(stream);

        call.on("stream", async (remoteStream) => {
          console.log("Remote stream received:", remoteStream);
          console.log("Tracks:", remoteStream.getTracks());

          remoteRef.current.srcObject = remoteStream;
          remoteRef.current.load?.();
          await safePlay(remoteRef.current);
        });

        callRef.current = call;
      } catch (err) {
        console.error("Error answering call:", err);
      }
    });

    return () => {
      if (peer.current && !peer.current.destroyed) {
        peer.current.destroy();
      }
    };
  }, []);

  const startCall = async () => {
    if (!remoteId) {
      alert("Please enter remote peer ID.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (callRef.current) callRef.current.close();

      localRef.current.srcObject = stream;
      await safePlay(localRef.current);

      const call = peer.current.call(remoteId, stream);

      call.on("stream", async (remoteStream) => {
        console.log("Received remote stream from call:", remoteStream);
        console.log("Tracks:", remoteStream.getTracks());

        remoteRef.current.srcObject = remoteStream;
        remoteRef.current.load?.();
        await safePlay(remoteRef.current);
      });

      callRef.current = call;
    } catch (err) {
      console.error("Error starting call:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎥 Video Call</h2>
      <p>
        Your ID: <b>{peerId}</b>
      </p>

      <input
        type="text"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
        placeholder="Enter Remote ID"
      />
      <button onClick={startCall} disabled={!peerId || !remoteId}>
        <MdOutlineVideoCall size={24} />
      </button>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <video
          ref={localRef}
          muted
          autoPlay
          playsInline
          style={{ width: 300, background: "#000", display: "block" }}
        />
        <video
          ref={remoteRef}
          autoPlay
          playsInline
          style={{ width: 300, background: "#000", display: "block" }}
        />
      </div>
    </div>
  );
};

export default VideoCall1;
