"use client";

import { APIURL } from "@/Core/rl";
import MainBtn from "@/utils/MainBtn";
import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight } from "lucide-react";

export default function Home_latest_message({ data }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff5f5] via-white to-red-50 px-4 py-16 sm:px-8 lg:px-14">
      {/* BACKGROUND GLOW */}
      <div className="absolute left-[-100px] top-[-100px] h-[250px] w-[250px] rounded-full bg-red-200/30 blur-3xl"></div>

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-red-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            <span className="text-[#022147]">
              Watch
            </span>{" "}
            <span className="text-red-600">
              Latest Message
            </span>
          </h2>

          <div className="mt-4 h-1.5 w-28 rounded-full bg-red-600"></div>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* IMAGE SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              {/* PLAY BUTTON */}
              <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="rounded-full bg-white/90 p-5 text-red-600 shadow-2xl backdrop-blur-lg"
                  onClick={() =>
                    window.open(data?.youtubeLink, "_blank")
                  }
                >
                  <PlayCircle size={48} fill="currentColor" />
                </motion.button>
              </div>

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

              {/* IMAGE */}
              <motion.img
                src={`${APIURL}/${data?.thumbnailImage}`}
                alt="Latest Message"
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="h-[320px] w-full object-cover md:h-[500px]"
              />
            </motion.div>

            {/* CONTENT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 px-6 py-8 md:px-10"
            >
              {/* BADGE */}
              <div className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                Latest Sermon
              </div>

              {/* TITLE */}
              <h2 className="font-serif text-3xl font-bold leading-tight text-[#022147] md:text-5xl">
                {data?.heading}
              </h2>

              {/* DESCRIPTION */}
              <p className="max-w-2xl text-justify text-base leading-relaxed text-gray-600">
                {data?.description}
              </p>

              {/* HOST */}
              <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <img
                  src={`${APIURL}/${data?.thumbnailImage}`}
                  className="h-[65px] w-[65px] rounded-full object-cover shadow-md"
                  alt=""
                />

                <div>
                  <p className="text-lg font-semibold text-[#022147]">
                    {data?.hostName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {data?.title}
                  </p>
                </div>
              </div>

             {/* BUTTONS */}
<div className="flex flex-col gap-4 pt-4 sm:flex-row">
  
  {/* WATCH BUTTON */}
  <motion.button
    whileHover={{
      y: -3,
      scale: 1.02,
    }}
    whileTap={{
      scale: 0.97,
    }}
    onClick={() =>
      window.open(
        data?.youtubeLink,
        "_blank"
      )
    }
    className="
      group
      relative
      overflow-hidden
      rounded-2xl
      bg-gradient-to-r
      from-red-600
      via-red-500
      to-pink-500
      px-7
      py-4
      font-semibold
      text-white
      shadow-[0_10px_30px_rgba(255,0,85,0.25)]
      transition-all
      duration-500
      hover:shadow-[0_15px_40px_rgba(255,0,85,0.4)]
    "
  >
    {/* SHINE */}
    <span
      className="
        absolute
        left-[-120%]
        top-0
        h-full
        w-20
        rotate-12
        bg-white/40
        blur-xl
        transition-all
        duration-700
        group-hover:left-[130%]
      "
    />

    <span className="relative z-10 flex items-center gap-3">
      <PlayCircle size={22} />
      Watch Full Sermon
    </span>
  </motion.button>

  {/* BROWSE BUTTON */}
  <motion.button
    whileHover={{
      y: -3,
      scale: 1.02,
    }}
    whileTap={{
      scale: 0.97,
    }}
    className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-[#022147]/20
      bg-white
      px-7
      py-4
      font-semibold
      text-[#022147]
      shadow-md
      transition-all
      duration-500
      hover:border-[#022147]
      hover:shadow-xl
    "
  >
    {/* HOVER BG */}
    <span
      className="
        absolute
        inset-0
        origin-left
        scale-x-0
        bg-[#022147]
        transition-transform
        duration-500
        group-hover:scale-x-100
      "
    />

    <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-white">
      Browse All Sermons
      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </span>
  </motion.button>
</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}