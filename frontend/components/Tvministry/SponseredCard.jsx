"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IndianRupee } from "lucide-react";
import { useRazorpayPayment } from "@/Hooks/TvMistryHook";

const tvOptions = [
  { name: "Subhavartha TV", price: 12000 },
  { name: "Calvary TV", price: 10000 },
  { name: "Good News TV", price: 15000 },
];

// Define validation schema using zod
const formSchema = z.object({
  language: z.string().min(1, "Please select a language"),
  tvChannel: z.string().min(1, "Please select a TV channel"),
  adCount: z.number().min(1, "Please select number of ads").max(5),
  fullName: z.string().min(3, "Please enter a valid name"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
});

const SponsorCard = () => {
  const { initiatePayment } = useRazorpayPayment();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "Telugu",
      tvChannel: tvOptions[0].name,
      adCount: 1,
      fullName: "",
      mobile: "",
    },
  });

  const selectedTVName = watch("tvChannel");
  const adCount = watch("adCount");
  const selectedTV = tvOptions.find((tv) => tv.name === selectedTVName);
  const totalPrice = selectedTV ? selectedTV.price * adCount : 0;

  const onSubmit = async (data) => {
    try {
      const paymentData = {
        ...data,
        amount: totalPrice,
        purpose: `sponsorship`,
      };
      await initiatePayment(paymentData);

      reset();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("An error occurred while initiating payment. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-main mb-6 text-center">
        Sponsor a TV Program and Be Blessed
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              {...register("language")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            >
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
            </select>
            {errors.language && (
              <p className="text-red-500 text-sm mt-1">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* TV Channel Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TV Channel
            </label>
            <select
              {...register("tvChannel")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            >
              {tvOptions.map((tv) => (
                <option key={tv.name} value={tv.name}>
                  {tv.name}
                </option>
              ))}
            </select>
            {errors.tvChannel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tvChannel.message}
              </p>
            )}
          </div>

          {/* Ads Count Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Ads
            </label>
            <select
              {...register("adCount", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            >
              {[1, 2, 3, 4, 5].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            {errors.adCount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adCount.message}
              </p>
            )}
          </div>

          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Mobile Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              {...register("mobile")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="Enter your 10-digit mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Price Summary */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {selectedTVName}
              </h4>
              <p className="text-sm text-gray-500">{watch("language")}</p>
            </div>
            <div className="flex items-center text-green-600 text-xl font-bold">
              <IndianRupee className="w-5 h-5 mr-1" />
              {totalPrice.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-main text-white px-8 py-2 rounded-full text-base font-medium hover:bg-main/90 transition"
          >
            Proceed to Sponsor
          </button>
        </div>
      </form>
    </div>
  );
};

export default SponsorCard;
