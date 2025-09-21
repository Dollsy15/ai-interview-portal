import { useState, useEffect } from "react";

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "18px",
        color: "red",
        marginBottom: "1rem",
      }}
    >
      ⏳ Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;
