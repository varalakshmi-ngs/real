"use client";

import { APIURL } from "@/Core/rl";
import React from "react";
import {
  formatDayAndTime,
  formatEventDate,
} from "../../utils/functions/date-modification";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

const EventCard = ({ event }) => {
  const router = useRouter();

  const goToPage = () => {
    router.push(`/events/${event._id}`);
  };

  const image = `${APIURL}/uploads/${event?.image}`;
  const { month, dayWithSuffix, year } = formatEventDate(event?.date);
  const dayTimeFormatted = formatDayAndTime(event?.date, event?.startTime);

  return (
    <motion.div 
      className="w-full sm:w-[560px] h-[240px] rounded-2xl overflow-hidden bg-white flex shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={goToPage}
    >
      <div className="w-1/2 h-[240px] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={image} 
          alt="event" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 flex flex-col items-center justify-center shadow-lg z-20">
          <span className="text-red-600 font-bold text-xl leading-none mb-1">{dayWithSuffix}</span>
          <span className="text-gray-800 text-xs font-semibold uppercase tracking-wider">{month}</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative bg-white z-20">
        <h2 className="text-gray-900 text-2xl font-bold font-serif mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
          {event?.eventType}
        </h2>
        
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <CalendarDays size={18} className="text-red-500 shrink-0" />
            <span className="text-sm font-medium">{dayTimeFormatted}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin size={18} className="text-red-500 shrink-0" />
            <span className="text-sm font-medium line-clamp-1">{event?.location}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed font-sans line-clamp-3 mb-6 flex-1">
          {event?.description}
        </p>

        <div className="mt-auto">
          <button
            className="text-red-600 font-semibold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            Event Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
