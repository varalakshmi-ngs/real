"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { APIURL } from "@/Core/rl";
import { motion, AnimatePresence } from "framer-motion";

export default function ImagesGrid({ data, selected }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // All data is global now, no filtering needed
  const filteredData = data;

  const openModal = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "unset";
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const showNext = (e) => {
    e?.stopPropagation();
    if (selectedIndex < filteredData.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (distance > swipeThreshold) {
      showNext();
    } else if (distance < -swipeThreshold) {
      showPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-8 md:my-12 px-2 sm:px-4">
      <motion.div 
        layout
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4"
      >
        <AnimatePresence>
          {filteredData?.map((e, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
              key={e._id || index}
              onClick={() => openModal(index)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/20 transition-colors duration-300 z-10" />
              <img
                src={`${APIURL}/${e?.image}`}
                alt={e?.title || "Gallery image"}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal for Image Viewer */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 sm:p-8"
            onClick={closeModal}
          >
            <div
              className="relative w-full h-full flex items-center justify-center max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 sm:top-6 sm:right-6 text-white bg-white/10 hover:bg-red-600 backdrop-blur-md rounded-full p-3 transition-colors z-50 shadow-lg"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={24} strokeWidth={2.5} />
              </button>

              {/* Prev Button */}
              {selectedIndex > 0 && (
                <button
                  className="absolute left-2 sm:-left-4 md:-left-12 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all z-50 hover:scale-110 active:scale-95"
                  onClick={showPrev}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={28} />
                </button>
              )}

              {/* Next Button */}
              {selectedIndex < filteredData.length - 1 && (
                <button
                  className="absolute right-2 sm:-right-4 md:-right-12 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all z-50 hover:scale-110 active:scale-95"
                  onClick={showNext}
                  aria-label="Next image"
                >
                  <ArrowRight size={28} />
                </button>
              )}

              {/* Image Container */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full flex items-center justify-center px-8"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={`${APIURL}/${filteredData[selectedIndex]?.image}`}
                  alt={`Gallery view ${selectedIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  draggable={false}
                />
              </motion.div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide backdrop-blur-md">
                {selectedIndex + 1} / {filteredData.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
