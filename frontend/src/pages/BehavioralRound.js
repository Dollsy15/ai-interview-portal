// src/pages/BehavioralRound.js
import React, { useState, useRef, useEffect } from "react";

const BehavioralRound = () => {
  const questions = [
    "Tell me about a time you faced a challenge at work.",
    "Describe a situation where you had to work in a team.",
    "Give an example of a goal you set and achieved.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [manualTranscript, setManualTranscript] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  // Initialize microphone monitoring (audible feedback)
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          audioRef.current.play().catch(() => {});
        }
      })
      .catch((err) => console.error("Mic access denied", err));
  }, []);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported. Use Chrome or Edge.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => setIsListening(true);

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + " ";
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      stopListening();
    };

    recognitionRef.current.onend = () => setIsListening(false);
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setError("");
    setTranscript("");
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      setError("Failed to start speech recognition: " + err.message);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const resetTranscript = () => {
    setTranscript("");
    setManualTranscript("");
    setError("");
  };

  const handleSubmit = () => {
    const finalAnswer = manualTranscript || transcript;
    if (!finalAnswer) return;

    // Store answer in allAnswers
    setAllAnswers((prev) => [
      ...prev,
      { question: questions[currentIndex], answer: finalAnswer },
    ]);

    setAnswerSubmitted(true);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setTranscript("");
        setManualTranscript("");
        setAnswerSubmitted(false);
      } else {
        setAnswerSubmitted(false);
        setCurrentIndex(questions.length); // trigger completion screen
      }
    }, 1500);
  };

  // Completion screen
  if (currentIndex >= questions.length) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 800,
            background: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h2>✅ Behavioral Round Completed!</h2>
          <p>Here are all your answers:</p>

          <ul style={{ textAlign: "left", marginTop: "20px" }}>
            {allAnswers.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "15px" }}>
                <strong>Q{idx + 1}:</strong> {item.question} <br />
                <strong>Answer:</strong> {item.answer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>Behavioral Round</h2>

        <h3>Question {currentIndex + 1}:</h3>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          {questions[currentIndex]}
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div
          style={{
            margin: "20px 0",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button onClick={startListening} disabled={isListening}>
            {isListening ? "Listening..." : "Start Listening"}
          </button>
          <button onClick={stopListening} disabled={!isListening}>
            Stop Listening
          </button>
          <button
            onClick={resetTranscript}
            disabled={!transcript && !manualTranscript}
          >
            Reset
          </button>
          {isListening && (
            <span
              style={{
                marginLeft: "10px",
                width: "12px",
                height: "12px",
                background: "red",
                borderRadius: "50%",
                display: "inline-block",
                animation: "blink 1s infinite",
              }}
            />
          )}
        </div>

        <textarea
          value={manualTranscript || transcript}
          onChange={(e) => setManualTranscript(e.target.value)}
          placeholder="Your answer will appear here..."
          rows={10}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleSubmit}
            disabled={!(manualTranscript || transcript) || answerSubmitted}
          >
            {answerSubmitted ? "Answer Submitted" : "Submit Answer"}
          </button>
        </div>

        {answerSubmitted && (
          <p style={{ color: "green", marginTop: "10px" }}>
            ✅ Answer submitted!
          </p>
        )}

        {/* Hidden audio element to monitor your voice */}
        <audio ref={audioRef} style={{ display: "none" }} />

        {allAnswers.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3>Previous Answers:</h3>
            <ul style={{ textAlign: "left" }}>
              {allAnswers.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "10px" }}>
                  <strong>Q{idx + 1}:</strong> {item.question} <br />
                  <strong>Answer:</strong> {item.answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BehavioralRound;
