import axios from "axios";

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
    return res.status(500).json({ message: "Internal server error" });
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
      error,
    });
  }
};

export const getRecentVideos = async (req, res) => {
  try {
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
      error,
    });
  }
};
