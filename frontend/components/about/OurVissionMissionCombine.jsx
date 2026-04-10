import React from "react";
import { motion } from "framer-motion";

const OurVissionMissionCombine = () => {
  return (
    <section className="w-full px-6 sm:px-12 py-16 bg-white flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col gap-16">
        <ReUseOurVision
          title="Our Vision"
          firstPara="Under his leadership, Real Temple Church has become a growing spiritual home for believers across Hyderabad. His vision is to build a Spirit-led, Bible-based church where people experience genuine worship, real community, and supernatural encounters with God."
          secondPara="Through outreach programs, worship events, online ministry, and personal counseling, Pastor Suresh ensures that the church is not just a building, but a living, breathing expression of God's love."
        />
        <ReUseOurVision
          title="Our Mission"
          firstPara="Real Temple Church, our mission is to glorify God by making disciples, healing broken lives, and spreading the message of Jesus Christ to Hyderabad and the world. We are committed to being a true temple church that lives out the Word of God in spirit, truth, and love."
          secondPara="“You are the light of the world. A city on a hill cannot be hidden.” – Matthew 5:14"
        />
      </div>
    </section>
  );
};

export default OurVissionMissionCombine;

const ReUseOurVision = ({ title, firstPara, secondPara }) => {
  return (
    <motion.div 
      className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="bg-gray-900 p-6 sm:p-8 flex items-center shrink-0">
        <h3 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
          {title}
        </h3>
      </div>
      <div className="h-1 w-full bg-red-600" />
      <div className="p-6 sm:p-10 flex flex-col gap-6">
        <p className="text-gray-700 leading-relaxed text-lg font-sans">
          {firstPara}
        </p>
        <p className="text-gray-700 leading-relaxed text-lg font-sans italic border-l-4 border-red-500 pl-4 bg-red-50/50 py-2 rounded-r-md">
          {secondPara}
        </p>
      </div>
    </motion.div>
  );
};
