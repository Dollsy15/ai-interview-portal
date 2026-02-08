import React, { useState } from "react";
import axios from "axios";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  minWidth: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
};

const inputStyle = {
  width: "100%",
  margin: "10px 0",
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  marginTop: "10px",
  cursor: "pointer",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  fontSize: "16px",
};

const LoginModal = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      alert(res.data.message || "Login successful");
      setEmail("");
      setPassword("");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button onClick={onClose} style={buttonStyle}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
