import HeroForm from "../components/HomePageComponents/HeroSectionForm";
import PastorIntro from "../components/HomePageComponents/PastorIntro";
import VideosSection from "../components/HomePageComponents/VideosSection";
import JoinWeekend from "../components/HomePageComponents/JoinWeekend";
import ChruchServices from "../components/HomePageComponents/ChruchServices";
import LastMessage from "../components/HomePageComponents/LastMessage";

import { Select } from "../../../components/UI/Form";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/ApiCalls";
import { motion } from "framer-motion";

export default function HomepageEditor() {
  const [data, setData] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");

  const sections = [
    { value: "hero", label: "Hero Section" },
    { value: "pastorIntro", label: "Pastor Intro" },
    { value: "videos", label: "Video Section" },
    { value: "churchServices", label: "Weekly Service Timings" },
    { value: "latestMessage", label: "Latest Message" },
  ];

  const refreshData = async () => {
    const { data } = await apiRequest({
      method: "get",
      url: "/home/",
    });

    if (data) {
      setData(data._doc);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 sm:space-y-8 pb-12 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl"
    >
      <motion.div variants={itemVariants} className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Homepage Section Editor</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Select a section to edit its content and colors.</p>
          </div>
          <div className="w-full max-w-sm">
            <Select
              options={sections}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              placeholder="Choose a homepage section"
              className="bg-white"
            />
          </div>
        </div>
      </motion.div>

      {!selectedSection ? (
        <motion.div variants={itemVariants} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Select a section first</h3>
          <p className="text-sm text-slate-600">Choose a section from the dropdown above to edit only that area.</p>
        </motion.div>
      ) : (
        <>
          {selectedSection === "hero" && (
            <motion.div variants={itemVariants}>
              <HeroForm data={data?.hero} />
            </motion.div>
          )}
          {selectedSection === "pastorIntro" && (
            <motion.div variants={itemVariants}>
              <PastorIntro data={data?.pasterIntro} />
            </motion.div>
          )}
          {selectedSection === "videos" && (
            <motion.div variants={itemVariants}>
              <VideosSection data={data?.videos} refreshData={refreshData} />
            </motion.div>
          )}

          {selectedSection === "churchServices" && (
            <motion.div variants={itemVariants}>
              <ChruchServices refreshData={refreshData} />
            </motion.div>
          )}
          {selectedSection === "latestMessage" && (
            <motion.div variants={itemVariants}>
              <LastMessage data={data?.latestMessage} refreshData={refreshData} />
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
