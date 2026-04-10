"use client";

import React, { useState } from "react";
import { useRazorpayPayment } from "@/Hooks/useRazorpayPayment";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Heart, X } from "lucide-react";
import { API } from "@/Core/rl";

const SuccessModal = ({ isOpen, onClose, donorName, amount }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" onClick={onClose}>
              <X size={24} />
            </div>

            <div className="p-8 pt-12 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, delay: 0.2 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-500"
                >
                  <Heart size={14} fill="currentColor" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Thank You, <span className="text-red-600">{donorName}</span>!
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your generous donation of <span className="font-bold text-gray-900">₹{amount}</span> has been received. 
                Thank you for supporting the light of Christ and help us building the Kingdom of God.
              </p>

              <button
                onClick={onClose}
                className="w-full bg-gray-900 text-white font-medium py-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-lg"
              >
                Close
              </button>
            </div>
            
            <div className="h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const GiveNowWaysToGive = () => {
  const [formData, setFormData] = useState({
    purpose: "",
    fullName: "",
    mobile: "",
    email: "",
    amount: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({ name: "", amount: "" });

  const { initiatePayment } = useRazorpayPayment();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Step 1: Save the donation to the database
      const response = await API.post("/web/submit-donation", formData);
      
      if (response.data.success) {
        // Step 2: Set success data for modal
        setSuccessData({
          name: formData.fullName,
          amount: formData.amount
        });
        
        // Step 3: Show the Success Modal
        setShowSuccess(true);

        // Step 4: Resetting form after successful submission
        setFormData({
          purpose: "",
          fullName: "",
          mobile: "",
          email: "",
          amount: "",
        });
      }
    } catch (error) {
      console.error("Donation submission error:", error);
      alert("Failed to process donation. Please try again later.");
    }
  };

  return (
    <>
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)}
        donorName={successData.name}
        amount={successData.amount}
      />
      
      <section id="contribution" className="bg-gray-50 py-24 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <motion.div 
            className="flex flex-col items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 bg-white px-8 py-3 rounded-xl shadow-sm border border-gray-100">
              Ways to <span className="text-red-600">Give</span>
            </h2>
            <div className="bg-red-600 h-1 w-24 rounded-full" />
          </motion.div>

          <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col lg:flex-row overflow-hidden">
            
            <motion.div 
              className="flex-1 p-8 sm:p-12 lg:pr-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                Enter Details
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                    Purpose
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-gray-800"
                    required
                  >
                    <option value="" disabled>Select Purpose</option>
                    <option value="community-outreach">Community Outreach</option>
                    <option value="global-missions">Global Missions</option>
                    <option value="church-growth">Church Growth</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter Your Full Name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Donation Amount
                  </label>
                  
                  <div className="flex flex-wrap gap-3">
                    {[50, 100, 200, 500, 2000].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, amount: value }))}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          Number(formData.amount) === value
                            ? "bg-red-600 text-white shadow-md shadow-red-200"
                            : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                        }`}
                      >
                        ₹{value}
                      </button>
                    ))}
                  </div>

                  <div className="relative mt-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">₹</span>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Custom Amount"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-lg font-medium text-gray-900"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-medium py-4 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shadow-lg mt-8 text-lg"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Complete Donation
                </motion.button>

                <p className="text-gray-400 text-xs text-center flex items-center justify-center gap-2 mt-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                  Your contribution is appreciated and secure.
                </p>
              </form>
            </motion.div>

            <motion.div 
              className="hidden lg:block flex-1 relative bg-gray-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply z-10" />
              <img
                src="/images/GiveNowWaysToGive.png"
                alt="Donation"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GiveNowWaysToGive;
