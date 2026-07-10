import { Router } from "express";
import { getSocialLinks, updateSocialLinks } from "../controller/SocialController.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

// Public GET
router.get("/", getSocialLinks);

// Protected Admin PUT
router.put("/", authenticateToken, updateSocialLinks);

export default router;
