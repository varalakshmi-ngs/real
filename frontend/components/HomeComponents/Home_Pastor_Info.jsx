import React from "react";
import { motion } from "framer-motion";
import { APIURL } from "@/Core/rl";

export default function Home_Pastor_Info({ data }) {
  const paragraphs = [
    "Welcome to The Real Church! I am delighted that you have taken the time to learn more about our church family. Whether you're exploring faith for the first time or looking for a new spiritual home, I believe God has brought you here for a purpose.",
    "At The Real Church, we believe that every person matters to God and therefore matters to us. Our desire is to create a place where you can experience God's love, develop meaningful relationships, and discover your unique purpose.",
    "No matter your background or story, you are welcome here. We are excited to walk alongside you in your journey of faith.",
  ];

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
          // viewport={{ once: true }}
          variants={imageVariants}
        >
          <img
            src={data?.image ? `${APIURL}/${data.image}` : "/homeimages/church-hero.png"}
            alt="Pastor Michael Johnson"
            className="rounded-xl max-h-[auto] h-auto w-full object-cover shadow-lg"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 space-y-4"
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="text-right">
            <h2 className="text-3xl font-serif bg-white inline-block px-3 py-1">
              {data?.pasterName?.split(" ")?.map((e, index) => {
                return (
                  <span
                    key={index}
                    className={`${index === 0 ? "text-second" : "text-main"}`}
                  >
                    {e}{" "}
                  </span>
                );
              })}
            </h2>
            <div className="h-1 bg-white mt-2 w-full" />
          </div>

          <div className="text-white text-sm sm:text-base leading-tight whitespace-pre-wrap font-sans">
            {data?.description}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
