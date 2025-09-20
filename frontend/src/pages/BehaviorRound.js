import React, { useState } from "react";

export default function BehaviorRound() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // Fake feedback for now
    if (answer.length > 20) {
      setFeedback("✅ Good detail and clarity! (AI model will give deeper feedback later).");
    } else {
      setFeedback("⚠️ Try elaborating more in your answers.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4 text-center">Behavioral Round 🎤</h2>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="6"
        placeholder="Type your response here..."
        className="w-full border rounded p-2"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Submit Answer
      </button>
      {feedback && (
        <div className="mt-4 p-3 bg-blue-100 rounded">{feedback}</div>
      )}
    </div>
  );
}