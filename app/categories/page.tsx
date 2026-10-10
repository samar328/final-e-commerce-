import Link from "next/link";
import Image from "next/image";
import { Grid, ArrowRight } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const payload = await response.json();
  return payload.data;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="bg-[#22c55e] rounded-2xl p-8 mb-8 text-white shadow-sm">
          {/* Breadcrumb */}
          <div className="text-sm text-green-100 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">Categories</span>
          </div>

          {/* Banner Details */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
              <Grid className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Categories</h1>
              <p className="text-green-100 text-sm mt-1">
                Explore our wide range of categories
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
  <Link
    key={category._id}
    href={`/products?category=${category._id}`}
    className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center justify-between hover:border-green-300 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 overflow-hidden"
  >
    <div className="w-full aspect-square rounded-xl bg-[#f8f9fa] flex items-center justify-center p-4 mb-4 group-hover:bg-green-50/30 transition-colors">
      <Image
        src={category.image}
        alt={category.name}
        width={250}
        height={250}
        priority
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <div className="text-center w-full">
      <h2 className="text-base font-semibold text-gray-800 group-hover:text-[#22c55e] transition-colors">
        {category.name}
      </h2>

      <div className="flex items-center justify-center gap-1 text-xs font-medium text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity mt-1">
        <span>View Products</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </Link>
))}
        </div>

      </div>
    </main>
  );
}