import React from "react";
import { motion } from "framer-motion";

const TableHeader = ({ columns }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[50px] overflow-hidden flex items-center p-4 border-b border-slate-200 bg-slate-50 gap-2"
    >
      {columns.map((column, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="text-slate-200 text-base font-bold font-roboto"
          style={{ width: column.width || "auto" }}
        >
          {column.name}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TableHeader;
