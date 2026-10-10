import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On orders over 500 EGP',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    desc: '100% secure transactions',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '14-day return policy',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Dedicated support team',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

export default function FeaturesBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3.5 bg-white p-4 rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-shadow duration-200"
            >

              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${item.bgColor}`}
              >
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}