import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized. Please login.");
        return;
      }

      try {
        // Fetch user info and message
        const userRes = await axios.get("http://localhost:5000/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(userRes.data);

        // Fetch interview questions
        const questionsRes = await axios.get(
          "http://localhost:5000/api/questions",
        );
        setQuestions(questionsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (!userData) return <h3>Loading user info...</h3>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>
      <p>
        Welcome,{" "}
        {userData.user?.email
          ? userData.user.email
          : userData.user?.id
            ? `User ID: ${userData.user.id}`
            : "User"}
      </p>
      <p>{userData.message}</p>

      <h3>Interview Questions</h3>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: "#f4f4f4",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            {q.question}
          </div>
        ))
      )}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
