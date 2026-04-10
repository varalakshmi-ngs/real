import { Edit, Trash2 } from "lucide-react";

export const useEventScreenDataHook = ({ deletEvent, editBlog }) => {
  const column = [
    // {
    //   name: "ID",
    //   width: "5%",
    //   render: (row) => (
    //     <p className="w-full overflow-hidden text-base font-poppins font-normal">
    //       {row.id}
    //     </p>
    //   ),
    // },
    {
      name: "Event Title",
      width: "35%",
      render: (row) => (
        <p className="w-full overflow-hidden text-base font-poppins font-normal">
          {row.eventName}
        </p>
      ),
    },
    {
      name: "Date & Time",
      width: "20%",
      render: (row) => (
        <div className="flex flex-col gap-0 w-full overflow-hidden">
          <p className="text-base font-poppins font-normal">
            {row.date?.slice(0, 10)}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-base font-poppins font-normal">
              {row?.startTime}
            </span>
            <span className="text-base font-poppins font-normal">
              {row?.endTime}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Location",
      width: "30%",
      render: (row) => (
        <p className="w-full overflow-hidden text-base font-poppins font-normal">
          {row.location}
        </p>
      ),
    },
    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <div className="flex gap-3 items-center">
          <Edit onClick={() => editBlog(row)} />
          <Trash2 onClick={() => deletEvent(row?._id)} />
        </div>
      ),
    },
  ];

  return {
    column,
  };
};
