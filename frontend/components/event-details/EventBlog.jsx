import { APIURL } from "@/Core/rl";
import { formatEventDate } from "@/utils/functions/date-modification";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

export const Event = ({ singleBlog, index }) => {
  const [expanded, setExpanded] = useState(false);
  const { month, dayWithSuffix, year } = formatEventDate(singleBlog?.date);

  return (
    <motion.div 
      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -5 }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="relative w-full h-56 overflow-hidden shrink-0">
        <img
          src={`${APIURL}/uploads/${singleBlog?.image}`}
          alt="Blog Cover"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 flex flex-col items-center justify-center shadow-lg">
          <span className="text-red-600 font-bold text-lg leading-none mb-1">{dayWithSuffix}</span>
          <span className="text-gray-800 text-xs font-semibold uppercase tracking-wider">{month}</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative bg-white z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1 rounded-full text-sm font-medium">
            <Calendar size={14} />
            <span>{year}</span>
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-3">
          {singleBlog?.title || "Untitled Article"}
        </h3>

        <div className="mt-auto">
           <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-4"
              >
                <p className="text-gray-600 font-sans text-sm leading-relaxed border-l-2 border-red-500 pl-3">
                  {singleBlog?.content ||
                    "This is an inspiring post about finding faith and community in our modern times. Read more to explore the depths of this topic and discover new perspectives that will uplift your spirit."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="text-red-600 font-semibold text-sm uppercase tracking-wider flex items-center gap-2 transition-all mt-4 w-full justify-between pt-4 border-t border-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            <span>{expanded ? "Show Less" : "Read Article"}</span>
            <div className={`transition-transform duration-300 ${expanded ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600 group-hover:bg-red-50 group-hover:text-red-600'} rounded-full p-1`}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const EventBlog = ({ suggestionBlog }) => {
  return (
    <div className="bg-gray-50 w-full flex flex-col pt-16 border-t border-gray-200">
      <div className="px-6 sm:px-12 max-w-7xl mx-auto w-full mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
            More <span className="text-red-600">Articles</span>
          </h2>
          <div className="bg-red-600 h-1 w-16 rounded-full mb-4" />
          <p className="text-gray-600 font-sans text-lg">
            Explore more insights, sermons, and stories from our community.
          </p>
        </motion.div>
      </div>
      
      <div className="px-6 sm:px-12 pb-24 max-w-7xl mx-auto w-full flex flex-wrap gap-6 justify-center sm:justify-start">
        {suggestionBlog?.map((blogs, key) => (
          <Event key={key} singleBlog={blogs} index={key} />
        ))}
      </div>
    </div>
  );
};

export default EventBlog;
