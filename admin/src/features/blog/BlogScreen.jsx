import React from "react";
import HeaderWithActions from "../../utils/HeaderWithActions";
import { Plus } from "lucide-react";
import Table from "../../utils/table/Table";
import { useBlogDataHook } from "./Hooks/blog.data.hook";
import { useBlogHook } from "./Hooks/Blog.hook";
import ModalLayout from "../../Layout/ModalLayout";
import AddBlog from "./components/AddBlog";
import StatusWrapper from "../../utils/StatusWrapper";
import { motion } from "framer-motion";

const BlogScreen = () => {
  const {
    blog,
    loading,
    error,
    totalPages,
    searchText,
    searchContact,
    handlePageClick,
    currentPage,
    deletBlog,
    fetchBlogs,
    addBlogModal,
    handleAddblogModal,
    editBlog,
    singleBlog,
  } = useBlogHook();

  const { columns } = useBlogDataHook({ deletBlog, editBlog });

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
            title="Manage Blog Posts"
            subtitle="Create, edit and manage your blog content"
            onSearch={searchContact}
            searchValue={searchText}
            onFilterClick={handleAddblogModal}
            filterButtonText="Add New Blog"
            FilterIcon={Plus}
            btnWidth="w-[200px] bg-red-600 text-white hover:bg-red-700 transition-colors"
          />
        </motion.div>
        <motion.div variants={itemVariants} className="flex-1 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 p-2 overflow-hidden">
          <StatusWrapper loading={loading} error={error}>
            {blog?.length ? (
              <Table
                columns={columns}
                data={blog}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            ) : (
              <section className="w-full h-[300px] flex flex-col items-center justify-center gap-2 bg-gray-50 rounded-xl shadow-inner">
                <h2 className="text-xl font-semibold text-gray-700">
                  No Blogs Available
                </h2>
                <p className="text-sm text-gray-500">
                  Please add a blog to get started.
                </p>
              </section>
            )}
          </StatusWrapper>
        </motion.div>
      </motion.div>

      {addBlogModal && (
        <ModalLayout
          title="Add Blog"
          height="90%"
          width="70%"
          onCloseModal={handleAddblogModal}
        >
          <AddBlog
            fetchBlogs={fetchBlogs}
            handleAddblogModal={handleAddblogModal}
            initialData={singleBlog}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default BlogScreen;
