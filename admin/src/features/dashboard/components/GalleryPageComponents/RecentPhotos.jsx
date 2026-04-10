import React from "react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import { APIURL } from "../../../../Core/url";

export default function RecentPhotos({ images }) {
  console.log("RECENT IMAGES", images);

  return (
    <OpenCloseLayout title="Recent Photo's">
      <div className="grid w-full grid-cols-3  gap-4">
        {images?.map((e) => {
          return (
            <img
              key={e._id}
              src={`${APIURL}/${e.image}`}
              className="w-[300px] h-[300px] object-cover"
            />
          );
        })}
      </div>
    </OpenCloseLayout>
  );
}
