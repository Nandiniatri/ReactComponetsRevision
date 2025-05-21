// src/VideoCall.js
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCalls = () => {
  const [peerId, setPeerId] = useState('');
  const [remoteId, setRemoteId] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const currentCall = useRef(null);

  useEffect(() => {
    const peer = new Peer(); // Auto-generates ID using PeerJS cloud server
    peerRef.current = peer;

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        localVideoRef.current.srcObject = stream;
        call.answer(stream);

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });

        currentCall.current = call;
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const callUser = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      const call = peerRef.current.call(remoteId, stream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });

      currentCall.current = call;
    });
  };

  const endCall = () => {
    if (currentCall.current) {
      currentCall.current.close();
    }
  };

  return (
    <div>
      <h2>My Peer ID: {peerId}</h2>
      <input
        type="text"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
        placeholder="Enter remote peer ID"
      />
      <button onClick={callUser}>Call</button>
      <button onClick={endCall}>End Call</button>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <h3>My Video</h3>
          <video ref={localVideoRef} autoPlay playsInline muted width={300} />
        </div>
        <div>
          <h3>Remote Video</h3>
          <video ref={remoteVideoRef} autoPlay playsInline width={300} />
        </div>
      </div>
    </div>
  );
};

export default VideoCalls;
