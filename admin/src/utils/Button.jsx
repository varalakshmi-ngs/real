import React from "react";

const Button = ({ style, text, Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${style} flex justify-center items-center gap-4 px-4 py-2 rounded-md`}
    >
      {text}
      {Icon && <Icon />} {/* Renders the passed icon */}
    </button>
  );
};

export default Button;
