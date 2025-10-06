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
import { getUserProfile } from "../api";

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

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfile();
        console.log("✅ Profile data from API:", data);

        if (data.user) {
          setUser(data.user);
        } else {
          setUser(data);
        }
      } catch (err) {
        console.error("❌ Fetch profile error:", err.response?.data);
      }
    })();
  }, []);

  const chartData = user
    ? {
        labels: Array.from(
          {
            length: Math.max(
              user?.scores?.mcq?.length || 0,
              user?.scores?.coding?.length || 0
            ),
          },
          (_, i) => `Test ${i + 1}`
        ),
        datasets: [
          {
            label: "MCQ Scores",
            data: user?.scores?.mcq || [],
            borderColor: "green",
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: "Coding Scores",
            data: user?.scores?.coding || [],
            borderColor: "blue",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      }
    : { labels: [], datasets: [] };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "5rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: "80%",
          maxWidth: 800,
          background: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          Your Progress 📊
        </Typography>

        {user ? (
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
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

        <Line data={chartData} />
      </Paper>
    </div>
  );
}
