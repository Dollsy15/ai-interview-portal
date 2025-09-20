// src/pages/Login.js
import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummyToken");
    window.location.href = "/dashboard";
  };

  return (
    <Paper elevation={3} sx={{ p:4, maxWidth:400, mx:"auto", mt:8 }}>
      <Typography variant="h5" textAlign={"center"} gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth label="Email" margin="normal"
          value={email} onChange={(e)=>setEmail(e.target.value)} />
        <TextField 
          fullWidth type="password" label="Password" margin="normal"
          value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth sx={{mt:2}}>Login</Button>
      </form>
    </Paper>
  );
}