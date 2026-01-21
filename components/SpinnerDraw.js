"use client";
import { useState } from "react";

export default function SpinnerDraw({ tickets }) {
  const [winner, setWinner] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    let count = 0;

    const interval = setInterval(() => {
      const random =
        tickets[Math.floor(Math.random() * tickets.length)];
      setWinner(random.userEmail);
      count++;

      if (count > 40) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="text-center">
      <div className="text-3xl font-bold h-16">
        {winner || "Ready"}
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-4 bg-red-600 text-white px-6 py-2 rounded"
      >
        {spinning ? "Spinning..." : "Start Draw"}
      </button>
    </div>
  );
}
