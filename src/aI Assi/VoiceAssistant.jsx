// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const speak = (text) => {
//   const msg = new SpeechSynthesisUtterance(text);
//   msg.lang = 'en-IN'; // or 'en-US'
//   msg.rate = 1;
//   window.speechSynthesis.speak(msg);
// };

// const VoiceAssistant = () => {
//   const { transcript, listening, resetTranscript } = useSpeechRecognition();
//   const [quesData , setQuesData] = useState([]);

//   const fetchData = async() => {
//     try{
//       const response = await axios.get('/public/data/question.json');
//       console.log(response.data);
//       setQuesData(response.data);
//     }catch(error){
//       console.log('Network error');
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   },[])

//   const handleStart = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
//   };

//   const handleStop = () => {
//     SpeechRecognition.stopListening();

//     // Check if user said "hi" or "hello"
//     const lowerText = transcript.toLowerCase();
//     // if (lowerText.includes("hi") || lowerText.includes("hello")) {
//     //   speak("Hello! How can I help you?");
//     // } else {
//     //   speak("Sorry, I didn't understand.");
//     // }

//     if(lowerText.includes(quesData)){
      
//     }

//   };



//   return (
//     <div style={{ padding: 20 }}>
//       <h2>🎙 Simple Voice Assistant</h2>
//       <p><strong>Mic:</strong> {listening ? "Listening..." : "Off"}</p>
//       <p><strong>You said:</strong> {transcript}</p>
//       <button onClick={handleStart}>Start Listening</button>
//       <button onClick={handleStop}>Stop & Respond</button>
//     </div>
//   );
// };

// export default VoiceAssistant;








import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const speak = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-IN'; // or 'en-US'
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
};

const VoiceAssistant = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [quesData , setQuesData] = useState([]);

  const fetchData = async() => {
    try{
      const response = await axios.get('/public/data/question.json');
      console.log(response.data);
      setQuesData(response.data);
    }catch(error){
      console.log('Network error');
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();

    // Check if user said "hi" or "hello"
    const lowerText = transcript.toLowerCase();

    // if(lowerText.includes(quesData)){
      
    // }

    const matchedQA = quesData.find(item =>
      lowerText.includes(item.question.toLowerCase())
    )

    console.log(matchedQA);
    
    if(matchedQA){
      speak(matchedQA.answer)
    }else{
      speak("Sorry, I didn't understant");
    }
  };



  return (
    <div style={{ padding: 20 }}>
      <h2>🎙 Simple Voice Assistant</h2>
      <p><strong>Mic:</strong> {listening ? "Listening..." : "Off"}</p>
      <p><strong>You said:</strong> {transcript}</p>
      <button onClick={handleStart}>Start Listening</button>
      <button onClick={handleStop}>Stop & Respond</button>
    </div>
  );
};

export default VoiceAssistant;
