"use client";

import { APIURL } from "@/Core/rl";
import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, Share2, User } from "lucide-react";
import Link from "next/link";

export default function Home_latest_message({ data = [] }) {
  const [expandedIds, setExpandedIds] = React.useState([]);

  if (!data || data.length === 0) return null;

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWatchNow = (youtubeLink) => {
    const watchLink = youtubeLink || "https://www.youtube.com/@REALTEMPLE";
    window.open(watchLink, "_blank");
  };

  const shareMessage = (message) => {
    const detailLink = `${window.location.origin}/latest-message?id=${message.id}`;
    if (navigator.share) {
      navigator.share({
        title: message.heading,
        text: message.description,
        url: detailLink,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${message.heading} - Read more at: ${detailLink}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <section className="px-6 sm:px-12 py-16 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 items-center">
        {/* SECTION TITLE */}
        <div className="flex flex-col w-full gap-2 items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 font-bold">
            Latest <span className="text-red-600">Messages</span>
          </h2>
          <div className="h-1 bg-red-600 w-24 rounded-full mt-2" />
        </div>

        {/* CARDS GRID (Centered) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center justify-items-center">
          {data.map((message) => {
            const isExpanded = expandedIds.includes(message.id);
            const isLong = message.description && message.description.length > 200;
            const displayText = isLong && !isExpanded ? message.description.substring(0, 200) + "... " : message.description;
            const imageSrc = message.thumbnailImage
              ? (message.thumbnailImage.startsWith("http") ? message.thumbnailImage : `${APIURL}/${message.thumbnailImage}`)
              : "/images/jesus-footer-image.png";

            return (
              <motion.div
                key={message.id}
                className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden w-full max-w-[320px] flex flex-col group hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Image Header with Play Button overlay */}
                <div className="relative h-[180px] w-full overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={imageSrc}
                    alt={message.heading}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Play overlay button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWatchNow(message.youtubeLink)}
                      className="bg-red-600/90 rounded-full p-4 shadow-2xl backdrop-blur-md border border-red-500/50 text-white"
                    >
                      <PlayCircle className="w-10 h-10 drop-shadow-lg fill-current" />
                    </motion.button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 gap-3 bg-white">
                  <h3 className="text-lg font-serif font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                    {message.heading}
                  </h3>

                  {/* Host Name display */}
                  {message.hostName && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50 p-2 rounded-lg border border-slate-100 self-start">
                      <User size={13} className="text-slate-400" />
                      <span>Host: {message.hostName}</span>
                    </div>
                  )}

                  {/* Description & See More Inline */}
                  <div className="text-xs leading-relaxed text-gray-600 flex-1">
                    <span className="whitespace-pre-line">{displayText}</span>
                    {isLong && (
                      <button
                        onClick={() => toggleExpand(message.id)}
                        className="text-red-600 hover:text-red-700 font-bold transition-colors ml-1 inline text-xs cursor-pointer focus:outline-none"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => handleWatchNow(message.youtubeLink)}
                      className="rounded-full w-full h-9 hover:scale-[102%] duration-300 cursor-pointer text-xs bg-myblue text-white hover:bg-white hover:border-myblue hover:border hover:text-myblue font-semibold flex items-center justify-center gap-1"
                    >
                      <PlayCircle size={14} />
                      Watch Now
                    </button>
                    <button
                      onClick={() => shareMessage(message)}
                      className="rounded-full w-full h-9 hover:scale-[102%] duration-300 cursor-pointer text-xs bg-white text-second border-main border hover:bg-main hover:text-white font-semibold flex items-center justify-center gap-1"
                    >
                      <Share2 size={14} />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}