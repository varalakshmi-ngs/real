import { BellDot } from "lucide-react";
import React from "react";

export default function LiveNotification({ onClick }) {
  return (
    <div
      className="relative cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      {/* Notification Badge */}
      <div className="absolute -right-2 -top-2 z-10">
        <div className="flex h-5 w-5 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white">
            <BellDot />
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-bl from-gray-900 via-gray-950 to-black p-[1px] shadow-2xl shadow-red-500/20">
        <div className="relative flex items-center gap-4 rounded-xl bg-gray-950 px-6 py-3 transition-all duration-300 group-hover:bg-gray-950/50">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-200 to-red-400 transition-transform duration-300 group-hover:scale-110">
            <BellDot className="text-white font-bold" />
            <div className="absolute inset-0 rounded-lg bg-red-500/50 blur-sm transition-all duration-300 group-hover:blur-md"></div>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-white">
              Real Temple is Live
            </span>
            <span className="text-[10px] font-medium text-red-400/80">
              Watch Now
            </span>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-400 via-red-500 to-red-600 opacity-20 transition-opacity duration-300 group-hover:opacity-40"></div>
      </div>
    </div>
  );
}
