import { ChevronLeft, ChevronRight } from "lucide-react";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const Table = ({
  columns,
  data,
  handlePageClick,
  totalPages = 2,
  currentPage,
  search,
  showPagination = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <div className="min-w-[800px] lg:min-w-full">
          <TableHeader columns={columns} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {data
              ?.filter((e) => {
                if (!search) return true;
                return e.fullName?.toLowerCase().includes(search.toLowerCase());
              })
              ?.map((row, index) => (
                <TableItem
                  key={index}
                  row={{ ...row, index: index + 1 }}
                  columns={columns}
                />
              ))}
          </motion.div>
        </div>
      </div>

      {showPagination && totalPages > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <ReactPaginate
            forcePage={currentPage}
            pageCount={totalPages}
            onPageChange={({ selected }) => handlePageClick(selected)}
            containerClassName="flex items-center justify-center gap-2 mt-6 mb-4"
            pageClassName="px-4 py-2 border border-slate-500 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-300"
            activeClassName="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-slate-400"
            previousClassName="px-4 py-2 border border-slate-500 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-300"
            nextClassName="px-4 py-2 border border-slate-500 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-300"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakLabel="..."
            previousLabel={
              <span className="flex text-slate-300 items-center gap-1">
                <ChevronLeft size={16} /> Previous
              </span>
            }
            nextLabel={
              <span className="flex text-slate-300 items-center gap-1">
                Next <ChevronRight size={16} />
              </span>
            }
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Table;
