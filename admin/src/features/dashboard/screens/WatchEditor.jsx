import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "../../../services/ApiCalls";
import { APIURL } from "../../../Core/url";
import {
  Plus,
  Trash2,
  X,
  Video,
  ExternalLink,
  Youtube,
  User,
  FileText,
  Type,
  ImageIcon,
  Loader2,
  AlertCircle,
  Film,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMemberValidation } from "../../../validations/HomePageValidations";

// Extract YouTube video ID for thumbnail fallback
const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/
  );
  return match ? match[1] : null;
};

export default function WatchEditor() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(addMemberValidation),
  });

  const watchedYoutubeLink = watch("youtubeLink");
  const liveYtId = watchedYoutubeLink ? getYoutubeId(watchedYoutubeLink) : null;
  const liveYtThumbnail = liveYtId ? `https://img.youtube.com/vi/${liveYtId}/mqdefault.jpg` : null;

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        method: "get",
        url: "/home/",
      });
      if (response?.data?._doc?.videos) {
        setVideos(response.data._doc.videos);
      }
    } catch (err) {
      console.error("Failed to fetch videos", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    setDeletingId(id);
    try {
      const result = await apiRequest({
        method: "delete",
        url: `/home/deletevideo/${id}`,
      });
      if (result?.success) {
        fetchVideos();
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    reset();
    setImageFile(null);
    setImagePreview(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    reset();
    setImageFile(null);
    setImagePreview(null);
  };

  const submitForm = async (formData) => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value);
      });
      if (imageFile) {
        fd.append("image", imageFile);
      } else if (liveYtThumbnail) {
        fd.append("thumbnailUrl", liveYtThumbnail);
      }

      const result = await apiRequest({
        method: "post",
        url: "/home/addvideo",
        data: fd,
      });

      if (result?.success) {
        closeModal();
        fetchVideos();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
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
                Watch / Videos
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage video messages displayed on the Watch page
              </p>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus size={18} />
            Add New Video
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
            <p className="text-2xl font-bold text-slate-900">{videos.length}</p>
            <p className="text-xs text-slate-500">Total Videos</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50">
            <Youtube className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {videos.filter((v) => v.youtubeLink).length}
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
              {videos.filter((v) => v.thumbnailImage).length}
            </p>
            <p className="text-xs text-slate-500">With Thumbnails</p>
          </div>
        </div>
      </motion.div>

      {/* Video Grid */}
      {loading ? (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm"
        >
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
          <p className="text-sm text-slate-500">Loading videos...</p>
        </motion.div>
      ) : videos.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <Video className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No Videos Yet</h3>
          <p className="text-sm text-slate-500 mb-5 text-center max-w-sm">
            Start adding video messages to display on the Watch page of your website.
          </p>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Add Your First Video
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {videos.map((video) => {
            const ytId = getYoutubeId(video.youtubeLink);
            const thumbnailSrc = video.thumbnailImage
              ? (video.thumbnailImage.startsWith("http") ? video.thumbnailImage : `${APIURL}/${video.thumbnailImage}`)
              : ytId
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : null;

            return (
              <motion.div
                key={video.id || video._id}
                variants={itemVariants}
                layout
                className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {thumbnailSrc ? (
                    <img
                      src={thumbnailSrc}
                      alt={video.speakerName || "Video thumbnail"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <Video className="w-10 h-10 text-slate-300" />
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* YouTube badge */}
                  {video.youtubeLink && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        <Youtube size={10} />
                        YouTube
                      </span>
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(video.id || video._id)}
                    disabled={deletingId === (video.id || video._id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-white/90 backdrop-blur-sm text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md disabled:opacity-50"
                    title="Delete video"
                  >
                    {deletingId === (video.id || video._id) ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <User size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-1">
                      {video.speakerName || "Unknown Speaker"}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 pl-[22px]">
                    {video.description || "No description"}
                  </p>
                  {video.subText && (
                    <p className="text-[11px] text-slate-400 pl-[22px] italic">
                      {video.subText}
                    </p>
                  )}
                  {video.youtubeLink && (
                    <a
                      href={video.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors pl-[22px]"
                    >
                      <ExternalLink size={11} />
                      Watch on YouTube
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Add Video Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Add New Video</h2>
                    <p className="text-xs text-slate-500">Fill in the details below</p>
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

              {/* Modal Body */}
              <form
                onSubmit={handleSubmit(submitForm)}
                className="flex-1 overflow-y-auto p-5 space-y-4"
              >
                {/* YouTube Link */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <Youtube size={14} className="text-red-500" />
                    YouTube Link
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

                {/* Speaker Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <User size={14} className="text-blue-500" />
                    Speaker Name
                  </label>
                  <input
                    {...register("speakerName")}
                    placeholder="e.g. Pastor John"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                  />
                  {errors.speakerName && (
                    <span className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle size={12} />
                      {errors.speakerName.message}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <FileText size={14} className="text-emerald-500" />
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Brief description of the video message..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all resize-none"
                  />
                  {errors.description && (
                    <span className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle size={12} />
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Sub Text */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <Type size={14} className="text-purple-500" />
                    Sub Text
                  </label>
                  <input
                    {...register("subText")}
                    placeholder="e.g. Sunday Service, Bible Study..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                  />
                  {errors.subText && (
                    <span className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle size={12} />
                      {errors.subText.message}
                    </span>
                  )}
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <ImageIcon size={14} className="text-amber-500" />
                    Thumbnail Image
                  </label>
                  <div className="relative">
                    {imagePreview || liveYtThumbnail ? (
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img
                          src={imagePreview || liveYtThumbnail}
                          alt="Preview"
                          className="w-full h-40 object-cover"
                        />
                        {imagePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md"
                          >
                            <X size={14} />
                          </button>
                        )}
                        {!imagePreview && liveYtThumbnail && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                            YouTube Auto-Preview
                          </div>
                        )}
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-300 group">
                        <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                          <ImageIcon size={28} />
                          <span className="text-xs font-medium">Click to upload custom thumbnail</span>
                          <span className="text-[10px] text-slate-400">Or use YouTube auto-preview</span>
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

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Adding Video...
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Add Video
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
