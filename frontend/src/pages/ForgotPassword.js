import React, { useState } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import { forgotPassword, resetPassword } from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1=request OTP, 2=reset

  const handleRequestOTP = async () => {
    try {
      await forgotPassword({ email });
      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.msg || "Error sending OTP");
    }
  };

  const handleReset = async () => {
    try {
      await resetPassword({ email, otp, newPassword });
      alert("Password reset successful!");
    } catch (err) {
      alert(err.response?.data?.msg || "Error resetting password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Forgot Password
        </Typography>
        {step === 1 ? (
          <>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" onClick={handleRequestOTP}>
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" onClick={handleReset}>
              Reset Password
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
}
