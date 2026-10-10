import Link from 'next/link';
import { Truck, Gift, Phone, Mail, User, UserPlus } from 'lucide-react';

export default function FirstNav() {
  return (
    <div className="bg-gray-50 border-b border-gray-100 text-xs text-gray-600 py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            <Gift className="w-3.5 h-3.5 text-emerald-600" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a href="tel:+18001234567" className="flex items-center space-x-1 hover:text-emerald-600 transition">
            <Phone className="w-3.5 h-3.5" />
            <span>+1 (800) 123-4567</span>
          </a>
          <a href="mailto:support@freshcart.com" className="flex items-center space-x-1 hover:text-emerald-600 transition">
            <Mail className="w-3.5 h-3.5" />
            <span>support@freshcart.com</span>
          </a>
          <div className="h-3 w-[1px] bg-gray-300" />
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link href="/login" className="flex items-center space-x-1 hover:text-emerald-600">
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <Link href="/register" className="flex items-center space-x-1 hover:text-emerald-600">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}