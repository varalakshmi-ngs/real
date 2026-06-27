import { HomePage, Video, WeekendProgram, LatestMessage } from "../models.js";
import logger from "../utils/logger.js";
import { sendResponse } from "../utils/sendResponse.js";

const transformHomePage = (data) => {
  if (!data) return null;
  const json = data.toJSON ? data.toJSON() : data;

  const latestMessages = json.latestMessages 
    ? [...json.latestMessages].sort((a, b) => b.id - a.id) 
    : [];
  const newestMsg = latestMessages[0] || {};

  return {
    hero: {
      title: json.heroTitle,
      subText: json.heroSubText,
      buttonText: json.heroButtonText,
      buttonLink: json.heroButtonLink,
      image: json.heroImage
    },
    pasterIntro: {
      pasterName: json.pastorName,
      description: json.pastorDescription,
      image: json.pastorImage
    },
    latestMessage: {
      heading: newestMsg.heading || "",
      description: newestMsg.description || "",
      hostName: newestMsg.hostName || "",
      title: "",
      youtubeLink: newestMsg.youtubeLink || "",
      thumbnailImage: newestMsg.thumbnailImage || ""
    },
    latestMessages: latestMessages.map(m => ({
      id: m.id,
      heading: m.heading,
      description: m.description,
      hostName: m.hostName,
      youtubeLink: m.youtubeLink,
      thumbnailImage: m.thumbnailImage,
      createdAt: m.createdAt
    })),
    timings: {
      morningService: json.morningService,
      eveningService: json.eveningService,
      sundaySchool: json.sundaySchool
    },
    videos: json.videos || [],
    weekendPrograms: json.weekendPrograms || []
  };
};

export const updateHeroSection = async (req, res) => {
  try {
    const { title, subText, buttonText, buttonLink } = req.body;


    const image = req.file?.path;

    const [homePage, created] = await HomePage.upsert({
      id: 1, // Assuming single record
      heroTitle: title,
      heroSubText: subText,
      heroButtonText: buttonText,
      heroButtonLink: buttonLink,
      heroImage: image,
    });

    return res.status(created ? 201 : 200).json({
      message: `Hero Section ${created ? 'created' : 'updated'} successfully`,
      _doc: transformHomePage(homePage)
    });
  } catch (error) {
    logger?.error(`❌ Failed to update home  Hero Section: ${error.message}`);

    return sendResponse(res, 500, "Failed to save testimonial", error);
  }
};

export const updatePastorIntro = async (req, res) => {
  try {
    const { pasterName, description } = req.body;
    const image = req.file?.path;
    const [homePage, created] = await HomePage.upsert({
      id: 1,
      pastorName: pasterName,
      pastorDescription: description,
      pastorImage: image,
    });

    return res.status(200).json({
      message: "Pastor Section updated successfully",
      _doc: transformHomePage(homePage)
    });
  } catch (error) {
    logger?.error(
      `❌ Failed to update home Paster Intro Section: ${error.message}`
    );

    return sendResponse(res, 500, "Failed to save Paster Intro", error);
  }
};

export const addVideo = async (req, res) => {
  try {
    const { youtubeLink, speakerName, description, subText, thumbnailUrl } = req.body;
    const image = req.file?.path || thumbnailUrl;
    const homePage = await HomePage.findByPk(1);


    if (!youtubeLink || !speakerName || !description || !subText || !image) {
      return res.status(400).json({
        message: "Plesase fill all fields",
      });
    }

    if (!homePage) {
      return res.status(400).json({
        message: "Please add Hero Section First",
      });
    }

    const newVideo = await Video.create({
      youtubeLink,
      speakerName,
      description,
      subText,
      thumbnailImage: image,
      homePageId: 1,
    });

    return sendResponse(res, 200, "New Video Added", null, newVideo);
  } catch (error) {
    logger?.error(`❌ Failed to add video at homepage: ${error.message}`);

    return sendResponse(res, 500, "Failed to add video", error);
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Please Provide Video Id",
      });
    }

    const video = await Video.destroy({ where: { id } });

    return sendResponse(res, 200, "Video Deleted Success");
  } catch (error) {
    logger?.error(`❌ Failed to delete video at homepage: ${error.message}`);

    return sendResponse(res, 500, "Failed to delete video", error);
  }
};

export const addWeekendProgram = async (req, res) => {
  try {
    const { title, subText, buttonText, youtubeLink, date, time, location } =
      req.body;

    if (
      !title ||
      !subText ||
      !buttonText ||
      !youtubeLink ||
      !date ||
      !time ||
      !location
    ) {
      return res.status(400).json({
        message: "Please Provide Required Fields",
      });
    }

    const homePage = await HomePage.findByPk(1);
    if (!homePage) {
      return res.status(400).json({
        message: "Please add Hero Section First",
      });
    }

    const programCount = await WeekendProgram.count({ where: { homePageId: 1 } });
    if (programCount >= 2) {
      return res.status(400).json({
        message: "You can add only 2 Programs",
      });
    }

    const newProgram = await WeekendProgram.create({
      title,
      subText,
      buttonText,
      youtubeLink,
      date,
      time,
      location,
      homePageId: 1,
    });

    return sendResponse(res, 200, "Added Program", newProgram);
  } catch (error) {
    logger?.error(
      `❌ Failed to add weekend program at homepage: ${error.message}`
    );

    return sendResponse(res, 500, "Failed to add weekend program", error);
  }
};

export const deleteWeekendProgram = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Please Provide id",
      });
    }

    await WeekendProgram.destroy({ where: { id } });

    return sendResponse(res, 200, "Program Deleted Success");
  } catch (error) {
    logger?.error(
      `❌ Failed to delete weekend program at homepage: ${error.message}`
    );

    return sendResponse(res, 500, "Failed to delete weekend program", error);
  }
};

export const addLatestMessage = async (req, res) => {
  try {
    const { heading, description, hostName, youtubeLink } = req.body;
    const image = req.file?.path;

    const homePage = await HomePage.findByPk(1);
    if (!homePage) {
      return res.status(400).json({
        message: "Please add Hero Section First",
      });
    }

    if (!heading || !description || !hostName) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const newMsg = await LatestMessage.create({
      heading,
      description,
      hostName,
      youtubeLink: youtubeLink || null,
      thumbnailImage: image || null,
      homePageId: 1,
    });

    return res.status(201).json({
      message: "Latest Message Added successfully",
      data: newMsg,
    });
  } catch (error) {
    logger?.error(`❌ Failed to add latest message at homepage: ${error.message}`);
    return sendResponse(res, 500, "Failed to add latest message", error);
  }
};

export const updateLatestMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, hostName, youtubeLink } = req.body;
    const image = req.file?.path;

    if (!id) {
      return res.status(400).json({
        message: "Please Provide Message Id",
      });
    }

    const msg = await LatestMessage.findByPk(id);
    if (!msg) {
      return res.status(404).json({
        message: "Latest Message not found",
      });
    }

    const updates = {
      heading,
      description,
      hostName,
      youtubeLink: youtubeLink || null,
    };

    if (image) {
      updates.thumbnailImage = image;
    } else if (req.body.deleteImage === "true") {
      updates.thumbnailImage = null;
    }

    await msg.update(updates);

    return res.status(200).json({
      message: "Latest Message Updated successfully",
      data: msg,
    });
  } catch (error) {
    logger?.error(`❌ Failed to update latest message: ${error.message}`);
    return sendResponse(res, 500, "Failed to update latest message", error);
  }
};

export const deleteLatestMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Please Provide Message Id",
      });
    }

    const msg = await LatestMessage.findByPk(id);
    if (!msg) {
      return res.status(404).json({
        message: "Latest Message not found",
      });
    }

    await msg.destroy();

    return res.status(200).json({
      message: "Latest Message Deleted successfully",
    });
  } catch (error) {
    logger?.error(`❌ Failed to delete latest message: ${error.message}`);
    return sendResponse(res, 500, "Failed to delete latest message", error);
  }
};


export const getAllHomeData = async (req, res) => {
  try {
    const existingData = await HomePage.findOne({
      include: ['videos', 'weekendPrograms', 'latestMessages']
    });
    if (!existingData) {
      return res.status(200).json({
        message: "HomePage",
        _doc: transformHomePage({
          heroTitle: "", heroSubText: "", heroButtonText: "", heroButtonLink: "", heroImage: "",
          pastorName: "", pastorDescription: "", pastorImage: "",
          latestHeading: "", latestDescription: "", latestHostName: "", latestTitle: "", latestYoutubeLink: "", latestThumbnailImage: "",
          videos: [], weekendPrograms: []
        })
      });
    }

    return res.status(200).json({
      message: "HomePage",
      _doc: transformHomePage(existingData)
    });
  } catch (error) {
    logger?.error(
      `❌ Failed to update latest message at homepage: ${error.message}`
    );

    return sendResponse(
      res,
      500,
      "Failed to update latest message section",
      error
    );
  }
};

export const getAllLocalVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [['createdAt', 'DESC']],
    });

    const formattedVideos = videos.map((item) => ({
      videoId: item.id.toString(),
      title: item.speakerName,
      description: item.description,
      channelTitle: 'Real Temple',
      viewCount: 0,
      thumbnail: item.thumbnailImage,
      watchUrl: item.youtubeLink,
      embedUrl: item.youtubeLink?.includes('watch?v=')
        ? item.youtubeLink.replace('watch?v=', 'embed/')
        : item.youtubeLink,
      publishedAt: item.createdAt,
      date: item.createdAt,
      preacher: item.speakerName,
      subText: item.subText,
    }));

    return res.status(200).json(formattedVideos);
  } catch (error) {
    logger?.error(`❌ Failed to fetch local videos: ${error.message}`);
    return sendResponse(res, 500, "Failed to fetch local videos", error);
  }
};

export const updateTimingsSection = async (req, res) => {
  try {
    const { morningService, eveningService, sundaySchool } = req.body;

    const existingData = await HomePage.findOne();

    if (!existingData) {
      return res.status(400).json({
        message: "Please add Hero Section First",
      });
    }

    const timings = {};
    if (morningService !== undefined) timings.morningService = morningService;
    if (eveningService !== undefined) timings.eveningService = eveningService;
    if (sundaySchool !== undefined) timings.sundaySchool = sundaySchool;

    existingData.timings = { ...existingData.timings, ...timings };

    await existingData.save();

    return res.status(200).json({
      message: "Timings Section updated successfully",
      _doc: transformHomePage(existingData)
    });
  } catch (error) {
    logger?.error(`❌ Failed to update timings section: ${error.message}`);
    return sendResponse(res, 500, "Failed to update timings section", error);
  }
};
