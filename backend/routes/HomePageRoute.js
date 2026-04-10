import { Router } from "express";
import {
  updateHeroSection,
  addVideo,
  addWeekendProgram,
  deleteVideo,
  deleteWeekendProgram,
  updateLatestMessage,
  updatePastorIntro,
  getAllHomeData,
  getAllLocalVideos,
  updateTimingsSection,
} from "../controller/HomepageController.js";
import upload from "../middlewares/fileUpload.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.js";

const router = Router();

router.put(
  "/hero",
  handleMulterUpload(upload.single("image")),
  updateHeroSection
);

router.put(
  "/updatepastersection",
  handleMulterUpload(upload.single("image")),
  updatePastorIntro
);

router.post("/addvideo", handleMulterUpload(upload.single("image")), addVideo);
router.delete("/deletevideo/:id", deleteVideo);

router.post("/addweekendprogram", addWeekendProgram);
router.delete("/deleteweekendprogram/:id", deleteWeekendProgram);

router.put(
  "/latestmessage",
  handleMulterUpload(upload.single("image")),
  updateLatestMessage
);

router.get("/", getAllHomeData);
router.get("/videos", getAllLocalVideos);

router.put("/timings", updateTimingsSection);

export default router;
