import React, { useEffect, useState } from "react";
import CustomInput from "../../../utils/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogValidation } from "../../../validations/HomePageValidations";
import { useAddBlogHook } from "../Hooks/add-blog.hook";
import { APIURL } from "../../../Core/url";

const AddBlog = ({ fetchBlogs, handleAddblogModal, initialData = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogValidation(!!initialData)),
    defaultValues: initialData || {},
  });

  const watchImage = watch("image");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (watchImage && watchImage.length > 0 && watchImage[0] instanceof File) {
      const previewUrl = URL.createObjectURL(watchImage[0]);
      setImagePreview(previewUrl);

      return () => {
        URL.revokeObjectURL(previewUrl); // cleanup
      };
    } else if (initialData?.image) {
      setImagePreview(`${APIURL}/uploads/${initialData.image}`);
    } else {
      setImagePreview("");
    }
  }, [watchImage, initialData]);

  const { handleBlogSubmit, loading, success, error } = useAddBlogHook({
    fetchBlogs,
    handleAddblogModal,
    initialData,
    reset,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(handleBlogSubmit)}
      className="w-full flex flex-col gap-8 h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
      encType="multipart/form-data"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          {initialData ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>
        <p className="text-slate-400">
          {initialData ? "Update your blog post details" : "Fill in the details to create a new blog post"}
        </p>
      </motion.div>

      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            label="Title"
            placeholder="Enter an engaging blog title"
            name="title"
            register={register}
            error={errors.title}
          />
          <CustomInput
            label="Author Name"
            placeholder="Enter the author's name"
            name="author"
            register={register}
            error={errors.author}
          />
        </div>

        <CustomInput
          label="Description"
          placeholder="Write a compelling short description"
          name="description"
          type="textarea"
          register={register}
          error={errors.description}
        />
      </motion.div>

      {/* Category and Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">Category & Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            label="Category"
            name="category"
            type="select"
            register={register}
            error={errors.category}
            options={[
              "Sermons",
              "Devotionals",
              "Community",
              "Youth Ministry",
              "Workshop",
              "Events",
            ]}
          />
          <CustomInput
            label="Date"
            type="date"
            name="date"
            register={register}
            error={errors.date}
          />
        </div>

        <CustomInput
          label="Location"
          placeholder="Enter event location (if applicable)"
          name="location"
          register={register}
          error={errors.location}
        />
      </motion.div>

      {/* Image Upload */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">Featured Image</h3>
        <div className="flex gap-6 items-start">
          <div className="flex-1">
            <CustomInput
              label="Upload Image"
              type="file"
              name="image"
              register={register}
              error={errors.image}
              accept="image/*"
            />
          </div>
          {imagePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl border-2 border-slate-500 shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Status Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="space-y-4"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
          >
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-400 text-sm font-medium">{success}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {initialData ? "Updating..." : "Creating..."}
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {initialData ? "Update Blog Post" : "Create Blog Post"}
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default AddBlog;
