import React from "react";

export default function Home_Video_Card({
  image = "/homeimages/news.png",
  title = "SUNDAY WORSHIP - MORNiNG SERVICE - REAL TEMPLE -PAS SURESH",
  subText = "LBNAGAR",
  link,
}) {
  const shareVideo = (link) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Page Title",
          url: window.location.href,
        })
        .then(() => {})
        .catch(() => {});
    }
  };

  return (
    <div className="w-full max-w-[400px] cursor-pointer hover:scale-[101%] duration-300 rounded-2xl bg-white shadow-md">
      <img
        src={image}
        alt={subText}
        className="w-full object-cover h-[300px] rounded-t-xl"
      />

      <div className="p-2">
        <p className="text-sm text-[#2B2B2B]">{title} </p>
        <p className="text-xs text-gray-400">- {subText}</p>
      </div>

      <div className="p-2 flex items-center gap-2 justify-between">
        <LinkBtn main={true} onClick={() => (window.location.href = link)} />
        {/* <LinkBtn title="View All Messages" /> */}
        <LinkBtn title="share" onClick={shareVideo} />
      </div>
    </div>
  );
}

function LinkBtn({ title = "Watch Now", onClick, main = false }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full w-full h-11  hover:scale-[103%] duration-300 cursor-pointer text-sm ${
        main
          ? "bg-myblue text-white hover:bg-white hover:border-myblue hover:border hover:text-myblue"
          : "bg-white text-second border-main border hover:bg-main hover:text-white"
      }`}
    >
      {title}
    </button>
  );
}
