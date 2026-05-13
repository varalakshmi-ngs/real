"use client";

import React from "react";
import { motion } from "framer-motion";

const HighlightLastWord = ({ text, className }) => {
  const words = text.trim().split(" ");
  const lastWord = words.pop();

  return (
    <h3 className={className}>
      {words.join(" ")}{" "}
      <span className="text-red-500">{lastWord}</span>
    </h3>
  );
};

const GiveNowSupport = () => {
  const sections = [
    {
      title: "Community Outreach",
      text: "At Real Temple Church, every gift has purpose. Your faithful giving enables us to carry the light of Christ far and wide—touching lives, restoring hope, and building the Kingdom of God.",
    },
    {
      title: "Global Missions",
      text: "Support our missionaries as they build schools, dig wells, and share the Gospel across 12 nations. Every mission trip changes lives—both for those who go and those who receive.",
    },
    {
      title: "Church Growth",
      text: "Your support allows us to expand our ministries, maintain church facilities, and create life-changing worship experiences. You are helping others grow deeper in faith.",
    },
  ];

  return (
    <section
      id="support"
      className="relative overflow-hidden bg-[#06101f] py-24 px-6 sm:px-12"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 bg-red-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-red-500/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center md:items-start mb-16"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-center md:text-left leading-tight">
            Why Your Support{" "}
            <span className="text-red-500">Matters</span>
          </h2>

          <motion.div
            className="mt-5 h-1 rounded-full bg-red-500"
            initial={{ width: 0 }}
            whileInView={{ width: "9rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-14 items-stretch">
          
          {/* LEFT CARDS */}
          <div className="flex-1 flex flex-col gap-7">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-md
                  p-8
                  shadow-xl
                "
                initial={{
                  opacity: 0,
                  y: 80,
                  rotateX: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-transparent group-hover:to-red-500/5 transition-all duration-700" />

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-[30px] border border-transparent group-hover:border-red-400/20 transition-all duration-500" />

                {/* Shine Sweep */}
                <div className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[140%] transition-all duration-1000" />

                <div className="relative z-10">
                  
                  {/* Top */}
                  <div className="flex items-center gap-5 mb-5">
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: -8,
                        scale: 1.08,
                      }}
                      transition={{ duration: 0.3 }}
                      className="
                        bg-red-500/20
                        p-4
                        rounded-2xl
                        shrink-0
                        shadow-lg
                        shadow-red-500/10
                      "
                    >
                      <img
                        src="/images/bible-icon.png"
                        alt="icon"
                        className="w-8 h-8 filter brightness-200"
                      />
                    </motion.div>

                    {/* Title */}
                    <HighlightLastWord
                      text={section.title}
                      className="
                        text-2xl
                        lg:text-3xl
                        font-serif
                        font-bold
                        text-white
                        tracking-wide
                      "
                    />
                  </div>

                  {/* Text */}
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {section.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="flex-1 flex justify-center items-center relative"
            initial={{
              opacity: 0,
              scale: 0.9,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.1,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-[40px] blur-3xl scale-95 -z-10" />

            {/* Image Wrapper */}
            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{ duration: 0.4 }}
              className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-white/10
                shadow-2xl
              "
            >
              <motion.img
                src="/images/give-now-support.png"
                alt="Support Matters"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.06 }}
                className="
                  w-full
                  max-w-lg
                  lg:max-w-none
                  h-auto
                  object-cover
                  transition-transform
                  duration-700
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

              {/* Floating Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1,
                  duration: 0.8,
                }}
                className="absolute bottom-8 left-8 text-white"
              >
                <h3 className="text-3xl font-serif font-bold">
                  Faith In Action
                </h3>

                <p className="mt-2 text-white/80 max-w-sm">
                  Every contribution creates hope and transforms lives.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiveNowSupport;