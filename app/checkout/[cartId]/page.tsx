"use client";

import { useState } from "react"; 
 import { createCheckoutSession } from "@/app/endPoint/services/orders.ts";

export default function CheckoutPage() {
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const cartId = "67b210df429eb834606c7a30"; 
    
    const shippingAddress = {
      details,
      phone,
      city,
    };

    try {
      
      const response = await createCheckoutSession(cartId, shippingAddress);


      if (response?.status === "success" && response?.session?.url) {
        window.location.href = response.session.url;
      } else {
        alert("An error occurred while connecting to the payment.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm my-10">
      <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Cairo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="01010700999"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Details</label>
          <textarea
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Street 12, Building 4..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}