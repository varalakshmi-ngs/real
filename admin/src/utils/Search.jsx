import { SearchCheck } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const Search = ({ value = "", onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="
        shadow-sm
        rounded-xl
        px-4
        w-full
        sm:w-[350px]
        h-[50px]
        bg-white
        border
        border-slate-200
        flex
        justify-between
        items-center
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        type="text"
        placeholder="Search..."
        spellCheck={false}
        autoComplete="off"
        className="
          outline-none
          border-none
          w-full
          h-full
          bg-transparent
          text-slate-700
          placeholder-slate-400
          text-sm
        "
      />

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="ml-2 flex-shrink-0"
      >
        <SearchCheck color="#94a3b8" size={20} />
      </motion.div>
    </motion.div>
  );
};

export default Search;  