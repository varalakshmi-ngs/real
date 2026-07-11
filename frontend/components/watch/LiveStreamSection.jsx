"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/Core/rl";
import { Loader2, AlertCircle, PlayCircle, Wifi, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveStreamSection() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState(null);

  const checkLiveStatus = async () => {
    try {
      const response = await API.get("/api/youtube/live-status");
      setIsLive(response.data.isLive);
      setVideoId(response.data.videoId);
      setError(null);
    } catch (err) {
      console.error("Failed to check live status:", err);
      setError("Live stream status is currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLiveStatus();
    // Recheck status every 3 minutes (180000ms) to avoid overusing API quota
    const interval = setInterval(checkLiveStatus, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-gray-50 py-16 px-6 sm:px-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2 mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight text-center md:text-left">
              Live Stream
            </h2>
            {isLive && (
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
              </span>
            )}
          </div>
          <div className="h-1 bg-red-600 w-16 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-3" />
              <p className="text-sm font-semibold tracking-wider uppercase text-gray-400">
                Checking Live Status...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-5 py-3 rounded-xl border border-red-200 shadow-sm">
                <AlertCircle size={20} className="flex-shrink-0" />
                <span className="font-semibold text-sm tracking-wide">{error}</span>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {isLive && videoId ? (
                <motion.div
                  key="live"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 text-center"
                >
                  {/* LIVE TV Player Container */}
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 border border-gray-200 bg-black flex flex-col">
                    {/* LIVE TV Header Banner */}
                    <div className="w-full bg-red-600 text-white font-bold py-3 flex items-center justify-center gap-2 text-sm sm:text-base tracking-widest uppercase select-none shadow-md">
                      <Tv className="w-5 h-5 animate-pulse" />
                      <span>LIVE TV</span>
                    </div>

                    {/* Responsive Aspect-Ratio Wrapper for Embed */}
                    <div className="relative w-full aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3`}
                        title="Real Temple YouTube Live Stream"
                        className="absolute inset-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="offline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center"
                >
                  <div className="flex items-center gap-3 px-6 py-3.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
                    <Wifi size={18} className="text-gray-400 animate-pulse" />
                    <span className="text-gray-500 font-semibold text-sm tracking-widest uppercase">
                      No Live Stream Currently
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
