import { useState } from "react";

export const useDashboardHook = () => {
  const [requestForPrayer, setRequestForPrayer] = useState([
    {
      id: 1,
      name: "Vamsi",
      mobile: "oiuytr",
      forWhom: "vamsi@gmail.com",
      prayerType: "90909090",
      language: "Telugu",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the ",
    },
    {
      id: 1,
      name: "Vamsi",
      mobile: "oiuytr",
      forWhom: "vamsi@gmail.com",
      prayerType: "90909090",
      language: "Telugu",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the ",
    },
  ]);

  return {
    requestForPrayer,
  };
};
