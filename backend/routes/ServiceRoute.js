import { Router } from "express";
import { sendResponse } from "../utils/sendResponse.js";
import logger from "../utils/logger.js";
import { Service } from "../models.js";
const router = Router();

router.post("/", async (req, res) => {
  const { service2, service1, department, day } = req.body;

  try {
    const savedService = await Service.create({
      day,
      department,
      service1,
      service2: service2 ?? null,
    });

    logger?.info(`✅ Service created: ${savedService.id}`);
    return sendResponse(res, 201, "Service created successfully", null, {
      savedService,
    });
  } catch (error) {
    logger?.error(`❌ Failed to update Services: ${error.message}`);

    return sendResponse(res, 500, "Failed to save Services", error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const [affectedRows] = await Service.update(req.body, {
      where: { id: req.params.id }
    });

    if (affectedRows === 0) {
      return sendResponse(res, 404, "Service not found");
    }

    const updatedService = await Service.findByPk(req.params.id);

    logger?.info(`✏️ Service updated: ${updatedService.id}`);
    return sendResponse(res, 200, "Service updated successfully", null, {
      updatedService,
    });
  } catch (error) {
    logger?.error(`❌ Failed to update Service: ${error.message}`);
    return sendResponse(res, 500, "Failed to update Service", error);
  }
});

// ✅ Delete a Service
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Service.destroy({ where: { id: req.params.id } });

    if (deleted === 0) {
      return sendResponse(res, 404, "Service not found");
    }

    logger?.info(`🗑️ Service deleted: ${req.params.id}`);
    return sendResponse(res, 200, "Service deleted successfully");
  } catch (error) {
    logger?.error(`❌ Failed to delete Service: ${error.message}`);
    return sendResponse(res, 500, "Failed to delete Service", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll();

    logger?.info(`📦 Retrieved ${services.length} services`);
    return sendResponse(res, 200, "Services retrieved successfully", null, {
      services,
    });
  } catch (error) {
    logger?.error(`❌ Failed to fetch Services: ${error.message}`);
    return sendResponse(res, 500, "Failed to fetch Services", error);
  }
});

export default router;
