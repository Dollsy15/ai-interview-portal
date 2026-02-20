import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await axios.get("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(userRes.data);

        const questionsRes = await axios.get(
          "http://localhost:5000/api/questions",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setQuestions(questionsRes.data.questions || questionsRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to load dashboard");
        }
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleStartInterview = () => {
    navigate("/interview");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleQuestionClick = (question) => {
    alert(question);
  };

  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (!userData) return <h3>Loading user info...</h3>;

  const userName =
    userData.user?.name || userData.user?.email?.split("@")[0] || "User";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(120deg, #f5f7fa, #e4e9f7)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: "#4a6cf7" }}>AI Interview Portal</h2>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            background: "#ff4d4f",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Section */}
      <div
        style={{
          flex: 1,
          padding: "60px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: "550px" }}>
          <h1 style={{ fontSize: "40px", marginBottom: "15px" }}>
            Welcome back, <span style={{ color: "#4a6cf7" }}>{userName}!</span>
          </h1>

          <p style={{ fontSize: "18px", color: "#555" }}>
            Continue your AI-powered interview preparation and improve your
            confidence with real-world questions.
          </p>

          <button
            onClick={handleStartInterview}
            style={{
              marginTop: "25px",
              padding: "14px 30px",
              background: "#4a6cf7",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(74,108,247,0.3)",
            }}
          >
            Start Interview
          </button>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="AI Bot"
          style={{
            width: "260px",
            animation: "float 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Questions Section */}
      <div style={{ padding: "40px 80px" }}>
        <h2 style={{ marginBottom: "25px" }}>Practice Questions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {questions.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            questions.map((q) => (
              <div
                key={q._id || q.id}
                onClick={() => handleQuestionClick(q.question)}
                style={{
                  background: "#ffffff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {q.question}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          padding: "50px 80px",
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { label: "Interviews Taken", value: 12 },
          { label: "Avg. Score", value: "82%" },
          { label: "Questions Practiced", value: questions.length },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              minWidth: "200px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ color: "#4a6cf7" }}>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#111",
          color: "#fff",
          padding: "25px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p>© 2026 AI Interview Portal. All rights reserved.</p>
      </footer>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
