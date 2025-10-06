import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    try {
      const data = await loginUser(form);
      if (!data.success) {
        alert(data.msg || "❌ Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Login failed");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1650&q=80')",
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
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
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

          <MuiLink
            href="#"
            underline="hover"
            sx={{ display: "block", textAlign: "right", mb: 2 }}
          >
            Forgot Password?
          </MuiLink>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
