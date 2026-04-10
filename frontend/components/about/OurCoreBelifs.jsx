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
        <div className="bg-red-600 h-1 w-24 rounded-full" />
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {beliefs.map((item, index) => (
          <motion.div
            key={item.title}
            className="w-full h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Card title={item.title} text={item.text} icon={item.icon} />
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
      className="bg-white rounded-2xl p-8 flex flex-col items-center gap-6 h-full shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex justify-center items-center text-red-600 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-serif font-bold text-gray-900 text-center">{title}</h3>
      <p className="text-center text-gray-600 leading-relaxed font-sans text-base">{text}</p>
    </motion.div>
  );
};

const beliefs = [
  {
    title: "Scripture",
    icon: <BookOpenCheck size={32} strokeWidth={1.5} />,
    text: "The Bible is God's Word, divinely inspired, infallible, and without error. It is the ultimate authority for our faith, life, and decisions. “All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.” – 2 Timothy 3:16",
  },
  {
    title: "Salvation",
    icon: <span className="text-4xl font-serif font-bold leading-none -mt-2">✝</span>,
    text: "Salvation comes through faith in Jesus Christ alone. His death on the cross and resurrection bring forgiveness of sins and eternal life to all who believe. “For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.” – Ephesians 2:8",
  },
  {
    title: "Holy Spirit",
    icon: <Flame size={32} strokeWidth={1.5} />,
    text: "The Holy Spirit, who lives in every believer. He empowers us to live holy lives, reveals spiritual truths, and equips us with gifts for service and ministry. “But you will receive power when the Holy Spirit comes on you.” – Acts 1:8",
  },
  {
    title: "The Church",
    icon: <Church size={32} strokeWidth={1.5} />,
    text: "Church is the body of Christ, united to worship God, nurture believers, and reach the world with the Gospel. Every member has a role in building God’s Kingdom. “Now you are the body of Christ, and each one of you is a part of it.” – 1 Corinthians 12:27",
  },
  {
    title: "Service",
    icon: <HelpingHand size={32} strokeWidth={1.5} />,
    text: "Every Christian is called to serve others with love, humility, and compassion—just as Jesus served. Serving is not a duty, but an act of worship and love. “Each of you should use whatever gift you have received to serve others.” – 1 Peter 4:10",
  },
  {
    title: "Mission",
    icon: <Globe size={32} strokeWidth={1.5} />,
    text: "Our purpose is to share the Good News of Jesus Christ locally and globally—bringing light into dark places and hope to the lost. “Go into all the world and preach the gospel to all creation.” – Mark 16:15",
  },
];
