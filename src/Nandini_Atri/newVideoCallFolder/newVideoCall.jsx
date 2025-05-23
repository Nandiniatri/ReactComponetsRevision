import { useEffect, useRef, useState } from "react";
import usePeer from "../customHook/usePeer"; // apni actual path ke hisaab se adjust karo

const NewVideoCall = () => {
  const { peer, peerId } = usePeer();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const currentCall = useRef(null);

  const [inputPeerId, setInputPeerId] = useState("");

  useEffect(() => {
    if (!peer) return;

    // Incoming call handle karo
    peer.on("call", async (call) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();

        call.answer(stream);
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
        console.error("Failed to get local stream", err);
      }
    });

    return () => {
      if (currentCall.current) {
        currentCall.current.close();
      }
      peer.off("call");
    };
  }, [peer]);

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

      const call = peer.call(inputPeerId, stream);
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
      console.error("Failed to get local stream", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📞 Video Calling App</h2>
      <p>
        <strong>My Peer ID:</strong> {peerId || "Loading..."}
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

export default NewVideoCall;
