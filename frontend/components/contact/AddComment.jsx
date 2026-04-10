"use client";
import { API } from "@/Core/rl";
import { errorMsgApi, successfully } from "@/Core/tosts";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { MessageSquarePlus, UploadCloud, Send } from "lucide-react";

// Zod Schema
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  comment: z.string().min(20, "Comment must be at least 20 characters"),
  image: z
    .any()
    .refine((files) => files?.length > 0, {
      message: "Profile image is required",
    })
    .refine((files) => files[0]?.type?.startsWith("image/"), {
      message: "File must be an image",
    }),
});

export default function AddComment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const watchImage = watch("image");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("comment", data.comment);
      formData.append("image", data.image[0]);

      const res = await API.post("/web/testimonial", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      successfully(res?.data?.message || "Testimonial submitted successfully!");
      reset();
      setPreviewImage(null);
    } catch (error) {
      errorMsgApi(error?.response?.data?.error || "Failed to submit testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValue("image", e.target.files, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-full bg-red-600 py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-700 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between">
        
        {/* Left Content */}
        <motion.div 
          className="w-full lg:w-5/12 text-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-red-500/30 p-4 rounded-2xl w-fit mb-6 backdrop-blur-sm border border-red-400/30">
            <MessageSquarePlus size={40} className="text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6 leading-tight">
            Share Your <br className="hidden sm:block" /> Experience
          </h2>
          <p className="text-red-100 font-sans text-lg mb-8 leading-relaxed">
            Has The Real Temple impacted your life? We'd love to hear your story. Share your testimony to encourage and inspire our community.
          </p>
          
          <div className="hidden lg:block space-y-4">
             <div className="flex items-center gap-4 text-red-100">
               <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold font-sans">1</div>
               <span>Fill out the form with your details</span>
             </div>
             <div className="flex items-center gap-4 text-red-100">
               <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold font-sans">2</div>
               <span>Upload a clear profile picture</span>
             </div>
             <div className="flex items-center gap-4 text-red-100">
               <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold font-sans">3</div>
               <span>Share your testimony</span>
             </div>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div 
          className="w-full lg:w-6/12 bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Submit Testimony</h3>
            
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <input
                className={`w-full h-12 px-4 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'} outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800`}
                placeholder="Ex. Jane Doe"
                type="text"
                {...register("name")}
              />
              {errors.name && <span className="text-red-500 text-xs font-medium">{errors.name.message}</span>}
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Profile Picture</label>
              <div 
                className={`w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer transition-all ${
                  previewImage ? 'border-red-200 bg-red-50/10' : 
                  errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <div className="flex items-center gap-6 w-full px-4">
                     <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white" />
                     <div className="flex-1">
                        <p className="font-semibold text-gray-800 font-sans">Image Selected</p>
                        <p className="text-sm text-gray-500">Click to change</p>
                     </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2">
                      <UploadCloud size={24} />
                    </div>
                    <p className="font-medium text-gray-700 font-sans">Click to upload image</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
              {errors.image && <span className="text-red-500 text-xs font-medium">{errors.image.message}</span>}
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Your Testimony</label>
              <textarea
                className={`w-full h-32 p-4 rounded-xl border ${errors.comment ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'} outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none text-gray-800`}
                placeholder="Share how the church has impacted you..."
                {...register("comment")}
              />
              {errors.comment && <span className="text-red-500 text-xs font-medium">{errors.comment.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                 <span className="flex items-center gap-2">
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Submitting...
                 </span>
              ) : (
                <>
                  Submit Testimony
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
