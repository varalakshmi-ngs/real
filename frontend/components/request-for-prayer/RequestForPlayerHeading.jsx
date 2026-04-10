import React from "react";

const RequestForPlayerHeading = () => {
  return (
    <article className="w-full flex flex-col justify-center items-center  p-7">
      <h1 className="responsive-title">
        Share Your <span className="primary-text-color">Prayer Request</span>
      </h1>
      <p className="small-text-color text-[16px] font-normal text-center leading-4 w-full lg:w-1/2">
        We believe in the power of prayer. Whatever burden you carry, whatever
        joy you celebrate, our community is here to lift your intentions to God.
        Your requests will be treated with care and respect.
      </p>
    </article>
  );
};

export default RequestForPlayerHeading;
