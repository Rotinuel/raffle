import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  raffleId: String,
  userEmail: String,
  phone: String,
  reference: String,
  ticketNumber: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Ticket ||
  mongoose.model("Ticket", TicketSchema);
