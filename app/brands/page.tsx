import { getAllBrands } from "@/app/endPoint/services/brandsApi";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default async function BrandsPage() {
  const { data: brands } = await getAllBrands();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= BRAND HERO ================= */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-7">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition"
            >
              Home
            </Link>

            <span className="text-white/60">/</span>

            <span className="font-medium">
              Brands
            </span>
          </div>

          {/* Hero Content */}
          <div className="flex items-center gap-5">

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
              <Tag className="w-8 h-8 text-white" />
            </div>

            {/* Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Top Brands
              </h1>

              <p className="text-lg text-purple-100 mt-1">
                Shop from your favorite brands
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {brands?.map((brand: Brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group"
            >
              <div
                className="
                  bg-white
                  rounded-2xl
                  border border-gray-200
                  p-5
                  h-[245px]
                  flex flex-col
                  items-center
                  justify-between
                  transition-all
                  duration-300
                  hover:shadow-lg
                  hover:-translate-y-1
                  hover:border-purple-200
                "
              >

                {/* Brand Image */}
                <div
                  className="
                    w-full
                    h-[145px]
                    rounded-xl
                    bg-gray-50
                    flex
                    items-center
                    justify-center
                    p-4
                  "
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={150}
                    height={100}
                    className="
                      max-w-full
                      max-h-full
                      object-contain
                      transition-all
                      duration-300
                    "
                  />
                </div>

                {/* Brand Name */}
                <div className="text-center">

                  <h2
                    className="
                      text-sm
                      font-semibold
                      text-gray-800
                      group-hover:text-purple-600
                      transition-colors
                    "
                  >
                    {brand.name}
                  </h2>

                  {/* View Products */}
                  <p
                    className="
                      text-sm
                      text-purple-600
                      mt-2
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                    "
                  >
                    View Products →
                  </p>

                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

    </main>
  );
}