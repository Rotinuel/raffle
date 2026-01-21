import mongoose from "mongoose";

const RaffleSchema = new mongoose.Schema({
  title: String,
  description: String,
  ticketPrice: Number,
  maxTickets: Number,
  endDate: Date,
  winner: String,
  status: { type: String, default: "active" }
});

export default mongoose.models.Raffle ||
  mongoose.model("Raffle", RaffleSchema);
