import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA7169CvhbWQEKcH2oGAiX39BEgUK89sMk",
    authDomain: "video-calling-287ba.firebaseapp.com",
    projectId: "video-calling-287ba",
    storageBucket: "video-calling-287ba.firebasestorage.app",
    messagingSenderId: "454380556541",
    appId: "1:454380556541:web:6e31e269e14c9821d12e94",
    measurementId: "G-R4H7Y99PB6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };



// const firebaseConfig = {
//     apiKey: "AIzaSyA7169CvhbWQEKcH2oGAiX39BEgUK89sMk",
//     authDomain: "video-calling-287ba.firebaseapp.com",
//     projectId: "video-calling-287ba",
//     storageBucket: "video-calling-287ba.firebasestorage.app",
//     messagingSenderId: "454380556541",
//     appId: "1:454380556541:web:6e31e269e14c9821d12e94",
//     measurementId: "G-R4H7Y99PB6"
// }
