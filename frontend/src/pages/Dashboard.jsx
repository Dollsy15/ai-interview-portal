import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized. Please login.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data); // { message, user }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (!userData) return <h3>Loading...</h3>;

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

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload(); // simple logout
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
