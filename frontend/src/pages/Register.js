import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    if (!validatePassword(form.password)) {
      alert(
        "Password must contain uppercase, lowercase, number, special character and at least 6 characters"
      );
      return;
    }

    try {
      const res = await registerUser(form);
      const data = res.data ? res.data : res;
      alert(data.msg || "✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Registration failed");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "90%",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="off"
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "#000",
              },
            }}
          />
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="off"
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                WebkitTextFillColor: "#000",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}
