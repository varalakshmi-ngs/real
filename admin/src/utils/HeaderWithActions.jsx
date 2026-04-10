import React from "react";
import Search from "./Search";
import Button from "./Button";
import { motion } from "framer-motion";

const HeaderWithActions = ({
  title,
  subtitle,
  onSearch,
  searchValue, // added
  onFilterClick,
  filterButtonText = "Filter",
  FilterIcon,
  btnWidth = "w-[150px] bg-gradient-to-r from-blue-600 to-purple-600 text-white",
  showBtn = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm gap-6"
    >
      <div className="flex flex-col gap-1">
        <motion.h3
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-xl font-poppins font-bold text-slate-900 leading-tight"
        >
          {title}
        </motion.h3>
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-sm font-poppins font-medium text-slate-500"
        >
          {subtitle}
        </motion.span>
      </div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="flex items-center gap-4"
      >
        <Search value={searchValue} onChange={onSearch} /> {/* controlled */}
        {showBtn && (
          <Button
            style={`${btnWidth} h-[45px] hover:shadow-lg transition-all duration-300`}
            text={filterButtonText}
            Icon={FilterIcon}
            onClick={onFilterClick}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default HeaderWithActions;
