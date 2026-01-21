import { connectDB } from "@/lib/db";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const ticket = await Ticket.create(body);
  return NextResponse.json(ticket);
}
