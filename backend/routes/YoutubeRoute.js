import { Router } from "express";
import {
  getChannelIdByHandle,
  getLiveStreams,
  getPlayListId,
  getPopularVideos,
  getRecentVideos,
} from "../controller/YoutubeController.js";

const router = Router();

router.get("/get-live-streams", getLiveStreams);
router.get("/get-popular-videos", getPopularVideos);
router.get("/get-recent-videos", getRecentVideos);
// router.get("/get-playlist-id", getPlayListId);
// router.get("/get-handle", getChannelIdByHandle);

export default router;
