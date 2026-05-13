"use client";

import MainBtn from "@/utils/MainBtn";
import { Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { API } from "@/Core/rl";
import { motion } from "framer-motion";

export default function ChurchTimings() {
  const [service, setService] = useState([]);
  const tableRef = useRef();

  const handleImageDownload = () => {
    if (!tableRef.current) return;

    toPng(tableRef.current, { backgroundColor: "#fff" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "church-timetable.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Image generation failed", err);
      });
  };

  const getServiceApi = async () => {
    try {
      const res = await API.get("/services");
      setService(res.data?.services ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServiceApi();
  }, []);

  return (
    <section className="relative px-6 sm:px-12 py-16 bg-gradient-to-br from-red-50 to-white overflow-hidden">
      
      {/* Background Blur Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 relative z-10">
        
        {/* Heading */}
        <motion.div
          className="flex flex-col w-full text-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 bg-white px-8 py-3 rounded-2xl shadow-md">
            Church <span className="text-red-600">Timings</span>
          </h2>

          <div className="h-1 bg-red-600 w-24 rounded-full mt-4" />
        </motion.div>

        {/* Table */}
        <motion.div
          className="w-full overflow-x-auto mt-6 rounded-2xl shadow-xl border border-gray-100 bg-white"
          ref={tableRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
        >
          <div className="min-w-max p-3 sm:p-5">
            <TimingsTable newData={service} />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="mx-auto w-fit flex flex-wrap justify-center mt-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MainBtn
            text="Get Directions"
            customStyl="bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all duration-300 text-white rounded-xl px-6 py-3"
            onClick={() =>
              window.open(
                "https://maps.app.goo.gl/CTuqhu8mGWtsgVLk8",
                "_blank"
              )
            }
          />

          <MainBtn
            invert
            text="Share"
            icon={<Share2 />}
            customStyl="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-xl px-6 py-3"
            onClick={handleImageDownload}
          />
        </motion.div>
      </div>
    </section>
  );
}

function TimingsTable({ newData }) {
  const todayIndex = new Date().getDay();

  const daysOrder = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const serviceMap = {};

  newData.forEach((service) => {
    serviceMap[service.day.toLowerCase()] = service;
  });

  const generateTableData = () => {
    const weekDays = [
      "Week Days",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const departments = ["Department"];
    const services01 = ["Services 01"];
    const services02 = ["Services 02"];

    daysOrder.forEach((day) => {
      const serviceData = serviceMap[day];

      if (serviceData) {
        departments.push(serviceData.department);
        services01.push(serviceData.service1 || "-");
        services02.push(serviceData.service2 || "-");
      } else {
        departments.push("-");
        services01.push("-");
        services02.push("-");
      }
    });

    return [weekDays, departments, services01, services02];
  };

  const dynamicTimetable = generateTableData();

  return (
    <div className="grid grid-cols-8 gap-[2px] bg-gray-100 p-[2px] rounded-xl text-xs sm:text-sm">
      {dynamicTimetable.map((row, rowIndex) =>
        row.map((text, colIndex) => {
          const isTodayColumn = colIndex === todayIndex + 1;
          const isLabelColumn = colIndex === 0;

          const blockColor = isLabelColumn
            ? "bg-gray-900 text-white font-semibold"
            : isTodayColumn
            ? "bg-gradient-to-br from-red-500 to-red-600 text-white font-semibold shadow-md relative z-10"
            : "bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300";

          return (
            <Block
              key={`${rowIndex}-${colIndex}`}
              text={text}
              blockColor={blockColor}
            />
          );
        })
      )}
    </div>
  );
}

function Block({ text, blockColor }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`p-3 sm:p-4 flex items-center justify-center min-h-[58px] rounded-md whitespace-nowrap text-center ${blockColor}`}
    >
      <span>{text}</span>
    </motion.div>
  );
}