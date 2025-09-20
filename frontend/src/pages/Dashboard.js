import React from "react";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Coding Scores",
        data: [40, 60, 75, 90],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
      {
        label: "MCQ Scores",
        data: [50, 65, 70, 85],
        borderColor: "rgb(153, 102, 255)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Progress 📊</h2>
      <div className="max-w-2xl mx-auto bg-white p-4 shadow rounded">
        <Line data={data} />
      </div>
    </div>
  );
}