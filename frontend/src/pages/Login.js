import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      // ⭐ Save token & user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      // Show exact backend error
      alert(err.response?.data?.msg || "❌ Login failed");
    }
  };

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#f0f0f0"}}>
      <Paper elevation={6} sx={{ p:4, maxWidth:400, width:"90%", background:"white" }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} margin="normal"/>
          <TextField fullWidth type="password" name="password" label="Password" value={form.password} onChange={handleChange} margin="normal"/>
          <Button type="submit" variant="contained" fullWidth sx={{ mt:2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}