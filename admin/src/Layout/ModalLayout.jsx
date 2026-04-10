import { X } from "lucide-react";

const ModalLayout = ({ width, title, children, height, onCloseModal }) => {
  return (
    <div
      className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
    >
      <div
        style={{ width, height }}
        className="w-[90%] h-[90%] shadow-custom bg-white border border-slate-200 p-12 flex flex-col gap-4 rounded-2xl"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-[600]">{title}</h2>
          <button onClick={onCloseModal}>
            <X size={25} />
          </button>
        </div>
        <div className="w-full h-[95%] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
