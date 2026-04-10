import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const Table = ({ 
  columns, 
  data, 
  striped = true,
  hoverable = true,
  className = "",
  onRowClick
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 font-semibold text-slate-700"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <motion.tr
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-slate-200 transition-all ${
                hoverable ? "hover:bg-slate-50 cursor-pointer" : ""
              } ${striped && idx % 2 === 0 ? "bg-slate-50" : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-slate-700">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DataGrid = ({ 
  columns, 
  data, 
  sortable = true,
  filterable = true,
  pagination = true,
  itemsPerPage = 10
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedData = sortable && sortConfig.key
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        const comparison = aVal > bVal ? 1 : -1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      })
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination
    ? sortedData.slice(startIdx, startIdx + itemsPerPage)
    : sortedData;

  return (
    <div className="space-y-4">
      {filterable && (
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      )}

      <Table
        columns={columns}
        data={paginatedData}
        onClick={(e, col) => {
          if (sortable && col.sortable !== false) {
            setSortConfig({
              key: col.key,
              direction:
                sortConfig.key === col.key && sortConfig.direction === "asc"
                  ? "desc"
                  : "asc",
            });
          }
        }}
      />

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <motion.button
              key={idx + 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-9 h-9 rounded-lg font-semibold transition-all ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {idx + 1}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
