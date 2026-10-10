import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, RefreshCw, Eye, Filter, Package } from "lucide-react";

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

async function getCategory(id: string): Promise<Category | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const payload = await response.json();

    return payload.data;
  } catch {
    return null;
  }
}

async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
    let url = "https://ecommerce.routemisr.com/api/v1/products";

    if (categoryId) {
      url += `?category=${categoryId}`;
    }

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();

    return payload.data || [];
  } catch {
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
}) {
  const params = await searchParams;

  const categoryId = params.category;

  const [category, products] = await Promise.all([
    categoryId ? getCategory(categoryId) : null,
    getProducts(categoryId),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* ================= HERO / BANNER ================= */}
      <section className="bg-gradient-to-r from-[#16b957] to-[#42df7b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-green-50 mb-7">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            {category ? (
              <>
                <Link href="/categories" className="hover:text-white transition">
                  Categories
                </Link>
                <span>/</span>
                <span className="font-medium text-white">{category.name}</span>
              </>
            ) : (
              <span className="font-medium text-white">All Products</span>
            )}
          </div>

          {/* Banner Information (Dynamic based on Category or All Products) */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center p-2">
              {category ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={60}
                  height={60}
                  priority
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <Package className="w-8 h-8 text-white" />
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category ? category.name : "All Products"}
              </h1>

              <p className="text-green-50 text-sm sm:text-base mt-1">
                {category
                  ? `Browse products in ${category.name}`
                  : "Explore our complete product collection"}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Active Filter (Only shows if filtered by category) */}
        {category && (
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Active Filters:</span>
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <span>{category.name}</span>
              <Link href="/products" className="hover:text-green-900">
                ×
              </Link>
            </div>
            <Link
              href="/products"
              className="text-sm text-gray-600 underline hover:text-green-600"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* Products Count */}
        <div className="mb-7">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-800">{products.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
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
                    <button
                      type="button"
                      className="w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 transition"
                    >
                      <Heart className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      className="w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-green-600 transition"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

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
                  <p className="text-xs text-gray-500 mb-1">
                    {category?.name || "Products"}
                  </p>

                  <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                    {product.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-yellow-400 text-sm">
                      {"★".repeat(Math.round(product.ratingsAverage || 0))}
                      <span className="text-gray-300">
                        {"★".repeat(5 - Math.round(product.ratingsAverage || 0))}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500">
                      {product.ratingsAverage || 0}({product.ratingsQuantity || 0})
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
            <h2 className="text-xl font-semibold text-gray-800">No products found</h2>
            <p className="text-gray-500 mt-2">There are no products available.</p>
            <Link
              href="/products"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              View All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}