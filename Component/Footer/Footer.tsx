import Link from 'next/link';
import { 
  ShoppingCart, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Headphones,
  CreditCard
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1222] text-gray-300 text-sm">
      
      {/* 1. Feature Banner Upper Section */}
      <div className="bg-[#e8f7f0] text-gray-800 py-4 px-4 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100/60 text-emerald-600 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900 leading-tight">Free Shipping</h5>
              <p className="text-xs text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100/60 text-emerald-600 rounded-lg">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900 leading-tight">Easy Returns</h5>
              <p className="text-xs text-gray-500">14-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100/60 text-emerald-600 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900 leading-tight">Secure Payment</h5>
              <p className="text-xs text-gray-500">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100/60 text-emerald-600 rounded-lg">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900 leading-tight">24/7 Support</h5>
              <p className="text-xs text-gray-500">Contact us anytime</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info & Socials */}
          <div className="lg:col-span-1 space-y-4">
            {/* Logo Box */}
            <div className="bg-white rounded-lg p-2 px-4 inline-flex items-center gap-2 shadow-sm">
              <ShoppingCart className="w-6 h-6 text-emerald-500" />
              <span className="font-bold text-2xl tracking-tight text-gray-900">
                Fresh<span className="text-emerald-500">Cart</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Details */}
            <div className="space-y-2 text-xs text-gray-300 pt-1">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Icons (SVG) */}
            <div className="flex items-center gap-2 pt-2">
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Brands</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Men&apos;s Fashion</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Women&apos;s Fashion</Link></li>
            </ul>
          </div>

          {/* Column 2: Account */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Account</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shopping Cart</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. Bottom Copyright & Payment Methods Bar */}
      <div className="border-t border-slate-800/80 bg-[#080d19]">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500">
          <p>© 2026 FreshCart. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-gray-400">
              <CreditCard className="w-4 h-4" /> Visa
            </span>
            <span className="flex items-center gap-1.5 hover:text-gray-400">
              <CreditCard className="w-4 h-4" /> Mastercard
            </span>
            <span className="flex items-center gap-1.5 hover:text-gray-400">
              <CreditCard className="w-4 h-4" /> PayPal
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}