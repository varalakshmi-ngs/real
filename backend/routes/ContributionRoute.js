import { Router } from "express";
import {
  getContributionData,
  updateHeroSection,
  updateServingSection,
  updateSupportImage,
  addSupportItem,
  updateSupportItem,
  deleteSupportItem,
  updateWaysSection,
  addPurposeOption,
  deletePurposeOption,
  addAmountOption,
  deleteAmountOption,
  updateFormSideSection,
  updateBankDetails,
} from "../controller/ContributionController.js";
import upload from "../middlewares/fileUpload.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

// Public GET
router.get("/", getContributionData);

// Protected Admin updates
router.put("/hero", authenticateToken, updateHeroSection);

router.put(
  "/serving",
  authenticateToken,
  handleMulterUpload(upload.single("image")),
  updateServingSection
);

router.put(
  "/support-image",
  authenticateToken,
  handleMulterUpload(upload.single("image")),
  updateSupportImage
);

router.post("/support-item", authenticateToken, addSupportItem);
router.put("/support-item/:id", authenticateToken, updateSupportItem);
router.delete("/support-item/:id", authenticateToken, deleteSupportItem);

router.put("/ways", authenticateToken, updateWaysSection);

router.post("/purpose", authenticateToken, addPurposeOption);
router.delete("/purpose/:id", authenticateToken, deletePurposeOption);

router.post("/amount", authenticateToken, addAmountOption);
router.delete("/amount/:id", authenticateToken, deleteAmountOption);

router.put(
  "/form-side",
  authenticateToken,
  handleMulterUpload(upload.single("image")),
  updateFormSideSection
);

router.put("/bank", authenticateToken, updateBankDetails);

export default router;
