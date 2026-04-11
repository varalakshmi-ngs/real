"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AboutHeading from "@/components/about/AboutHeading";
import JesusFooterImage from "@/components/about/JesusFooterImage";
import Home_VideoList from "@/components/HomeComponents/Home_VideoList";
import OurCoreBelifs from "@/components/about/OurCoreBelifs";
import OurHistory from "@/components/about/OurHistory";
import OurLeaders from "@/components/about/OurLeaders";
import OurVissionMissionCombine from "@/components/about/OurVissionMissionCombine";
import Home_Pastor_Info from "@/components/HomeComponents/Home_Pastor_Info";
import ImageComponent from "@/components/UtilComponents/ImageComponent";
import { API, APIURL } from "@/Core/rl";
import { useHomeDataHook } from "@/Hooks/HomeDataHook";
import ChurchTimings from "@/components/HomeComponents/ChurchTimings";

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: homeData } = useHomeDataHook();

  const getdata = async () => {
    try {
      const response = await API.get("/about/");
      const result = response?.data?._doc || response?.data;
      setData(result);
    } catch (error) {
      console.log("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const staggeredContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Simple loading UI
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col bg-white overflow-hidden">
      
      {/* Hero Heading */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={sectionVariant}
        viewport={{ once: true, amount: 0.1 }}
      >
        <AboutHeading data={data?.hero || {}} />
      </motion.div>

      {/* Hero Image (ONLY if exists) */}
      {data?.hero?.image && (
        <motion.div
          className="w-full px-4 sm:px-12 pb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <ImageComponent
            imageUrl={`${APIURL}/${data.hero.image}`}
            className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-xl w-full max-w-7xl mx-auto object-cover"
          />
        </motion.div>
      )}

      <motion.div variants={sectionVariant}>
        <Home_Pastor_Info data={homeData?.pasterIntro || data?.pastarmessage} />
      </motion.div>

      {/* Other Sections */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col w-full"
      >
        <motion.div variants={sectionVariant}>
          <OurVissionMissionCombine />
        </motion.div>

        <motion.div variants={sectionVariant}>
          <Home_VideoList data={homeData?.videos || []} />
        </motion.div>

        <motion.div variants={sectionVariant}>
          <OurHistory />
        </motion.div>

        <motion.div variants={sectionVariant}>
          <ChurchTimings />
        </motion.div>

        <motion.div variants={sectionVariant}>
          <OurCoreBelifs />
        </motion.div>

        <motion.div variants={sectionVariant}>
          <OurLeaders data={data?.teamMembers || []} />
        </motion.div>

        {/* Optional Footer Image */}
        {/*
        <motion.div variants={sectionVariant}>
          <JesusFooterImage />
        </motion.div>
        */}
      </motion.div>
    </div>
  );
};

export default AboutPage;