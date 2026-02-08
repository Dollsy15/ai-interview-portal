import React, { useState } from "react";
import axios from "axios";

const SignupModal = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      alert(res.data.message || "Signup successful");
      setEmail("");
      setPassword("");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Signing up..." : "Signup"}
          </button>

          <button type="button" onClick={onClose} style={buttonStyle}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;

/* ---- styles ---- */
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
};

const inputStyle = {
  width: "100%",
  margin: "10px 0",
  padding: "8px",
};

const buttonStyle = {
  padding: "10px 20px",
  marginTop: "10px",
  marginRight: "10px",
};
