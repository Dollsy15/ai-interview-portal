// src/pages/BehavioralRound.js
import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";

export default function BehavioralRound() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleCheck = () => {
    if (answer.length > 20)
      setFeedback("✅ Good detail and clarity! (AI feedback coming later)");
    else setFeedback("⚠️ Try elaborating more in your answers.");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 8 }}>
      <Typography variant="h6" gutterBottom>
        Behavioral Round 🎤
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Type your response..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleCheck}>
        Submit
      </Button>
      {feedback && <Typography mt={2}>{feedback}</Typography>}
    </Paper>
  );
}
