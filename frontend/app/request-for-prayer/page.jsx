"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Home_Download_App from "@/components/HomeComponents/Home_Download_App";
import RequestForPlayerHeading from "@/components/request-for-prayer/RequestForPlayerHeading";
import RequestPrayerTable from "@/components/request-for-prayer/RequestPrayerTable";
import PrayerCard from "@/components/request-for-prayer/PrayerCard";
import ReuestPrayerForm from "@/components/request-for-prayer/ReuestPrayerForm";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const prayerTopics1 = [
  { title: "For Job", key: "Job", image: "/prayers/job.jpg" },
  { title: "For Family", key: "Family", image: "/prayers/family.jpg" },
  { title: "For Exams", key: "Exams", image: "/prayers/exams.jpg" },
  { title: "For Financial Problems", key: "Finance", image: "/prayers/finance.jpg" },
  { title: "For Marriage", key: "Marriage", image: "/prayers/marriage.jpg" },
  { title: "For Business", key: "Business", image: "/prayers/business.jpg" },
  { title: "For Health", key: "Health", image: "/prayers/health.jpg" },
  { title: "For Spiritual Life", key: "Spiritual", image: "/prayers/spiritual.jpg" },
  { title: "For Children", key: "Children", image: "/prayers/children.jpg" },
  { title: "For Emergency", key: "emergency", image: "/prayers/emergency.jpg" },
];

const page = () => {
  const [prayer, setPrayer] = useState({ title: "For Job", key: "Job" });
  const [showPrayer, setShowPrayer] = useState(true);
  return (
    <div className="w-full flex flex-col gap-8 bg-white mt-[100px]">
      {showPrayer ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 px-10">
          {prayerTopics1.map((item, index) => (
            <PrayerCard
              key={index}
              link={() => {
                setPrayer(item); // set selected prayer
                setShowPrayer(false); // hide cards and show form
              }}
              title={item.title}
              subtitle={item.key}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <motion.div
          key={prayer.key}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center px-5"
        >
          <button
            onClick={() => setShowPrayer(!showPrayer)}
            
            className="mt-5 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            🔙 Back to Prayer Topics
          </button>
          <ReuestPrayerForm title={prayer.title} />
        </motion.div>
      )}

      {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        <RequestPrayerTable />
      </motion.div> */}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
      >
        {/* <Home_Download_App /> */}
      </motion.div>
    </div>
  );
};

export default page;
