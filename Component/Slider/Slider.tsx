"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";

interface SliderProps {
  pageList: string[];
  slidesPerView?: number;
  spaceBetween?: number;
}

export default function Slider({
  pageList = [],
  slidesPerView = 3,
  spaceBetween = 10,
}: SliderProps) {
  if (!pageList || pageList.length === 0) return null;

  return (
    <Swiper spaceBetween={spaceBetween} slidesPerView={slidesPerView}>
      {pageList.map((imgSrc, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-24 border rounded-lg overflow-hidden bg-white shadow-sm">
            <Image
              src={imgSrc}
              alt={`Product sub image ${index + 1}`}
              fill
              sizes="100px"
              className="object-contain p-1"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}