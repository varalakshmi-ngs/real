import { AboutPage, TeamMember } from "../models.js";
import logger from "../utils/logger.js";
import { sendResponse } from "../utils/sendResponse.js";

const transformAboutPage = (data) => {
  if (!data) return null;
  const json = data.toJSON ? data.toJSON() : data;
  return {
    hero: {
      title: json.heroTitle,
      subText: json.heroSubText,
      image: json.heroImage
    },
    pastarmessage: {
      pasterName: json.pastorName,
      title: json.pastorTitle,
      description: json.pastorDescription,
      image: json.pastorImage
    },
    teamMembers: json.teamMembers || []
  };
};

export const updateHeroSection = async (req, res) => {
  try {
    const { title, subText } = req.body;

    const image = req.file?.path;

    const [aboutPage, created] = await AboutPage.upsert({
      id: 1,
      heroTitle: title,
      heroSubText: subText,
      heroImage: image,
    });

    return res.status(created ? 201 : 200).json({
      message: `Hero Section ${created ? 'created' : 'updated'} successfully`,
      _doc: transformAboutPage(aboutPage)
    });
  } catch (error) {
    logger?.error(`❌ Failed to update About  Hero Section: ${error.message}`);

    return sendResponse(res, 500, "Failed to save About Hero", error);
  }
};

export const updateMessageFromPaster = async (req, res) => {
  try {
    const { pasterName, title, description } = req.body;
    const image = req.file?.path;
    const [aboutPage, created] = await AboutPage.upsert({
      id: 1,
      pastorName: pasterName,
      pastorTitle: title,
      pastorDescription: description,
      pastorImage: image,
    });

    return res.status(200).json({
      message: "Pastor Message Updated",
      _doc: transformAboutPage(aboutPage)
    });
  } catch (error) {
    logger?.error(`❌ Failed to update About  Hero Section: ${error.message}`);

    return sendResponse(res, 500, "Failed to save About Hero", error);
  }
};

export const addTeamMember = async (req, res) => {
  try {
    const { name, designation, description } = req.body;


    const image = req.file?.path;

    if (!name || !designation || !description || !req.file) {
      return res.status(400).json({
        message: "Fill All the required fields",
      });
    }

    const aboutPage = await AboutPage.findByPk(1);

    if (!aboutPage) {
      return res.status(400).json({
        message: "Add Hero Section First",
      });
    }

    const newMember = await TeamMember.create({
      name,
      designation,
      description,
      image,
      aboutPageId: 1,
    });

    return res.status(201).json({
      message: "Added Team Member Success",
      data: newMember.toJSON()
    });
  } catch (error) {
    logger?.error(`❌ Failed to update About  Hero Section: ${error.message}`);

    return sendResponse(res, 500, "Failed to save About Hero", error);
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TeamMember.destroy({ where: { id } });

    if (deleted === 0) {
      return sendResponse(res, 404, "Team Member not found");
    }

    return sendResponse(
      res,
      200,
      "Delete Team Member Success"
    );
  } catch (error) {
    logger?.error(`❌ Failed to update About  Hero Section: ${error.message}`);

    return sendResponse(res, 500, "Failed to save About Hero", error);
  }
};

export const getAllAboutData = async (req, res) => {
  try {
    const existingData = await AboutPage.findOne({
      include: ['teamMembers']
    });

    if (!existingData) {
      return res.status(400).json({
        message: "Add Hero Section First",
      });
    }

    return res.status(200).json({
      message: "AboutPage",
      _doc: transformAboutPage(existingData)
    });
  } catch (error) {
    logger?.error(`❌ Failed to update About  Hero Section: ${error.message}`);

    return sendResponse(res, 500, "Failed to save About Hero", error);
  }
};

