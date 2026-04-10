"use client";
import React, { useState } from "react";
import MainBtn from "@/utils/MainBtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { errorMsgApi, successfully } from "@/Core/tosts";
import { API } from "@/Core/rl";

const RequestPrayerTable = () => {
  const schema = z.object({
    name: z.string().min(3),
    forWhom: z.string(),
    // prayerType: z.string(),
    language: z.string().min(3),
    city: z.string().min(3),
    mobile: z
      .string()
      .length(10, { message: "Mobile number must be exactly 10 digits" })
      .regex(/^\d+$/, { message: "Mobile number must contain only digits" }),
    message: z.string().min(15),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    // console.log(data)++;

    if (!prayer) {
      alert("Select Prayer type");
      return;
    }

    const formdata = {
      ...data,
      prayerType: prayer.key,
    };

    try {
      const res = await API.post("/web/prayer-request", formdata);

      successfully(res?.data?.message);
      // reset(); // reset form
    } catch (error) {
      errorMsgApi(error?.response?.data?.error || "Something went wrong");
    }
  };

  const [prayer, setPrayer] = useState({ title: "For Job", key: "Job" });

  const prayerTopics = [
    { title: "For Job", key: "Job" },
    { title: "For Family", key: "Family" },
    { title: "For Exams", key: "Exams" },
    { title: "For Financial Problems", key: "Finance" },
    { title: "For Marriage", key: "Marriage" },
    { title: "For Business", key: "Business" },
    { title: "For Healing", key: "Health" },
    { title: "For Spiritual Life", key: "Spiritual" },
    { title: "For Children", key: "Children" },
    { title: "For Emergency", key: "emergency" },
  ];

  // console.log(errors);
  return (
    <div className="p-[clamp(1rem,2vw,3rem)] flex flex-col lg:flex-row gap-4 w-full">
      <div className="w-full lg:w-[25%] flex flex-col border border-gray-600">
        {prayerTopics.map((topic, index) => (
          <span
            key={index}
            onClick={() => setPrayer(topic)}
            className={`p-3 py-4 font-sans font-semibold text-base w-full border-b border-b-gray-600 cursor-pointer transition-all duration-200 ${
              prayer.key === topic.key ? "bg-red-600 text-white" : ""
            }`}
          >
            {topic?.title}
          </span>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-[75%] gray-bg flex flex-col gap-4 p-[clamp(1rem,2vw,3rem)]"
      >
        <h1 className="responsive-title">
          Pray Request: <span className="text-red-600">{prayer.title}</span>
        </h1>

        <p className="small-text-color text-[16px] font-normal leading-4 w-full">
          Please tell us your problem & get a call back from our prayer team.
        </p>

        <div className="w-full h-1.5 bg-black" />

        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="flex flex-col gap-0">
            <label className="text-base text-black">First Name</label>
            <input
              className="w-[350px] h-[45px] outline-0 border-2 border-black rounded-md px-3 py-1 bg-white"
              placeholder="Enter First Name"
              type="text"
              {...register("name")}
            />
            {errors?.name && (
              <span className="text-red-500 text-sm">
                {errors?.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-base text-black">Prayer for whom</label>
            <select
              className="w-[350px] h-[45px] outline-0 border-2 border-black rounded-md px-3 py-1 bg-white"
              {...register("forWhom")}
            >
              <option>Select Person</option>
              <option>son</option>
              <option>Mother</option>
              <option>Others</option>
            </select>
            {errors?.forWhom && (
              <span className="text-red-500 text-sm">
                {errors?.forWhom.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="flex flex-col gap-0">
            <label className="text-base text-black">City</label>
            <input
              className="w-[350px] h-[45px] outline-0 border-2 border-black rounded-md px-3 py-1 bg-white"
              placeholder="Enter City"
              type="text"
              {...register("city")}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">
                {errors?.city.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-0">
            <label className="text-base text-black">Mobile Number</label>
            <input
              className="w-[350px] h-[45px] outline-0 border-2 border-e-black rounded-md px-3 py-1 bg-white"
              placeholder="9090909090"
              type="text"
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              {...register("mobile")}
            />
            {errors?.mobile && (
              <span className="text-red-500 text-sm">
                {errors?.mobile.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full">
          <label className="text-base text-black">Language</label>
          <select
            className="w-full h-[45px] outline-0 border-2 border-black rounded-md px-3 py-1 bg-white"
            {...register("language")}
          >
            <option>Select Language</option>
            <option>English</option>
            <option>Telugu</option>
            <option>Others</option>
          </select>
          {errors?.language && (
            <span className="text-red-500 text-sm">
              {errors?.language.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <label className="text-base text-black">Message</label>
          <textarea
            className="w-full h-[105px] outline-0 border-2 border-black rounded-md px-3 py-1 bg-white"
            placeholder="Leave a message"
            {...register("message")}
          />
          {errors?.message && (
            <span className="text-red-500 text-sm">
              {errors?.message.message}
            </span>
          )}
        </div>

        <MainBtn text="Request a Prayer" type={"submit"} customStyl={"w-fit"} />
      </form>
    </div>
  );
};

export default RequestPrayerTable;
