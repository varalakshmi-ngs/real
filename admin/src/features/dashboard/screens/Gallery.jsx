import React, { useEffect, useState } from "react";
import RecentPhotos from "../components/GalleryPageComponents/RecentPhotos";
import GalleryCategory from "../components/GalleryPageComponents/GalleryCategory";
import GalleryPhotos from "../components/GalleryPageComponents/GalleryPhotos";
import { apiRequest } from "../../../services/ApiCalls";
import { motion } from "framer-motion";

export default function Gallery() {
  const [data, setData] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const refreshData = async () => {
    const { data } = await apiRequest({
      method: "get",
      url: "/gallery/",
    });

    if (data) {
      setData(data?.categories);
      setRecentImages(data?.images);
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
      className="flex flex-col gap-8 pb-12"
    >
      <motion.div variants={itemVariants}>
        <RecentPhotos images={recentImages} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <GalleryPhotos />
      </motion.div>
    </motion.div>
  );
}
