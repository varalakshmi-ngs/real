"use client";

import React, { Suspense } from "react";
import { useHomeDataHook } from "@/Hooks/HomeDataHook";
import { APIURL } from "@/Core/rl";
import { ClipLoader } from "react-spinners";
import { PlayCircle, Share2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LatestMessageContent() {
  const { data, loading, error } = useHomeDataHook();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <ClipLoader color="red" size={50} />
      </div>
    );
  }

  if (error || !data?.latestMessages || data?.latestMessages.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-red-500 text-lg font-medium">Latest message not found.</p>
        <Link
          href="/"
          className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Find message by ID, or default to the first one in the list
  const message = data.latestMessages.find(m => m.id.toString() === id) || data.latestMessages[0];

  const handleWatchNow = () => {
    const watchLink = message.youtubeLink || "https://www.youtube.com/@REALTEMPLE";
    window.open(watchLink, "_blank");
  };

  const shareMessage = () => {
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

  const imageSrc = message.thumbnailImage
    ? (message.thumbnailImage.startsWith("http") ? message.thumbnailImage : `${APIURL}/${message.thumbnailImage}`)
    : "/images/jesus-footer-image.png";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-semibold mb-8 group transition-colors"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Content Container */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          {/* Cover/Image Section */}
          <div className="relative w-full h-[350px] sm:h-[450px] bg-slate-900 overflow-hidden">
            <img
              src={imageSrc}
              alt={message.heading}
              className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
            
            {/* Play Button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWatchNow}
                className="rounded-full bg-white/95 p-6 text-red-600 shadow-2xl backdrop-blur-md hover:bg-white transition-all"
              >
                <PlayCircle size={56} fill="currentColor" />
              </motion.button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-red-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Latest Message
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 sm:p-12 space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#022147] leading-tight">
                {message.heading}
              </h1>
              {message.hostName && (
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Host: {message.hostName}
                </p>
              )}
              <div className="h-1 bg-red-600 w-24 rounded-full" />
            </div>

            {/* Description Paragraphs */}
            <div className="text-slate-600 text-lg leading-relaxed whitespace-pre-line border-t border-slate-100 pt-6">
              {message.description}
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWatchNow}
                className="
                  flex-1
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-r
                  from-red-600
                  via-red-500
                  to-pink-500
                  py-4
                  px-8
                  font-semibold
                  text-white
                  shadow-[0_10px_30px_rgba(255,0,85,0.25)]
                  transition-all
                  duration-500
                  hover:shadow-[0_15px_40px_rgba(255,0,85,0.4)]
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <span className="absolute left-[-120%] top-0 h-full w-20 rotate-12 bg-white/40 blur-xl transition-all duration-700 group-hover:left-[130%]" />
                <PlayCircle size={22} fill="currentColor" />
                <span>Watch Full Message</span>
              </motion.button>

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={shareMessage}
                className="
                  sm:flex-initial
                  px-8
                  py-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  font-semibold
                  text-slate-700
                  hover:border-slate-400
                  hover:bg-slate-50
                  shadow-sm
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <Share2 size={20} className="text-slate-500" />
                <span>Share Message</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LatestMessagePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <ClipLoader color="red" size={50} />
        </div>
      }
    >
      <LatestMessageContent />
    </Suspense>
  );
}
