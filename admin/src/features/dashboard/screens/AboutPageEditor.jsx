import HeroForm from "../components/AboutPageComponents/HeroForm";
import PastorEditSection from "../components/AboutPageComponents/PastorEditSection";
import AddTeamMember from "../components/AboutPageComponents/AddTeamMember";
import SocialLinksForm from "../components/AboutPageComponents/SocialLinksForm";
import { Select } from "../../../components/UI/Form";
import { apiRequest } from "../../../services/ApiCalls";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutPageEditor() {
  const [data, setData] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");

  const sections = [
    { value: "hero", label: "Hero Section" },
    { value: "pastorMessage", label: "Pastor Message" },
    { value: "team", label: "Team Members" },
    { value: "socialLinks", label: "Social Links" },
  ];

  const refreshData = async () => {
    const { data } = await apiRequest({
      method: "get",
      url: "/about/",
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
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">About Page Section Editor</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Choose a section below to edit its content and colors.</p>
          </div>
          <div className="w-full max-w-sm">
            <Select
              options={sections}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              placeholder="Choose an about section"
              className="bg-white"
            />
          </div>
        </div>
      </motion.div>

      {!selectedSection ? (
        <motion.div variants={itemVariants} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Select a section first</h3>
          <p className="text-sm text-slate-600">Pick the section from the dropdown above to edit that content.</p>
        </motion.div>
      ) : (
        <>
          {selectedSection === "hero" && (
            <motion.div variants={itemVariants}>
              <HeroForm data={data?.hero} refreshData={refreshData} />
            </motion.div>
          )}
          {selectedSection === "pastorMessage" && (
            <motion.div variants={itemVariants}>
              <PastorEditSection data={data?.pastarmessage} refreshData={refreshData} />
            </motion.div>
          )}
          {selectedSection === "team" && (
            <motion.div variants={itemVariants}>
              <AddTeamMember data={data?.teamMembers} refreshData={refreshData} />
            </motion.div>
          )}
          {selectedSection === "socialLinks" && (
            <motion.div variants={itemVariants}>
              <SocialLinksForm />
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
