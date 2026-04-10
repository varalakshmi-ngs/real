"use client";
import MainBtn from "@/utils/MainBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const JesusFooterImage = () => {
  const route = useRouter();
  return (
    <div className="w-full h-[420px] p-[clamp(1rem,2vw,3rem)] relative flex justify-center items-center">
      <img
        src="/images/jesus-footer-image.png"
        alt=""
        className="w-full h-full blur-xs z-0"
      />
      <div className="flex justify-center items-center flex-col gap-4 absolute z-10 p-3">
        <button className="text-main px-6 py-3 bg-white text-lg font-[600] font-serif">
          Join Us This Sunday
        </button>
        <p className="font-sans  text-white text-center">
          We'd love to welcome you to our church family. Experience uplifting
          worship, relevant teaching, and authentic community.
        </p>
        <div className="flex gap-4 items-center ">
          <MainBtn text="Service Times" onClick={() => route.push("/events")} />
          <MainBtn
            onClick={() => route.push("/contact")}
            text="Contact us"
            invert={true}
            customStyl="bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default JesusFooterImage;
