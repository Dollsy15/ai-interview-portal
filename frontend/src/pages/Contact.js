import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Button } from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${form.name}, we have received your message! ✅`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521790797524-b2497295b8a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}
          >
            Contact Us 📩
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Your Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={5}
              value={form.message}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: "#1976d2",
                fontWeight: "bold",
                "&:hover": { background: "#115293" },
              }}
            >
              Send Message
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
