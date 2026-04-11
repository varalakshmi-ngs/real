import express from "express";
import {
  approvedTestimonialUpload,
  createOrder,
  deletContact,
  deleteEvent,
  deletePrayerRequest,
  getContact,
  getEvents,
  getEventWithSuggestions,
  getPrayerRequest,
  getTestimonialUpload,
  handleContact,
  handleTestimonialUpload,
  markAsPrayed,
  postEvent,
  rejectedTestimonialUpload,
  submitPrayerRequest,
  updateEvent,
  verifyPayment,
  getAllCount,
  getContributions,
  getNotifications,
  submitDonation,
} from "../controller/website-controller.js";
import upload from "../middlewares/fileUpload.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.js";
import { authenticateToken } from "../middlewares/AuthMiddleware.js";
const router = express.Router();

router.post("/contact", handleContact);
router.get("/contact", getContact);
router.delete("/contact/:id", deletContact);

router.post(
  "/testimonial",
  handleMulterUpload(upload.single("image")),
  handleTestimonialUpload
);
router.get("/testimonial", getTestimonialUpload);
router.patch("/testimonial-rejected/:id", rejectedTestimonialUpload);
router.patch("/testimonial-approved/:id", approvedTestimonialUpload);

router.post("/prayer-request", submitPrayerRequest);
router.get("/prayer-request", getPrayerRequest);
router.patch("/prayer-request/:id/mark-prayed", markAsPrayed);
router.delete("/prayer-request/:id", deletePrayerRequest);

router.post("/event", handleMulterUpload(upload.single("image")), postEvent);
router.get("/event", getEvents);
router.delete("/event/:id", deleteEvent);
router.patch(
  "/event/:id",
  handleMulterUpload(upload.single("image")),
  updateEvent
);
router.get("/event/:id", getEventWithSuggestions);

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/submit-donation", submitDonation);

router.get("/get-contributions", getContributions);

router.get("/get-all-count", getAllCount);
router.get("/get-notifications", getNotifications);

export default router;
