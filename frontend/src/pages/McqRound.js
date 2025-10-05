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
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch MCQ questions
  useEffect(() => {
    (async () => {
      try {
        const data = await getMcqQuestions();
        console.log("Fetched MCQs:", data);

        setQuestions(data.questions || []);
      } catch (err) {
        console.error("❌ Error fetching MCQs:", err);
      }
    })();
  }, []);

  // ✅ Store selected option
  const handleChange = (qId, value) => {
    setAnswers({
      ...answers,
      [qId]: value,
    });
  };

  // ✅ Submit quiz
  const handleSubmit = async () => {
    let calcScore = 0;

    questions.forEach((q) => {
      const userAns = answers[q._id] ?? "";
      const correctAns = q.correctAnswer; // backend field
      if (userAns === correctAns) {
        calcScore++;
      }
    });

    setScore(calcScore);

    try {
      await addUserScore("mcq", calcScore);
      alert(`Your MCQ Score: ${calcScore}/${questions.length}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Failed to save score:", err);
    }
  };

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
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
          minHeight: "400px",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          MCQ Round
        </Typography>

        {questions.length === 0 ? (
          <Typography variant="h6">
            No questions available. Please check the database.
          </Typography>
        ) : score === null ? (
          <>
            {Array.isArray(questions) &&
              questions.map((q, index) => (
                <div key={q._id} style={{ marginBottom: "1.5rem" }}>
                  <Typography variant="h6">
                    {index + 1}. {q.question}
                  </Typography>
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
          <Typography variant="h5">
            ✅ You scored {score}/{questions.length} marks 🎉
          </Typography>
        )}
      </Paper>
    </div>
  );
}
