import React from "react";
import { useBlogHook } from "./Hooks/eventscreen.hook";
import HeaderWithActions from "../../utils/HeaderWithActions";
import StatusWrapper from "../../utils/StatusWrapper";
import Table from "../../utils/table/Table";
import { useEventScreenDataHook } from "./Hooks/eventscreen.data";
import { Plus } from "lucide-react";
import ModalLayout from "../../Layout/ModalLayout";
import EventAddModal from "./components/EventAddModal";
import { motion } from "framer-motion";

const EventScreen = () => {
  const {
    deletEvent,
    searchText,
    editBlog,
    loading,
    error,
    totalPages,
    currentPage,
    searchContact,
    handlePageClick,
    event,
    fetchEvents,
    singleEvent,
    addEventModal,
    handleEventOpenModal,
    handleEventCloseModal,
  } = useBlogHook();

  const { column } = useEventScreenDataHook({ deletEvent, editBlog });

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
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full h-full flex flex-col gap-6 pb-8"
      >
        <motion.div variants={itemVariants}>
          <HeaderWithActions
            title="Manage Events"
            subtitle="Create, edit and manage church events"
            onSearch={searchContact}
            searchValue={searchText}
            onFilterClick={handleEventOpenModal}
            filterButtonText="Add New Event"
            FilterIcon={Plus}
            btnWidth="w-[200px] bg-red-600 text-white hover:bg-red-700 transition-colors"
            showBtn={true}   // ✅ ADD THIS
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 p-2 overflow-hidden">
          <StatusWrapper loading={loading} error={error}>
            <Table
              columns={column}
              data={event}
              handlePageClick={handlePageClick}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </StatusWrapper>
        </motion.div>
      </motion.div>

      {addEventModal && (
        <ModalLayout
          title="Add Event"
          height="90%"
          width="70%"
          onCloseModal={handleEventCloseModal}
        >
          <EventAddModal
            fetchEvent={fetchEvents}
            handleCloseModal={handleEventCloseModal}
            initialData={singleEvent}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default EventScreen;
