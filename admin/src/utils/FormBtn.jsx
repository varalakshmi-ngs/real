import { Repeat } from "lucide-react";

export default function FormBtn({
  title = "Save",
  icon = <Repeat />,
  onClick,
  style,
  type = "submit",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-secondary flex gap-2 px-8 py-2 rounded-lg text-white ${style}`}
    >
      <span>{title}</span>
      {icon}
    </button>
  );
}
