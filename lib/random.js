import crypto from "crypto";

export const pickWinner = (tickets) => {
  const index = crypto.randomInt(0, tickets.length);
  return tickets[index];
};
