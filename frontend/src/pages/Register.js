// src/pages/Register.js
import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  return (
    <Paper elevation={3} sx={{ p:4, maxWidth:400, mx:"auto", mt:8 }}>
      <Typography variant="h5" textAlign={"center"} gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" margin="normal" value={name} onChange={(e)=>setName(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <TextField fullWidth type="password" label="Password" margin="normal" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth sx={{mt:2}}>Register</Button>
      </form>
    </Paper>
  );
}