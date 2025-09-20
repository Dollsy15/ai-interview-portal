// src/pages/Dashboard.js
import React from "react";
import { Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const data = {
    labels: ["Week 1","Week 2","Week 3","Week 4"],
    datasets: [
      { label:"Coding", data:[40,60,75,90], borderColor:"blue", tension:0.3 },
      { label:"MCQ", data:[50,65,70,85], borderColor:"green", tension:0.3 }
    ]
  };

  return (
    <Paper elevation={3} sx={{ p:4, maxWidth:600, mx:"auto", mt:8 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>Your Progress 📊</Typography>
      <Line data={data}/>
    </Paper>
  );
}