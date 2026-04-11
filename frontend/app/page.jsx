"use client";
import JesusFooterImage from "@/components/about/JesusFooterImage";
import ChurchTimings from "@/components/HomeComponents/ChurchTimings";
import Home_ChurchGallery from "@/components/HomeComponents/Home_ChurchGallery";
import Home_Events from "@/components/HomeComponents/Home_Events";
import Home_HeroSection from "@/components/HomeComponents/Home_HeroSection";
import Home_Pastor_Info from "@/components/HomeComponents/Home_Pastor_Info";
import Home_Support_Mission from "@/components/HomeComponents/Home_Support_Mission";
import Home_VideoList from "@/components/HomeComponents/Home_VideoList";
import LiveNotification from "@/components/HomeComponents/LiveNotification";

import { useHomeDataHook } from "@/Hooks/HomeDataHook";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const MagazineCarousel = dynamic(
  () => import("@/components/HomeComponents/Magzinecomponent"),
  {
    ssr: false,
    loading: () => <div className="flex justify-center py-8"><ClipLoader color="red" /></div>,
  }
);

export default function HomePage() {
  const { data, loading, error, magazine, ytLink, navToYoutube } =
    useHomeDataHook();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center py-10">
        <ClipLoader color="red" size={50} />
      </div>
    );
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">Failed to load home page data.</div>;
  }

  const staggeredContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="overflow-hidden">
      {ytLink && (
        <div className="relative w-full">
          <div className="absolute top-24 right-0 px-6 sm:px-12 z-30">
            <LiveNotification onClick={navToYoutube} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Home_HeroSection data={data?.hero} />

      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* About Pastor */}
        <motion.div variants={sectionVariant}>
          <Home_Pastor_Info data={data?.pasterIntro} />
        </motion.div>

        {/* Watch Message (From the About Page, Fields has to take from the Admin panel) -- Only last updated 4 */}
        <motion.div variants={sectionVariant}>
          <Home_VideoList data={data?.videos?.slice(0, 4)} />
        </motion.div>

        {/* Magazines -- Only last updated 4 */}
        {(magazine ?? []).length > 0 && (
          <motion.div variants={sectionVariant}>
            <MagazineCarousel data={(magazine ?? []).slice(0, 4)} />
          </motion.div>
        )}

        {/* Events -- Only last updated 2 display in home */}
        <motion.div variants={sectionVariant}>
          <Home_Events limit={2} />
        </motion.div>

        <motion.div variants={sectionVariant}>
          <ChurchTimings />
        </motion.div>


        {/* Gallery --- some images Last updated 5 only */}
        <motion.div variants={sectionVariant}>
          <Home_ChurchGallery limit={5} />
        </motion.div>

        {/* Timings */}
        {/* <motion.div variants={sectionVariant}>
          <ChurchTimings />
        </motion.div> */}

        {/* Support Section */}
        <motion.div variants={sectionVariant}>
          <Home_Support_Mission />
        </motion.div>
      </motion.div>
    </main>
  );
}
