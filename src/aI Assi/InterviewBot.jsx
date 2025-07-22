import React, { useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const InterviewBot = () => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [aiReply, setAiReply] = useState("");
    const [loading, setLoading] = useState(false);

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-IN";
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    };

    const handleStart = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false, language: "en-IN" });
    };

    const handleStop = async () => {
        SpeechRecognition.stopListening();
        const userInput = transcript.trim();

        if (!userInput) return;

        const prompt = `You are an interview panelist taking a frontend developer interview. Ask follow-up questions or give feedback based on this: "${userInput}"`;

        try {
            setLoading(true);
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                },
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const message = response.data.choices[0].message.content;
            setAiReply(message);
            speak(message);
        } catch (error) {
            console.error("OpenAI error:", error);
            speak("Sorry, I couldn't process that.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <img src="https://cdn.getmerlin.in/cms/img_AQO_Pe_Pie_STC_59p_Oy_Zo8mbm7d_5a6a9d88fe.png" alt="AI Avatar" style={styles.avatar} />
            <h2>🧠 AI Interview Assistant</h2>
            <p><strong>🎙️ Mic:</strong> {listening ? "Listening..." : "Stopped"}</p>
            <p><strong>🧑 You:</strong> {transcript}</p>
            <p><strong>🤖 AI:</strong> {loading ? "Thinking..." : aiReply}</p>

            <div style={styles.buttonGroup}>
                <button onClick={handleStart} style={styles.button}>🎤 Start</button>
                <button onClick={handleStop} style={styles.button} disabled={loading}>🛑 Stop & Respond</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "12px",
        background: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    avatar: {
        width: 100,
        borderRadius: "50%",
        marginBottom: 10,
    },
    buttonGroup: {
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        gap: 10,
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        background: "#4CAF50",
        color: "white",
        cursor: "pointer",
    },
};

export default InterviewBot;
