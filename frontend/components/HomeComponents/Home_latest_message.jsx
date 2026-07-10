"use client";

import { APIURL } from "@/Core/rl";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Share2, User, X } from "lucide-react";
import Link from "next/link";

export default function Home_latest_message({ data = [] }) {
  const [selectedMessage, setSelectedMessage] = React.useState(null);

  if (!data || data.length === 0) return null;

  const handleWatchNow = (youtubeLink) => {
    const watchLink = youtubeLink || "https://www.youtube.com/@REALTEMPLE";
    window.open(watchLink, "_blank");
  };

  const shareMessage = (message) => {
    const detailLink = `${window.location.origin}/latest-message?id=${message.id}`;
    if (navigator.share) {
      navigator.share({
        url: detailLink,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(detailLink);
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
            const isLong = message.description && message.description.length > 200;
            const displayText = isLong ? message.description.substring(0, 200) + "... " : message.description;
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
                  {(message.pastorName || message.hostName) && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50 p-2 rounded-lg border border-slate-100 self-start">
                      <User size={13} className="text-slate-400" />
                      <span>PASTOR: {message.pastorName || message.hostName}</span>
                    </div>
                  )}

                  {/* Description & See More Inline */}
                  <div className="text-xs leading-relaxed text-gray-600 flex-1">
                    <span className="whitespace-pre-line">{displayText}</span>
                    {isLong && (
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="text-red-600 hover:text-red-700 font-bold transition-colors ml-1 inline text-xs cursor-pointer focus:outline-none"
                      >
                        See More
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

      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-lg flex flex-col relative z-10 max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-gray-100 p-2 rounded-full shadow-md z-20 transition duration-300 text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <X size={18} />
              </button>

              {/* Cover/Image Header */}
              {selectedMessage.thumbnailImage && (
                <div className="relative h-[200px] w-full overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={selectedMessage.thumbnailImage.startsWith("http") ? selectedMessage.thumbnailImage : `${APIURL}/${selectedMessage.thumbnailImage}`}
                    alt={selectedMessage.heading}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              )}

              {/* Body Content */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 leading-snug">
                  {selectedMessage.heading}
                </h3>

                {/* Host Name */}
                {(selectedMessage.pastorName || selectedMessage.hostName) && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50 p-2 rounded-lg border border-slate-100 self-start">
                    <User size={13} className="text-slate-400" />
                    <span>PASTOR: {selectedMessage.pastorName || selectedMessage.hostName}</span>
                  </div>
                )}

                <div className="h-[2px] bg-gray-100 w-full shrink-0" />

                {/* Full Description */}
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line overflow-y-auto pr-1">
                  {selectedMessage.description}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    handleWatchNow(selectedMessage.youtubeLink);
                  }}
                  className="rounded-full w-full h-11 hover:scale-[102%] duration-300 cursor-pointer text-sm bg-myblue text-white hover:bg-white hover:border-myblue hover:border hover:text-myblue font-semibold flex items-center justify-center gap-1.5"
                >
                  <PlayCircle size={16} />
                  Watch Now
                </button>
                <button
                  onClick={() => {
                    shareMessage(selectedMessage);
                  }}
                  className="rounded-full w-full h-11 hover:scale-[102%] duration-300 cursor-pointer text-sm bg-white text-second border-main border hover:bg-main hover:text-white font-semibold flex items-center justify-center gap-1.5"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}