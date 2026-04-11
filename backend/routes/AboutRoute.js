import { Router } from "express";
import {
  updateHeroSection,
  updateMessageFromPaster,
  getAllAboutData,
  deleteTeamMember,
  addTeamMember,
} from "../controller/AboutController.js";
import upload from "../middlewares/fileUpload.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.js";

const router = Router();

router.put(
  "/hero",
  handleMulterUpload(upload.single("image")),
  updateHeroSection
);

router.put(
  "/pastarmessage",
  handleMulterUpload(upload.single("image")),
  updateMessageFromPaster
);

router.post(
  "/addteammember",
  handleMulterUpload(upload.single("image")),
  addTeamMember
);

router.delete("/deletemember/:id", deleteTeamMember);

router.get("/", getAllAboutData);

export default router;
