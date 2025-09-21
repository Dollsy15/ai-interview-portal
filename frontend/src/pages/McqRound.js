import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { getMcqQuestions, addUserScore } from "../api";
import { useNavigate } from "react-router-dom";

export default function McqRound() {
  const [questions, setQuestions] = useState([]); // fetched questions
  const [answers, setAnswers] = useState({}); // selected answers
  const [score, setScore] = useState(null); // final score
  const navigate = useNavigate();

  // ✅ Fetch MCQ questions on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getMcqQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("❌ Error fetching MCQs:", err);
      }
    })();
  }, []);

  // Handle user selecting an answer
  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: parseInt(value) });
  };

  // Handle submit quiz
  const handleSubmit = async () => {
    let calcScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) calcScore += 10; // ✅ 10 marks per correct ans
    });

    setScore(calcScore);

    try {
      // ✅ Save score to DB
      await addUserScore("mcq", calcScore);
      alert(`Your MCQ Score: ${calcScore}`);
      navigate("/dashboard"); // ✅ go back to Dashboard
    } catch (err) {
      console.error("❌ Failed to save MCQ score:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f9f9",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 700 }}>
        <Typography variant="h4" gutterBottom>
          MCQ Round
        </Typography>

        {score === null ? (
          <>
            {questions.map((q, index) => (
              <div key={index} style={{ marginBottom: "1.5rem" }}>
                <Typography variant="h6">
                  {index + 1}. {q.question}
                </Typography>
                <RadioGroup
                  value={answers[index] ?? ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                >
                  {q.options.map((opt, i) => (
                    <FormControlLabel
                      key={i}
                      value={i}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              </div>
            ))}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </>
        ) : (
          <Typography variant="h5">✅ You scored {score} marks 🎉</Typography>
        )}
      </Paper>
    </div>
  );
}
