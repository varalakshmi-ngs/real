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

        <div
  className="
    mt-6
    flex
    flex-col
    items-center
    gap-3

    sm:flex-row
    sm:justify-center
  "
>
  
  {/* CONTRIBUTE BUTTON */}
  <button
    onClick={() =>
      router.push("/contribution#contribution")
    }
    className="
      group
      relative
      overflow-hidden
      cursor-pointer
      rounded-full
      bg-red-600
      px-5
      py-2.5
      sm:px-7
      sm:py-3
      text-sm
      sm:text-base
      font-semibold
      text-white
      shadow-md
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-red-700
      hover:shadow-red-300/40
      hover:shadow-xl
      active:scale-95
    "
  >
    <span
      className="
        absolute
        left-[-75%]
        top-0
        h-full
        w-1/2
        rotate-12
        bg-white/30
        blur-md
        transition-all
        duration-700
        group-hover:left-[130%]
      "
    />

    <span className="relative z-10">
      Contribute Now
    </span>
  </button>

  {/* WATCH BUTTON */}
  <button
    onClick={() => router.push("/watch")}
    className="
      group
      relative
      overflow-hidden
      cursor-pointer
      rounded-full
      border
      border-gray-300
      bg-white
      px-5
      py-2.5
      sm:px-7
      sm:py-3
      text-sm
      sm:text-base
      font-semibold
      text-gray-900
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-red-200
      hover:bg-red-50
      hover:text-red-600
      hover:shadow-lg
      active:scale-95
    "
  >
    <span
      className="
        absolute
        left-[-75%]
        top-0
        h-full
        w-1/2
        rotate-12
        bg-red-100/60
        blur-md
        transition-all
        duration-700
        group-hover:left-[130%]
      "
    />

    <span className="relative z-10">
      Watch Online
    </span>
  </button>
</div>
      </motion.div>
    </article>
  );
};

export default EventHeading;
