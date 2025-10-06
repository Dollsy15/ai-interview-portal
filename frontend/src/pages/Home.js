import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import InterviewIcon from "@mui/icons-material/QuestionAnswer";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Live Coding",
      desc: "Solve coding challenges directly in the browser with instant results.",
      icon: <CodeIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
      route: "/coding",
    },
    {
      title: "Mock Interviews",
      desc: "Practice behavioral questions with instant AI feedback.",
      icon: <InterviewIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
      route: "/behavioral",
    },
    {
      title: "Analytics Dashboard",
      desc: "Track your progress with clear, easy-to-read performance reports.",
      icon: <SchoolIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
      route: "/dashboard",
    },
  ];

  return (
    <div>
      {/* ✅ Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "white",
          padding: "8rem 2rem 5rem",
          textAlign: "center",
          borderRadius: "25px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          margin: "3rem auto 4rem",
          maxWidth: "1200px",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to AI Interview Portal 🚀
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          Prepare smarter with coding challenges, MCQs, and AI-driven feedback.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "white",
            color: "#1976d2",
            fontWeight: "bold",
            px: 5,
            py: 2,
            fontSize: "1rem",
            "&:hover": { background: "#f0f0f0" },
          }}
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
            "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "6rem 2rem",
        }}
      >
        {/* ⚡ Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 0,
          }}
        ></div>

        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "white", mb: 5 }}
          >
            Why Choose This Portal?
          </Typography>

          <Grid container spacing={6} justifyContent="center">
            {features.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 5,
                    textAlign: "center",
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0px 15px 30px rgba(0,0,0,0.3)",
                    },
                  }}
                  onClick={() => navigate(feature.route)}
                >
                  {feature.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 3, mb: 1 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography>{feature.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
