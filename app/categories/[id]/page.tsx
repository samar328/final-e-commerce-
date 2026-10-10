import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Plus,
  RefreshCw,
  Eye,
  Filter,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
}

// Get Category
async function getCategory(id: string): Promise<Category | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();

    return payload.data;
  } catch {
    return null;
  }
}

// Get Products By Category
async function getProducts(categoryId: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();

    return payload.data || [];
  } catch {
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [category, products] = await Promise.all([
    getCategory(id),
    getProducts(id),
  ]);

  // Category Not Found
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Category not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#16b957] to-[#42df7b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-green-50 mb-7">

            <Link
              href="/"
              className="hover:text-white transition"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/categories"
              className="hover:text-white transition"
            >
              Categories
            </Link>

            <span>/</span>

            <span className="font-medium text-white">
              {category.name}
            </span>

            <span>/</span>

            <span className="font-semibold text-white">
              {category.name}
            </span>

          </div>

          {/* Category Information */}
          <div className="flex items-center gap-5">

            {/* Category Image */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center p-2 flex-shrink-0">

              <Image
                src={category.image}
                alt={category.name}
                width={60}
                height={60}
                priority
                className="w-full h-full object-contain rounded-xl"
              />

            </div>

            {/* Category Name */}
            <div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category.name}
              </h1>

              <p className="text-green-50 text-sm sm:text-base mt-1">
                Browse products in {category.name}
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Active Filters */}
        <div className="flex items-center gap-3 mb-6">

          <Filter className="w-4 h-4 text-gray-600" />

          <span className="text-sm text-gray-600">
            Active Filters:
          </span>

          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">

            <span>
              {category.name}
            </span>

            <Link
              href="/categories"
              className="hover:text-green-900 text-lg leading-none"
            >
              ×
            </Link>

          </div>

          <Link
            href="/categories"
            className="text-sm text-gray-600 underline hover:text-green-600"
          >
            Clear all
          </Link>

        </div>

        {/* Products Count */}
        <div className="mb-7">

          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {products.length}
            </span>{" "}
            products
          </p>

        </div>

        {/* Products */}
        {products.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {products.map((product) => (

              <div
                key={product._id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >

                {/* Product Image */}
                <div className="relative h-64 bg-white flex items-center justify-center p-4">

                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={250}
                    height={250}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">

                    {/* Wishlist */}
                    <button
                      type="button"
                      className="w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 transition"
                    >
                      <Heart className="w-5 h-5" />
                    </button>

                    {/* Refresh */}
                    <button
                      type="button"
                      className="w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-green-600 transition"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    {/* View */}
                    <button
                      type="button"
                      className="w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-green-600 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                  </div>

                </div>

                {/* Product Info */}
                <div className="px-4 pb-4">

                  {/* Category */}
                  <p className="text-xs text-gray-500 mb-1">
                    {category.name}
                  </p>

                  {/* Title */}
                  <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                    {product.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">

                    <div className="text-yellow-400 text-sm">

                      {"★".repeat(
                        Math.min(
                          5,
                          Math.max(
                            0,
                            Math.round(product.ratingsAverage || 0)
                          )
                        )
                      )}

                      <span className="text-gray-300">
                        {"★".repeat(
                          Math.max(
                            0,
                            5 -
                              Math.min(
                                5,
                                Math.max(
                                  0,
                                  Math.round(
                                    product.ratingsAverage || 0
                                  )
                                )
                              )
                          )
                        )}
                      </span>

                    </div>

                    <span className="text-xs text-gray-500">
                      {product.ratingsAverage || 0}
                      ({product.ratingsQuantity || 0})
                    </span>

                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-4">

                    <span className="text-lg font-bold text-gray-900">
                      {product.price} EGP
                    </span>

                    <button
                      type="button"
                      className="w-10 h-10 rounded-full bg-[#16a34a] text-white flex items-center justify-center hover:bg-[#15803d] transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="py-20 text-center">

            <h2 className="text-xl font-semibold text-gray-800">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              There are no products in this category.
            </p>

            <Link
              href="/categories"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Back to Categories
            </Link>

          </div>

        )}

      </section>

    </main>
  );
}