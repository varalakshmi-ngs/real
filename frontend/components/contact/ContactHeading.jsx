"use client";
import React from "react";
import { motion } from "framer-motion";

const ContactHeading = () => {
  return (
    <article className="w-full flex flex-col justify-center items-center py-16 md:py-24 px-6 sm:px-12 bg-gradient-to-b from-gray-50 to-white text-center border-b border-gray-100">
      <motion.div 
        className="max-w-3xl flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
          Contact <span className="text-red-600">Us</span>
        </h1>
        <div className="h-1 bg-red-600 w-24 rounded-full" />
        <p className="text-lg md:text-xl text-gray-600 font-sans leading-relaxed mt-4">
          We'd love to hear from you. Reach out to us with any questions, prayer requests, or if you'd like to join our community. Our doors and hearts are always open.
        </p>
      </motion.div>
    </article>
  );
};

export default ContactHeading;
