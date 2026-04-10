import { GalleryCategory, GalleryImage } from "../models.js";
import logger from "../utils/logger.js";
import { sendResponse } from "../utils/sendResponse.js";

export const addGalleryCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Please Add Title",
      });
    }
    const data = await GalleryCategory.create({ title });

    return sendResponse(res, 201, "Added New Category", null, data.toJSON());
  } catch (error) {
    logger?.error(`❌ Failed to add Gallery category  : ${error.message}`);

    return sendResponse(res, 500, "Failed to add category", error);
  }
};

export const editGalleryCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!id || !title) {
      return res.status(400).json({
        message: "Id or Title is missing",
      });
    }

    const [affectedRows] = await GalleryCategory.update(
      { title },
      { where: { id } }
    );
    if (affectedRows === 0) {
      return sendResponse(res, 404, "Category not found");
    }
    return sendResponse(res, 200, "Edited New Category");
  } catch (error) {
    logger?.error(`❌ Failed to edit Gallery category  : ${error.message}`);

    return sendResponse(res, 500, "Failed to edit category", error);
  }
};

export const deleteGalleryCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Id is missing",
      });
    }

    const deleted = await GalleryCategory.destroy({ where: { id } });

    await GalleryImage.destroy({ where: { categoryId: id } });

    if (deleted === 0) {
      return sendResponse(res, 404, "Category not found");
    }

    return sendResponse(res, 200, "Deleted Category");
  } catch (error) {
    logger?.error(`❌ Failed to delete Gallery category  : ${error.message}`);

    return sendResponse(res, 500, "Failed to delete category", error);
  }
};

export const addGalleryImages = async (req, res) => {
  try {
    const { catId } = req.params;

    if (!req.files || req.files.length <= 0) {
      return res.status(400).send({
        message: "Please add at least one image",
      });
    }

    // catId is now optional, fallback to null if not provided, empty, or 'all' for global
    const effectiveCatId = (catId && catId !== "null" && catId !== "undefined" && catId !== "all") ? catId : null;

    if (effectiveCatId) {
      const category = await GalleryCategory.findByPk(effectiveCatId);
      if (!category) {
        return res.status(400).send({
          message: "Category not found",
        });
      }
    }

    const documents = req.files.map((file) => ({
      categoryId: effectiveCatId,
      image: file.path,
    }));

    const addedImages = await GalleryImage.bulkCreate(documents);

    return res.status(200).json({
      message: "Added Image Success",
      images: addedImages.map(img => img.toJSON()),
    });
  } catch (error) {
    logger.error(`❌ Failed to add images: ${error.message}`);
    return sendResponse(res, 500, "Failed to add images", error);
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await GalleryImage.destroy({ where: { id } });

    if (deleted === 0) {
      return sendResponse(res, 404, "Image not found");
    }

    return sendResponse(res, 200, "Deleted Success");
  } catch (error) {
    logger?.error(`❌ Failed to delete Gallery Images  : ${error.message}`);

    return sendResponse(res, 500, "Failed to delete Images", error);
  }
};

export const getGalleryImages = async (req, res) => {
  try {
    const { catId } = req.params;

    let whereClause = {};
    if (catId && catId !== "null" && catId !== "undefined" && catId !== "all") {
      whereClause = { categoryId: catId };
    }

    const images = await GalleryImage.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(images);
  } catch (error) {
    logger.error(`❌ Failed to get images: ${error.message}`);
    return sendResponse(res, 500, "Failed to get images", error);
  }
};
export const getGalleryCategories = async (req, res) => {
  try {
    const galleryData = await GalleryCategory.findAll();
    const galleryImages = await GalleryImage.findAll({
      order: [['createdAt', 'DESC']]
    });

    return res
      .status(200)
      .send({ categories: galleryData, images: galleryImages });
  } catch (error) {
    logger.error(`❌ Failed to get galleryData: ${error.message}`);
    return sendResponse(res, 500, "Failed to get galleryData", error);
  }
};

//  return sendResponse(
//       res,
//       201,
//       "Added Team Member Success",
//       null,
//       existingData.teamMembers
//     );

/*
    logger?.error(`❌ Failed to update About  Hero Section: ${error.message}`);
    
        return sendResponse(res, 500, "Failed to save About Hero", error);
*/
