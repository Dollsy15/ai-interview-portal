// src/pages/Home.js
import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import InterviewIcon from "@mui/icons-material/QuestionAnswer";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "white",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to AI Interview Portal 🚀
        </Typography>
        <Typography variant="h6" gutterBottom>
          Practice coding, MCQs and mock interviews with instant AI feedback.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, background: "white", color: "#1976d2" }}
          href="/register"
        >
          Get Started
        </Button>
      </div>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight={"bold"}
        >
          Why Choose This Portal?
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <CodeIcon sx={{ fontSize: 50, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                Live Coding
              </Typography>
              <Typography>
                Solve coding problems in the browser with instant feedback from
                code execution.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <InterviewIcon sx={{ fontSize: 50, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                Mock Interviews
              </Typography>
              <Typography>
                Answer behavioral questions and receive AI-powered feedback on
                clarity and confidence.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <SchoolIcon sx={{ fontSize: 50, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                Analytics Dashboard
              </Typography>
              <Typography>
                Track your strengths, weaknesses, and performance with charts
                and reports.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call-to-Action Footer */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "3rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ready to boost your interview performance?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/register"
          sx={{ mt: 2 }}
        >
          Join Now
        </Button>
      </div>
    </div>
  );
}
