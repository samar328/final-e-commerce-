import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getShopCategories } from '@/app/endPoint/services/productApi';
import { Category } from '@/app/endPoint/types/productType';

export default async function ShopByCategory() {
  const categories: Category[] = await getShopCategories();

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">
            Shop By <span className="text-emerald-600">Category</span>
          </h2>
        </div>
        <Link 
          href="/categories" 
          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 transition"
        >
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link 
            key={cat._id} 
            href={`/categories/${cat._id}`}
            className="group bg-gray-50 border border-gray-100/80 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md hover:bg-white hover:border-emerald-100 transition-all duration-300"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300 relative">
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                sizes="96px"
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}