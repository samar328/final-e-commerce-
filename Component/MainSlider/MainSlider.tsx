"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import slide1 from '../../images/banner-4.jpeg';
import slide2 from '../../images/blog-img-1.jpeg';
import slide3 from '../../images/blog-img-2.jpeg';

const slides = [
  {
    id: 1,
    title: 'Fresh Products Delivered to your Door',
    subtitle: 'Get 20% off your first order',
    image: slide1,
  },
  {
    id: 2,
    title: 'Quality Organic Food & Grocery',
    subtitle: 'Fresh deals every single day',
    image: slide2,
  },
  {
    id: 3,
    title: 'Healthy Choices for Your Family',
    subtitle: 'Best prices guaranteed on all items',
    image: slide3,
  },
];

export default function MainSlider() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-2 py-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="main-slider rounded-xl overflow-hidden shadow-sm"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[240px] sm:h-[280px] md:h-[340px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/90 via-emerald-500/70 to-emerald-400/50" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white max-w-md space-y-2.5 z-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-emerald-50">
                  {slide.subtitle}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href="/shop"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-1.5 rounded-lg font-semibold text-xs transition"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/deals"
                    className="bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-300/40 text-white px-4 py-1.5 rounded-lg font-semibold text-xs transition backdrop-blur-sm"
                  >
                    View Deals
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}