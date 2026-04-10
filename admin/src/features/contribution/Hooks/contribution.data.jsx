import { Trash, Pencil } from "lucide-react";

export const useContributionDataHook = (handleDelete) => {
  const columns = [
    {
      name: "S.NO",
      width: "10%",
      render: (row) => (
        <span className="text-sm font-medium text-gray-700">{row.index}</span>
      ),
    },

    {
      name: "Name",
      width: "25%",
      render: (row) => (
        <div className="flex gap-2 items-center w-full">
          <div className="w-[35px] h-[35px] bg-gray-300 rounded-full" />
          <span className="text-base font-poppins font-normal">
            {row.fullName}
          </span>
        </div>
      ),
    },
    {
      name: "Email",
      width: "30%",
      render: (row) => <p className="text-sm">{row?.email}</p>,
    },
    {
      name: "Mobile Number",
      width: "20%",
      render: (row) => <p className="text-sm">{row?.mobile}</p>,
    },
    {
      name: "Amount",
      width: "15%",
      render: (row) => (
        <p className="text-base font-medium text-green-700">₹{row.amount}</p>
      ),
    },
    {
      name: "Purpose",
      width: "20%",
      render: (row) => <p className="text-sm text-gray-700">{row?.purpose}</p>,
    },
    {
      name: "Payment Type",
      width: "15%",
      render: (row) => (
        <p className="text-sm font-medium text-gray-800">
          {row?.type || "UPI"}
        </p>
      ),
    },
    // {
    //   name: "Actions",
    //   width: "15%",
    //   render: (row) => (
    //     <div className="flex gap-2 items-center">
    //       <button
    //         title="Delete"
    //         onClick={() => handleDelete(row)}
    //         className="text-red-600 hover:text-red-800"
    //       >
    //         <Trash size={18} />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return {
    columns,
  };
};
