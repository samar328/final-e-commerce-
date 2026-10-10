"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";

import {
  Heart,
  Trash2,
  ShoppingCart,
  ChevronRight,
  Loader2,
  PackageOpen,
} from "lucide-react";


import {
  getWishlist,
  removeFromWishlist,
} from "@/app/endPoint/services/wishlistApi";

import { addToCart } from "@/app/endPoint/services/cartApi";

type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  quantity?: number;
  ratingsAverage?: number;
  brand?: {
    name: string;
  };
  category?: {
    name: string;
  };
};

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  // =========================
  // LOAD WISHLIST
  // =========================
  useEffect(() => {
    let isMounted = true;

    async function fetchWishlist() {
      try {
        const session = await getSession();

        const token = (
          session as {
            accessToken?: string;
          } | null
        )?.accessToken;

        if (!token) {
          if (isMounted) {
            setProducts([]);
            setLoading(false);
          }

          return;
        }

        const data = await getWishlist(token);

        if (isMounted) {
          setProducts(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Wishlist Error:", error);

        if (isMounted) {
          setProducts([]);
          setLoading(false);
        }
      }
    }

    fetchWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // REMOVE FROM WISHLIST
  // =========================
  async function handleRemove(productId: string) {
    try {
      setRemovingId(productId);

      const session = await getSession();

      const token = (
        session as {
          accessToken?: string;
        } | null
      )?.accessToken;

      if (!token) {
        return;
      }

      await removeFromWishlist(productId, token);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== productId
        )
      );
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
    } finally {
      setRemovingId(null);
    }
  }

async function handleAddToCart(productId: string) {
  try {
    setAddingToCartId(productId);

    const session = await getSession();

    const token = (
      session as {
        accessToken?: string;
      } | null
    )?.accessToken;

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    await addToCart(productId, token);
  window.dispatchEvent(new Event("cartUpdated"));
    console.log("Product added to cart successfully");
  } catch (error) {
    console.error("Add To Cart Error:", error);
  } finally {
    setAddingToCartId(null);
  }
}

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-white px-4 py-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2
            size={35}
            className="animate-spin text-[#16a34a]"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-160px)] bg-white">
      {/* =========================
          PAGE CONTENT
      ========================== */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================
            BREADCRUMB
        ========================== */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#7b8494]">
          <Link
            href="/"
            className="transition hover:text-[#16a34a]"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <span className="text-[#172033]">
            Wishlist
          </span>
        </div>

        {/* =========================
            HEADER
        ========================== */}
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f2]">
            <Heart
              size={21}
              className="fill-[#ef4444] text-[#ef4444]"
              strokeWidth={2}
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#172033] sm:text-2xl">
              My Wishlist
            </h1>

            <p className="text-xs text-[#7b8494] sm:text-sm">
              {products.length} items saved
            </p>
          </div>
        </div>

        {/* =========================
            EMPTY WISHLIST
        ========================== */}
        {products.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[#edf0f2] bg-white px-6 text-center shadow-sm">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0fff5]">
              <PackageOpen
                size={38}
                className="text-[#16a34a]"
              />
            </div>

            <h2 className="text-xl font-bold text-[#172033]">
              Your Wishlist is Empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#697586]">
              You have not added any products to your wishlist yet.
              Start shopping and save your favorite products here.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#16a34a] px-7 text-sm font-semibold text-white transition hover:bg-[#15803d]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* =========================
                DESKTOP / TABLET
            ========================== */}
            <div className="hidden overflow-hidden rounded-2xl border border-[#edf0f2] bg-white md:block">

              {/* Table Header */}
              <div className="grid grid-cols-[minmax(280px,2fr)_1fr_1fr_150px] items-center border-b border-[#edf0f2] bg-[#fafbfc] px-6 py-4 text-xs font-semibold text-[#697586]">

                <span>Product</span>

                <span>Price</span>

                <span>Status</span>

                <span className="text-center">
                  Actions
                </span>
              </div>

              {/* Products */}
              {products.map((product) => {
                const isRemoving =
                  removingId === product._id;

                const finalPrice =
                  product.priceAfterDiscount &&
                  product.priceAfterDiscount > 0
                    ? product.priceAfterDiscount
                    : product.price;

                return (
                  <div
                    key={product._id}
                    className="grid grid-cols-[minmax(280px,2fr)_1fr_1fr_150px] items-center border-b border-[#edf0f2] px-6 py-4 last:border-b-0"
                  >
                    {/* Product */}
                    <div className="flex min-w-0 items-center gap-4">

                      <Link
                        href={`/ProductDetails/${product._id}`}
                        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[#edf0f2] bg-white"
                      >
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                        />
                      </Link>

                      <div className="min-w-0">
                        <Link
                          href={`/ProductDetails/${product._id}`}
                          className="block truncate text-sm font-semibold text-[#172033] hover:text-[#16a34a]"
                        >
                          {product.title}
                        </Link>

                        <p className="mt-1 truncate text-xs text-[#7b8494]">
                          {product.brand?.name ||
                            product.category?.name ||
                            "FreshCart Product"}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <span className="text-sm font-semibold text-[#172033]">
                        {finalPrice.toLocaleString()} EGP
                      </span>

                      {product.priceAfterDiscount &&
                        product.priceAfterDiscount <
                          product.price && (
                          <span className="ml-2 text-xs text-[#9ca3af] line-through">
                            {product.price.toLocaleString()} EGP
                          </span>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                      {product.quantity &&
                      product.quantity > 0 ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf3] px-2.5 py-1 text-[11px] font-medium text-[#16a34a]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff7ed] px-2.5 py-1 text-[11px] font-medium text-[#ea580c]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-2">

<button
  type="button"
  disabled={
    isRemoving ||
    addingToCartId === product._id ||
    !product.quantity ||
    product.quantity <= 0
  }
  onClick={() => handleAddToCart(product._id)}
  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[#16a34a] px-3 text-[11px] font-semibold text-white transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-60"
>
  {addingToCartId === product._id ? (
    <Loader2
      size={13}
      className="animate-spin"
    />
  ) : (
    <ShoppingCart size={13} />
  )}

  {addingToCartId === product._id
    ? "Adding..."
    : "Add to Cart"}
</button>

                      <button
                        type="button"
                        disabled={isRemoving}
                        onClick={() =>
                          handleRemove(product._id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#697586] transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Remove from wishlist"
                      >
                        {isRemoving ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* =========================
                MOBILE
            ========================== */}
            <div className="space-y-3 md:hidden">

              {products.map((product) => {
                const isRemoving =
                  removingId === product._id;

                const finalPrice =
                  product.priceAfterDiscount &&
                  product.priceAfterDiscount > 0
                    ? product.priceAfterDiscount
                    : product.price;

                return (
                  <div
                    key={product._id}
                    className="rounded-2xl border border-[#edf0f2] bg-white p-3 shadow-sm"
                  >

                    {/* Product Info */}
                    <div className="flex gap-3">

                      <Link
                        href={`/ProductDetails/${product._id}`}
                        className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-xl border border-[#edf0f2] bg-white"
                      >
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          fill
                          sizes="82px"
                          className="object-contain p-2"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">

                        <Link
                          href={`/ProductDetails/${product._id}`}
                          className="line-clamp-2 text-sm font-semibold leading-5 text-[#172033]"
                        >
                          {product.title}
                        </Link>

                        <p className="mt-1 text-xs text-[#7b8494]">
                          {product.brand?.name ||
                            product.category?.name ||
                            "FreshCart Product"}
                        </p>

                        <div className="mt-2 flex items-center gap-2">

                          <span className="text-sm font-bold text-[#172033]">
                            {finalPrice.toLocaleString()} EGP
                          </span>

                          {product.priceAfterDiscount &&
                            product.priceAfterDiscount <
                              product.price && (
                            <span className="text-[11px] text-[#9ca3af] line-through">
                              {product.price.toLocaleString()} EGP
                            </span>
                          )}

                        </div>

                        <div className="mt-2">
                          {product.quantity &&
                          product.quantity > 0 ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf3] px-2 py-1 text-[10px] font-medium text-[#16a34a]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff7ed] px-2 py-1 text-[10px] font-medium text-[#ea580c]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
                              Out of Stock
                            </span>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2 border-t border-[#f0f1f3] pt-3">

            
<button
  type="button"
  disabled={
    isRemoving ||
    addingToCartId === product._id ||
    !product.quantity ||
    product.quantity <= 0
  }
  onClick={() => handleAddToCart(product._id)}
  className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-xs font-semibold text-white transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-60"
>
  {addingToCartId === product._id ? (
    <Loader2
      size={14}
      className="animate-spin"
    />
  ) : (
    <ShoppingCart size={14} />
  )}

  {addingToCartId === product._id
    ? "Adding..."
    : "Add to Cart"}
</button>

                      <button
                        type="button"
                        disabled={isRemoving}
                        onClick={() =>
                          handleRemove(product._id)
                        }
                        className="flex h-9 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#697586] transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                        aria-label="Remove from wishlist"
                      >
                        {isRemoving ? (
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}