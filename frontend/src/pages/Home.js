import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import InterviewIcon from "@mui/icons-material/QuestionAnswer";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

export default function Home() {
  return (
    <div>
      {/* ✅ Hero Section */}
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
          Prepare smarter with coding, MCQs, and AI-driven feedback.
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

      {/* ✅ Features Section */}
      <div
        style={{
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')", // subtle gradient abstract
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "4rem 2rem",
        }}
      >
        {/* ⚡ Overlay (subtle dark layer for readability) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", // transparent dark overlay
            zIndex: 0,
          }}
        ></div>

        <Container sx={{ py: 4, position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
            style={{ color: "white" }}
          >
            Why Choose This Portal?
          </Typography>

          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 4, textAlign: "center", borderRadius: "12px" }}>
                <CodeIcon sx={{ fontSize: 50, color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                  Live Coding
                </Typography>
                <Typography>
                  Solve coding challenges right in the browser with instant results.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 4, textAlign: "center", borderRadius: "12px" }}>
                <InterviewIcon sx={{ fontSize: 50, color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                  Mock Interviews
                </Typography>
                <Typography>
                  Practice behavioral questions with instant AI feedback.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 4, textAlign: "center", borderRadius: "12px" }}>
                <SchoolIcon sx={{ fontSize: 50, color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                  Analytics Dashboard
                </Typography>
                <Typography>
                  Track your progress with clear, simple performance reports.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}