"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  Eye,
  RefreshCw,
  Plus,
  Loader2,
} from "lucide-react";

import { getSession } from "next-auth/react";

import { addToWishlist } from "@/app/endPoint/services/wishlistApi";

import { toast } from "@/components/ui/toast";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity?: number;
  category?: {
    name: string;
  };
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Product currently being added to wishlist
  const [wishlistLoading, setWishlistLoading] = useState<string | null>(
    null
  );

  // Products already added to wishlist
  const [wishlistProducts, setWishlistProducts] = useState<string[]>([]);

  // =========================
  // Fetch Products
  // =========================
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // =========================
  // Add Product To Wishlist
  // =========================
  async function handleWishlist(productId: string) {
    try {
      setWishlistLoading(productId);

      // Get current session
      const session = await getSession();

      const token = (
        session as {
          accessToken?: string;
        } | null
      )?.accessToken;

      // User not logged in
      if (!token) {
        toast.add({
          type: "error",
          description: "Please login first to add products to wishlist.",
        });

        return;
      }

      // Add product to wishlist
      await addToWishlist(productId, token);

      // Add product ID to local wishlist state
      setWishlistProducts((current) => {
        if (current.includes(productId)) {
          return current;
        }

        return [...current, productId];
      });

      toast.add({
        type: "success",
        description: "Product added to wishlist.",
      });
    } catch (error) {
      console.error("Wishlist Error:", error);

      toast.add({
        type: "error",
        description: "Could not add product to wishlist.",
      });
    } finally {
      setWishlistLoading(null);
    }
  }

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Section Title */}
        <div className="mb-8 flex items-center gap-2">
          <span className="h-8 w-1.5 rounded-full bg-emerald-500" />

          <h2 className="text-3xl font-bold text-slate-800">
            Featured{" "}
            <span className="text-emerald-600">Products</span>
          </h2>
        </div>

        {/* Skeleton */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="h-[395px] animate-pulse rounded-lg border border-gray-200 bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">

      {/* =========================
          SECTION TITLE
      ========================== */}
      <div className="mb-8 flex items-center gap-2">
        <span className="h-8 w-1.5 rounded-full bg-emerald-500" />

        <h2 className="text-3xl font-bold text-slate-800">
          Featured{" "}
          <span className="text-emerald-600">Products</span>
        </h2>
      </div>

      {/* =========================
          PRODUCTS
      ========================== */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

        {products.map((product) => {
          const hasSale =
            product.priceAfterDiscount !== undefined &&
            product.priceAfterDiscount !== null &&
            product.priceAfterDiscount < product.price;

          const discountPercentage = hasSale
            ? Math.round(
                ((product.price - product.priceAfterDiscount!) /
                  product.price) *
                  100
              )
            : 0;

          const isWishlistLoading =
            wishlistLoading === product._id;

          const isInWishlist =
            wishlistProducts.includes(product._id);

          return (
            <div
              key={product._id}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
            >

              {/* =========================
                  IMAGE
              ========================== */}
              <div className="relative h-[250px] bg-white">

                {/* Sale Badge */}
                {hasSale && (
                  <span className="absolute left-3 top-3 z-10 rounded bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                    -{discountPercentage}%
                  </span>
                )}

                {/* Product Image */}
                <Link href={`/products/${product._id}`}>
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* =========================
                    ACTION BUTTONS
                ========================== */}
                <div className="absolute right-3 top-3 flex flex-col gap-2">

                  {/* Wishlist */}
                  <button
                    type="button"
                    disabled={isWishlistLoading || isInWishlist}
                    onClick={() =>
                      handleWishlist(product._id)
                    }
                    aria-label="Add to wishlist"
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors ${
                      isInWishlist
                        ? "text-emerald-600"
                        : "text-slate-600 hover:bg-red-50 hover:text-red-500"
                    } disabled:cursor-not-allowed`}
                  >
                    {isWishlistLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist
                            ? "fill-emerald-600"
                            : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Compare */}
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>

                  {/* View */}
                  <Link
                    href={`/products/${product._id}`}
                    aria-label="View product"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* =========================
                  PRODUCT INFO
              ========================== */}
              <div className="px-4 pb-4">

                {/* Category */}
                <p className="mb-1 text-xs text-gray-500">
                  {product.category?.name}
                </p>

                {/* Title */}
                <Link href={`/products/${product._id}`}>
                  <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-800 transition-colors hover:text-emerald-600">
                    {product.title}
                  </h3>
                </Link>

                {/* =========================
                    RATING
                ========================== */}
                <div className="mt-2 flex items-center gap-1">

                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <=
                          Math.round(
                            product.ratingsAverage
                          )
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="ml-1 text-xs text-gray-500">
                    {product.ratingsAverage}
                  </span>

                  {product.ratingsQuantity !==
                    undefined && (
                    <span className="text-xs text-gray-400">
                      ({product.ratingsQuantity})
                    </span>
                  )}
                </div>

                {/* =========================
                    PRICE
                ========================== */}
                <div className="mt-3 flex items-center justify-between">

                  <div className="flex flex-col">

                    {hasSale ? (
                      <>
                        {/* New Price */}
                        <span className="text-lg font-bold text-emerald-600">
                          {product.priceAfterDiscount} EGP
                        </span>

                        {/* Old Price */}
                        <span className="text-sm text-gray-400 line-through">
                          {product.price} EGP
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-slate-800">
                        {product.price} EGP
                      </span>
                    )}
                  </div>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    aria-label="Add to cart"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
                  >
                    <Plus className="h-6 w-6" />
                  </button>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
