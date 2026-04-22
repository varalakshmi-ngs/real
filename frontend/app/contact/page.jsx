"use client";
import { motion } from "framer-motion";
import React from "react";
import AddComment from "@/components/contact/AddComment";
import AddressCard from "@/components/contact/AddressCard";
import ContactForm from "@/components/contact/ContactForm";
import ContactHeading from "@/components/contact/ContactHeading";
import FrequentAskQuestion from "@/components/contact/FrequentAskQuestion";
// import Home_Download_App from "@/components/HomeComponents/Home_Download_App";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const page = () => {
  return (
    <div className="w-full flex flex-col gap-8 bg-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
      >
        <ContactHeading />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        <ContactForm />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
      >
        <AddressCard />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
      >
        <FrequentAskQuestion />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
      >
        <AddComment />
      </motion.div>

      {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={5}
      >
        <Home_Download_App />
      </motion.div> */}
    </div>
  );
};

export default page;
