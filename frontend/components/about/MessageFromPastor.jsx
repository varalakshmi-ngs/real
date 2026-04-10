import React from "react";
import ImageComponent from "../UtilComponents/ImageComponent";
import { APIURL } from "@/Core/rl";

const MessageFromPastor = ({ data }) => {
  return (
    <div className="w-full bg-second">
      <h2 className="responsive-h2 text-end text-[36px] font-serif text-white p-5 ">
        A Message From Our Pastor
      </h2>
      <div className="flex items-end justify-end mb-6">
        <div className="w-[80%] bg-white h-1" />
      </div>
      <section className="px-4 sm:px-8 lg:px-16 py-10 flex flex-col lg:flex-row gap-6 items-start justify-center">
        <ImageComponent
          // imageUrl="/images/about-first-image.png"
          imageUrl={
            data?.image
              ? `${APIURL}/${data?.image}`
              : "/images/about-first-image.png"
          }
          className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-[300px] sm:w-[350px] md:w-[400px] lg:w-[500px] object-cover rounded-xl shadow-lg"
        />
        <section className="w-full lg:w-[75%] flex flex-col gap-4 text-white">
          <div className="flex items-center gap-4">
            <div className="w-[55px] h-[55px] bg-gray-600 rounded-full overflow-hidden">
              <img
                src={`${APIURL}/${data?.image}`}
                alt="Pastor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-serif tracking-wide font-medium">
                {data?.pasterName}
              </p>
              <p className="primary-text-color font-medium font-sans">
                {data?.title}
              </p>
            </div>
          </div>
          {data?.description?.split(".").map((text, idx) => (
            <p
              key={idx}
              className={`text-[16px] sm:text-[18px] font-normal font-sans leading-relaxed ${
                idx === 0 ? "mt-2" : ""
              }`}
            >
              {text}
            </p>
          ))}
        </section>
      </section>
    </div>
  );
};

export default MessageFromPastor;
