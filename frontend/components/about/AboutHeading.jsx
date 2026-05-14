import React from "react";
import { motion } from "framer-motion";

const AboutHeading = ({ data }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full flex flex-col justify-center items-center px-6 sm:px-12 pt-4 pb-10 md:pt-6 md:pb-14 bg-gradient-to-br from-white via-red-50/30 to-white overflow-hidden relative"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-red-200/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-300/10 rounded-full blur-3xl"></div>

      {/* HEADING */}
      {/* <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-center mb-5 leading-tight"
      >
        {data?.title?.split(" ")?.map((e, index) => {
          return (
            <span
              key={index}
              className={`${
                index !== 0
                  ? "text-red-600"
                  : "text-[#022147]"
              }`}
            >
              {e}{" "}
            </span>
          );
        })}
      </motion.h1> */}

     
    </motion.article>
  );
};

export default AboutHeading;