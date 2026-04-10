import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const DashboardNumberCard = ({
  title,
  number,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 24px rgba(0,0,0,0.08)"
      }}
      className="flex-1 min-w-[240px] max-w-full sm:max-w-[320px] p-6 border border-slate-200 rounded-2xl bg-white flex items-center gap-5 shadow-sm transition-all duration-300 cursor-pointer"
    >
      <motion.span
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex justify-center items-center shadow-inner"
      >
        {icon || <Bell size={20} />}
      </motion.span>
      <div className="flex flex-col">
        <motion.h3
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-2xl font-black text-slate-900 font-roboto"
        >
          {typeof number === "number" ? number.toLocaleString() : number || 0}
        </motion.h3>
        <span className="text-sm font-bold text-slate-500 font-poppins capitalize tracking-tight">
          {title}
        </span>
      </div>
    </motion.div>
  );
};

export default DashboardNumberCard;
