"use client";

import { useState } from "react";
import PaystackButton from "@/components/PaystackButton";

export default function RaffleCard({ raffle }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPay, setShowPay] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-xl font-bold">{raffle.title}</h3>
      <p className="text-gray-600">{raffle.description}</p>

      <p className="mt-2 font-semibold">
        ₦{raffle.ticketPrice}
      </p>

      {!showPay ? (
        <>
          <input
            className="mt-3 w-full border rounded p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="mt-2 w-full border rounded p-2"
            placeholder="Phone (WhatsApp)"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={() => setShowPay(true)}
            disabled={!email || !phone}
            className="mt-3 bg-blue-600 text-white w-full py-2 rounded"
          >
            Enter Raffle
          </button>
        </>
      ) : (
        <PaystackButton
          raffleId={raffle._id}
          amount={raffle.ticketPrice}
          email={email}
          phone={phone}
        />
      )}
    </div>
  );
}
