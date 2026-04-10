import React from "react";
import Home_Video_Card from "../UtilComponents/Home_Video_Card";
import { APIURL } from "@/Core/rl";
import { motion } from "framer-motion";

export default function Home_VideoList({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-16 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <motion.div 
          className="flex flex-col w-full gap-2 items-center md:items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 font-bold">
            Watch <span className="text-red-600">Latest Messages</span>
          </h2>
          <div className="h-1 bg-red-600 w-24 rounded-full mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((e, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Home_Video_Card
                  title={`${e?.description} - ${e?.speakerName}`}
                  subText={e?.subText}
                  image={`${APIURL}/${e.thumbnailImage}`}
                  link={e?.youtubeLink}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
