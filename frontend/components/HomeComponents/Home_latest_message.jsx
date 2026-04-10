import { APIURL } from "@/Core/rl";
import MainBtn from "@/utils/MainBtn";
import React from "react";

export default function Home_latest_message({ data }) {
  return (
    <section className="md:h-[100vh] relative bg-white flex items-center justify-center px-4 sm:px-8 py-4">
      <div className="bg-main  md:w-[90%] md:absolute right-0 p-4 space-y-3">
        <div className="flex justify-end flex-col gap-2">
          <h2 className="text-3xl bg-white font-serif text-end px-4 py-2  w-fit self-end">
            <span className="text-main">Latest Message</span>
          </h2>

          <div className="h-2 bg-white w-full" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:h-[400px] md:w-[300px] p-5">
            <img
              className="h-full rounded-xl w-full"
              src={`${APIURL}/${data?.thumbnailImage}`}
              alt=""
            />
          </div>

          <div className="text-white space-y-4">
            <h2 className="font-serif font-semibold text-4xl text-center md:text-start">
              {data?.heading}
            </h2>
            <p className="font-sans font-light max-w-2xl text-justify">
              {data?.description}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <img
                  // src="/homeimages/michaeljackson.png"
                  src={`${APIURL}/${data?.thumbnailImage}`}
                  className="h-[50px] w-[50px] object-cover rounded-full"
                  alt=""
                />

                <div>
                  <p>{data?.hostName}</p>
                  <p>{data?.title}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MainBtn
                  invert
                  text="Watch Full Sermon"
                  onClick={() => (window.location.href = data?.youtubeLink)}
                />
                <MainBtn invert text="Browse All Sermon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
