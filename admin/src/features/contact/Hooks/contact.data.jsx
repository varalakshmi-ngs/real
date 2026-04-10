import { Check, Trash2, X } from "lucide-react";
import { APIURL } from "../../../Core/url";

export const useContactDataHook = ({
  deletContact,
  testiRejected,
  testApproved,
}) => {
  const columns = [
    // {
    //   name: "ID",
    //   width: "3%",
    //   render: (row) => <p>{row.id}</p>,
    // },
    {
      name: "SNO",
      width: "5%",
      render: (row) => (
        <div className="w-7 h-7  rounded-full flex items-center justify-center text-xs font-semibold">
          {row.index}
        </div>
      ),
    },
    {
      name: "Name",
      width: "15%",
      render: (row) => (
        <p className="overflow-hidden line-clamp-1">{row.firstName}</p>
      ),
    },
    {
      name: "Email",
      width: "20%",
      render: (row) => (
        <p className="overflow-hidden line-clamp-1">{row.email}</p>
      ),
    },
    {
      name: "Phone",
      width: "10%",
      render: (row) => (
        <p className="overflow-hidden line-clamp-1">{row.mobile}</p>
      ),
    },
    {
      name: "Date",
      width: "10%",
      render: (row) => (
        <p className="overflow-hidden line-clamp-1">{row.date?.slice(0, 10)}</p>
      ),
    },
    {
      name: "Subject",
      width: "35%",
      render: (row) => <p>{row.message}</p>,
    },
    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <button
          onClick={() => deletContact(row?._id)}
          className="flex gap-1 items-center bg-[#FEE2E2] text-[#DC2626] p-2 rounded-md"
        >
          <X />
          Delete
        </button>
      ),
    },
  ];

  const commentColumns = [
    {
      name: "SNO",
      width: "5%",
      render: (row) => (
        <div className="w-7 h-7  rounded-full flex items-center justify-center text-xs font-semibold">
          {row.index}
        </div>
      ),
    },
    {
      name: "Name",
      width: "20%",
      render: (row) => (
        <div className="w-full flex items-center gap-1">
          <span className="w-[35px] h-[35px] rounded-full overflow-hidden">
            <img
              src={`${APIURL}/${row?.image}`}
              alt="profile"
              className="w-full h-full"
            />
          </span>
          <p>{row.name}</p>
        </div>
      ),
    },

    {
      name: "Subject",
      width: "55%",
      render: (row) => <p>{row.comment}</p>,
    },
    {
      name: "Action",
      width: "20%",
      render: (row) => (
        <div className="w-full flex gap-4 items-center">
          <button
            onClick={() => testApproved(row?._id)}
            className="flex gap-1 items-center bg-[#D1FAE5] text-[#059669] p-2 rounded-md"
          >
            <Check />
            Approved
          </button>
          <button
            onClick={() => testiRejected(row._id)}
            className="flex gap-1 items-center bg-[#FEE2E2] text-[#DC2626] p-2 rounded-md"
          >
            <X />
            Reject
          </button>
        </div>
      ),
    },
  ];

  return {
    columns,
    commentColumns,
  };
};
