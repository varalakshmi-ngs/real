import axios from "axios";
import { YoutubeSetting } from "../models.js";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";

export const getChannelIdByHandle = async (req, res) => {
  try {
    const handle = "@REALTEMPLE";
    const cleanHandle = handle.replace("@", "");
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          key: process.env.GOOGLE_API_KEY,
          part: "id",
          forHandle: cleanHandle,
        },
      }
    );

    return res.send(response.data.items[0]?.id);
  } catch (err) {
    throw new Error("Channel not found");
    return res.send(err);
  }
};

// export const getLiveStreams = async (req, res) => {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         channelId: process.env.CHANNEL_ID,
//         key: process.env.GOOGLE_API_KEY,
//         type: "video",
//         eventType: "live", // Only live streams
//         part: "snippet",
//         order: "viewCount", // Sort by viewers
//         maxResults: 10, // Number of results
//         fields:
//           "items(snippet(title,channelTitle,liveBroadcastContent),id(videoId))",
//       },
//     });

//     return res.status(200).send(response.data?.items || []);
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server Error" });
//   }
// };

export const getLiveStreams = async (req, res) => {
  try {
    // Validate required environment variables
    if (!process.env.GOOGLE_API_KEY) {
      console.error("Missing GOOGLE_API_KEY in environment variables");
      return res.status(500).json({ 
        message: "YouTube API not configured. Missing GOOGLE_API_KEY." 
      });
    }
    
    if (!process.env.CHANNEL_ID) {
      console.error("Missing CHANNEL_ID in environment variables");
      return res.status(500).json({ 
        message: "YouTube API not configured. Missing CHANNEL_ID." 
      });
    }

    const response = await axios.get(BASE_URL, {
      params: {
        channelId: process.env.CHANNEL_ID,
        key: process.env.GOOGLE_API_KEY,
        type: "video",
        eventType: "live",
        part: "snippet",
        order: "viewCount",
        maxResults: 10,
        fields:
          "items(snippet(title,channelTitle,liveBroadcastContent,thumbnails),id(videoId))",
      },
    });

    // Handle case where no items are returned
    if (!response.data.items || !Array.isArray(response.data.items)) {
      console.warn("No items returned from YouTube API");
      return res.status(200).json([]);
    }

    // Format each live stream with custom fields
    const formattedStreams = response.data.items.map((item) => {
      const videoId = item.id.videoId;
      return {
        videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        isLive: item.snippet.liveBroadcastContent === "live",
        thumbnail: {
          default: item.snippet.thumbnails?.default?.url,
          medium: item.snippet.thumbnails?.medium?.url,
          high: item.snippet.thumbnails?.high?.url,
        },
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };
    });

    return res.status(200).json(formattedStreams);
  } catch (error) {
    console.error(
      "Error fetching live streams:",
      error.response?.data || error.message
    );
    return res.status(500).json({ 
      message: "Failed to fetch live streams from YouTube",
      details: error.response?.data?.error?.message || error.message 
    });
  }
};

export const getPlayListId = async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const channelId = process.env.CHANNEL_ID;
    const channelResponse = await axios.get(`${YOUTUBE_API}/channels`, {
      params: {
        key: apiKey,
        part: "contentDetails",
        id: channelId,
      },
    });

    const uploadsPlaylistId =
      channelResponse.data.items[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return res
        .status(404)
        .json({ message: "Uploads playlist not found. Check channelId." });
    }

    res.status(200).send(uploadsPlaylistId);
  } catch (error) {
    return res.status(500).send({ message: "Internal server Error" });
  }
};

export const getPopularVideos = async (req, res) => {
  try {
    // Validate required environment variables
    if (!process.env.GOOGLE_API_KEY) {
      console.error("Missing GOOGLE_API_KEY in environment variables");
      return res.status(500).json({ 
        message: "YouTube API not configured. Missing GOOGLE_API_KEY." 
      });
    }
    
    if (!process.env.PLAYLIST_ID) {
      console.error("Missing PLAYLIST_ID in environment variables");
      return res.status(500).json({ 
        message: "YouTube API not configured. Missing PLAYLIST_ID." 
      });
    }

    const maxResults = parseInt(req.query.maxResults) || 10;
    const apiKey = process.env.GOOGLE_API_KEY;

    // 2. Get all video IDs from the uploads playlist
    const playlistResponse = await axios.get(`${YOUTUBE_API}/playlistItems`, {
      params: {
        key: apiKey,
        part: "snippet",
        playlistId: process.env.PLAYLIST_ID,
        maxResults: 50, // Max allowed per request
      },
    });

    const videoItems = playlistResponse.data.items;

    if (!videoItems.length) {
      return res
        .status(200)
        .json({ message: "No videos found in channel.", videos: [] });
    }

    // 3. Extract video IDs for batch request
    const videoIds = videoItems
      .map((item) => item.snippet.resourceId.videoId)
      .join(",");

    // 4. Get detailed stats (like viewCount) for each video
    const videosResponse = await axios.get(`${YOUTUBE_API}/videos`, {
      params: {
        key: apiKey,
        part: "snippet,statistics",
        id: videoIds,
        fields:
          "items(id,snippet(title,description,thumbnails,channelTitle),statistics(viewCount))",
      },
    });

    // 5. Format and sort by view count (descending)
    const formattedVideos = videosResponse.data.items
      .map((item) => ({
        videoId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        viewCount: parseInt(item.statistics.viewCount, 10),
        thumbnail:
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url,
        watchUrl: `https://www.youtube.com/watch?v=${item.id}`,
        embedUrl: `https://www.youtube.com/embed/${item.id}`,
      }))
      .sort((a, b) => b.viewCount - a.viewCount) // Sort: highest views first
      .slice(0, maxResults); // Limit to desired number

    return res.status(200).json(formattedVideos);
  } catch (error) {
    console.error(
      "Error fetching channel videos:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      message: "Failed to fetch popular videos from your channel.",
      details: error.response?.data?.error?.message || error.message,
    });
  }
};

export const getRecentVideos = async (req, res) => {
  try {
    // Validate required environment variables
    if (!process.env.GOOGLE_API_KEY) {
      console.error("Missing GOOGLE_API_KEY in environment variables");
      return res.status(500).json({ 
        message: "YouTube API not configured. Missing GOOGLE_API_KEY." 
      });
    }
    
    if (!process.env.PLAYLIST_ID) {
      console.error("Missing PLAYLIST_ID in environment variables");
      return res.status(500).json({ 
        message: "YouTube API not configured. Missing PLAYLIST_ID." 
      });
    }

    const maxResults = parseInt(req.query.maxResults) || 10;
    const apiKey = process.env.GOOGLE_API_KEY;

    // 1. Get all video items from the uploads playlist
    const playlistResponse = await axios.get(`${YOUTUBE_API}/playlistItems`, {
      params: {
        key: apiKey,
        part: "snippet",
        playlistId: process.env.PLAYLIST_ID,
        maxResults: 50, // Max allowed per request
      },
    });

    const videoItems = playlistResponse.data.items;

    if (!videoItems.length) {
      return res
        .status(200)
        .json({ message: "No videos found in channel.", videos: [] });
    }

    // 2. Extract video IDs for batch request
    const videoIds = videoItems
      .map((item) => item.snippet.resourceId.videoId)
      .join(",");

    // 3. Get detailed info (title, thumbnails, published date, etc.)
    const videosResponse = await axios.get(`${YOUTUBE_API}/videos`, {
      params: {
        key: apiKey,
        part: "snippet,statistics",
        id: videoIds,
        fields:
          "items(id,snippet(title,description,thumbnails,publishedAt,channelTitle),statistics(viewCount))",
      },
    });

    // 4. Format and sort by published date (newest first)
    const formattedVideos = videosResponse.data.items
      .map((item) => ({
        videoId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        viewCount: parseInt(item.statistics.viewCount, 10),
        thumbnail:
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url,
        publishedAt: item.snippet.publishedAt,
        watchUrl: `https://www.youtube.com/watch?v=${item.id}`,
        embedUrl: `https://www.youtube.com/embed/${item.id}`, // Fixed spacing
      }))
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) // Newest first
      .slice(0, maxResults); // Limit to desired number

    return res.status(200).json(formattedVideos);
  } catch (error) {
    console.error(
      "Error fetching recent videos:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      message: "Failed to fetch recent videos from your channel.",
      details: error.response?.data?.error?.message || error.message,
    });
  }
};

// Helper to seed/initialize default YouTube settings
export const ensureDefaultYoutubeSettings = async () => {
  try {
    const setting = await YoutubeSetting.findByPk(1);
    if (!setting) {
      console.log("Seeding default YouTube settings...");
      await YoutubeSetting.create({
        id: 1,
        channelId: process.env.YOUTUBE_CHANNEL_ID || "your_channel_id",
      });
      console.log("✅ Default YouTube settings seeded successfully!");
    }
  } catch (err) {
    console.error("❌ Error seeding default YouTube settings:", err);
  }
};

export const getLiveStatus = async (req, res) => {
  try {
    let channelId = process.env.YOUTUBE_CHANNEL_ID;
    try {
      const setting = await YoutubeSetting.findByPk(1);
      if (setting && setting.channelId) {
        channelId = setting.channelId;
      }
    } catch (dbError) {
      console.error("Error reading YoutubeSetting from database:", dbError.message);
    }

    if (!channelId || channelId === "your_channel_id") {
      console.warn("YOUTUBE_CHANNEL_ID is not configured or is the default placeholder. Returning offline status.");
      return res.status(200).json({
        isLive: false,
        videoId: null,
        message: "YouTube Channel ID not configured."
      });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (apiKey && apiKey !== "your_api_key") {
      try {
        console.log("Checking live status via YouTube API...");
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            channelId: channelId,
            eventType: "live",
            type: "video",
            key: apiKey,
          },
        });

        const items = response.data?.items || [];
        if (items.length > 0) {
          return res.status(200).json({
            isLive: true,
            videoId: items[0].id?.videoId || null,
          });
        }
      } catch (apiError) {
        console.error("Error checking live status via YouTube API, falling back to scraping:", apiError.response?.data || apiError.message);
      }
    }

    // Fallback: Scrape the public live channel page
    console.log("Checking live status via public channel live URL scraping...");
    const url = `https://www.youtube.com/channel/${channelId}/live`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      }
    });

    const html = response.data;
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)">/);
    
    if (canonicalMatch && canonicalMatch[1]) {
      const canonicalUrl = canonicalMatch[1];
      const watchMatch = canonicalUrl.match(/youtube\.com\/watch\?v=([^"&?]+)/);
      if (watchMatch && watchMatch[1]) {
        // A live watch page contains "isLive":true or isLiveBroadcast:true
        const isLive = html.includes('"isLive":true') || html.includes('"isLiveBroadcast":true') || html.includes('yt-live-label');
        if (isLive) {
          return res.status(200).json({
            isLive: true,
            videoId: watchMatch[1]
          });
        }
      }
    }

    return res.status(200).json({
      isLive: false,
      videoId: null
    });
  } catch (error) {
    console.error("Error checking YouTube Live Status:", error.message);
    return res.status(200).json({
      isLive: false,
      videoId: null,
      message: "Live stream status is currently unavailable.",
      details: error.message,
    });
  }
};

export const getYoutubeSettings = async (req, res) => {
  try {
    let channelId = process.env.YOUTUBE_CHANNEL_ID || "";
    const setting = await YoutubeSetting.findByPk(1);
    if (setting) {
      channelId = setting.channelId;
    }
    return res.status(200).json({ channelId });
  } catch (error) {
    console.error("Error fetching YouTube settings:", error);
    return res.status(500).json({ message: "Failed to fetch YouTube settings" });
  }
};

export const updateYoutubeSettings = async (req, res) => {
  try {
    const { channelId } = req.body;
    if (!channelId) {
      return res.status(400).json({ message: "Channel ID is required" });
    }

    const [setting, created] = await YoutubeSetting.upsert({
      id: 1,
      channelId: channelId,
    });

    return res.status(200).json({
      message: "YouTube Settings updated successfully",
      channelId: setting.channelId,
    });
  } catch (error) {
    console.error("Error updating YouTube settings:", error);
    return res.status(500).json({ message: "Failed to update YouTube settings" });
  }
};
