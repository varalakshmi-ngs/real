import React from "react";
import { motion } from "framer-motion";

const OurVissionMissionCombine = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-14 sm:px-8 sm:py-20">
      
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 sm:gap-20">
        
        {/* OUR VISION */}
        <ReUseOurVision
          title="Our Vision"
          firstPara="Under his leadership, Real Temple Church has become a growing spiritual home for believers across Hyderabad. His vision is to build a Spirit-led, Bible-based church where people experience genuine worship, real community, and supernatural encounters with God."
          secondPara="Through outreach programs, worship events, online ministry, and personal counseling, Pastor Suresh ensures that the church is not just a building, but a living, breathing expression of God's love."
        />

        {/* OUR MISSION */}
        <ReUseOurVision
          title="Our Mission"
          firstPara="At Real Temple Church, our mission is to glorify God by making disciples, healing broken lives, and spreading the message of Jesus Christ to Hyderabad and the world. We are committed to being a true temple church that lives out the Word of God in spirit, truth, and love."
          secondPara="“You are the light of the world. A city on a hill cannot be hidden.” – Matthew 5:14"
        />
      </div>
    </section>
  );
};

export default OurVissionMissionCombine;

const ReUseOurVision = ({
  title,
  firstPara,
  secondPara,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
        rotateX: 25,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        rotateX: -1,
        rotateY: 1,
        transition: { duration: 0.4 },
      }}
      className="group relative perspective-[2000px]"
    >
      
      {/* Glow Border */}
      <div
        className="
          absolute
          inset-0
          rounded-[24px]
          border
          border-red-200/40
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Main Card */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-white/20
          bg-white/90
          shadow-[0_10px_60px_rgba(0,0,0,0.08)]
          backdrop-blur-2xl
        "
      >
        
        {/* Shine Animation */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 h-full w-32 bg-white/10 blur-2xl"
        />

        {/* Header */}
        <div className="relative overflow-hidden bg-[#07142b] px-5 py-6 sm:px-8 sm:py-8">
          
          {/* Hover Glow */}
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-red-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <motion.h3
            initial={{ letterSpacing: "-2px", opacity: 0 }}
            whileInView={{
              letterSpacing: "0px",
              opacity: 1,
            }}
            transition={{ duration: 0.8 }}
            className="
              relative
              z-10
              text-2xl
              sm:text-4xl
              font-bold
              text-white
            "
          >
            {title}
          </motion.h3>

          {/* Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="
              mt-4
              h-[4px]
              rounded-full
              bg-gradient-to-r
              from-red-500
              to-pink-500
            "
          />
        </div>

        {/* Content */}
        <div
          className="
            relative
            flex
            flex-col
            gap-5
            p-4
            sm:p-10
          "
        >
          
          {/* First Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="
              text-[14px]
              leading-7
              text-gray-700
              sm:text-[18px]
              sm:leading-[2rem]
            "
          >
            {firstPara}
          </motion.p>

          {/* Quote Box */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.4,
              duration: 1,
            }}
            whileHover={{
              scale: 1.01,
            }}
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-red-100
              bg-gradient-to-r
              from-red-50
              via-white
              to-pink-50
              p-4
              sm:p-6
              shadow-inner
            "
          >
            
            {/* Side Accent */}
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-pink-500" />

            {/* Glow */}
            <div className="absolute -right-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-red-400/10 blur-3xl" />

            <p
              className="
                relative
                z-10
                pl-3
                text-[14px]
                italic
                leading-7
                text-gray-700
                sm:pl-5
                sm:text-[18px]
                sm:leading-[2rem]
              "
            >
              {secondPara}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};