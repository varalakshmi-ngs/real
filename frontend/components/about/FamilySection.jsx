"use client";

import React from "react";
import { motion } from "framer-motion";
import { APIURL } from "@/Core/rl";
import ImageComponent from "../UtilComponents/ImageComponent";

const FamilySection = ({ data }) => {
  if (!data || !data.title || !data.description) return null;

  const imageUrl = data.image ? `${APIURL}/${data.image}` : "/images/about-first-image.png";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-slate-50/40 flex justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl w-full bg-white rounded-[32px] border border-red-100/30 shadow-[0_15px_55px_rgba(230,0,35,0.05)] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-10 lg:gap-14 items-center relative overflow-hidden"
      >
        {/* Decorative corner glow */}
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-400/5 blur-2xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-blue-400/5 blur-2xl pointer-events-none" />

        {/* Left Side: Family Photo */}
        <motion.div variants={itemVariants} className="w-full lg:w-[48%] flex justify-center z-10">
          <div className="relative group w-full">
            {/* Background glow frame */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 opacity-20 blur-md transition duration-1000 group-hover:opacity-30 group-hover:duration-200" />
            
            {/* Image Wrapper */}
            <div className="relative overflow-hidden rounded-xl shadow-lg border border-red-50/10 bg-white">
              <ImageComponent
                imageUrl={imageUrl}
                className="w-full aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
                alt="Pastor Suresh and Family"
              />
            </div>
            
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-white text-xs font-medium text-center tracking-wider">
                దైవజనులు డి సురేష్ గారు మరియు వారి కుటుంబం
              </p>
            </div>  
          </div>
        </motion.div>

        {/* Right Side: Telugu Message/Matter */}
        <motion.div variants={itemVariants} className="w-full lg:w-[52%] flex flex-col gap-5 text-slate-800 z-10">
          <div className="flex flex-col gap-1.5">
            <span className="text-red-600 font-bold uppercase tracking-wider text-xs font-sans">
              Pastor & Family
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
              {data.title}
            </h2>
            <div className="w-16 bg-red-600 h-1 rounded-full mt-1" />
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line font-sans antialiased">
            {data.description}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FamilySection;
