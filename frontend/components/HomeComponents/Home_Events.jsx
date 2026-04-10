// import MainBtn from "@/utils/MainBtn";
import { useEventHook } from "@/Hooks/event-hook";
import MainBtn from "@/utils/MainBtn";
import StatusWrapper from "@/utils/StatusWrapper";
import React from "react";
import EventCard from "../events/EventCard";
import { motion } from "framer-motion";

export default function Home_Events({ limit = 3 }) {
  const { loading, error, event } = useEventHook({ limit });

  return (
    <section className="bg-red-700 w-full space-y-8 px-6 sm:px-12 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center md:items-end justify-end flex-col gap-2 w-full mb-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl bg-white text-gray-900 font-serif font-bold text-center md:text-end px-6 py-3 rounded-md shadow-md">
            Upcoming <span className="text-red-600">Events</span>
          </h2>
          <div className="h-1 bg-white/50 w-32 rounded-full mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          <StatusWrapper loading={loading} error={error}>
            {event?.slice(0, limit).map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="w-full max-w-md"
              >
                <EventCard event={ev} />
              </motion.div>
            ))}
          </StatusWrapper>
        </div>
      </div>
    </section>
  );
}
