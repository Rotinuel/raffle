import { NextResponse } from "next/server";

export async function POST(req) {
  const { phone, message } = await req.json();

  await fetch("https://graph.facebook.com/v19.0/YOUR_PHONE_ID/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: message }
    })
  });

  return NextResponse.json({ sent: true });
}
