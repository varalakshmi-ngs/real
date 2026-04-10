"use client";
import OurLeaders from "@/components/about/OurLeaders";
import EventCard from "@/components/events/EventCard";
import EventHeading from "@/components/events/EventHeading";
import { useEventHook } from "@/Hooks/event-hook";
import React from "react";
import { motion } from "framer-motion";
import StatusWrapper from "@/utils/StatusWrapper";
import { useTestimonilHook } from "@/Hooks/testimonial.hook";

const page = () => {
  const { loading, error, event } = useEventHook({ limit: 6 });
  const { testLoading, testError, testimonial } = useTestimonilHook();
  console.log("testimonial", testimonial);

  return (
    <motion.div
      className="w-full flex flex-col gap-2 bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <EventHeading />
      </motion.div>

      <motion.div
        className="p-[clamp(1rem,2vw,3rem)] flex flex-wrap gap-8 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <StatusWrapper loading={loading} error={error}>
          {event?.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </StatusWrapper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <OurLeaders data={testimonial} />
      </motion.div>
    </motion.div>
  );
};

export default page;
