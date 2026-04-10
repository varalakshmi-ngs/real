"use client";
import { APIURL } from "@/Core/rl";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const OurLeaders = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || data.length === 0) return null;

  const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, data.length - itemsPerSlide);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="bg-gray-900 w-full px-6 sm:px-12 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <motion.div 
          className="flex flex-col items-center md:items-end w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 text-center md:text-right">
            Our <span className="text-red-500">Leadership</span> Team
          </h2>
          <div className="w-32 bg-red-600 h-1 rounded-full" />
        </motion.div>

        <div className="relative w-full">
          <div className="overflow-hidden w-full py-4">
            <motion.div
              className="flex gap-6"
              initial={false}
              animate={{
                x: `calc(-${currentIndex * (100 / itemsPerSlide)}% - ${currentIndex * (24 / itemsPerSlide)}px)`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {data?.map((leader, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerSlide}% - ${((itemsPerSlide - 1) * 24) / itemsPerSlide}px)`
                  }}
                >
                  <Leader
                    description={leader?.comment || leader?.description}
                    image={leader.image}
                    name={leader.name}
                    designation={leader.designation || "Leader"}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {data.length > itemsPerSlide && (
            <div className="flex w-full gap-4 justify-center md:justify-end mt-8">
              <button
                onClick={prevSlide}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors group"
                aria-label="Previous slide"
              >
                <ArrowLeftCircle
                  className="text-white group-hover:text-red-500 transition-colors"
                  size={32}
                  strokeWidth={1.5}
                />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors group"
                aria-label="Next slide"
              >
                <ArrowRightCircle
                  className="text-white group-hover:text-red-500 transition-colors"
                  size={32}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurLeaders;

const Leader = ({ description, designation, image, name }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col group border border-transparent hover:border-red-100 transition-colors"
      whileHover={{ y: -8 }}
    >
      <div className="w-full h-[320px] overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={`${APIURL}/${image}`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={name} 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow bg-white z-20">
        <h4 className="text-2xl font-serif font-bold text-gray-900 mb-1">
          {name}
        </h4>
        <p className="text-red-600 font-medium mb-4 uppercase tracking-wider text-sm">
          {designation}
        </p>
        <p className="text-gray-600 leading-relaxed font-sans line-clamp-4 text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
