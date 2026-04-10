"use client";

import { useState } from "react";
import { Event } from "../event-details/EventBlog";

const TabBasedBlog = ({ blog, fetchBlogs }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* events */}
      <div className="p-[clamp(1rem,2vw,3rem)] flex flex-wrap gap-4 justify-center">
        {blog?.map((singleBlog, index) => (
          <Event
            key={index}
            singleBlog={singleBlog}
            index={`${blog?._id}-${index}`}
            color="text-black"
          />
        ))}
      </div>
    </div>
  );
};

export default TabBasedBlog;
