import { CalendarCheck, MapPin, User } from "lucide-react";
import React from "react";

export default function Home_Join_Weekend({ data }) {
  const firstBox = data?.[0];
  const secondBox = data?.[1];

  return (
    <section className="w-full bg-white py-5">
      <div className="bg-[#E9E9E9] items-start lg:w-[90%]  p-4 space-y-6 pb-24 relative">
        <h2 className="text-3xl bg-white font-serif text-end px-4 py-2 w-fit self-end">
          <span className="text-main">Join Us This Weekend</span>
        </h2>

        <div className="hidden lg:block h-2 absolute left-0 bg-second w-[90%] top-50" />

        <div className="flex flex-col gap-10">
          {firstBox && (
            <div className="flex justify-center lg:justify-end">
              <CalendarBox data={firstBox} />
            </div>
          )}

          {secondBox && (
            <div className="flex justify-center lg:justify-start">
              <CalendarBox bg="bg-white" text="text-main" data={secondBox} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CalendarBox({
  bg = "bg-main",
  text = "text-white",
  className = "",
  data,
}) {
  return (
    <div
      className={`p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto ${text} ${bg} shadow-md flex gap-4 flex-col justify-between transition-all duration-300 rounded-lg ${className} relative`}
    >
      <div
        className={`lg:flex hidden flex-col items-center font-serif absolute right-4 lg:right-10 top-0 p-4 text-sm sm:text-base lg:text-lg ${
          bg === "bg-white" ? "bg-myblue text-white" : "bg-white text-myblue"
        } shadow-sm rounded-md`}
      >
        {(() => {
          const { month, dayYear } = formatDateToSpans(
            data?.date || "2025-01-01"
          );
          return (
            <>
              <span>{month}</span>
              <span>{dayYear}</span>
              <span>{convertTo12HourFormat(data?.time)}</span>
            </>
          );
        })()}
      </div>

      {/* Icon + Title */}
      <div className="relative flex items-center gap-4">
        <CalendarCheck
          color={bg === "bg-white" ? "#1a3c34" : "white"}
          size={48}
        />
        <div className="space-y-1">
          <p className="text-xl sm:text-2xl font-semibold">{data?.title}</p>
          <div
            className={`h-[2px] w-1/3 ${
              bg === "bg-white" ? "bg-main" : "bg-white"
            }`}
          />
          <div
            className={`h-[2px] w-2/3 ${
              bg === "bg-white" ? "bg-main" : "bg-white"
            }`}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base lg:text-lg font-medium mt-2">
        {data?.description}
      </p>

      {/* Details Section */}
      <div className="flex flex-col gap-3 text-sm lg:text-base italic w-full mt-4">
        <div className="flex items-center gap-2">
          <User size={20} />
          <p>- by Pastor: {data?.subText}</p>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={20} />
          <p>{data?.location}</p>
        </div>

        {/* Date Section: Mobile */}
        <div
          className={`flex lg:hidden gap-3 items-center font-serif w-full rounded-md p-4 text-sm sm:text-base ${
            bg === "bg-white" ? "bg-myblue text-white" : "bg-white text-myblue"
          } shadow-sm`}
        >
          {(() => {
            const { month, dayYear } = formatDateToSpans(
              data?.date || "2025-01-01"
            );
            return (
              <>
                <span>{month}</span>
                <span>{dayYear}</span>
                <span>{convertTo12HourFormat(data?.time)}</span>
              </>
            );
          })()}
        </div>
      </div>

      {/* Join Button */}
      <button
        onClick={() => (window.location.href = data?.youtubeLink)}
        className={`cursor-pointer p-3 rounded-md font-semibold hover:bg-main hover:text-white transition-colors duration-200 w-fit mt-6
        ${bg === "bg-main" ? "bg-white text-myblue" : "bg-myblue text-white"}`}
      >
        {data?.buttonText || "Join Now"}
      </button>
    </div>
  );
}

function formatDateToSpans(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const suffix = getOrdinalSuffix(day);
  const formattedDay = `${day}${suffix}`;

  return {
    month,
    dayYear: `${formattedDay} ${year}`,
  };
}

function convertTo12HourFormat(time24) {
  if (!time24) return "Invalid time";

  const [hours, minutes] = time24.split(":");
  if (!hours || !minutes) return "Invalid time";

  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minutes} ${period}`;
}
