// src/pages/Dashboard.js
import React from "react";
import { Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Coding Scores",
        data: [40, 60, 75, 90],
        borderColor: "blue",
        tension: 0.3,
      },
      {
        label: "MCQ Scores",
        data: [50, 65, 70, 85],
        borderColor: "green",
        tension: 0.3,
      },
    ],
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "80%",
          maxWidth: 800,
          background: "rgba(255,255,255,0.9)",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Your Progress 📊
        </Typography>
        <Line data={data} />
      </Paper>
    </div>
  );
}
