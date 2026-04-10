import React from "react";

const AboutHeading = ({ data }) => {
  return (
    <article className="w-full flex flex-col justify-center items-center px-6 sm:px-12 py-12 md:py-20 bg-gray-50">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-center mb-6 leading-tight">
        {data?.title?.split(" ")?.map((e, index) => {
          return (
            <span
              key={index}
              className={`${index !== 0 ? "text-red-600" : "text-gray-900"}`}
            >
              {e}{" "}
            </span>
          );
        })}
      </h1>
      <p className="w-full md:w-[80%] lg:w-[60%] font-sans text-gray-600 text-lg md:text-xl text-center leading-relaxed">
        {data?.subText}
      </p>
    </article>
  );
};

export default AboutHeading;
