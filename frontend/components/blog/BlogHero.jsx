"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

const BlogHero = () => {
  return (
    <motion.div 
      className="w-full h-[500px] md:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="/images/blog-banner.png"
        alt="Featured Magazine"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />

      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-end p-6 md:p-12">
        <div className="w-full max-w-4xl flex flex-col gap-6">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full w-fit shadow-lg"
          >
            Featured Article
          </motion.div>

          <motion.h1 
            className="text-white font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-tight group-hover:text-red-100 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Finding Peace in Troubled Times: A Message of Hope
          </motion.h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <motion.p 
              className="text-gray-300 text-base md:text-lg font-sans max-w-2xl leading-relaxed line-clamp-3 md:line-clamp-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              In these challenging times, many of us struggle to find peace
              amidst the chaos. This sermon explores how we can discover God's
              peace that surpasses all understanding, even when the world around
              us seems to be in turmoil. Drawing from Philippians 4:6-7, we'll
              examine practical ways to...
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={"/#pastor"}
                className="shrink-0 bg-white hover:bg-red-50 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group/btn"
              >
                Read Article
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 pt-6 border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white/50 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-600 font-serif font-bold">
                  MJ
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-white font-semibold font-sans">
                  Pastor Michael Johnson
                </p>
                <div className="flex items-center gap-1.5 text-red-300">
                  <User size={14} />
                  <span className="text-sm font-medium">Senior Pastor</span>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-500" />
            
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <p className="text-sm font-medium">
                June 12, 2023
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogHero;
