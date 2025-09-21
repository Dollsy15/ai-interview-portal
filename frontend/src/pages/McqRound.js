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
        setQuestions(data);
      } catch (err) {
        console.error("❌ Error fetching MCQs:", err);
      }
    })();
  }, []);

  // ✅ Store selected option TEXT
  const handleChange = (qId, value) => {
    setAnswers({
      ...answers,
      [qId]: value, // store actual text (e.g. "Python")
    });
  };

  // ✅ Submit quiz
  const handleSubmit = async () => {
    let calcScore = 0;

    questions.forEach((q) => {
      const userAns = answers[q._id] ?? "";
      const correctAns = q.answer;
      console.log(`Q: ${q.question} | user=${userAns} | correct=${correctAns}`);
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
                      value={opt} // ✅ FIXED: option text stored
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
