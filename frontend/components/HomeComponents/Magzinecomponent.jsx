"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  X,
  ChevronLeft,
} from "lucide-react";

const magazines = [
  {
    title: "Real Way",
    date: "13 May 2026",
    category: "MAGAZINES",
    pdf: "/magazines/real-way.pdf",
  },

  {
    title: "Real Festival",
    date: "13 May 2026",
    category: "MAGAZINES",
    pdf: "/magazines/real-festival.pdf",
  },
];

const Page = () => {
  const [selectedPdf, setSelectedPdf] =
    useState(null);

  const [selectedTitle, setSelectedTitle] =
    useState("");

  return (
    <>
      <motion.div
        className="min-h-screen w-full bg-[#f3f4f6]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        {/* HERO SECTION */}

        <section className="w-full bg-white border-b border-gray-200 py-16 px-6 sm:px-12">

          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl font-serif font-bold text-[#07142b]"
            >
              Our{" "}
              <span className="text-red-600">
                Magazines
              </span>
            </motion.h1>

            <div className="mt-4 h-1 w-24 rounded-full bg-red-600" />

            <p className="mt-6 max-w-3xl text-lg text-gray-600 leading-relaxed">
              Sermons, devotionals, and inspiring
              updates from The Real Temple
              community.
            </p>

          </div>
        </section>

        {/* MAGAZINES SECTION */}

        <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20">

          {/* TITLE */}

          <div className="flex flex-col items-center mb-14">

            <h2 className="text-4xl font-bold text-[#07142b]">
              Latest{" "}
              <span className="text-red-600">
                Magazines
              </span>
            </h2>

            <div className="mt-3 h-1 w-20 rounded-full bg-red-600" />

          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {magazines.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  bg-white
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-500
                "
              >

                {/* PDF PREVIEW */}

                <div
                  onClick={() => {
                    setSelectedPdf(item.pdf);
                    setSelectedTitle(item.title);
                  }}
                  className="
                    relative
                    h-[320px]
                    overflow-hidden
                    cursor-pointer
                    bg-[#ececec]
                    rounded-t-xl
                    flex
                    items-center
                    justify-center
                  "
                >

                  {/* PDF */}

                  <div className="absolute inset-0 overflow-hidden">

                    <iframe
                      src={`${item.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={item.title}
                      scrolling="no"
                      className="
                        absolute
                        top-[-80px]
                        left-[-18px]
                        w-[calc(100%+36px)]
                        h-[calc(100%+240px)]
                        pointer-events-none
                        scale-[0.88]
                        group-hover:scale-[0.93]
                        transition-transform
                        duration-700
                        ease-out
                        origin-top
                      "
                      style={{
                        border: "none",
                        overflow: "hidden",
                      }}
                    />
                  </div>

                  {/* CATEGORY */}

                  <div className="
                    absolute
                    left-4
                    top-4
                    bg-red-600
                    text-white
                    text-xs
                    font-bold
                    uppercase
                    px-4
                    py-2
                    rounded-full
                    shadow-lg
                  ">
                    {item.category}
                  </div>

                  {/* OVERLAY */}

                  <div className="
                    absolute
                    inset-0
                    bg-black/5
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                  " />
                </div>

                {/* CONTENT */}

                <div className="p-6">

                  {/* TITLE */}

                  <h2 className="
                    text-2xl
                    font-bold
                    text-[#07142b]
                    group-hover:text-red-600
                    transition-colors
                    duration-300
                  ">
                    {item.title}
                  </h2>

                  {/* DATE + READ NOW */}

                  <div className="
                    mt-5
                    flex
                    items-center
                    justify-between
                  ">

                    {/* DATE */}

                    <div className="
                      flex
                      items-center
                      gap-2
                      text-gray-500
                    ">
                      <CalendarDays size={16} />

                      <p className="text-sm font-medium">
                        {item.date}
                      </p>
                    </div>

                    {/* READ NOW */}

                    <button
                      onClick={() => {
                        setSelectedPdf(item.pdf);
                        setSelectedTitle(item.title);
                      }}
                      className="
                        group/read
                        flex
                        items-center
                        gap-2
                        bg-red-600
                        hover:bg-[#07142b]
                        text-white
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        shadow-md
                        hover:shadow-xl
                        transition-all
                        duration-300
                        hover:scale-105
                      "
                    >

                      Read Now

                      <ArrowRight
                        size={16}
                        className="
                          transition-transform
                          duration-300
                          group-hover/read:translate-x-1
                        "
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* FULL PDF VIEWER */}

      <AnimatePresence>

        {selectedPdf && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[999]
              bg-[#f1f1f1]
            "
          >

            {/* TOP BAR */}

            <div className="
              h-[90px]
              bg-[#1557ff]
              flex
              items-center
              justify-between
              px-6
              sm:px-10
              shadow-lg
            ">

              {/* LEFT */}

              <div className="flex items-center gap-6">

                <button
                  onClick={() =>
                    setSelectedPdf(null)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    text-white
                    font-semibold
                  "
                >

                  <ChevronLeft size={24} />

                  <span className="text-lg">
                    Home
                  </span>
                </button>

                {/* TITLE */}

                <div
                  className="
                    hidden
                    sm:flex
                    flex-col
                    bg-white/10
                    p-4
                  "
                  style={{
                    borderRadius: "30px",
                  }}
                >

                  <h2 className="
                    text-white
                    text-2xl
                    font-bold
                  ">
                    {selectedTitle}
                  </h2>

                  <p className="
                    text-red-200
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                  ">
                    MAGAZINES
                  </p>
                </div>
              </div>
            </div>

            {/* PDF VIEW */}

            <div className="
              w-full
              h-[calc(100vh-90px)]
              overflow-auto
              bg-[#dfe1e5]
              flex
              justify-center
              py-10
            ">

              <div className="
                w-full
                max-w-6xl
                bg-white
                shadow-2xl
              ">

                <iframe
                  src={selectedPdf}
                  title="Magazine PDF"
                  className="w-full h-[95vh]"
                  style={{
                    border: "none",
                  }}
                />
              </div>
            </div>

            {/* CLOSE BUTTON */}

            <button
              onClick={() =>
                setSelectedPdf(null)
              }
              className="
                fixed
                top-28
                right-34
                z-[1000]
                bg-white
                rounded-full
                p-3
                shadow-xl
                hover:scale-110
                transition
              "
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Page;