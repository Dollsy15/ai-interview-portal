import React, { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignupModal = ({ show, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
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
        name, 
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
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...inputStyle,
                paddingRight: "45px",
                backgroundColor: "#ffffff",
              }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
                fontSize: "20px",
              }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

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
  backgroundColor: "#ffffff",
  padding: "35px",
  borderRadius: "12px",
  width: "340px",
  maxWidth: "90%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const inputStyle = {
  width: "100%",
  margin: "10px 0",
  padding: "10px 12px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
  outline: "none",
};

const buttonStyle = {
  padding: "10px 20px",
  marginTop: "10px",
  marginRight: "10px",
};
