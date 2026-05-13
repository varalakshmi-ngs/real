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
  className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight overflow-hidden"
  variants={itemVariants}
>
  {/* First Line */}
  <motion.div
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    Every contribution matters,
  </motion.div>

  {/* Second Line */}
  <motion.div
    className="text-red-600 block mt-2 relative"
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    every act of giving transforms lives.

    {/* Glow Effect */}
    <motion.div
      className="absolute inset-0 blur-3xl bg-red-400/20 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1.2 }}
    />
  </motion.div>
</motion.h1>

       <motion.p
  className="font-sans text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed"
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    delay: 0.7,
    ease: "easeOut",
  }}
>
  Your generosity helps provide vital support, extend outreach efforts,
  and share the message of Christ with those who need it most.
</motion.p>

        <motion.div
  className="flex gap-4 flex-wrap justify-center mt-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 1,
  }}
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
  className="w-full max-w-6xl mt-14 px-4"
  initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1.2,
    delay: 1.2,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.4 }}
    className="relative overflow-hidden rounded-[32px] border border-white/50 shadow-2xl"
  >
    {/* Image */}
    <motion.img
      src="/images/give-now-header.png"
      alt="Give Now"
      initial={{ scale: 1.15 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 2.5,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.05 }}
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover transition-transform duration-700"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

    {/* Premium Light Overlay */}
    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

    {/* Bottom Gradient Glow */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1.2 }}
      className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-red-500/10 to-transparent"
    />

    {/* Floating Text */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.8,
        duration: 1,
      }}
      className="absolute bottom-8 left-8 sm:left-12 text-white"
    >
      <h3 className="text-2xl sm:text-4xl font-serif font-bold drop-shadow-xl">
        Serving with Love
      </h3>

      <p className="mt-2 text-sm sm:text-lg text-white/90 max-w-lg">
        Together we can bring hope, compassion, and support
        to communities in need.
      </p>
    </motion.div>
  </motion.div>
</motion.div>
    </section>
  );
};

export default GiveNowHeader;
