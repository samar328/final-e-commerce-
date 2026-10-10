"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { getSession } from "next-auth/react";

export default function AddToCartBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      // جلب الـ Token من NextAuth session زي الـ CartIcon
      const session = await getSession();
      const token = (session as { accessToken?: string } | null)?.accessToken;

      if (!token) {
        alert("Please login first!");
        return;
      }

      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        // إرسال الـ Event عشان الـ CartIcon يسمع ويحدث الـ Counter
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Product added successfully to cart!");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>{loading ? "Adding..." : "Add to Cart"}</span>
    </button>
  );
}