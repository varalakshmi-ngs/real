"use client";

import React, { useState } from "react";
import { useRazorpayPayment } from "@/Hooks/useRazorpayPayment";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Heart,
  X,
  ShieldCheck,
  HandHeart,
} from "lucide-react";

import { API } from "@/Core/rl";
import ImageLoader from "@/utils/ImageLoader";

const ManualDonationModal = ({
  isOpen,
  onClose,
  donorName,
  amount,
  onConfirm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);

    try {
      const success = await onConfirm();

      if (success) {
        setIsSuccess(true);

        setTimeout(() => {
          onClose();
          setIsSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Confirmation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-20 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-10">
              {isSuccess ? (
                <div className="py-16 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle2 size={54} />
                  </div>

                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    Donation Successful
                  </h2>

                  <p className="text-gray-600 mt-4 max-w-md leading-relaxed">
                    Thank you, {donorName}. Your generous support helps us
                    continue serving communities with faith and compassion.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <Heart size={16} />
                      Support Our Ministry
                    </div>

                    <h2 className="text-4xl font-serif font-bold text-gray-900">
                      Complete Your Contribution
                    </h2>

                    <p className="text-gray-500 mt-3 leading-relaxed max-w-lg mx-auto">
                      Use any payment method below and confirm once the
                      transaction is completed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT */}
                    <div className="space-y-5">
                      <div className="rounded-3xl bg-gradient-to-br from-red-600 to-red-500 p-6 text-white shadow-xl">
                        <p className="uppercase tracking-[3px] text-xs opacity-80 mb-2">
                          Contribution Amount
                        </p>

                        <h3 className="text-4xl font-bold">
                          ₹ {amount}
                        </h3>
                      </div>

                      <div className="rounded-3xl border border-gray-200 p-5 bg-gray-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                          UPI Payment
                        </h4>

                        <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200">
                          <p className="text-sm text-gray-500 mb-1">
                            UPI ID
                          </p>

                          <p className="font-semibold text-gray-900">
                            rgwm.withds1@ybl
                          </p>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-gray-200 p-5 bg-gray-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                          Bank Details
                        </h4>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Account Holder
                            </span>

                            <span className="font-semibold text-gray-900">
                              D. SURESH
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Account Number
                            </span>

                            <span className="font-semibold text-gray-900">
                              50100286369360
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              IFSC
                            </span>

                            <span className="font-semibold text-gray-900">
                              HDFC0001990
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Branch
                            </span>

                            <span className="font-semibold text-gray-900">
                              HAYATNAGAR
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />

                        <div className="relative p-5 bg-white rounded-[30px] shadow-2xl border border-gray-100">
                          <ImageLoader
                            src="/images/manual-donation-qr.jpeg"
                            alt="QR Code"
                            containerClassName="w-56 h-56"
                            className="w-full h-full object-contain rounded-2xl"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mt-6">
                        <img
                          src="https://www.vectorlogo.zone/logos/google_pay/google_pay-official.svg"
                          alt="GPay"
                          className="h-6"
                        />

                        <img
                          src="https://www.vectorlogo.zone/logos/phonepe/phonepe-icon.svg"
                          alt="PhonePe"
                          className="h-7"
                        />

                        <img
                          src="https://www.vectorlogo.zone/logos/paytm/paytm-icon.svg"
                          alt="Paytm"
                          className="h-4"
                        />
                      </div>

                      <div className="mt-8 w-full">
                        <motion.button
                          onClick={handleConfirm}
                          disabled={isSubmitting}
                          whileHover={{
                            scale: isSubmitting ? 1 : 1.02,
                          }}
                          whileTap={{
                            scale: isSubmitting ? 1 : 0.98,
                          }}
                          className={`w-full rounded-2xl py-4 text-lg font-semibold shadow-xl transition-all ${
                            isSubmitting
                              ? "bg-gray-400 text-white"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {isSubmitting
                            ? "Processing..."
                            : "Transaction Completed"}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <ShieldCheck size={18} className="text-green-600" />
                    Secure Contribution • Trusted Payment Process
                  </div>
                </>
              )}
            </div>
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

  const [successData, setSuccessData] = useState({
    name: "",
    amount: "",
  });

  const { initiatePayment } = useRazorpayPayment();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmDonation = async () => {
    try {
      const response = await API.post(
        "/web/submit-donation",
        formData
      );

      if (response.data.success) {
        setFormData({
          purpose: "",
          fullName: "",
          mobile: "",
          email: "",
          amount: "",
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);

      alert("Failed to process donation.");

      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessData({
      name: formData.fullName,
      amount: formData.amount,
    });

    setShowSuccess(true);
  };

  return (
    <>
      <ManualDonationModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        donorName={successData.name}
        amount={successData.amount}
        onConfirm={handleConfirmDonation}
      />

      <section
        id="contribution"
        className="bg-[#f6f7fb] py-24 px-6 sm:px-12 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* HEADING */}
          <motion.div
            className="flex flex-col items-center gap-5 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <HandHeart size={16} />
              Support With Love
            </div>

            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900">
              Ways to <span className="text-red-600">Give</span>
            </h2>

            <div className="h-1 w-24 bg-red-600 rounded-full" />
          </motion.div>

          {/* MAIN CARD */}
          <div className="overflow-hidden rounded-[40px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row">
            {/* FORM */}
            <motion.div
              initial={{
                opacity: 0,
                x: -80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 p-8 sm:p-12 lg:p-16"
            >
              <div className="mb-10">
                <h3 className="text-4xl font-serif font-bold text-gray-900">
                  Enter Details
                </h3>

                <p className="text-gray-500 mt-3 text-lg">
                  Fill in your information to continue your
                  contribution securely.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                {/* PURPOSE */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Purpose
                  </label>

                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-gray-800 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    required
                  >
                    <option value="">
                      Select Purpose
                    </option>

                    <option value="community-outreach">
                      Community Outreach
                    </option>

                    <option value="global-missions">
                      Global Missions
                    </option>

                    <option value="church-growth">
                      Church Growth
                    </option>
                  </select>
                </div>

                {/* NAME + MOBILE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                      className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>

                {/* DONATION */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="text-sm font-semibold text-gray-700">
                    Donation Amount
                  </label>

                  <div className="flex flex-wrap gap-4 mt-4">
                    {[50, 100, 200, 500, 2000].map((value) => (
                      <motion.button
                        whileHover={{
                          y: -3,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        key={value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            amount: value,
                          }))
                        }
                        className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                          Number(formData.amount) === value
                            ? "bg-red-600 text-white shadow-lg shadow-red-200"
                            : "bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700"
                        }`}
                      >
                        ₹{value}
                      </motion.button>
                    ))}
                  </div>

                  <div className="relative mt-5">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Enter Custom Amount"
                      className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-5 text-lg font-semibold outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  className="w-full h-16 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-lg font-semibold shadow-xl shadow-red-200 transition-all"
                >
                  Complete Donation
                </motion.button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-2">
                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />

                  Secure Contribution • Encrypted & Protected
                </div>
              </form>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              className="hidden lg:block flex-1 relative overflow-hidden bg-black"
              initial={{
                opacity: 0,
                x: 80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

              <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/30 blur-[120px] rounded-full z-10" />

              <motion.img
                src="/images/GiveNowWaysToGive.png"
                alt="Donation"
                initial={{
                  scale: 1.12,
                }}
                whileInView={{
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute bottom-10 left-10 z-20 max-w-md">
                <p className="text-red-400 uppercase tracking-[4px] text-sm mb-4">
                  Real Temple Church
                </p>

                <h3 className="text-5xl font-serif font-bold text-white leading-tight">
                  Every Gift Changes Lives
                </h3>

                <p className="text-white/80 mt-5 text-lg leading-relaxed">
                  Your generosity empowers missions, supports
                  outreach, and brings hope to families around the
                  world.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GiveNowWaysToGive;