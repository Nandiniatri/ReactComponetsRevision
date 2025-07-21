import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const speak = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-IN'; // or 'en-US'
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
};

const VoiceAssistant = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const fetchData = () => {
    const response = 
  }

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();

    // Check if user said "hi" or "hello"
    const lowerText = transcript.toLowerCase();
    if (lowerText.includes("hi") || lowerText.includes("hello")) {
      speak("Hello! How can I help you?");
    } else {
      speak("Sorry, I didn't understand.");
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
