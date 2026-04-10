"use client";
import React, { useRef } from "react";
import { PlayCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WatchOnlineHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900"
    >
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/watchbanner.jpg')",
          y,
        }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center h-full pt-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity: opacity }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              className="bg-red-600 rounded-full p-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <PlayCircle size={24} className="text-white fill-current" />
            </motion.div>
            <span className="text-red-500 font-semibold tracking-widest uppercase text-sm">Join Us Live & On-Demand</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Watch <span className="text-red-500 block sm:inline">Online</span>
          </h1>
          
          <div className="h-1 bg-red-600 w-24 rounded-full mb-6" />
          
          <p className="text-xl sm:text-2xl text-gray-300 font-sans leading-relaxed max-w-2xl">
            Experience an inspiring and powerful message, along with uplifting
            music and worship every single week.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
