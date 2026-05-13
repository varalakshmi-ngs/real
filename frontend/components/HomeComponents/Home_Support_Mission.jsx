"use client";

import MainBtn from "@/utils/MainBtn";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home_Support_Mission() {
  const route = useRouter();

  return (
    <section className="w-full px-6 sm:px-12 py-16">
      <div className="w-full md:h-[80vh] min-h-[500px] relative rounded-2xl overflow-hidden shadow-xl border border-white/20">

        {/* Background Image */}
        <motion.img
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          src="/homeimages/peoplereadingbible.png"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          alt="Support Our Mission Background"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45 -z-0" />

        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/20"
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0.1)",
              "0 0 20px rgba(255,255,255,0.18)",
              "0 0 0px rgba(255,255,255,0.1)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Content Card */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-10 mx-auto w-[90%] max-w-5xl bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl border border-gray-200 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{
            y: -4,
            transition: { duration: 0.3 },
          }}
        >
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <motion.h2
              className="text-3xl sm:text-4xl bg-red-600 text-white font-serif p-2 px-4 w-fit rounded-lg shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Support Our Mission
            </motion.h2>

            <motion.div
              className="h-1 bg-red-600 w-24 rounded-full mt-2"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <motion.p
              className="lg:w-2/3 text-gray-700 md:text-lg text-base leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Your generosity makes a difference. Through your giving, we're
              able to support our community, fund outreach programs, and
              continue spreading the message of hope and love. Every
              contribution helps us fulfill our calling.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 lg:w-1/3 lg:justify-end"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <MainBtn
                onClick={() => route.push("/contribution")}
                text="Contribute Now"
                customStyl="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 text-white shadow-md text-base px-6 py-3 rounded-lg"
              />

              <MainBtn
                text="Contact Us"
                invert
                customStyl="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-sm text-base px-6 py-3 rounded-lg"
                onClick={() => route.push("/contact")}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}