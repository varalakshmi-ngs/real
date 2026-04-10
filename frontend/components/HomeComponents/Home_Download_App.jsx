import Link from "next/link";
import React from "react";

export default function Home_Download_App() {
  return (
    <section className="w-full bg-white py-10 flex items-center justify-end">
      <div className="bg-main w-[90%]  rounded-l-xl shadow-xl p-6 md:p-12 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span>Stay Connected.</span> <br />
            <span className="text-yellow-200">
              Download the. <br></br>Real Temple App
            </span>
          </h2>

          <p className="text-white text-sm md:text-base leading-relaxed text-justify">
            Experience church anytime, anywhere with the Real Temple App! With
            just a few taps, you can: <br></br>
            Watch live services and stay connected with powerful worship and
            messages Catch up on recent sermons and teachings.<br></br> See
            what's coming up — from events to guest speakers. <br></br> Give
            securely and quickly, without the need for cash or cards. Whether
            you’re at home, at work, or on the go — Real Temple is
            always with you.
          </p>

          <h3 className="font-semibold text-white text-lg">Get the App</h3>

          <div className="flex flex-wrap gap-4">
            <button
              className="cursor-pointer"
              onClick={() =>
                window.open("https://play.google.com/store/games?hl=en")
              }
            >
              <img
                src="/homeimages/playstore.png"
                alt="Get it on Google Play"
                className="h-12 sm:h-14 md:h-16"
              />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => window.open("https://www.apple.com/in/store")}
            >
              <img
                src="/homeimages/appstore.png"
                alt="Download on the App Store"
                className="h-12 sm:h-14 md:h-16"
              />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/homeimages/mobileapp.png"
            alt="Real Temple App"
            className="w-3/4 md:w-full max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
}
