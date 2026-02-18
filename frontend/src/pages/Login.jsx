import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      alert(res.data.message);
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%" }}
        />

        <br />
        <br />

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              margin: "10px 0px",
              padding: "8px",
              paddingRight: "40px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid rgb(204, 204, 204)",
            }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <br />
        <br />

        <input
          type="submit"
          value="Login"
          style={{
            padding: "10px 25px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "10px",
            backgroundColor: "#f5f5f5",
            color: "black",
          }}
        />

        <input
          type="button"
          value="Close"
          style={{
            padding: "10px 25px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            color: "black",
          }}
        />
      </form>
    </div>
  );
};

export default Login;
