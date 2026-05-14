"use client";

import { motion } from "framer-motion";
import { ArrowUpRightFromCircle } from "lucide-react";

export default function PrayerCard({
  image,
  title,
  link,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative w-full max-w-sm overflow-hidden rounded-3xl"
    >
      {/* Soft Glow */}
      <div className="absolute inset-0 rounded-3xl bg-red-400/20 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />

      {/* Card */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-red-100
          bg-white
          shadow-lg
          transition-all
          duration-500
          group-hover:shadow-2xl
        "
      >
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Soft Blend Effect */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />

          {/* Badge */}
          <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
            {subtitle}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4 bg-white px-5 pb-5 pt-2">
          <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-red-600">
            {title}
          </h3>

          <button
            onClick={link}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-red-500
              to-pink-500
              px-4
              py-3
              font-semibold
              text-white
              shadow-md
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-xl
            "
          >
            Request Prayer
            <ArrowUpRightFromCircle size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}