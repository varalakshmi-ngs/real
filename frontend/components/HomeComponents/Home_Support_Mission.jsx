"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home_Support_Mission() {
  const route = useRouter();

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-12 md:py-16">
      
      {/* MAIN CONTAINER */}
      <div className="relative w-full min-h-[650px] md:min-h-[500px] lg:h-[80vh] overflow-hidden rounded-3xl border border-white/20 shadow-xl">

        {/* BACKGROUND IMAGE */}
        <motion.img
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          src="/homeimages/peoplereadingbible.png"
          alt="Support Our Mission Background"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        {/* GLOW BORDER */}
        <motion.div
          className="absolute inset-0 rounded-3xl border border-white/20"
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0.08)",
              "0 0 18px rgba(255,255,255,0.15)",
              "0 0 0px rgba(255,255,255,0.08)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* CONTENT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{
            y: -3,
            transition: { duration: 0.3 },
          }}
          className="
            absolute
            left-1/2
            bottom-4
            sm:bottom-8
            z-10
            w-[92%]
            max-w-5xl
            -translate-x-1/2
            rounded-2xl
            border
            border-gray-200
            bg-white/95
            backdrop-blur-md
            shadow-2xl
            p-5
            sm:p-8
            md:p-10
            flex
            flex-col
            gap-6
          "
        >
          
          {/* HEADING */}
          <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
            
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="
                w-fit
                rounded-xl
                bg-red-600
                px-4
                py-2
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-serif
                text-white
                shadow-sm
              "
            >
              Support Our Mission
            </motion.h2>

            <motion.div
              className="mt-2 h-1 w-24 rounded-full bg-red-600"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </div>

          {/* CONTENT */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-center
              lg:items-center
              justify-between
              gap-6
              text-center
              lg:text-left
            "
          >
            
            {/* TEXT */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="
                w-full
                lg:w-2/3
                text-base
                md:text-lg
                leading-relaxed
                text-gray-700
              "
            >
              Your generosity makes a difference. Through your giving, we're
              able to support our community, fund outreach programs, and
              continue spreading the message of hope and love. Every
              contribution helps us fulfill our calling.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="
                flex
                w-full
                flex-col
                sm:flex-row
                lg:flex-col
                justify-center
                lg:justify-end
                items-center
                gap-3
                lg:w-auto
              "
            >
              
              {/* CONTRIBUTE BUTTON */}
              <motion.button
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => route.push("/contribution")}
                className="
                  cursor-pointer
                  rounded-xl
                  bg-red-600
                  px-5
                  sm:px-6
                  py-3
                  text-sm
                  sm:text-base
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-red-700
                  hover:shadow-lg
                "
              >
                Contribute Now
              </motion.button>

              {/* CONTACT BUTTON */}
              <motion.button
                whileHover={{
                  y: -2,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => route.push("/contact")}
                className="
                  cursor-pointer
                  rounded-xl
                  border-2
                  border-red-600
                  bg-white
                  px-5
                  sm:px-6
                  py-3
                  text-sm
                  sm:text-base
                  font-semibold
                  text-red-600
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-red-600
                  hover:text-white
                  hover:shadow-md
                "
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}