"use client";
import VideoCard from "@/components/watch/VideoCard";
import WatchOnlineHero from "@/components/watch/WatchOnlineHero";
import { useYoutubeDataHook } from "@/Hooks/YoutubeHook";
import React from "react";

export default function page() {
  const { recentVideos, popularVideos } = useYoutubeDataHook();

  return (
    <div>
      <WatchOnlineHero />
      {recentVideos.length > 0 && (
        <VideoCard videoData={recentVideos} sectionTitle="Recent Messages" />
      )}
      {popularVideos.length > 0 && (
        <VideoCard videoData={popularVideos} sectionTitle="Popular Messages" />
      )}
    </div>
  );
}
