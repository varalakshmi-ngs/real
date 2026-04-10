"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { APIURL } from "@/Core/rl";

const normalizePdfUrl = (pdf) => {
  if (!pdf) return null;
  if (/^https?:\/\//i.test(pdf)) return pdf;

  const baseUrl = APIURL || "http://localhost:4040";
  let path = pdf.replace(/\\/g, "/");

  const uploadsIndex = path.indexOf("uploads/");
  if (uploadsIndex !== -1) {
    path = path.slice(uploadsIndex);
  }

  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  return `${baseUrl}${path}`;
};

const MagazineCarousel = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-0">
      {/* <h2 className="text-3xl font-bold text-main text-center mb-10">
        Magazines
      </h2> */}

      {/* Navigation Buttons */}
      <div
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10 cursor-pointer bg-white hover:bg-red-500 text-red-600 hover:text-white shadow-lg rounded-full p-3 transition-all"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      <div
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10 cursor-pointer bg-white hover:bg-red-500 text-red-600 hover:text-white shadow-lg rounded-full p-3 transition-all"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-main/30",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-main",
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-12"
      >
        {data?.map((mag, index) => {
          const pdfUrl = normalizePdfUrl(mag?.pdf);
          return (
            <SwiperSlide key={index}>
              <div className="h-full">
                <div className="bg-white rounded overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200 group flex flex-col h-full">

                  {/* PDF Preview (TOP) */}
                  <div className="relative bg-gray-100 flex justify-center items-center overflow-hidden h-64 border-b">
                    {pdfUrl ? (
                      <object
                        data={pdfUrl}
                        type="application/pdf"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      >
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                          <p className="text-gray-500 mb-3">
                            PDF preview is unavailable in this browser.
                          </p>
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm font-semibold underline"
                          >
                            Open Magazine in a new tab
                          </a>
                        </div>
                      </object>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        No Preview Available
                      </div>
                    )}

                    {/* Tag */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase rounded-sm shadow-md">
                      Magazine
                    </div>
                  </div>

                {/* Info Section */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {mag?.title || "Untitled"}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2">
                      {mag?.subTitle || mag?.subtitle || "No description available"}
                    </p>

                    {/* Optional Date */}
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date().toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <a
                      href={normalizePdfUrl(mag?.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm font-semibold flex items-center"
                    >
                      Read Now
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        )})}
      </Swiper>
    </div>
  );
};

export default MagazineCarousel;