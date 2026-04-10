import React from "react";
import { motion } from "framer-motion";

const TableItem = ({ columns, row }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        backgroundColor: "rgba(59, 130, 246, 0.08)",
        scale: 1.01
      }}
      className="text-base flex items-center px-3 gap-2 border-b border-b-slate-200 cursor-pointer relative py-3 hover:bg-slate-50 transition-all duration-300"
    >
      {columns.map((column, index) => (
        <motion.div
          key={index}
          style={{ width: column.width }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.02, duration: 0.2 }}
        >
          {column.render ? column.render(row) : null}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TableItem;
