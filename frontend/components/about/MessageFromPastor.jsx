import React from "react";
import { motion } from "framer-motion";
import { APIURL } from "@/Core/rl";

export default function MessageFromPastor({ data }) {
  const pastorName = data?.pasterName || data?.pastorName || "Pastor";
  const description = data?.description || data?.pastorDescription || "";
  const imageSrc = data?.image ? `${APIURL}/${data.image}` : "/images/about-first-image.png";

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  return (
    <section
      id="pastor-message"
      className="bg-second px-4 sm:px-8 py-12 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left Column - Image with Slide-in from Left */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <img
            src={imageSrc}
            alt={pastorName}
            className="rounded-xl max-h-[auto] h-auto w-full object-cover object-top shadow-lg"
          />
        </motion.div>

        {/* Right Column - Content with Slide-in from Right */}
        <motion.div
          className="w-full md:w-1/2 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="text-right">
            <h2 className="text-3xl font-serif bg-white inline-block px-3 py-1">
              {pastorName.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={index === 0 ? "text-second" : "text-main"}
                >
                  {word}{" "}
                </span>
              ))}
            </h2>
            <div className="h-1 bg-white mt-2 w-full" />
          </div>

          <div className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
            {description}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
