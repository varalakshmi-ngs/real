"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Church,
  Flame,
  Globe,
  HelpingHand,
} from "lucide-react";

const OurCoreBeliefs = () => {
  return (
    <section className="bg-gray-50 w-full px-6 sm:px-12 py-20 flex flex-col items-center overflow-hidden">
      
      {/* Heading */}
      <motion.div
        className="flex flex-col items-center gap-4 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 bg-white px-8 py-3 rounded-xl shadow-sm border border-gray-100">
          Our Core <span className="text-red-600">Beliefs</span>
        </h2>

        <motion.div
          className="bg-red-600 h-1 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Cards */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {beliefs.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Card
              title={item.title}
              text={item.text}
              icon={item.icon}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurCoreBeliefs;

const Card = ({ title, text, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="
        group
        relative
        w-full
        min-h-[420px]
        rounded-[28px]
        overflow-hidden
        bg-white
        border
        border-red-200
        shadow-sm
      "
    >
      {/* Hover Expanding Background */}
      <div
        className="
          absolute
          top-[-30px]
          right-[-30px]
          h-24
          w-24
          rounded-full
          bg-gradient-to-br
          from-red-500 via-red-600 to-red-700
          transition-all
          duration-500
          scale-100
          group-hover:scale-[18]
          z-0
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          h-full
          p-8
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
          className="
            w-20
            h-20
            rounded-2xl
            bg-red-50
            border
            border-red-100
            flex
            items-center
            justify-center
            text-red-600
            shadow-sm
            mb-6
            transition-all
            duration-500
            group-hover:bg-white/10
            group-hover:text-white
            group-hover:border-white/20
          "
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3
          className="
            text-3xl
            font-serif
            font-bold
            text-[#07182E]
            mb-5
            transition-all
            duration-500
            group-hover:text-white
          "
        >
          {title}
        </h3>

        {/* Text */}
        <p
          className="
            text-gray-600
            leading-relaxed
            text-[17px]
            transition-all
            duration-500
            group-hover:text-white/90
          "
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
};
const beliefs = [
  {
    title: "Scripture",
    icon: <BookOpenCheck size={34} strokeWidth={1.5} />,
    text: "The Bible is God's Word, divinely inspired, infallible, and without error. It is the ultimate authority for our faith, life, and decisions.",
  },
  {
    title: "Salvation",
    icon: (
      <span className="text-4xl font-serif font-bold leading-none -mt-2">
        ✝
      </span>
    ),
    text: "Salvation comes through faith in Jesus Christ alone. His death and resurrection bring forgiveness of sins and eternal life.",
  },
  {
    title: "Holy Spirit",
    icon: <Flame size={34} strokeWidth={1.5} />,
    text: "The Holy Spirit empowers believers to live holy lives, reveals spiritual truths, and equips us for ministry and service.",
  },
  {
    title: "The Church",
    icon: <Church size={34} strokeWidth={1.5} />,
    text: "The Church is the body of Christ, united to worship God, nurture believers, and reach the world with the Gospel.",
  },
  {
    title: "Service",
    icon: <HelpingHand size={34} strokeWidth={1.5} />,
    text: "Every Christian is called to serve others with love, humility, and compassion—just as Jesus served.",
  },
  {
    title: "Mission",
    icon: <Globe size={34} strokeWidth={1.5} />,
    text: "Our mission is to share the Good News of Jesus Christ locally and globally, bringing hope and light to the world.",
  },
];