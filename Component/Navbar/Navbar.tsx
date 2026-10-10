"use client";

import Link from "next/link";
import { Heart, Search, Headset, ChevronDown, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import logoIcon from "../../images/freshcart-logo.svg";
import CartIcon from "../CartIcon/CartIcon";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/app/endPoint/services/categorieApi";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();

        const desiredCategories = [
          "Electronics",
          "Women's Fashion",
          "Men's Fashion",
          "Beauty & Health",
        ];

        const filteredCategories = data.filter((category: Category) =>
          desiredCategories.includes(category.name)
        );

        setCategories(filteredCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/">
          <Image
            src={logoIcon}
            alt="FreshCart Logo"
            className="w-60 h-8"
            loading="eager"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg relative hidden md:block">
          <Input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full pr-12 rounded-full border-gray-200 focus-visible:ring-emerald-500 h-10 bg-gray-50/50"
          />

          <Button
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-emerald-600 hover:bg-emerald-700"
          >
            <Search className="w-4 h-4 text-white" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-700">

          {/* Home */}
          <Link
            href="/"
            className="hover:text-emerald-600 transition"
          >
            Home
          </Link>

          {/* Shop */}
          <Link
            href="/shop"
            className="hover:text-emerald-600 transition"
          >
            Shop
          </Link>

          {/* Categories */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-emerald-600 outline-none">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-56"
            >
              {/* All Categories */}
<DropdownMenuItem>
  <Link
    href="/categories"
    className="w-full"
  >
    All Categories
  </Link>
</DropdownMenuItem>

{/* Selected Categories */}
{categories.map((category) => (
  <DropdownMenuItem
    key={category._id}
    className="cursor-pointer"
  >
    <Link
      href={`/categories/${category._id}`}
      className="w-full"
    >
      {category.name}
    </Link>
  </DropdownMenuItem>
))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Brands */}
          <Link
            href="/brands"
            className="hover:text-emerald-600 transition"
          >
            Brands
          </Link>
        </nav>

        {/* Support & Actions */}
        <div className="flex items-center space-x-5">

          {/* Support */}
          <div className="hidden xl:flex items-center space-x-2 text-xs">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
              <Headset className="w-4 h-4" />
            </div>

            <div>
              <div className="text-gray-400">
                Support
              </div>

              <div className="font-semibold text-gray-800">
                24/7 Help
              </div>
            </div>
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative text-gray-600 hover:text-emerald-600"
          >
            <Heart className="w-6 h-6" />
          </Link>

          {/* Cart */}
          <CartIcon />

          {/* Sign In */}
          <Link href="/login">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Button>
          </Link>

        </div>
      </div>
    </header>
  );
}


