"use client";
import { useState } from "react";

export default function PaystackButton({ raffleId, amount, email, phone }) {
    const [isLoading, setIsLoading] = useState(false);

    const pay = () => {
        setIsLoading(true); // Start processing

        try {
            // Check if script actually loaded
            if (!window.PaystackPop) {
                alert("Paystack is still loading or blocked. Please refresh.");
                setIsLoading(false);
                return;
            }

            const handler = window.PaystackPop.setup({
                key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
                email: email,
                amount: Math.round(amount * 100), // Ensure it's an integer
                onClose: () => {
                    setIsLoading(false); // RESET when user closes popup
                },
                callback: async (response) => {
                    try {
                        const res = await fetch("/api/paystack/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                reference: response.reference,
                                raffleId,
                                email,
                                phone
                            })
                        });

                        if (res.ok) {
                            alert("🎉 Entry Confirmed!");
                        } else {
                            const errData = await res.json();
                            alert("Verification failed: " + errData.error);
                        }
                    } catch (e) {
                        alert("Network error during verification.");
                    } finally {
                        setIsLoading(false);
                    }
                }
            });

            handler.openIframe();

        } catch (error) {
            console.error("Paystack launch error:", error);
            alert("Could not open payment window.");
            setIsLoading(false); // RESET if setup crashes
        }
    };

    return (
        <button
            onClick={pay}
            disabled={isLoading}
            className={`w-full py-2 rounded text-white ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
        >
            {isLoading ? "Opening Secure Payment..." : "Pay & Enter"}
        </button>
    );
}