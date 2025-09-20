import React, { useState } from "react";

const sampleQuestions = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(log n)"
  },
  {
    id: 2,
    question: "Which DB is NoSQL?",
    options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
    answer: "MongoDB"
  }
];

export default function McqRound() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    let sc = 0;
    sampleQuestions.forEach(q => {
      if (answers[q.id] === q.answer) sc++;
    });
    setScore(sc);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4 text-center">MCQ Round 📝</h2>
      {sampleQuestions.map((q) => (
        <div key={q.id} className="bg-white shadow p-4 mb-4 rounded">
          <p className="font-semibold mb-2">{q.question}</p>
          {q.options.map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit
      </button>
      {score !== null && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <h3>Your Score: {score}/{sampleQuestions.length}</h3>
        </div>
      )}
    </div>
  );
}