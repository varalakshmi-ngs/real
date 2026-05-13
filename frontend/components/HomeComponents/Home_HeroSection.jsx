"use client";

import MainBtn from "@/utils/MainBtn";
import { ArrowUpRightFromCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { APIURL } from "@/Core/rl";

export default function Home_HeroSection({ data }) {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white px-6 sm:px-10 lg:px-14 pt-18 md:pt-20 pb-10 md:pb-14"
    >
      {/* BACKGROUND BLUR EFFECTS */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-red-200/30 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          className="space-y-5 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* HEADING */}
          <h1 className="text-4xl font-serif font-bold leading-tight sm:text-5xl md:text-6xl">
            {data?.title?.split(" ")?.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`mr-2 ${
                  i === 0 || i === 1
                    ? "animate-gradient bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-[length:200%_200%] bg-clip-text text-transparent"
                    : "text-gray-900"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* SUBTEXT */}
          <motion.p
            className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {data?.subText}
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            {/* REQUEST BUTTON */}
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <MainBtn
                text="Request a Prayer"
                customStyl="rounded-xl bg-red-600 px-6 py-3 text-white shadow-lg transition hover:bg-red-700"
                onClick={() =>
                  router.push("/request-for-prayer")
                }
              />
            </motion.div>

            {/* CONTACT BUTTON */}
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <MainBtn
                text="Contact Us"
                invert
                customStyl="rounded-xl border-2 border-red-600 px-6 py-3 text-red-600 transition hover:bg-red-600 hover:text-white"
                onClick={() => router.push("/contact")}
              />
            </motion.div>
          </motion.div>

          {/* PRAYER CARD */}
          <motion.div
            className="mt-6 flex items-center gap-5 rounded-2xl bg-red-600 p-5 text-white shadow-xl transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <h2 className="text-xl font-serif font-semibold sm:text-2xl">
                Need Prayer?
              </h2>

              <p className="mt-1 text-sm leading-relaxed">
                We believe in the power of prayer. Share your
                requests with our prayer team who will pray for
                you.
              </p>
            </div>

            <motion.button
              whileHover={{
                rotate: 15,
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-white p-3 text-red-600 transition hover:bg-red-100"
              onClick={() =>
                router.push("/request-for-prayer")
              }
            >
              <ArrowUpRightFromCircle size={28} />
            </motion.button>
          </motion.div>
        </motion.div>

       {/* RIGHT IMAGE */}
<motion.div
  className="flex justify-center md:w-1/2 md:justify-end"
  initial={{
    opacity: 0,
    scale: 0.9,
    rotate: 2,
  }}
  whileInView={{
    opacity: 1,
    scale: 1,
    rotate: 0,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }}
  viewport={{ once: true }}
>
  <motion.img
    src={
      data?.image
        ? `${APIURL}/${data.image}`
        : "/homeimages/church-hero.png"
    }
    alt="Church Hero"
    whileHover={{
      scale: 1.04,
      rotate: -1,
    }}
    transition={{
      duration: 0.4,
    }}
    className="w-full max-w-[420px] rounded-2xl object-cover shadow-2xl md:max-w-[500px]"
  />
</motion.div>
      </div>
    </motion.section>
  );
}