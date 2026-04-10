import React from "react";

export default function Home_Our_Mission() {
  return (
    <section className="relative bg-white flex items-center justify-end md:px-0 px-4  py-4">
      <div className="bg-main md:w-[90%]  p-4 space-y-3 pb-20">
        <div className="flex justify-end flex-col gap-2">
          <h2 className="text-3xl bg-white font-serif text-end px-4 py-2 w-fit self-end">
            <span className="text-main">Our Mission</span>
          </h2>

          <div className="h-2 bg-white w-full" />
        </div>

        <p className="text-white w-full">
          At Real Temple Church, our mission is simple yet profound: To glorify
          God by making disciples, transforming lives, and serving communities
          with the love and truth of Jesus Christ. We are called to be a temple
          church built on the foundation of God’s Word, reaching Hyderabad and
          beyond with the message of hope and salvation.
        </p>

        {/* Image Container */}
        <div className="flex flex-col md:flex-row w-full md:w-[90%] gap-4 items-start justify-between mt-4">
          <img
            src="/homeimages/ourmission1.png"
            alt="Our Mission"
            className="md:w-[48%] rounded-2xl"
          />

          <img
            src="/homeimages/ourmission2.png"
            alt="Our Mission"
            className="md:w-[48%] rounded-2xl md:relative md:top-14"
          />
        </div>
      </div>
    </section>
  );
}
