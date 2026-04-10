"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRightFromCircle } from "lucide-react";

export default function PrayerCard({ image, title, link, subtitle }) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100"
    >
      {/* Image */}
      <div className="relative w-full h-56">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {subtitle}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

        <button
          onClick={link}
          className="mt-3 flex items-center gap-2 w-full justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all"
        >
          Request Prayer <ArrowUpRightFromCircle size={18} />
        </button>
      </div>
    </motion.div>
  );
}
