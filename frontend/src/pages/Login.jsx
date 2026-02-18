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
    console.log("Login button clicked");  //

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(res.data);

      // Directly store token
      localStorage.setItem("token", res.data.token);

      // Clear fields
      setEmail("");
      setPassword("");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
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

        <button
          type="submit"
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
        >
          Login
        </button>

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
