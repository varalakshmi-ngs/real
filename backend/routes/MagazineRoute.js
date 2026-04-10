import { Router } from "express";
import {
  postNewMagazine,
  getMagazines,
  deleteMagazine,
} from "../controller/MagazineController.js";
import upload from "../middlewares/fileUpload.js";

const router = Router();

router.post("/", upload.single("pdf"), postNewMagazine);

router.get("/", getMagazines);
router.delete("/:id", deleteMagazine);

export default router;
