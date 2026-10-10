"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { getSession } from "next-auth/react";

export default function AddToWishlistBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      setLoading(true);

      const session = await getSession();
      const token = (session as { accessToken?: string } | null)?.accessToken;

      if (!token) {
        alert("Please login first!");
        return;
      }

      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        alert("Product added to wishlist!");
      } else {
        alert(data.message || "Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={loading}
      className="flex-1 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-xl text-gray-700 text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
    >
      <Heart className="w-4 h-4 text-gray-500 fill-current" />
      <span>{loading ? "Saving..." : "Add to Wishlist"}</span>
    </button>
  );
}