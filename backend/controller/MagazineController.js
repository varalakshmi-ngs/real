import { Magazine } from "../models.js";
import fs from "fs";
export const postNewMagazine = async (req, res) => {
  try {
    const pdf = req.file?.path;

    const { title, subTitle } = req.body;

    if (!pdf) {
      return res.status(400).send({ message: "pdf file is required" });
    }

    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }

    const magazines = await Magazine.findAll();

    if (magazines.length >= 15) {
      return res
        .status(400)
        .send({ message: "You Cannot Post Morethan 15 Magazines" });
    }

    const newPdf = await Magazine.create({
      pdf: pdf,
      title: title,
      subTitle: subTitle,
    });

    return res.status(200).send(newPdf.toJSON());
  } catch (error) {
    console.log(error);

    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getMagazines = async (req, res) => {
  try {
    const magazines = await Magazine.findAll();

    return res.status(200).send(magazines.map(m => m.toJSON()));
  } catch (error) {
    console.log(error);

    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const deleteMagazine = async (req, res) => {
  const { id } = req.params;
  try {
    const magazine = await Magazine.findByPk(id);
    if (!magazine) {
      return res.status(400).send({ message: "Magazine Not found" });
    }

    const deletedData = magazine.toJSON();
    await magazine.destroy();

    if (deletedData.pdf && fs.existsSync(deletedData.pdf)) {
      fs.unlinkSync(deletedData.pdf);
    }

    return res.status(200).send(deletedData);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
