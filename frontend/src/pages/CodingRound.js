// src/pages/CodingRound.js
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Paper, Button, Typography } from "@mui/material";

export default function CodingRound() {
  const [code,setCode] = useState("// write your code here...");
  const [output,setOutput] = useState("");

  const handleRun = () => setOutput("✅ Code executed successfully (dummy)");

  return (
    <Paper elevation={3} sx={{ p:4, maxWidth:800, mx:"auto", mt:8 }}>
      <Typography variant="h6" gutterBottom>Coding Round 💻</Typography>
      <Editor height="300px" language="javascript" theme="vs-dark" value={code} onChange={(v)=>setCode(v)} />
      <Button variant="contained" sx={{mt:2}} onClick={handleRun}>Run Code</Button>
      {output && <Paper sx={{mt:2,p:2,background:"#f1f1f1"}}>{output}</Paper>}
    </Paper>
  );
}