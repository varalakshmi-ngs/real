import React from "react";
import CountUp from "react-countup";

export default function Home_Countings() {
  const counts = [
    { count: 50, suffix: "M+", text: "TV Outreach" },
    { count: 30, suffix: "k+", text: "Follower's on Instagram" },
    { count: 25, suffix: "k+", text: "YouTube Subscribers" },
    { count: 200, suffix: "+", text: "Volunteers" },
  ];

  return (
    <section className="bg-white flex items-center justify-center md:justify-start py-8">
      <div className="bg-main w-full md:w-11/12 p-8 rounded-xl shadow-lg text-white space-y-8">
        <h2 className="font-serif text-5xl md:text-6xl max-w-3xl leading-tight">
          <span>We're a family of</span> <br />
          <span>
            <CountUp
              // start={100000}
              end={300000}
              duration={1.5}
              separator=","
              enableScrollSpy={true}
              scrollSpyDelay={150}
            />
            +
          </span>{" "}
          members
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 w-full">
            <img
              src="/homeimages/people.png"
              alt="People"
              className="rounded-lg shadow-xl h-[400px] w-full object-cover"
            />
          </div>

          <div className="md:w-1/2 w-full grid grid-cols-2 gap-10 text-center font-sans">
            {counts.map(({ count, suffix, text }, idx) => (
              <CountBadge key={idx} count={count} suffix={suffix} text={text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountBadge({ count, suffix, text }) {
  return (
    <div className="cursor-default transition transform hover:scale-105">
      <h2 className="text-6xl md:text-7xl font-semibold">
        <CountUp
          // start={0}
          end={count ?? 0}
          duration={1.5}
          separator=","
          enableScrollSpy={true}
          scrollSpyDelay={150}
        />
        {suffix}
      </h2>
      <p className="mt-2 text-sm md:text-base text-white">{text}</p>
    </div>
  );
}
