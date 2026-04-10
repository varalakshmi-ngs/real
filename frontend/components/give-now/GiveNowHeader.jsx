"use client";
import MainBtn from "@/utils/MainBtn";
import ImageComponent from "@/components/UtilComponents/ImageComponent";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const GiveNowHeader = () => {
  const router = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 px-6 sm:px-12 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <motion.div 
        className="max-w-4xl flex flex-col items-center text-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight"
          variants={itemVariants}
        >
          Every contribution matters,{" "}
          <span className="text-red-600 block mt-2">
            every act of giving transforms lives.
          </span>
        </motion.h1>

        <motion.p 
          className="font-sans text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed"
          variants={itemVariants}
        >
          Your generosity helps provide vital support, extend outreach efforts,
          and share the message of Christ with those who need it most.
        </motion.p>

        <motion.div 
          className="flex gap-4 flex-wrap justify-center mt-4"
          variants={itemVariants}
        >
          <button 
            onClick={() => router.push("/contribution#contribution")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            Give Now
          </button>
          <button 
            onClick={() => router.push("/contribution#support")}
            className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-full transition-colors border border-gray-200 shadow-sm hover:shadow-md"
          >
            Learn More
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="w-full max-w-6xl mt-12 px-4"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
           <img
            src="/images/give-now-header.png"
            alt="Give Now"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
};

export default GiveNowHeader;
