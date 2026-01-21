export const dynamic = "force-dynamic"

import { connectDB } from "@/lib/db";
import Raffle from "@/models/Raffle";
import RaffleCard from "@/components/RaffleCard";

export default async function Home() {
  await connectDB();

  const raffles = await Raffle.find().lean(); // ALWAYS array

  return (
    <main className="p-10 grid md:grid-cols-3 gap-6">
      {raffles.length === 0 && (
        <p className="text-gray-500">No raffles available</p>
      )}

      {raffles.map((raffle) => (
        <RaffleCard key={raffle._id} raffle={raffle} />
      ))}
    </main>
  );
}
