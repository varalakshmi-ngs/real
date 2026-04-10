"use client";
import React from "react";
import { motion } from "framer-motion";

const OurHistory = () => {
  return (
    <section className="bg-gradient-to-br from-red-700 to-red-900 w-full flex flex-col items-center gap-12 px-6 sm:px-12 py-20 overflow-hidden">
      <motion.div 
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 bg-white px-8 py-3 rounded-xl shadow-lg">
          Our <span className="text-red-600">History</span>
        </h2>
        <div className="bg-white/50 h-1 w-32 rounded-full" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl items-stretch">
        <div className="flex flex-col gap-12 flex-1">
          <ImageWithText
            image="/images/our-history-first.png"
            text="The Real Temple Church began with a simple prayer, a bold vision, and a heart for the people of Hyderabad. What started as a small gathering of faithful believers has now become a thriving Christian temple church, rooted in the Word of God and the power of the Holy Spirit."
            quote="“Do not despise these small beginnings, for the Lord rejoices to see the work begin.” – Zechariah 4:10"
            delay={0.2}
          />
          <ImageWithText
            image="/images/our-history-second.png"
            text="The seeds of Real Temple Church were planted when Pastor Suresh, moved by the call of God, dedicated his life to full-time ministry. With no grand building and only a few chairs, the first services were held in a humble location—driven by one mission: to lead souls to Christ and build a church based on truth, love, and worship."
            delay={0.4}
          />
        </div>

        <ImageWithText
          image="/images/our-hsitory-third.png"
          text="Through prayer and fasting, God confirmed the vision of building a “Real Temple” — not just of stone, but of living hearts filled with the Holy Spirit. As people began to hear about the church's Spirit-filled services, Bible-based teachings, and miracles of healing and deliverance, the congregation began to grow. Week after week, families came not just for tradition, but to experience the living God."
          direction="column"
          width="w-full lg:w-[400px]"
          delay={0.6}
        />
      </div>
    </section>
  );
};

export default OurHistory;

const ImageWithText = ({
  text,
  image,
  direction = "row",
  width = "w-full",
  quote,
  delay = 0
}) => {
  return (
    <motion.div
      className={`flex ${
        direction === "row" ? "flex-col md:flex-row" : "flex-col"
      } items-center gap-6 ${width} bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/10`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <div className={`${direction === "row" ? "w-full md:w-1/2 shrink-0" : "w-full"} overflow-hidden rounded-xl`}>
        <img
          alt="Our history image"
          src={image}
          className={`w-full ${direction === "row" ? "h-[200px]" : "h-[250px]"} object-cover transition-transform duration-700 hover:scale-110`}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-base sm:text-lg font-sans text-white/90 leading-relaxed">
          {text}
        </p>
        {quote && (
          <p className="text-base sm:text-lg font-sans text-white font-medium italic border-l-4 border-white/30 pl-4 py-1">
            {quote}
          </p>
        )}
      </div>
    </motion.div>
  );
};
