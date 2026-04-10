import { useEffect, useState } from "react";
import { API } from "../../../Core/url";
import { errorMsgApi, successfully } from "../../../Core/tosts";

export const useContribution = () => {
  const [contribution, setContribution] = useState([]);
  const [totalamount, settotalamount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getContributions();
  }, []);

  async function getContributions() {
    try {
      const resp = await API.get("/web/get-contributions");
      const data = resp.data || [];

      setContribution(data);

      const amount = data.reduce((sum, el) => sum + Number(el?.amount || 0), 0);
      settotalamount(amount);
    } catch (error) {
      console.error(error);
      errorMsgApi("Can't Get Contributions");
    }
  }

  async function deleteContribution(row) {
    try {
      await API.delete(`/web/delete-contribution/${row.id}`);
      successfully("Contribution deleted");

      setContribution((prev) => prev.filter((item) => item.id !== row.id));

      settotalamount((prevTotal) => prevTotal - Number(row?.amount || 0));
    } catch (error) {
      console.error(error);
      errorMsgApi("Can't delete contribution");
    }
  }

  return {
    contribution,
    totalamount,
    setSearch,
    search,
    deleteContribution, // <- expose for table
  };
};
