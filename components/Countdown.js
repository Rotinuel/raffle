"use client";
import { useEffect, useState } from "react";

export default function Countdown({ endDate }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(endDate) - new Date();
      if (diff <= 0) {
        setTime("Draw Closed");
        clearInterval(interval);
      } else {
        setTime(Math.floor(diff / 1000) + " sec");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-red-600">{time}</span>;
}
