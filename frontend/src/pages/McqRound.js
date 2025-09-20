// src/pages/McqRound.js
import React, { useState } from "react";
import { Paper, Typography, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const questions = [
  {id:1, question:"What is the time complexity of binary search?", options:["O(n)","O(log n)","O(n log n)","O(1)"], answer:"O(log n)"},
  {id:2, question:"Which is NoSQL database?", options:["MySQL","MongoDB","PostgreSQL","Oracle"], answer:"MongoDB"}
];

export default function McqRound() {
  const [answers,setAnswers] = useState({});
  const [score,setScore] = useState(null);

  const handleSubmit = ()=>{
    let sc=0; questions.forEach(q=>{ if(answers[q.id]===q.answer) sc++; });
    setScore(sc);
  };

  return (
    <Paper elevation={3} sx={{p:4, maxWidth:600, mx:"auto", mt:8}}>
      <Typography variant="h6" gutterBottom>MCQ Round 📝</Typography>
      {questions.map(q=>(
        <div key={q.id} style={{marginBottom:"1rem"}}>
          <Typography>{q.question}</Typography>
          <RadioGroup value={answers[q.id]||""} onChange={(e)=>setAnswers(prev=>({...prev,[q.id]:e.target.value}))}>
            {q.options.map(opt=>(
              <FormControlLabel key={opt} value={opt} control={<Radio/>} label={opt}/>
            ))}
          </RadioGroup>
        </div>
      ))}
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      {score!==null && <Typography mt={2}>Your Score: {score}/{questions.length}</Typography>}
    </Paper>
  );
}