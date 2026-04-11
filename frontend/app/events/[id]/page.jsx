"use client";
import EventHero from "@/components/event-details/EventHero";
import EventCard from "@/components/events/EventCard";
import { useSignleEventHook } from "@/Hooks/single-event.hook";
import React from "react";
import { useParams } from "next/navigation";
import StatusWrapper from "@/utils/StatusWrapper";

const page = () => {
  const { id } = useParams();

  const {
    singleEvent,
    suggestionEvent,
    loading,
    error,
    blogLoading,
    blogError,
    suggestionBlog,
  } = useSignleEventHook({
    id,
  });

  return (
    <div className="w-full flex flex-col gap-2 bg-white ">
      <StatusWrapper loading={loading} error={error}>
        <EventHero singleEvent={singleEvent} />
        <div className="w-full flex flex-col gap-4 p-[clamp(1rem,2vw,3rem)] bg-second">
          <h2 className="text-lg font-sans font-semibold text-white">
            More Events
          </h2>
          <p className="text-sm font-sans font-normal text-white">
            Whether it's Sunday service or a midweek event, you're always
            welcome here.
          </p>
          <div className=" flex flex-wrap gap-8 justify-center items-center">
            {suggestionEvent?.map((event, key) => (
              <EventCard key={key} event={event} />
            ))}
          </div>
        </div>
      </StatusWrapper>
    </div>
  );
};

export default page;
