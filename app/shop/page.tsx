import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, RefreshCw, Eye, Package } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;

  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
}

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.data;
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Green Header */}
      <section className="bg-linear-to-r from-green-500 to-green-400">
        <div className="container mx-auto px-6 py-12">

          <div className="mb-6 flex items-center gap-2 text-sm text-white">
            <Link href="/" className="hover:underline">
              Home
            </Link>

            <span>/</span>

            <span>All Products</span>
          </div>

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Package size={34} className="text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                All Products
              </h1>

              <p className="mt-1 text-lg text-white/90">
                Explore our complete product collection
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Products */}
      <section className="container mx-auto px-6 py-10">

        <p className="mb-8 text-gray-500">
          Showing {products.length} products
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white"
            >

              {/* Product Image */}
              <div className="relative h-72 bg-white">

                <Link href={`/products/${product._id}`}>
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>


                {/* Actions */}
                <div className="absolute right-3 top-3 flex flex-col gap-2">

                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                    <Heart
                      size={18}
                      className="text-gray-500"
                    />
                  </button>

                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                    <RefreshCw
                      size={17}
                      className="text-gray-500"
                    />
                  </button>

                  <Link
                    href={`/products/${product._id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
                  >
                    <Eye
                      size={18}
                      className="text-gray-500"
                    />
                  </Link>

                </div>

              </div>


              {/* Product Info */}
              <div className="p-5">

               <p className="mb-2 text-sm text-gray-400">
  {product.category.name}
</p>

                <Link href={`/products/${product._id}`}>
                  <h2 className="line-clamp-2 min-h-12 font-semibold text-gray-800 hover:text-green-600">
                    {product.title}
                  </h2>
                </Link>

                <div className="mt-3 flex items-center justify-between">

                  <span className="font-bold text-gray-900">
                    {product.price} EGP
                  </span>

                  <span className="text-sm text-yellow-500">
                    ★ {product.ratingsAverage}
                  </span>

                </div>


                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700">
                  <Plus size={18} />
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}