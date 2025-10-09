import React, { useEffect, useState } from "react";

export default function Timer({ onTimeUpdate }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newTime = prev + 1;
        onTimeUpdate(newTime); // send time to parent
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUpdate]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>
      Time Spent: {formatTime(seconds)}
    </div>
  );
}
