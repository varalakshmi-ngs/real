import { ClipLoader } from "react-spinners";
import HeaderWithActions from "../../utils/HeaderWithActions";
import { Filter } from "lucide-react";
import { useContactDataHook } from "./Hooks/contact.data";
import { useContactHook } from "./Hooks/contact.hook";
import Table from "../../utils/table/Table";
import { useTestimonialHook } from "./Hooks/testimonial";
import { motion } from "framer-motion";

const ContactScreen = () => {
  const {
    contact,
    totalPages,
    handlePageClick,
    searchText,
    loading,
    currentPage,
    error,
    deletContact,
    searchContact,
  } = useContactHook();

  const {
    testHandlePageClick,
    testLoading,
    testError,
    testimonial,
    testiTotalPages,
    testCurrentPage,
    testiRejected,
    testApproved,
    searchTestimonial,
    testSearchText, 
  } = useTestimonialHook();

  const { columns, commentColumns } = useContactDataHook({
    deletContact,
    testiRejected,
    testApproved,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full h-full flex flex-col gap-8 pb-12"
    >
      {/* Contacts Table */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <HeaderWithActions
          title="Contact Submissions"
          subtitle="Manage and respond to contact form submissions"
          onSearch={searchContact}
          searchValue={searchText}
          onFilterClick={() => {}}
          filterButtonText="Filter"
          FilterIcon={Filter}
          btnWidth="w-[120px] bg-red-600 text-white hover:bg-red-700 transition-colors"
        />
        <div className="bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 p-2 overflow-hidden">
          {loading ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <ClipLoader color="#E60023" size={30} />
            </div>
          ) : error ? (
            <div className="w-full h-[300px] flex justify-center items-center text-red-600 font-semibold">
              {error}
            </div>
          ) : (
            <Table
              columns={columns}
              data={contact}
              handlePageClick={handlePageClick}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}
        </div>
      </motion.div>

      {/* Testimonials Table */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <HeaderWithActions
          title="Comments"
          subtitle="Manage and respond to Comments form submissions"
          onSearch={searchTestimonial}
          searchValue={testSearchText}
          onFilterClick={() => {}}
          filterButtonText="Filter"
          FilterIcon={Filter}
          btnWidth="w-[120px] bg-red-600 text-white hover:bg-red-700 transition-colors"
        />
        <div className="bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 p-2 overflow-hidden">
          {testLoading ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <ClipLoader color="#E60023" size={30} />
            </div>
          ) : testError ? (
            <div className="w-full h-[300px] flex justify-center items-center text-red-600 font-semibold">
              {testError}
            </div>
          ) : (
            <Table
              totalPages={testiTotalPages}
              columns={commentColumns}
              data={testimonial}
              currentPage={testCurrentPage}
              handlePageClick={testHandlePageClick}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactScreen;
