import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const EventHeading = () => {
  const router = useRouter();

  return (
    <article className="w-full flex flex-col justify-center items-center px-6 sm:px-12 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white text-center border-b border-gray-100">
      <motion.div 
        className="max-w-3xl flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
          Upcoming Events{" "}
          <span className="text-red-600 block mt-2">at The Real Church</span>
        </h1>
        
        <div className="h-1 bg-red-600 w-24 rounded-full" />
        
        <p className="text-lg sm:text-xl text-gray-600 font-sans leading-relaxed">
          Whether it's Sunday service or a midweek event, you're always welcome here. Experience community, worship, and growth.
        </p>

        <div className="flex gap-4 items-center mt-4">
          <button 
            onClick={() => router.push("/contribution#contribution")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            Contribute Now
          </button>
          <button 
            onClick={() => router.push("/watch")}
            className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-full transition-colors border border-gray-200 shadow-sm hover:shadow-md"
          >
            Watch Online
          </button>
        </div>
      </motion.div>
    </article>
  );
};

export default EventHeading;
