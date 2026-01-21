import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Raffle from "@/models/Raffle";

export async function GET() {
  await connectDB();
  const raffles = await Raffle.find();
  return NextResponse.json(raffles);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const raffle = await Raffle.create({
    title: body.title,
    description: body.description,
    ticketPrice: Number(body.ticketPrice),
  });

  return NextResponse.json(raffle);
}
