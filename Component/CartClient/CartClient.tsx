"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { getSession } from "next-auth/react";

import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  checkout,
  type Cart,
} from "@/lib/cart";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Something went wrong";
}

function notifyCartUpdate() {
  window.dispatchEvent(new Event("cartUpdated"));
}

async function getAuthToken(): Promise<string> {
  const session = await getSession();

  const token = (
    session as {
      accessToken?: string;
    } | null
  )?.accessToken;

  if (!token) {
    throw new Error("Please login first");
  }

  return token;
}

export default function CartClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(
    null
  );

  const [showCheckout, setShowCheckout] = useState(false);

  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Cairo");

  const [error, setError] = useState("");

  // =========================
  // Load Cart
  // =========================
  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      try {
        const token = await getAuthToken();

        const data = await getCart(token);

        if (!cancelled) {
          setCart(data);
          setError("");
          setLoading(false);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setError(getErrorMessage(error));
          setLoading(false);
        }
      }
    }

    void loadCart();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================
  // Listen for Cart Updates
  // =========================
  useEffect(() => {
    let cancelled = false;

    async function refreshCart() {
      try {
        const token = await getAuthToken();

        const data = await getCart(token);

        if (!cancelled) {
          setCart(data);
          setError("");
        }
      } catch {
        // Keep current cart if refresh fails
      }
    }

    const handleCartUpdate = () => {
      void refreshCart();
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

  // =========================
  // Increase / Decrease Quantity
  // =========================
  async function handleQuantity(
    productId: string,
    currentCount: number,
    type: "increase" | "decrease"
  ) {
    const newCount =
      type === "increase"
        ? currentCount + 1
        : currentCount - 1;

    if (newCount < 1) {
      return;
    }

    try {
      setActionLoading(productId);
      setError("");

      const token = await getAuthToken();

      await updateCartItem(
        productId,
        newCount,
        token
      );

      // Get the latest cart after update
      const updatedCart = await getCart(token);

      setCart(updatedCart);

      // Update Navbar cart count
      notifyCartUpdate();
    } catch (error: unknown) {
      alert(getErrorMessage(error));
    } finally {
      setActionLoading(null);
    }
  }

  // =========================
  // Delete Product
  // =========================
  async function handleDelete(productId: string) {
    try {
      setActionLoading(productId);
      setError("");

      const token = await getAuthToken();

      await removeFromCart(productId, token);

      // Get the latest cart after delete
      const updatedCart = await getCart(token);

      setCart(updatedCart);

      // Update Navbar cart count
      notifyCartUpdate();
    } catch (error: unknown) {
      alert(getErrorMessage(error));
    } finally {
      setActionLoading(null);
    }
  }

  // =========================
  // Clear Cart
  // =========================
  async function handleClearCart() {
    try {
      setActionLoading("clear");
      setError("");

      const token = await getAuthToken();

      await clearCart(token);

      setCart(null);

      // Update Navbar cart count
      notifyCartUpdate();
    } catch (error: unknown) {
      alert(getErrorMessage(error));
    } finally {
      setActionLoading(null);
    }
  }

  // =========================
  // Checkout
  // =========================
  async function handleCheckout() {
    if (!cart?._id) {
      return;
    }

    if (
      !details.trim() ||
      !phone.trim() ||
      !city.trim()
    ) {
      alert("Please fill all shipping information");
      return;
    }

    try {
      setActionLoading("checkout");

      const token = await getAuthToken();

      const response = await checkout(
        cart._id,
        {
          details: details.trim(),
          phone: phone.trim(),
          city: city.trim(),
        },
        token
      );

      const checkoutUrl =
        response?.session?.url ??
        response?.data?.session?.url ??
        response?.url ??
        response?.data?.url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }

      alert("Checkout session created");
    } catch (error: unknown) {
      alert(getErrorMessage(error));
    } finally {
      setActionLoading(null);
    }
  }

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>

        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  const products = cart?.products ?? [];

  const totalItems =
    cart?.numOfCartItems ??
    products.reduce(
      (total, item) => total + item.count,
      0
    );

  const subtotal =
    cart?.totalCartPrice ??
    products.reduce(
      (total, item) =>
        total + item.price * item.count,
      0
    );

  // =========================
  // Empty Cart
  // =========================
  if (products.length === 0) {
    return (
      <div className="min-h-[65vh] bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Your Cart is Empty
            </h1>

            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added
              anything to your cart yet.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
          </div>

          <p className="mt-2 text-gray-600">
            You have{" "}
            <span className="text-green-600 font-semibold">
              {totalItems} items
            </span>{" "}
            in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-8">

          {/* Products */}
          <div className="space-y-4">

            {products.map((item) => {
              const product = item.product;

              const itemTotal =
                item.price * item.count;

              const isLoading =
                actionLoading === product._id;

              return (
                <div
                  key={product._id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex gap-5">

                    {/* Product Image */}
                    <div className="w-32 h-32 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={120}
                        height={120}
                        className="object-contain w-full h-full p-3"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">

                      <h2 className="font-semibold text-lg text-gray-900 line-clamp-2">
                        {product.title}
                      </h2>

                      {/* Category */}
                      {product.category?.name && (
                        <span className="inline-block mt-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          {product.category.name}
                        </span>
                      )}

                      <p className="text-green-600 font-bold text-lg mt-3">
                        {item.price.toLocaleString()} EGP
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center justify-between mt-5">

                        <div className="flex items-center gap-4">

                          {/* Minus */}
                          <button
                            type="button"
                            disabled={
                              isLoading ||
                              item.count <= 1
                            }
                            onClick={() =>
                              handleQuantity(
                                product._id,
                                item.count,
                                "decrease"
                              )
                            }
                            className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="font-semibold text-lg min-w-[20px] text-center">
                            {item.count}
                          </span>

                          {/* Plus */}
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              handleQuantity(
                                product._id,
                                item.count,
                                "increase"
                              )
                            }
                            className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>

                        </div>

                        {/* Total + Delete */}
                        <div className="flex items-center gap-5">

                          <div className="text-right">
                            <p className="text-xs text-gray-400">
                              Total
                            </p>

                            <p className="text-lg font-bold text-gray-900">
                              {itemTotal.toLocaleString()}{" "}
                              <span className="text-sm text-gray-400 font-normal">
                                EGP
                              </span>
                            </p>
                          </div>

                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                            className="w-10 h-10 border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={`Remove ${product.title}`}
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">

              <Link
                href="/shop"
                className="text-green-600 font-medium hover:text-green-700"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={handleClearCart}
                disabled={
                  actionLoading === "clear"
                }
                className="text-gray-400 hover:text-red-500 flex items-center gap-2 disabled:opacity-50"
              >
                {actionLoading === "clear" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}

                Clear all items
              </button>

            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

              <div className="bg-[#101a2b] px-5 py-5">
                <h2 className="text-xl font-bold text-white">
                  Order Summary
                </h2>
              </div>

              <div className="p-5">

                <div className="flex justify-between text-gray-600 mb-5">
                  <span>
                    Subtotal ({totalItems} items)
                  </span>

                  <span className="font-semibold text-gray-700">
                    {subtotal.toLocaleString()} EGP
                  </span>
                </div>

                <div className="flex justify-between text-gray-600 pb-5 border-b">
                  <span>Shipping</span>

                  <span className="text-green-600 font-medium text-right">
                    Calculated at checkout
                  </span>
                </div>

                <div className="flex justify-between items-center py-5">
                  <span className="text-lg font-bold text-gray-700">
                    Estimated Total
                  </span>

                  <span className="text-xl font-bold text-green-600">
                    {subtotal.toLocaleString()} EGP
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowCheckout(true)
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition"
                >
                  Login to Checkout
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-green-600 font-medium"
                  >
                    Sign up
                  </Link>
                </p>

                <div className="border-t mt-5 pt-5 space-y-3 text-sm text-gray-500">
                  <p>
                    ✓ Your cart items will be saved
                  </p>

                  <p>
                    ✓ Track your orders easily
                  </p>

                  <p>
                    ✓ Access exclusive member deals
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Shipping Information
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowCheckout(false)
                }
                className="text-gray-400 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <div className="space-y-4">

              {/* Details */}
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium mb-2"
                >
                  Address Details
                </label>

                <input
                  id="details"
                  value={details}
                  onChange={(e) =>
                    setDetails(e.target.value)
                  }
                  placeholder="Street, building, apartment..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="01000000000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-2"
                >
                  City
                </label>

                <input
                  id="city"
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  placeholder="Cairo"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={
                  actionLoading === "checkout"
                }
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {actionLoading === "checkout" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="mt-10 bg-green-50 border-t border-green-100 py-7">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Free Shipping */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Free Shipping
                </p>

                <p className="text-xs text-gray-500">
                  On orders over 500 EGP
                </p>
              </div>
            </div>

            {/* Easy Returns */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Easy Returns
                </p>

                <p className="text-xs text-gray-500">
                  14-day return policy
                </p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Secure Payment
                </p>

                <p className="text-xs text-gray-500">
                  100% secure checkout
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  24/7 Support
                </p>

                <p className="text-xs text-gray-500">
                  Contact us anytime
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}