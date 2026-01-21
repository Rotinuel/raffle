import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Ticket from "@/models/Ticket";
import Raffle from "@/models/Raffle";
import { rateLimit } from "@/lib/ratelimit";

export async function POST(req) {
  const { reference, raffleId, email, phone } = await req.json();

  // 🔐 Anti-spam
  if (!rateLimit(email)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  // 🔍 Verify Paystack payment
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  );

  const data = await res.json();

  if (!data.status || data.data.status !== "success") {
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 400 }
    );
  }

  await connectDB();

  // 🔒 Prevent duplicate ticket for same reference
  const exists = await Ticket.findOne({ reference });
  if (exists) {
    return NextResponse.json({ error: "Duplicate payment" });
  }

  // 🎟️ Create ticket
  await Ticket.create({
    raffleId,
    userEmail: email,
    phone,
    reference,
    ticketNumber: Math.floor(Math.random() * 1000000)
  });

  return NextResponse.json({ success: true });
}
