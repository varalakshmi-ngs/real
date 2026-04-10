import React from "react";

export default function MainBtn({
  text = "save",
  invert = false,
  customStyl,
  onClick,
  type,
  icon = <></>,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg  font-bold font-sans border border-main cursor-pointer
    ${
      invert
        ? "bg-white text-black hover:bg-main hover:scale-x-105 duration-300 ease-in-out hover:text-white"
        : "bg-main text-white hover:bg-white hover:scale-x-105 duration-300 hover:text-main"
    }


    ${customStyl}

    ${icon && "flex gap-2 items-center"}
  `}
    >
      {text}

      {icon}
    </button>
  );
}
