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
  <motion.button
    whileHover={{
      y: -3,
      scale: 1.03,
    }}
    whileTap={{
      scale: 0.97,
    }}
    onClick={() => router.push("/events")}
    className="
      group
      relative
      cursor-pointer
      overflow-hidden
      rounded-2xl
      bg-gradient-to-r
      from-white
      to-red-50
      px-7
      py-4
      font-bold
      text-red-600
      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
      transition-all
      duration-500
      hover:text-white
      hover:shadow-[0_15px_40px_rgba(255,0,85,0.25)]
    "
  >
    {/* Animated Background */}
    <span
      className="
        absolute
        inset-0
        origin-left
        scale-x-0
        bg-gradient-to-r
        from-red-600
        to-pink-500
        transition-transform
        duration-500
        group-hover:scale-x-100
      "
    />

    {/* Shine */}
    <span
      className="
        absolute
        left-[-120%]
        top-0
        h-full
        w-20
        rotate-12
        bg-white/40
        blur-xl
        transition-all
        duration-700
        group-hover:left-[130%]
      "
    />

    {/* Text */}
    <span className="relative z-10 flex items-center gap-2">
      View More Events
    </span>
  </motion.button>
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
