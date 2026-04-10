"use client";
import React, { useEffect, useState } from "react";
import BlackBtn from "../UtilComponents/BlackBtn";
import { ArrowLeftCircle, ArrowRightCircle, LibraryBig } from "lucide-react";
import { APIURL } from "@/Core/rl";

const Testimonials = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(data.length / itemsPerSlide);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="gray-bg w-full flex flex-col gap-4 overflow-hidden">
      <div className="p-[clamp(1rem,2vw,3rem)]">
        <BlackBtn text={"Our Community"} width="250px" />
      </div>

      <div className="bg-second w-full lg:w-[90%] h-[5px]" />

      <div className="relative overflow-hidden w-full px-[clamp(1rem,2vw,3rem)]">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {data?.map((testimonial, index) => {
            if (testimonial?.isApproved === "approved") {
              return (
                <div
                  key={index}
                  className={`${
                    isMobile ? "min-w-full" : "min-w-[300px]"
                  } flex-shrink-0 cursor-pointer hover:scale-[102%] duration-300`}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="flex w-full gap-4 justify-end items-center p-4">
        <button
          onClick={prevSlide}
          className="bg-white rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous testimonial"
        >
          <ArrowLeftCircle
            color="red"
            className="cursor-pointer hover:scale-115 duration-200"
            size={30}
          />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next testimonial"
        >
          <ArrowRightCircle
            color="red"
            className="cursor-pointer hover:scale-115 duration-200"
            size={30}
          />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="shadow w-[400px] h-[280px] p-6 rounded-md bg-white flex flex-col gap-4">
      <LibraryBig size={30} color="red" />
      <div className="w-full flex items-center justify-center gap-3">
        <div className="w-[50px] h-[50px] bg-gray-500 rounded-full">
          {testimonial?.image ? (
            <img
              src={`${APIURL}/${testimonial.image}`}
              className="h-full w-full object-cover rounded-full"
              alt=""
            />
          ) : (
            <div className="h-full w-full bg-gray-300 rounded-full" />
          )}
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-base text-black font-sans">
            {testimonial?.name || "Anonymous"}
          </span>
          <span className="-mt-1 text-red-600 font-sans font-normal">
            Member since {new Date(testimonial?.createdAt)?.getFullYear()}
          </span>
        </div>
      </div>
      <p className="text-second text-sm font-sans font-normal">
        "
        {testimonial.comment ||
          "No message available. This testimonial is empty."}
        "
      </p>
    </div>
  );
};
