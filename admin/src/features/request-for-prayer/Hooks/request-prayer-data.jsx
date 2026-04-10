import { Check, X } from "lucide-react";

export const useRequestPrayerDataHook = ({
  deletPrayerRequesr,
  isPrayerRequest,
}) => {
  const columns = [
    {
      name: "Name",
      width: "10%",
      render: (row) => <p className="overflow-hidden"> {row.name}</p>,
    },

    {
      name: "Mobile",
      width: "10%",
      render: (row) => <p>{row.mobile}</p>,
    },
    {
      name: "City",
      width: "10%",
      render: (row) => <p className="overflow-hidden">{row.city}</p>,
    },
    {
      name: "Prayer for Whom",
      width: "16%",
      render: (row) => <p className="overflow-hidden">{row?.forWhom}</p>,
    },
    {
      name: "Request",
      width: "35%",
      render: (row) => <p className="overflow-hidden">{row?.message}</p>,
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => (
        <button
          className={`p-2 rounded-lg text-base font-poppins font-semibold 
      ${
        row.isPrayer
          ? "bg-[#10B981] text-white"
          : "border border-[#FFD700] text-[#FFD700] bg-transparent"
      }`}
        >
          {row.isPrayer ? "Completed" : "Pending"}
        </button>
      ),
    },
    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <div className="w-full flex items-center gap-1">
          {!row?.isPrayer ? (
            <>
              <button
                className="w-[40px] h-[40px] rounded-full bg-[#D1FAE5] flex justify-center items-center"
                onClick={() => isPrayerRequest(row.id)}
              >
                <Check />
              </button>
              <button
                className="w-[40px] h-[40px] rounded-full bg-[#FEE2E2] flex justify-center items-center"
                onClick={() => deletPrayerRequesr(row?.id)}
              >
                <X />
              </button>
            </>
          ) : null}
        </div>
      ),
    },
  ];
  return {
    columns,
  };
};
