import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Paper, Button, Typography } from "@mui/material";

export default function CodingRound() {
  const question = "Write a function to reverse a string in JavaScript.";

  const [code, setCode] = useState(`function reverseString(str) {
  // Your code here
}`);
  const [output, setOutput] = useState("");

  const runCode = () => {
    setOutput("✅ Code submitted! (Will connect with Judge0 API later)");
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 900,
          background: "rgba(255,255,255,0.95)",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Coding Question 💻
        </Typography>
        <Typography sx={{ mb: 3, color: "#444" }}>{question}</Typography>

        {/* Monaco Code Editor */}
        <Editor
          height="300px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={runCode}
        >
          Run Code
        </Button>

        {output && (
          <Typography
            variant="subtitle1"
            sx={{
              mt: 2,
              p: 2,
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            {output}
          </Typography>
        )}
      </Paper>
    </div>
  );
}
