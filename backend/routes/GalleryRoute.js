import { Router } from "express";
import {
  addGalleryCategory,
  editGalleryCategory,
  deleteGalleryCategory,
  addGalleryImages,
  deleteGalleryImage,
  getGalleryCategories,
  getGalleryImages,
} from "../controller/GalleryController.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.js";
import upload from "../middlewares/fileUpload.js";

const router = Router();

router.post("/gallerycategory", addGalleryCategory);

router.put("/gallerycategory/:id", editGalleryCategory);

router.delete("/gallerycategory/:id", deleteGalleryCategory);

router.post(
  "/galleryimages/:catId",
  handleMulterUpload(upload.array("image")),
  addGalleryImages
);

router.get("/galleryimages/:catId", getGalleryImages);

router.delete("/galleryimages/:id", deleteGalleryImage);

router.get("/", getGalleryCategories);

export default router;
