import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const Landing = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "48px" }}>AI Interview Portal</h1>
      <p style={{ fontSize: "20px" }}>
        Practice AI-powered interviews and get instant feedback!
      </p>
      <button
        onClick={() => setShowLogin(true)}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Login
      </button>
      <button
        onClick={() => setShowSignup(true)}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Signup
      </button>

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
    </div>
  );
};

export default Landing;
