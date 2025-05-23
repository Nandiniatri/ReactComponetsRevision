// src/hooks/usePeer.js
import { useEffect, useState } from 'react';
import Peer from 'peerjs';

export default function usePeer() {
    const [peer, setPeer] = useState(null);
    const [peerId, setPeerId] = useState(null);

    useEffect(() => {
        const newPeer = new Peer(undefined, {
            host: 'peerjs-server-4w5p.onrender.com',
            port: 443,
            path: '/',
            secure: true,
        });

        newPeer.on('open', (id) => {
            console.log('My peer ID is:', id);
            setPeerId(id);
        });

        setPeer(newPeer);

        // Cleanup on component unmount
        return () => {
            newPeer.destroy();
        };
    }, []);

    return { peer, peerId };
}
