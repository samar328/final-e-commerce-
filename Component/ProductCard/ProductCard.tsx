'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, RefreshCw, Eye, Plus, Star } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

interface ProductProps {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviewsCount: number;
  image: string;
}

export default function ProductCard({
  id,
  title,
  category,
  price,
  oldPrice,
  discount,
  rating,
  reviewsCount,
  image
}: ProductProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);

  // Like Handler
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  // Compare/Refresh Handler
  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRefreshed((prev) => !prev);
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Discount Tag */}
      <div className="relative w-full aspect-square rounded-xl bg-gray-50 overflow-hidden mb-3">
        {discount && (
          <Badge className="absolute top-2 left-2 z-20 bg-red-500 text-white text-xs px-2 py-0.5 font-bold rounded-md">
            {discount}
          </Badge>
        )}

        {/* Side Actions Bar */}
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          
          {/* Heart / Like Button */}
          <button 
            type="button"
            onClick={handleLike}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              isLiked 
                ? 'bg-red-50 text-red-500 scale-110' 
                : 'bg-white hover:bg-red-50 hover:text-red-500 text-gray-600'
            }`}
          >
            <Heart 
              className="w-4 h-4 transition-colors" 
              color={isLiked ? "#ef4444" : "currentColor"} 
              fill={isLiked ? "#ef4444" : "none"} 
            />
          </button>

          {/* Refresh / Compare Button */}
          <button 
            type="button"
            onClick={handleRefresh}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              isRefreshed 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-white hover:bg-emerald-50 hover:text-emerald-600 text-gray-600'
            }`}
          >
            <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isRefreshed ? 'rotate-180' : ''}`} />
          </button>

          {/* Eye / Product Details Button */}
          <Link 
            href={`/products/${id}`}
            className="p-2 bg-white rounded-full shadow-md hover:bg-emerald-50 hover:text-emerald-600 transition text-gray-600 flex items-center justify-center"
          >
            <Eye className="w-4 h-4" />
          </Link>

        </div>

        {/* Image */}
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <span className="text-xs text-gray-400 mb-1">{category}</span>
        
        <Link href={`/products/${id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-emerald-600 transition cursor-pointer">
            {title}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400' : 'text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">{rating} ({reviewsCount})</span>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-emerald-600">{price} EGP</span>
              {oldPrice && (
                <span className="text-xs text-gray-400 line-through">{oldPrice} EGP</span>
              )}
            </div>
          </div>

          <Button size="icon" className="h-9 w-9 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

    </div>
  );
}