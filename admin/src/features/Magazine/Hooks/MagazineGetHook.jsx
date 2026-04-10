import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { errorMsgApi, successfully } from "../../../Core/tosts";
import { API } from "../../../Core/url";
import { Trash } from "lucide-react";

export const useMagazineGetHook = () => {
  const [data, setData] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const columns = [
    {
      name: "S.NO",
      width: "10%",
      render: (row) => (
        <span className="text-sm font-medium text-gray-700">{row.index}</span>
      ),
    },

    {
      name: "Title",
      width: "30%",
      render: (row) => (
        <div className="flex gap-2 items-center w-full">
          <span className="text-base font-poppins font-normal">
            {row.title}
          </span>
        </div>
      ),
    },
    {
      name: "Sub Title",
      width: "25%",
      render: (row) => (
        <div className="flex gap-2 items-center w-full">
          <span className="text-base font-poppins font-normal">
            {row.subTitle}
          </span>
        </div>
      ),
    },

    {
      name: "Actions",
      width: "25%",
      render: (row) => (
        <div className="flex gap-2 items-center">
          <button
            title="Delete"
            onClick={() => deleteMagizine(row._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const getMagazines = async () => {
    try {
      setGetLoading(true);
      const resp = await API.get("/magazine/");

      setData(resp.data);

      console.log(resp.data);
    } catch (error) {
      if (isAxiosError(error)) {
        errorMsgApi(error?.response?.data?.message);
      } else {
        errorMsgApi(error?.message || "Something went wrong");
      }
    } finally {
      setGetLoading(false);
    }
  };

  async function deleteMagizine(id) {
    try {
      const resp = await API.delete(`/magazine/${id}`);

      successfully("Deleted Success");

      getMagazines();
    } catch (error) {
      if (isAxiosError(error)) {
        errorMsgApi(error?.response?.data?.message);
      } else {
        errorMsgApi(error?.message || "Something went wrong");
      }
    }
  }

  useEffect(() => {
    getMagazines();
  }, []);

  return {
    data,
    getMagazines,
    columns,
    getLoading,
  };
};
