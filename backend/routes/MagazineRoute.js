import express from "express";

import {
  postNewMagazine,
  getMagazines,
  deleteMagazine,
} from "../controller/MagazineController.js";

import upload from "../middlewares/fileUpload.js";

const router = express.Router();

router.post(
  "/",
  upload.single("pdf"),
  postNewMagazine
);

router.get("/", getMagazines);

router.delete("/:id", deleteMagazine);

export default router;