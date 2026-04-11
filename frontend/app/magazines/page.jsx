"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";
import { useHomeDataHook } from "@/Hooks/HomeDataHook";


const MagazineCarousel = dynamic(
  () => import("@/components/HomeComponents/Magzinecomponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <ClipLoader color="red" size={40} />
        <p className="text-gray-500 text-sm">Loading magazines...</p>
      </div>
    ),
  }
);

const Page = () => {
  const { magazine, loading, error } = useHomeDataHook();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader color="red" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Failed to load magazines.
      </div>
    );
  }

  return (
    <motion.div
      className="w-full flex flex-col bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <article className="w-full flex flex-col justify-center items-center py-16 px-6 sm:px-12 bg-gradient-to-b from-gray-50 to-white text-center">
        <div className="max-w-3xl flex flex-col items-center gap-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight">
            Our <span className="text-red-600">Magazines</span>
          </h1>
          <div className="h-1 bg-red-600 w-24 rounded-full mb-2" />
          <p className="text-lg sm:text-xl text-gray-600 font-sans leading-relaxed">
            Sermons, devotionals, and inspiring updates from The Real Temple community.
          </p>
        </div>
      </article>

      <div className="w-full bg-gray-50 pt-16 pb-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest <span className="text-red-600">Magazines</span>
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full" />
          </div>

          {/* Content */}
          {(magazine ?? []).length > 0 ? (
            <MagazineCarousel data={magazine} />
          ) : (
            <div className="w-full h-[300px] flex flex-col items-center justify-center text-gray-500">
              <p className="text-xl font-semibold">No Magazines Available</p>
              <p className="text-sm">Please check back later</p>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default Page;