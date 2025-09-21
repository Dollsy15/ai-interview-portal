// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Paper, Typography, Divider } from "@mui/material";
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
import { getUserProfile } from "../api"; // 👈 protected API helper

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // ✅ Fetch current user profile on load
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfile(); // auto-includes token via interceptor
        setUser(data.user);
      } catch (err) {
        console.error("❌ Failed to fetch profile:", err.response?.data);
      }
    })();
  }, []);

  // Demo progress data (replace with dynamic later)
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
        padding: "3rem 0",
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

        {/* ✅ Logged-in user info */}
        {user ? (
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <Typography variant="h6">Welcome, {user.name} 👋</Typography>
            <Typography variant="body2">Email: {user.email}</Typography>
            <Typography variant="body2">Role: {user.role}</Typography>
            <Divider sx={{ my: 2 }} />
          </div>
        ) : (
          <Typography textAlign="center" sx={{ mb: 2, color: "gray" }}>
            Loading your profile...
          </Typography>
        )}

        {/* Progress Line Chart */}
        <Line data={data} />
      </Paper>
    </div>
  );
}
