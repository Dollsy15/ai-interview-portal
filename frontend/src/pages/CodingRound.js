// CodingRound.js
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Paper, Button, Typography } from "@mui/material";
import Timer from "../components/Timer";
import { submitCodingAnswer, getCodingQuestions } from "../api";

export default function CodingRound() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load questions on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getCodingQuestions();
        const qs = data.questions || [];
        setQuestions(qs);
        if (qs.length > 0) {
          setCurrentIndex(0);
          setCode(qs[0].starterCode || "// Your code here");
        }
      } catch (err) {
        console.error("❌ Error fetching coding questions:", err);
      }
    })();
  }, []);

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentIndex];

  // Run test cases (basic evaluation)
  const runTestCases = (func, testCases) => {
    try {
      for (let tc of testCases) {
        const input = Array.isArray(tc.input) ? tc.input : [tc.input];
        const result = func(...input);
        if (result !== tc.expected) return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      // Create function from user code
      // eslint-disable-next-line no-new-func
      const func = new Function("return " + code)();

      const passed = runTestCases(func, currentQuestion.testCases || []);

      if (passed) {
        setOutput("✅ All testcases passed!");
        await submitCodingAnswer({ code, language: "javascript" });
        setSubmitted(true);

        // Move to next question after 1.5s
        if (currentIndex + 1 < questions.length) {
          setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
            setCode(
              questions[currentIndex + 1].starterCode || "// Your code here"
            );
            setOutput("");
            setSubmitted(false);
          }, 1500);
        } else {
          setOutput("🎉 You completed all coding questions!");
        }
      } else {
        setOutput("❌ Some testcases failed.");
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Error in your code");
    }
  };

  const handleAutoSubmit = () => {
    if (!submitted) {
      setOutput("⏰ Time is up! Auto-submitting...");
      handleSubmit();
    }
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
          Coding Question {currentIndex + 1} / {questions.length}
        </Typography>
        <Typography sx={{ mb: 3, color: "#444" }}>
          {currentQuestion.title}
        </Typography>
        <Typography sx={{ mb: 3, color: "#666" }}>
          {currentQuestion.description}
        </Typography>

        <Timer duration={10 * 60} onTimeUp={handleAutoSubmit} />

        <Editor
          height="300px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
          options={{ readOnly: submitted }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={submitted}
        >
          Submit Code
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
