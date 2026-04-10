import { Edit, Trash2 } from "lucide-react";
import { APIURL } from "../../../Core/url";

export const useBlogDataHook = ({ deletBlog, editBlog }) => {
  const columns = [
    // {
    //   name: "ID",
    //   width: "3%",
    //   render: (row) => <p>{row.id}</p>,
    // },
    {
      name: "Title",
      width: "25%",
      render: (row) => (
        <div className="flex gap-1 items-center w-full overflow-hidden">
          <span className="w-[35px] h-[35px] bg-gray-400 rounded-full overflow-hidden">
            <img
              src={`${APIURL}/uploads/${row.image}`}
              alt="blog"
              className="w-full h-full"
            />
          </span>
          <span className="text-base font-poppins font-normal w-[calc(100%-40px)]">
            {row.title}
          </span>
        </div>
      ),
    },
    {
      name: "Author & Title ",
      width: "15%",
      render: (row) => (
        <p className="text-base font-poppins font-normal overflow-hidden">
          {row.author}
        </p>
      ),
    },
    {
      name: "Location",
      width: "37%",
      render: (row) => <p className="overflow-hidden">{row?.location}</p>,
    },
    {
      name: "Date",
      width: "10%",
      render: (row) => (
        <p className="overflow-hidden">{row?.date?.slice(0, 10)}</p>
      ),
    },
    {
      name: "Categoty",
      width: "10%",
      render: (row) => <p className="overflow-hidden">{row?.category}</p>,
    },
    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <div className="flex gap-3 items-center">
          <Edit onClick={() => editBlog(row)} />
          <Trash2 onClick={() => deletBlog(row?._id)} />
        </div>
      ),
    },
  ];

  return {
    columns,
  };
};
