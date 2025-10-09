import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";
import { getMcqQuestions, submitMcqAnswers } from "../api";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import ScoreCard from "../components/ScoreCard";

export default function McqRound() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const navigate = useNavigate();

  // Fetch MCQ questions
  useEffect(() => {
    (async () => {
      try {
        const data = await getMcqQuestions();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("❌ Error fetching MCQs:", err);
        alert("Failed to fetch questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Store selected option
  const handleChange = (qId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  // Submit quiz
  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitMcqAnswers({ answers, timeSpent });
      setScoreData(response); // {score, total, details}
    } catch (err) {
      console.error("❌ Failed to submit MCQs:", err);
      alert("Failed to submit your answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
          minHeight: "400px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: 2,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4">MCQ Round</Typography>

          <Timer onTimeUpdate={setTimeSpent} />

          {questions.length === 0 ? (
            <Typography variant="h6">
              No questions available. Please check the database.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {questions.map((q, index) => (
                <Box key={q._id}>
                  <Typography variant="h6" gutterBottom>
                    {index + 1}. {q.question}
                  </Typography>

                  {q.options && q.options.length > 0 ? (
                    <RadioGroup
                      value={answers[q._id] ?? ""}
                      onChange={(e) => handleChange(q._id, e.target.value)}
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
                  ) : (
                    <Typography color="error">No options available.</Typography>
                  )}
                </Box>
              ))}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </Stack>
          )}

          {scoreData && (
            <ScoreCard
              open={!!scoreData}
              onClose={() => {
                setScoreData(null);
                navigate("/dashboard");
              }}
              score={scoreData.score}
              total={scoreData.total}
              details={scoreData.details}
            />
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
