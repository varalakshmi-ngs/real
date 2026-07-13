"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ImageComponent = ({
  imageUrl,
  className = "h-[600px] w-full",
  objectFit = "object-contain sm:object-cover",
  bgClass = "bg-[#111]",
  alt = "Dynamic image",
}) => {

  // LOADING UI
  if (!imageUrl || imageUrl.trim() === "") {
    return (
      <div
        className={`
          ${className}
          bg-gray-200
          animate-pulse
          rounded-lg
        `}
      />
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${bgClass} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={`${objectFit} object-center`}
      />
    </motion.div>
  );
};

export default ImageComponent;