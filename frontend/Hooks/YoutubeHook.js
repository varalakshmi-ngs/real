"use client";

import { API } from "@/Core/rl";
import { errorMsgApi } from "@/Core/tosts";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export const useYoutubeDataHook = () => {
  const [recentVideos, setRecentVideos] = useState([]);
  const [popularVideos, setPopularVideos] = useState([]);

  const getLocalVideos = async () => {
    try {
      const resp = await API.get("/home/videos");
      const videos = resp.data || [];
      setRecentVideos(videos);
      setPopularVideos(videos);
    } catch (error) {
      if (isAxiosError(error)) {
        errorMsgApi(error?.response?.data?.message);
      } else {
        errorMsgApi(error?.message || "Unexpected Error");
      }
    }
  };

  useEffect(() => {
    getLocalVideos();
  }, []);

  return {
    recentVideos,
    popularVideos,
  };
};
