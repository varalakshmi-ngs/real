"use client";

import { ArrowRight, PlayCircle, Calendar } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const getThumbnailSrc = (thumbnail) => {
  if (!thumbnail) return "/watchbanner.jpg";
  if (thumbnail.startsWith("http")) return thumbnail;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4040";
  return `${baseUrl}${thumbnail.startsWith("/") ? "" : "/"}${thumbnail}`;
};

export default function YoutubeCard({ video }) {
  // Ensure we have a valid date string
  const formattedDate = video?.date ? new Date(video.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full h-[380px] flex flex-col group hover:shadow-xl transition-all duration-500"
      whileHover={{ y: -5 }}
    >
      {/* Thumbnail & Play Overlay */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <a href={video?.watchUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          {/* Thumbnail Image with smooth zoom */}
          <img
            src={getThumbnailSrc(video?.thumbnail)}
            alt={video?.title || 'Video Thumbnail'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-80" />

          {/* Animated Play Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600/90 rounded-full p-4 shadow-2xl backdrop-blur-md border border-red-500/50"
            >
              <PlayCircle className="text-white w-10 h-10 drop-shadow-lg fill-current" />
            </motion.div>
          </div>
          
          {/* Date Badge */}
          {formattedDate && (
             <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
               <Calendar size={12} />
               <span>{formattedDate}</span>
             </div>
          )}
        </a>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 relative bg-white z-10">
        {/* Title */}
        <a href={video?.watchUrl} target="_blank" rel="noopener noreferrer" className="group-hover:text-red-600 transition-colors">
          <h5 className="text-xl font-serif font-bold text-gray-900 line-clamp-2 leading-snug mb-3">
            {video?.title || 'Untitled Message'}
          </h5>
        </a>

        {/* Preacher */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-serif font-bold text-sm">
                {(video?.preacher || 'PR').charAt(0).toUpperCase()}
             </div>
            <h3 className="text-sm font-semibold text-gray-700">{video?.preacher || 'Real Temple Church'}</h3>
          </div>

          {/* Watch Link */}
          <a href={video?.watchUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors group/link">
            <span>Watch</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
