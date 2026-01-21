"use client";

import { useState } from "react";

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    ticketPrice: "",
  });

  const createRaffle = async () => {
    const res = await fetch("/api/raffle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Raffle created!");
      setForm({ title: "", description: "", ticketPrice: "" });
    } else {
      alert("Failed to create raffle");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Raffle</h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Raffle Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border p-2 mb-3"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        className="w-full border p-2 mb-3"
        type="number"
        placeholder="Ticket Price (₦)"
        value={form.ticketPrice}
        onChange={(e) =>
          setForm({ ...form, ticketPrice: e.target.value })
        }
      />

      <button
        onClick={createRaffle}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        Create Raffle
      </button>
    </div>
  );
}
