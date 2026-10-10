import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ShieldCheck,
  RefreshCw,
  Truck,
  Zap,
} from "lucide-react";
import AddToCartBtn from "@/component/AddToCartBtn";
import AddToWishlistBtn from "@/component/AddToWishlistBtn";
async function getProductDetails(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.data;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>

        <span>/</span>

        <Link href="/products" className="hover:text-emerald-600">
          {product.category?.name}
        </Link>

        <span>/</span>

        <span className="text-gray-900 font-medium truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Side: Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full bg-gray-50 border rounded-2xl overflow-hidden">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-square border rounded-xl overflow-hidden bg-gray-50 cursor-pointer hover:border-emerald-600 transition-all"
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                {product.category?.name}
              </span>

              {product.brand?.name && (
                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {product.brand.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />

                <span className="ml-1 text-sm font-semibold text-gray-800">
                  {product.ratingsAverage}
                </span>
              </div>

              <span className="text-xs text-gray-400">
                ({product.ratingsQuantity} reviews)
              </span>

              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                In Stock
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {product.price} EGP
            </span>

            {product.priceAfterDiscount && (
              <span className="text-lg text-gray-400 line-through">
                {product.priceAfterDiscount} EGP
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed border-t border-b py-4">
            {product.description}
          </p>

         {/* Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              
              <AddToCartBtn productId={product._id} />

              <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>

            <div className="flex gap-3">
              
              <AddToWishlistBtn productId={product._id} />

              <button className="p-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600 shrink-0" />

              <div>
                <p className="font-semibold text-gray-800">
                  Free Delivery
                </p>

                <p className="text-gray-500">
                  Orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-600 shrink-0" />

              <div>
                <p className="font-semibold text-gray-800">
                  30 Days Return
                </p>

                <p className="text-gray-500">
                  Money back
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />

              <div>
                <p className="font-semibold text-gray-800">
                  Secure Payment
                </p>

                <p className="text-gray-500">
                  100% Protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Product */}
      <div className="border rounded-2xl p-6 bg-white mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          About this Product
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Product Information */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <h4 className="font-semibold text-gray-800">
              Product Information
            </h4>

            <div className="flex justify-between py-1 border-b">
              <span className="text-gray-500">
                Category
              </span>

              <span className="font-medium">
                {product.category?.name}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b">
              <span className="text-gray-500">
                Brand
              </span>

              <span className="font-medium">
                {product.brand?.name || "N/A"}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-500">
                Items Sold
              </span>

              <span className="font-medium">
                {product.sold}
              </span>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <h4 className="font-semibold text-gray-800">
              Key Features
            </h4>

            <ul className="space-y-1 text-gray-600">
              <li>✓ Premium Quality Product</li>
              <li>✓ 100% Authentic Guarantee</li>
              <li>✓ Fast & Secure Packaging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

