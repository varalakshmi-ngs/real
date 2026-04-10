import { useEffect, useState } from "react";
import { API } from "../../Core/url";

export const useCountHook = () => {
  const [count, setCount] = useState({
    donations: 0,
    events: 0,
    images: 0,
    prayerrequests: 0,
    completedPrayer: 0,
    pendingPrayer: 0,
  });

  const getData = async () => {
    try {
      const resp = await API.get("/web/get-all-count");
      console.log(resp.data, "-------------------");
      setCount(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    count,
  };
};
