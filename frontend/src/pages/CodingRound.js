// src/pages/CodingRound.js
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Paper, Button, Typography, Stack } from "@mui/material";
import Timer from "../components/Timer";

export default function CodingRound() {
  const sampleQuestions = [
    {
      title: "Reverse a String",
      description: "Write a function to reverse a string.",
      difficulty: "Easy",
      starterCode: `function reverseString(str) {\n  // Write your logic here\n}`,
      testCases: [
        { input: "hello", expected: "olleh" },
        { input: "coding", expected: "gnidoc" },
      ],
    },
    {
      title: "Sum of Array",
      description: "Return the sum of all numbers in an array.",
      difficulty: "Easy",
      starterCode: `function sumArray(arr) {\n  // Write your logic here\n}`,
      testCases: [
        { input: [1, 2, 3], expected: 6 },
        { input: [5, 10], expected: 15 },
      ],
    },
    {
      title: "Find Maximum",
      description: "Return the maximum number from an array.",
      difficulty: "Easy",
      starterCode: `function findMax(arr) {\n  // Write your logic here\n}`,
      testCases: [
        { input: [1, 4, 2], expected: 4 },
        { input: [-5, -1, -10], expected: -1 },
      ],
    },
    {
      title: "Factorial of Number",
      description: "Compute factorial of a number recursively.",
      difficulty: "Medium",
      starterCode: `function factorial(n) {\n  // Write your logic here\n}`,
      testCases: [
        { input: 5, expected: 120 },
        { input: 0, expected: 1 },
      ],
    },
    {
      title: "Check Palindrome",
      description: "Check if a string is a palindrome.",
      difficulty: "Medium",
      starterCode: `function isPalindrome(str) {\n  // Write your logic here\n}`,
      testCases: [
        { input: "level", expected: true },
        { input: "hello", expected: false },
      ],
    },
    {
      title: "Merge Two Sorted Arrays",
      description: "Merge two sorted arrays into one sorted array.",
      difficulty: "Hard",
      starterCode: `function mergeSortedArrays(arr1, arr2) {\n  // Write your logic here\n}`,
      testCases: [
        {
          input: [
            [1, 3],
            [2, 4],
          ],
          expected: [1, 2, 3, 4],
        },
      ],
    },
  ];

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState({}); // store previous submissions
  const [timerKey, setTimerKey] = useState(0); // force timer reset only for new question

  // Load hardcoded questions
  useEffect(() => {
    setQuestions(sampleQuestions);
    setCurrentIndex(0);
    setCode(sampleQuestions[0].starterCode);
  }, []);

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentIndex];

  // Run test cases locally
  const runTestCases = (func, testCases) => {
    if (!testCases || testCases.length === 0) return false;
    try {
      for (let tc of testCases) {
        const input = Array.isArray(tc.input) ? tc.input : [tc.input];
        const result = func(...input);
        if (JSON.stringify(result) !== JSON.stringify(tc.expected))
          return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSubmit = () => {
    if (!code.trim() || code === currentQuestion.starterCode) {
      setOutput("❌ Please write your code before submitting.");
      return;
    }

    try {
      const func = new Function("return " + code)();
      const passed = runTestCases(func, currentQuestion.testCases || []);

      // Save submission
      setSubmissions((prev) => ({
        ...prev,
        [currentIndex]: code,
      }));

      if (passed) {
        setOutput("✅ All testcases passed!");
        setSubmitted(true);

        if (currentIndex + 1 < questions.length) {
          setTimeout(() => handleNext(), 1500);
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

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCode(submissions[nextIndex] || questions[nextIndex].starterCode);
      setOutput("");
      setSubmitted(!!submissions[nextIndex]);
      setTimerKey(timerKey + 1); // ✅ reset timer only for new question
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCode(submissions[prevIndex] || questions[prevIndex].starterCode);
      setOutput("");
      setSubmitted(!!submissions[prevIndex]);
      // Timer continues, do not reset
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
          Coding Question {currentIndex + 1} / {questions.length} [
          {currentQuestion.difficulty}]
        </Typography>
        <Typography sx={{ mb: 2, color: "#444" }}>
          {currentQuestion.title}
        </Typography>
        <Typography sx={{ mb: 3, color: "#666" }}>
          {currentQuestion.description}
        </Typography>

        {/* Timer resets only for new question */}
        <Timer
          key={timerKey} // just use currentIndex, no old submissions affect it
          duration={10 * 60}
          onTimeUp={handleAutoSubmit}
        />

        <Editor
          key={currentIndex} // reload editor on question change
          height="300px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
          options={{ readOnly: submitted }}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitted}
          >
            Submit Code
          </Button>
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </Button>
        </Stack>

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
