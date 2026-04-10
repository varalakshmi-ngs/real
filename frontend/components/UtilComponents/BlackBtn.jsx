import React from "react";

const BlackBtn = ({
  text,
  width = "120px",
  className = "bg-[#2B2B2B] text-white",
}) => {
  return (
    <button
      style={{ width }}
      className={`font-serif px-4 cursor-pointer py-3  rounded-lg  text-base font-[600] ${className}`}
    >
      {text}
    </button>
  );
};

export default BlackBtn;
