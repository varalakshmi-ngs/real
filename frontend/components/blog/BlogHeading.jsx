"use client";
import React from "react";
import { motion } from "framer-motion";

const BlogHeading = () => {
  return (
    <article className="w-full flex flex-col justify-center items-center py-16 px-6 sm:px-12 bg-gradient-to-b from-gray-50 to-white text-center">
      <motion.div 
        className="max-w-3xl flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight">
          Our <span className="text-red-600">Magazines</span>
        </h1>
        <div className="h-1 bg-red-600 w-24 rounded-full mb-2" />
        <p className="text-lg sm:text-xl text-gray-600 font-sans leading-relaxed">
          Sermons, devotionals, and inspiring updates from The Real Temple community.
        </p>
      </motion.div>
    </article>
  );
};

export default BlogHeading;
