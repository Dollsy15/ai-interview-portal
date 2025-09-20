import React from "react";
import { Container, Typography, Paper } from "@mui/material";

export default function About() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h4" gutterBottom textAlign={"center"} fontWeight="bold">
            About AI Interview Portal
          </Typography>
          <Typography paragraph>
            The AI Interview Portal is designed to help students and professionals
            prepare for technical interviews with confidence. It combines live
            coding challenges, multiple-choice quizzes, and AI-assisted feedback 
            for behavioral questions.
          </Typography>
          <Typography paragraph>
            Our mission is to bridge the gap between theoretical preparation and
            practical interview performance. Through progress analytics and
            personalized insights, users can strengthen their weak areas and
            track improvements over time.
          </Typography>
          <Typography paragraph>
            Built with ❤️ using React, Node.js, MongoDB and AI-powered feedback engines.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}