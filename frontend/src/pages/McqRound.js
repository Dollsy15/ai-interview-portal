import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function McqRound() {
  const questions = [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(log n)",
    },
    {
      id: 2,
      question: "Which one is a NoSQL database?",
      options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
      answer: "MongoDB",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    let sc = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) sc++;
    });
    setScore(sc);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          background: "rgba(255,255,255,0.95)", // semi-transparent so bg isn't distracting
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          MCQ Round 📝
        </Typography>

        {questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "1.5rem" }}>
            <Typography sx={{ mb: 1, fontWeight: "500" }}>{q.question}</Typography>
            <RadioGroup
              value={answers[q.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
            >
              {q.options.map((o) => (
                <FormControlLabel
                  key={o}
                  value={o}
                  control={<Radio />}
                  label={o}
                />
              ))}
            </RadioGroup>
          </div>
        ))}

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>

        {score !== null && (
          <Typography
            variant="h6"
            sx={{ mt: 3, fontWeight: "bold", textAlign: "center" }}
          >
            Your Score: {score}/{questions.length}
          </Typography>
        )}
      </Paper>
    </div>
  );
}