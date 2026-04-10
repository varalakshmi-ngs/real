"use client";
import ImagesGrid from "@/components/gallerycomponents/ImagesGrid";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API } from "@/Core/rl";

export default function page() {
  const [imageData, setImageData] = useState([]);

  const getdata = async () => {
    try {
      const response = await API.get("/gallery/");
      setImageData(response?.data?.images || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full bg-white py-16 sm:py-24 px-6 border-b border-gray-100 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center gap-6"
        >
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900 tracking-tight">
            Our <span className="text-red-600">Church</span> Gallery
          </h1>
          <div className="h-1 bg-red-600 w-24 rounded-full" />
          <p className="font-sans text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl px-4">
            Explore moments from our church community through worship services,
            outreach programs, and special events. Witness the spirit in action.
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="w-full flex-grow py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full"
        >
          <ImagesGrid data={imageData} />
        </motion.div>
      </div>
    </section>
  );
}
