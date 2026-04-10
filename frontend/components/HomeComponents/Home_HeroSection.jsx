"use client";

import MainBtn from "@/utils/MainBtn";
import { ArrowUpRightFromCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { APIURL } from "@/Core/rl";

export default function Home_HeroSection({ data }) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen px-6 sm:px-12 py-12 md:py-20 bg-gradient-to-br from-white via-red-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
        {/* Left Content */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight">
            {data?.title?.split(" ")?.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`${
                  i === 0 || i === 1
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"
                    : "text-gray-900"
                } mr-2`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            className="text-gray-600 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {data?.subText}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            <MainBtn
              text="Request a Prayer"
              customStyl="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-3"
              onClick={() => router.push("/request-for-prayer")}
            />
            <MainBtn
              text="Contact Us"
              invert
              customStyl="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl px-6 py-3"
              onClick={() => router.push("/contact")}
            />
          </motion.div>

          {/* Prayer Info Card */}
          <motion.div
            className="mt-6 bg-red-600 text-white rounded-2xl p-5 shadow-lg flex items-center gap-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-serif font-semibold">
                Need Prayer?
              </h2>
              <p className="text-sm mt-1">
                We believe in the power of prayer. Share your requests with our
                prayer team who will pray for you.
              </p>
            </div>
            <button
              className="p-3 bg-white rounded-full text-red-600 hover:bg-red-100 transition"
              onClick={() => router.push("/request-for-prayer")}
            >
              <ArrowUpRightFromCircle size={28} />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src={data?.image ? `${APIURL}/${data.image}` : "/homeimages/church-hero.png"}
            alt="Church Hero"
            className="max-w-full w-[90%]  rounded-xl shadow-xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
