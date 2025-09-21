import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
} from "@mui/material";
import { getMcqQuestions } from "../api";

export default function Mcq() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({}); // {questionId: selectedOption}
  const [score, setScore] = useState(null); // ✅ store final score

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getMcqQuestions();
        setQuestions(data);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    let newScore = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.answer) {
        newScore++;
      }
    });

    setScore(newScore);
    console.log("User Answers:", answers);
  };

  if (loading)
    return <Typography textAlign="center">Loading MCQs...</Typography>;
  if (error)
    return (
      <Typography color="error" textAlign="center">
        {error}
      </Typography>
    );

  return (
    <Stack spacing={3} sx={{ p: 4 }}>
      <Typography variant="h5" textAlign="center">
        MCQ Round
      </Typography>

      {questions.map((q, index) => (
        <Paper key={q._id || index} sx={{ p: 2 }}>
          <Typography variant="subtitle1">
            {index + 1}. {q.question}
          </Typography>
          <RadioGroup
            value={answers[q._id] || ""}
            onChange={(e) => handleAnswerChange(q._id, e.target.value)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={opt}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>
        </Paper>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Answers
      </Button>

      {score !== null && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
          🎉 You scored {score} out of {questions.length}
        </Typography>
      )}
    </Stack>
  );
}
