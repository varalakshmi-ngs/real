import { APIURL } from "@/Core/rl";
import { formatEventDate } from "@/utils/functions/date-modification";
import { Calendar, Locate, User } from "lucide-react";
import React from "react";

const EventHero = ({ singleEvent }) => {
  const { month, dayWithSuffix, year } = formatEventDate(singleEvent?.date);
  return (
    <div className="p-[clamp(1rem,2vw,3rem)] w-full flex flex-col lg:flex-row justify-between items-end gap-6">
      <div className="w-full lg:w-[50%] flex flex-col gap-3 items-start">
        <h1 className="responsive-title">
          {singleEvent?.eventName}{" "}
          <span className="primary-text-color">Praise & Power</span>
        </h1>
        <p className="small-text-color text-[16px] font-normal text-center leading-4">
          An evening to surrender, sing, and experience God's presence together.
        </p>
        <div className="flex items-center gap-4">
          <Calendar size={50} color="#e60023" />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-sans font-normal">
              {month} {dayWithSuffix} {year}
            </span>
            <span className="w-[120px] h-[3px] bg-[#e60023]" />
            <span className="w-[220px] h-[2px] bg-[#e60023]" />
          </div>
        </div>
        <p className="text-lg font-semibold font-sans">
          {singleEvent?.eventType}
        </p>
        <div className="flex gap-3 items-center">
          <User color="#e60023" size={30} />
          <span className="small-text-color text-lg font-normal font-sans mt-1">
            Worship Ministry Team
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <Locate color="#e60023" size={30} />
          <span className="small-text-color text-lg font-normal font-sans mt-1">
            {singleEvent?.location}
          </span>
        </div>
        <p className="small-text-color text-lg ">{singleEvent?.description}</p>
      </div>
      <div className="w-full lg:w-[50%] flex justify-end items-end">
        <img
          src={`${APIURL}/uploads/${singleEvent?.image}`}
          alt="event-details"
          className="w-full lg:w-[90%] h-[300px] rounded-md"
        />
      </div>
    </div>
  );
};

export default EventHero;
