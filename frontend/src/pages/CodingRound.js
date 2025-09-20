import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodingRound() {
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");

  const handleRun = () => {
    // For now just simulate output
    setOutput(
      "Code executed successfully ✅ (backend will provide real results)"
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4 text-center">Coding Round 💻</h2>
      <div className="bg-gray-100 p-4 rounded shadow">
        <Editor
          height="300px"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(newValue) => setCode(newValue ?? "")}
        />
        <button
          onClick={handleRun}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Run Code
        </button>
        {output && (
          <div className="mt-4 p-3 bg-green-100 rounded border">{output}</div>
        )}
      </div>
    </div>
  );
}
