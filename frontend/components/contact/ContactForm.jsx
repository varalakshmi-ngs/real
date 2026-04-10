"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { API } from "@/Core/rl";
import { errorMsgApi, successfully } from "@/Core/tosts";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = z.object({
    firstName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    mobile: z
      .string()
      .length(10, { message: "Mobile number must proceed exactly 10 digits" })
      .regex(/^\d+$/, { message: "Mobile number must contain only digits" }),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(15, "Message must be at least 15 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await API.post("/web/contact", data);
      successfully(res?.data?.message || "Message sent successfully!");
      reset(); // clear form
    } catch (error) {
      errorMsgApi(error?.response?.data?.error || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-6 sm:px-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Form Side */}
          <motion.div 
            className="w-full lg:w-1/2 p-8 md:p-12 z-10 bg-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 font-sans">Fill out the form below and our team will get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700" htmlFor="firstName">Name</label>
                  <input
                    id="firstName"
                    className={`w-full h-12 px-4 rounded-xl border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'} outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800`}
                    placeholder="John Doe"
                    type="text"
                    {...register("firstName")}
                  />
                  {errors.firstName && <span className="text-red-500 text-xs font-medium">{errors.firstName.message}</span>}
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700" htmlFor="mobile">Phone Number</label>
                  <input
                    id="mobile"
                    className={`w-full h-12 px-4 rounded-xl border ${errors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'} outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800`}
                    placeholder="9876543210"
                    type="text"
                    maxLength={10}
                    inputMode="numeric"
                     {...register("mobile")}
                  />
                  {errors.mobile && <span className="text-red-500 text-xs font-medium">{errors.mobile.message}</span>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className={`w-full h-12 px-4 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'} outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800`}
                  placeholder="john@example.com"
                  type="email"
                  {...register("email")}
                />
                {errors.email && <span className="text-red-500 text-xs font-medium">{errors.email.message}</span>}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  className={`w-full h-12 px-4 rounded-xl border ${errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'} outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800`}
                  placeholder="How can we help you?"
                  type="text"
                  {...register("subject")}
                />
                {errors.subject && <span className="text-red-500 text-xs font-medium">{errors.subject.message}</span>}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className={`w-full h-32 p-4 rounded-xl border ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'} outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none text-gray-800`}
                  placeholder="Tell us more about your inquiry..."
                  {...register("message")}
                />
                {errors.message && <span className="text-red-500 text-xs font-medium">{errors.message.message}</span>}
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
                     Sending...
                   </span>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Map & Info Side */}
          <motion.div 
            className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-gray-100"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 w-full h-full">
               <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Real%20Temple%20Church+(The%20Real%20Church)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                title="Church Location"
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50"
              />
            </div>
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/50 hidden md:flex flex-col gap-4">
               <div className="flex items-start gap-4">
                 <div className="bg-red-100 p-3 rounded-xl text-red-600 shrink-0">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900 font-serif">Visit Us</h3>
                    <p className="text-gray-600 text-sm">Main Branch Location<br />City, State, ZIP</p>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
