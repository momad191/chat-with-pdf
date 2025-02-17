"use client"
import { useState } from "react";
import SubscriptionButton from "@/components/SubscriptionButton"

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("price_1Nc1234Example"); // Replace with real Stripe price ID

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: "price_12345", email: "test@example.com" }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Error starting checkout:", data.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Complete Your Payment</h2>
        <p className="text-gray-600 text-center mb-6">Pay securely with Stripe.</p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>

      <SubscriptionButton />
    </div>
  );
}
