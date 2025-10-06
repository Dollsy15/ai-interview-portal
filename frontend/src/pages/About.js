import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
            sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
          >
            About AI Interview Portal
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            The AI Interview Portal is designed to help students and
            professionals prepare for technical interviews with confidence. It
            combines live coding challenges, multiple-choice quizzes, and
            AI-assisted feedback for behavioral questions.
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Our mission is to bridge the gap between theoretical preparation and
            practical interview performance. Through progress analytics and
            personalized insights, users can strengthen their weak areas and
            track improvements over time.
          </Typography>

          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Built with ❤️ using React, Node.js, MongoDB and AI-powered feedback
            engines.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3, background: "#1976d2" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
