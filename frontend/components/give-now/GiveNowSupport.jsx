"use client";

import React from "react";
import { motion } from "framer-motion";

const HighlightLastWord = ({ text, className }) => {
  const words = text.trim().split(" ");
  const lastWord = words.pop();
  return (
    <h3 className={className}>
      {words.join(" ")} <span className="text-red-500">{lastWord}</span>
    </h3>
  );
};

const GiveNowSupport = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section id="support" className="bg-gray-900 min-h-screen py-20 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col items-center md:items-start mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white text-4xl sm:text-5xl font-serif font-bold mb-4 text-center md:text-left">
            Why Your Support <span className="text-red-500">Matters</span>
          </h2>
          <div className="h-1 bg-red-600 w-32 rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          <motion.div 
            className="flex-1 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                title: "Community Outreach",
                text: "At Real Temple Church, every gift has purpose. Your faithful giving enables us to carry the light of Christ far and wide—touching lives, restoring hope, and building the Kingdom of God."
              },
              {
                title: "Global Missions",
                text: "Support our missionaries as they build schools, dig wells, and share the Gospel across 12 nations. Every mission trip changes lives—both for those who go and those who receive. “Go into all the world and preach the gospel to all creation.” – Mark 16:15"
              },
              {
                title: "Church Growth",
                text: "Your support allows us to expand our ministries, maintain church facilities, and create life-changing worship experiences. You are helping others grow deeper in faith. “On this rock I will build my church...” – Matthew 16:18"
              }
            ].map((section, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center gap-6 mb-4">
                  <div className="bg-red-500/20 p-4 rounded-2xl shrink-0">
                    <img src="/images/bible-icon.png" alt="icon" className="w-8 h-8 filter brightness-200" />
                  </div>
                  <HighlightLastWord 
                    text={section.title} 
                    className="text-2xl font-serif font-bold text-white tracking-wide" 
                  />
                </div>
                <p className="text-gray-300 leading-relaxed font-sans text-lg lg:pl-22">
                  {section.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-3xl -rotate-6 scale-95 blur-xl -z-10" />
            <img
              src="/images/give-now-support.png"
              alt="Support Matters"
              className="w-full max-w-lg lg:max-w-none h-auto object-cover rounded-3xl shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiveNowSupport;
