import { API } from "@/Core/rl";
import { errorMsgApi, successfully } from "@/Core/tosts";
import MainBtn from "@/utils/MainBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ReuestPrayerForm({ title }) {
  const schema = z.object({
    name: z.string().min(3),
    forWhom: z.string(),
    language: z.string().min(3),
    city: z.string().min(3),
    mobile: z
      .string()
      .length(10, { message: "Mobile number must be exactly 10 digits" })
      .regex(/^\d+$/, { message: "Mobile number must contain only digits" }),
    message: z.string().min(15),
  });
  const [prayer, setPrayer] = useState({ title: "For Job", key: "Job" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/web/prayer-request", {
        ...data,
        prayerType: prayer?.key,
      });

      successfully(res?.data?.message);
    } catch (error) {
      errorMsgApi(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex w-full justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-200"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Prayer Request <span className="text-red-600 text-4xl">✝</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Requesting prayers for:{" "}
            <span className="text-red-600 font-semibold">{title}</span>
          </p>
        </div>

        <div className="border-b border-gray-200" />

        {/* Name + For Whom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              First Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter First Name"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none shadow-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Prayer For Whom
            </label>
            <select
              {...register("forWhom")}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none shadow-sm"
            >
              <option>Select Person</option>
              <option>Son</option>
              <option>Mother</option>
              <option>Others</option>
            </select>
          </div>
        </div>

        {/* City + Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              City
            </label>
            <input
              {...register("city")}
              placeholder="Enter City"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              {...register("mobile")}
              placeholder="9090909090"
              maxLength={10}
              inputMode="numeric"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none shadow-sm"
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Language
          </label>
          <select
            {...register("language")}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none shadow-sm"
          >
            <option>Select Language</option>
            <option>English</option>
            <option>Telugu</option>
            <option>Others</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Message
          </label>
          <textarea
            {...register("message")}
            placeholder="Write your prayer request..."
            className="w-full p-3 h-28 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none shadow-sm resize-none"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <MainBtn
            text="🙏 Request a Prayer"
            type="submit"
            customStyl="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-200"
          />
        </div>
      </form>
    </div>
  );
}
