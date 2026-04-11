"use client";
import { useEventHook } from "@/Hooks/event-hook";
import StatusWrapper from "@/utils/StatusWrapper";
import React from "react";
import EventCard from "../events/EventCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home_Events({ limit = 3 }) {
  const { loading, error, event } = useEventHook({ limit });
  const router = useRouter();

  return (
    <section className="bg-red-700 w-full space-y-8 px-6 sm:px-12 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full mb-10">
          <motion.div
            className="flex flex-col items-start gap-3 w-full md:w-auto"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl bg-white text-gray-900 font-serif font-bold px-6 py-3 rounded-md shadow-md">
              Upcoming <span className="text-red-600">Events</span>
            </h2>
            <div className="h-1 bg-white/50 w-32 rounded-full" />
          </motion.div>

          <motion.div
            className="w-full md:w-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => router.push("/events")}
              className="px-6 py-3 bg-white text-red-600 rounded-xl shadow-md hover:bg-red-800 hover:text-white cursor-pointer transition-colors duration-300 font-bold"
            >
              View More Events
            </button>
          </motion.div>
        </div>

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
