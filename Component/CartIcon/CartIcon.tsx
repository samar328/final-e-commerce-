"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { getCart } from "@/lib/cart";

export default function CartIcon() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchCartCount() {
      try {
        const session = await getSession();

        const token = (
          session as {
            accessToken?: string;
          } | null
        )?.accessToken;

        if (!token) {
          if (!cancelled) {
            setCount(0);
          }

          return;
        }

        const cart = await getCart(token);

        if (!cancelled) {
          setCount(cart?.numOfCartItems ?? 0);
        }
      } catch {
        if (!cancelled) {
          setCount(0);
        }
      }
    }

    void fetchCartCount();

    const handleCartUpdate = () => {
      void fetchCartCount();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    return () => {
      cancelled = true;

      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
    };
  }, []);

  return (
    <Link
      href="/cart"
      aria-label="Shopping Cart"
      className="relative text-gray-600 hover:text-green-600 transition"
    >
      <ShoppingCart className="w-6 h-6" />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-green-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}