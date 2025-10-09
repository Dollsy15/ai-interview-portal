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
import { getMcqQuestions, submitMcqAnswers } from "../api";
import Timer from "../components/Timer";
import ScoreCard from "./ScoreCard";

export default function Mcq() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getMcqQuestions();
        setQuestions(data.questions || []);
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

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    try {
      const response = await submitMcqAnswers({ answers, timeSpent });
      setScoreData(response);
    } catch (err) {
      console.error(err);
      alert("Failed to submit answers.");
    }
  };

  if (loading)
    return <Typography textAlign="center">Loading MCQs...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack spacing={3} sx={{ p: 4 }}>
      <Typography variant="h5" textAlign="center">
        MCQ Round
      </Typography>

      <Timer onTimeUpdate={setTimeSpent} />

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

      {scoreData && (
        <ScoreCard
          open={!!scoreData}
          onClose={() => setScoreData(null)}
          score={scoreData.score}
          total={scoreData.total}
          details={scoreData.details}
        />
      )}
    </Stack>
  );
}
