import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

function ScoreCard({ open, onClose, score, total, details }) {
  const percentage = total > 0 ? ((score / total) * 100).toFixed(1) : 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="scorecard-dialog-title"
    >
      <DialogTitle id="scorecard-dialog-title">MCQ ScoreCard</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h6">
            Your Score: {score} / {total}
          </Typography>
          <Typography variant="subtitle1">Percentage: {percentage}%</Typography>

          {details && details.length > 0 && (
            <Box>
              {details.map((d, idx) => (
                <Typography
                  key={idx}
                  color={d.isCorrect ? "green" : "red"}
                  sx={{ mb: 1 }}
                >
                  Q{idx + 1}: Your answer: {d.selected || "No Answer"} |
                  Correct: {d.correctAnswer} | {d.isCorrect ? "✅" : "❌"}
                </Typography>
              ))}
            </Box>
          )}

          <Box textAlign="center" mt={2}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ScoreCard;
