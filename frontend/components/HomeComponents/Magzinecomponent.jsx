"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function MagazinePage() {

  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    getMagazines();
  }, []);

  const getMagazines = async () => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/magazine`
      );

      const data = await response.json();

      setMagazines(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="w-full min-h-screen bg-[#f4f4f6]">

      {/* TOP SECTION */}

      <div className="bg-white py-14 md:py-20 px-4 border-b border-gray-200">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="font-black leading-tight tracking-tight">

            <span className="text-[#001b5e] text-[45px] md:text-[55px]">
              Our
            </span>{" "}

            <span className="text-red-600 text-[45px] md:text-[55px]">
              Magazines
            </span>

          </h1>

          <div className="w-24 h-[5px] bg-red-600 mx-auto mt-4 rounded-full"></div>

          <p className="mt-8 text-gray-500 text-[17px] md:text-[22px] max-w-4xl mx-auto leading-[1.8] font-medium">
            Sermons, devotionals, and inspiring updates from
            The Real Temple community.
          </p>

        </div>
      </div>

      {/* MAGAZINES SECTION */}

      <div className="py-14 md:py-20 px-4 md:px-6">

        {/* HEADING */}

        <div className="flex flex-col items-center justify-center mb-12 md:mb-16">

          <h2 className="leading-tight tracking-tight font-black">

            <span className="text-[#001b5e] text-[25px] md:text-[37px]">
              Latest
            </span>{" "}

            <span className="text-red-600 text-[25px] md:text-[37px]">
              Magazines
            </span>

          </h2>

          <div className="w-24 h-[5px] bg-red-600 rounded-full mt-4"></div>

        </div>

        {/* CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">

          {magazines?.map((item) => {

            const pdfUrl =
              `${process.env.NEXT_PUBLIC_API_URL}${item.pdf}`;

            const previewUrl =
              `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

            return (

              <div
                key={item.id}
                className="w-full max-w-[360px] bg-white rounded-[18px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >

                {/* PDF PREVIEW */}

                <div className="relative h-[320px] overflow-hidden bg-[#ececec]">

                  <iframe
                    src={previewUrl}
                    className="w-full h-full pointer-events-none"
                    title={item.title}
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-black/10"></div>

                  {/* BADGE */}

                  <div className="absolute top-4 left-4">

                    <span className="bg-red-600 text-white text-[10px] font-semibold px-4 py-2 rounded-full uppercase tracking-wide shadow-md">

                      Magazines

                    </span>

                  </div>

                  {/* OPEN ICON */}

                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-lg shadow-md transition"
                  >

                    <ExternalLink
                      size={16}
                      className="text-black"
                    />

                  </a>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#001b5e] leading-snug line-clamp-1">

                    {item.title}

                  </h2>

                  <p className="text-gray-500 text-[14px] mt-2 leading-relaxed line-clamp-2 min-h-[44px]">

                    {item.subTitle}

                  </p>

                  {/* BOTTOM */}

                  <div className="flex items-center justify-between mt-6">

                    <div className="flex items-center gap-2 text-gray-500 text-[13px]">

                      <Calendar size={15} />

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}

                    </div>

                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-[13px] font-semibold flex items-center gap-2 transition"
                    >

                      Read Now

                      <ArrowRight size={15} />

                    </a>

                  </div>
                </div>
              </div>

            );
          })}

        </div>
      </div>
    </div>
  );
}