import { Router } from "express";
import {
  getChannelIdByHandle,
  getLiveStreams,
  getPlayListId,
  getPopularVideos,
  getRecentVideos,
  getLiveStatus,
  getYoutubeSettings,
  updateYoutubeSettings,
} from "../controller/YoutubeController.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.get("/get-live-streams", getLiveStreams);
router.get("/get-popular-videos", getPopularVideos);
router.get("/get-recent-videos", getRecentVideos);
// router.get("/get-playlist-id", getPlayListId);
// router.get("/get-handle", getChannelIdByHandle);

// Live stream automatic check and settings routes
router.get("/live-status", getLiveStatus);
router.get("/settings", authenticateToken, getYoutubeSettings);
router.put("/settings", authenticateToken, updateYoutubeSettings);

export default router;
