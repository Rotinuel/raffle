import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Ticket from "@/models/Ticket";
import Raffle from "@/models/Raffle";
import { pickWinner } from "@/lib/random";

export async function POST(req) {
  const { raffleId } = await req.json();

  await connectDB();

  const raffle = await Raffle.findById(raffleId);

  // 🔒 Prevent re-draw
  if (raffle.status === "completed") {
    return NextResponse.json({ error: "Already drawn" });
  }

  const tickets = await Ticket.find({ raffleId });

  if (!tickets.length) {
    return NextResponse.json({ error: "No tickets sold" });
  }

  // 🎯 Pick winner securely
  const winner = pickWinner(tickets);

  // ✅ Save winner
  raffle.winner = winner.userEmail;
  raffle.status = "completed";
  await raffle.save();

  // 📲 SEND WHATSAPP NOTIFICATION (SERVER → SERVER)
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notify/whatsapp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: winner.phone, // must exist in DB
      message: `🎉 Congratulations! You won the raffle: ${raffle.title}`
    }),
  });

  return NextResponse.json({ winner });
}
