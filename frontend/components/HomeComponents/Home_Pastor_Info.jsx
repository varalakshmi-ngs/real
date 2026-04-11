import React from "react";
import { motion } from "framer-motion";
import { APIURL } from "@/Core/rl";

export default function Home_Pastor_Info({ data }) {
  const pastorName = data?.pasterName || data?.pastorName || "Pastor";
  const description = data?.description || data?.pastorDescription || "We are delighted to have you with us at Real Temple. Our community welcomes everyone, and we are excited to walk alongside you in your faith journey.";
  const imageSrc = data?.image ? `${APIURL}/${data.image}` : "/homeimages/church-hero.png";

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
      id="pastor"
      className="bg-second px-4 sm:px-8 py-10 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
        >
          <img
            src={imageSrc}
            alt={pastorName}
            className="rounded-xl max-h-[auto] h-auto w-full object-cover shadow-lg"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 space-y-4"
          initial="hidden"
          whileInView="visible"
          variants={textVariants}
        >
          <div className="text-right">
            <h2 className="text-3xl font-serif bg-white inline-block px-3 py-1">
              {pastorName.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={index === 0 ? "text-second" : "text-main"}
                >
                  {word} 
                </span>
              ))}
            </h2>
            <div className="h-1 bg-white mt-2 w-full" />
          </div>

          <div className="text-white text-sm sm:text-base leading-tight whitespace-pre-wrap font-sans">
            {description}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
