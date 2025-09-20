import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";

export default function BehavioralRound() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (answer.length > 20) {
      setFeedback("✅ Good detail and clarity! (AI feedback will be added later).");
    } else {
      setFeedback("⚠️ Try to expand your answer with examples and clarity.");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')", // interview desk background
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
          background: "rgba(255,255,255,0.95)",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Behavioral Round 🎤
        </Typography>
        <Typography sx={{ mb: 2, color: "#444" }}>
          Example Question: "Tell me about a time when you solved a difficult problem as part of a team."
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Type your response here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit Answer
        </Button>

        {feedback && (
          <Typography
            variant="subtitle1"
            sx={{ mt: 2, p: 2, background: "#f5f5f5", borderRadius: "8px" }}
          >
            {feedback}
          </Typography>
        )}
      </Paper>
    </div>
  );
}