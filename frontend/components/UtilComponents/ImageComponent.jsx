"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ImageComponent = ({ imageUrl, className = "h-[500px] w-full" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <Image
        src={imageUrl}
        alt="Dynamic image"
        fill
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
    </motion.div>
  );
};

export default ImageComponent;
