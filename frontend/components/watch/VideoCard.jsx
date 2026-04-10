"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, ArrowLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import YoutubeCard from "@/utils/YoutubeCard";
import { motion } from "framer-motion";

export default function VideoCarousel({
  videoData,
  sectionTitle = "Popular Messages",
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (!swiperInstance || !swiperInstance.navigation) return;

    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;
    swiperInstance.navigation.destroy();
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [swiperInstance]);

  return (
    <motion.section 
      className="relative w-full bg-gray-50 py-16 px-6 sm:px-12 border-b border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight text-center md:text-left">
              {sectionTitle}
            </h2>
            <div className="h-1 bg-red-600 w-16 rounded-full" />
          </div>
          
          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              className="bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 w-12 h-12 rounded-full shadow-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              ref={nextRef}
              className="bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 w-12 h-12 rounded-full shadow-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1.1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSwiper={setSwiperInstance}
              breakpoints={{
                540: { slidesPerView: 1.5 },
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3.2 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-10" // Padding for pagination
            >
              {videoData?.map((video, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <YoutubeCard video={video} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      </div>
    </motion.section>
  );
}
