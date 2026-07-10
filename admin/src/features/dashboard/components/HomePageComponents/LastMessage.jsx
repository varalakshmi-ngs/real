import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LastMessageValidation } from "../../../../validations/HomePageValidations";
import { APIURL } from "../../../../Core/url";
import { apiRequest } from "../../../../services/ApiCalls";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import {
  Plus,
  Trash2,
  X,
  Youtube,
  User,
  FileText,
  ImageIcon,
  Loader2,
  AlertCircle,
  Film,
  Sparkles,
  Edit,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LastMessage({ data = [], refreshData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: zodResolver(LastMessageValidation),
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingMessage(null);
    reset({
      heading: "",
      description: "",
      pastorName: "",
      youtubeLink: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setModalOpen(true);
  };

  const openEditModal = (message) => {
    setEditingMessage(message);
    reset({
      heading: message?.heading || "",
      description: message?.description || "",
      pastorName: message?.pastorName || message?.hostName || "",
      youtubeLink: message?.youtubeLink || "",
    });
    setImageFile(null);
    setImagePreview(message?.thumbnailImage ? (message.thumbnailImage.startsWith("http") ? message.thumbnailImage : `${APIURL}/${message.thumbnailImage}`) : null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingMessage(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const submitForm = async (formData) => {
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value || "");
      });
      if (imageFile) {
        fd.append("image", imageFile);
      } else if (!imagePreview) {
        fd.append("deleteImage", "true");
      }

      const method = editingMessage ? "put" : "post";
      const url = editingMessage ? `/home/latestmessage/${editingMessage.id}` : "/home/latestmessage";

      const result = await apiRequest({
        method,
        url,
        data: fd,
      });

      if (result) {
        setSubmitStatus({ type: "success", message: `Latest Message ${editingMessage ? "updated" : "saved"} successfully!` });
        closeModal();
        if (refreshData) refreshData();
      } else {
        setSubmitStatus({ type: "error", message: "Failed to save Latest Message." });
      }
    } catch (err) {
      setSubmitStatus({ type: "error", message: "An error occurred while saving." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Latest Message?")) {
      return;
    }
    setDeletingId(id);
    setSubmitStatus(null);
    try {
      const result = await apiRequest({
        method: "delete",
        url: `/home/latestmessage/${id}`,
      });
      if (result) {
        setSubmitStatus({ type: "success", message: "Latest Message deleted successfully!" });
        if (refreshData) refreshData();
      } else {
        setSubmitStatus({ type: "error", message: "Failed to delete Latest Message." });
      }
    } catch (err) {
      setSubmitStatus({ type: "error", message: "An error occurred while deleting." });
    } finally {
      setDeletingId(null);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const hasMessages = data && data.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <OpenCloseLayout title="Latest Message Manager">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6 pb-12"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-200">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  Latest Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Manage the latest message displayed on the homepage
                </p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus size={18} />
              Add New Message
            </button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
              <Video className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{data?.length || 0}</p>
              <p className="text-xs text-slate-500">Latest Messages</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50">
              <Youtube className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {data?.filter(m => m.youtubeLink).length || 0}
              </p>
              <p className="text-xs text-slate-500">YouTube Links</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50">
              <ImageIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {data?.filter(m => m.thumbnailImage).length || 0}
              </p>
              <p className="text-xs text-slate-500">With Images</p>
            </div>
          </div>
        </motion.div>

        {/* Status Message */}
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border text-sm font-medium ${
              submitStatus.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {submitStatus.message}
          </motion.div>
        )}

        {/* Message Card Display */}
        {!hasMessages ? (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Video className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No Latest Messages Configured</h3>
            <p className="text-sm text-slate-500 mb-5 text-center max-w-sm">
              Set up the latest messages banner that will be featured prominently on your website's home page.
            </p>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Add New Message
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {data.map((message) => {
              const thumbnailSrc = message.thumbnailImage
                ? (message.thumbnailImage.startsWith("http") ? message.thumbnailImage : `${APIURL}/${message.thumbnailImage}`)
                : "/images/jesus-footer-image.png";
              return (
                <motion.div
                  key={message.id}
                  variants={itemVariants}
                  className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={thumbnailSrc}
                      alt={message.heading || "Message Thumbnail"}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* YouTube badge */}
                    {message.youtubeLink && (
                      <div className="absolute top-2.5 left-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                          <Youtube size={10} />
                          YouTube
                        </span>
                      </div>
                    )}

                    {/* Action buttons (Delete & Edit on hover) */}
                    <div className="absolute top-2.5 right-2.5 flex gap-2">
                      <button
                        onClick={() => openEditModal(message)}
                        className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-blue-600 opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-md"
                        title="Edit Latest Message"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        disabled={deletingId === message.id}
                        className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md disabled:opacity-50"
                        title="Delete Latest Message"
                      >
                        {deletingId === message.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <Sparkles size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-1">
                        {message.heading || "No Title"}
                      </h3>
                    </div>
                    {(message.pastorName || message.hostName) && (
                      <div className="flex items-center gap-1.5 pl-[22px] text-xs font-semibold text-slate-500">
                        <User size={13} className="text-slate-400" />
                        <span>PASTOR: {message.pastorName || message.hostName}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 line-clamp-2 pl-[22px]">
                      {message.description || "No description"}
                    </p>
                    {message.youtubeLink && (
                      <a
                        href={message.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors pl-[22px]"
                      >
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {editingMessage ? "Edit Latest Message" : "Add Latest Message"}
                      </h2>
                      <p className="text-xs text-slate-500">Configure content for the homepage banner</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form Body */}
                <form
                  onSubmit={handleSubmit(submitForm)}
                  className="flex-1 overflow-y-auto p-5 space-y-4"
                >
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <FileText size={14} className="text-blue-500" />
                      Message Title
                    </label>
                    <input
                      {...register("heading")}
                      placeholder="e.g. Finding Peace in Troubled Times"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    />
                    {errors.heading && (
                      <span className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} />
                        {errors.heading.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <FileText size={14} className="text-purple-500" />
                      Message
                    </label>
                    <textarea
                      {...register("description")}
                      rows={4}
                      placeholder="Enter the message summary or content..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all resize-none"
                    />
                    {errors.description && (
                      <span className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} />
                        {errors.description.message}
                      </span>
                    )}
                  </div>

                  {/* Pastor Name */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <User size={14} className="text-emerald-500" />
                      Pastor Name (Optional)
                    </label>
                    <input
                      {...register("pastorName")}
                      placeholder="e.g. Pastor John"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    />
                    {errors.pastorName && (
                      <span className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} />
                        {errors.pastorName.message}
                      </span>
                    )}
                  </div>

                  {/* YouTube Link (Optional) */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <Youtube size={14} className="text-red-500" />
                      YouTube Link (Optional)
                    </label>
                    <input
                      {...register("youtubeLink")}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    />
                    {errors.youtubeLink && (
                      <span className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} />
                        {errors.youtubeLink.message}
                      </span>
                    )}
                  </div>

                  {/* Image (Optional) */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <ImageIcon size={14} className="text-amber-500" />
                      Image (Optional)
                    </label>
                    <div className="relative">
                      {imagePreview ? (
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-40 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-300 group">
                          <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                            <ImageIcon size={28} />
                            <span className="text-xs font-medium">Click to upload custom image</span>
                            <span className="text-[10px] text-slate-400">Supported files: JPG, PNG</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Saving Message...
                        </>
                      ) : (
                        <>
                          <Plus size={18} />
                          Save Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </OpenCloseLayout>
  );
}