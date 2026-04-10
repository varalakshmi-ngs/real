import Razorpay from "razorpay";
import { Op } from "sequelize";
import { sequelize } from "../config/database.js";
import { Blog, Contact, Event, PrayerRequest, Testimonial, Donation, GalleryImage } from "../models.js";
import {
  createContact,
  createPrayerRequest,
  createTestimonial,
} from "../service/web.service.js";
import logger from "../utils/logger.js";
import { sendResponse } from "../utils/sendResponse.js";
import { contactValidator } from "../validater/contact/contactValidator.js";
import { testimonialValidator } from "../validater/testimonial/testimonialValidator.js";
import { validatePrayerRequest } from "../validater/web/prayerRequest.js";
import { createHmac } from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.YOUR_RAZORPAY_KEY_ID,
  key_secret: process.env.YOUR_RAZORPAY_KEY_SECRET,
});

export const handleContact = async (req, res) => {
  logger.info("ℹ️ CONTACT API HIT", req.body);
  const { error } = contactValidator(req.body);
  if (error) {
    logger?.warn(`⚠️ contact Validation error: ${error.details[0]?.message}`);

    return res.status(400).json({
      message: "Validation Error",
      error: error.details[0].message,
    });
  }
  try {
    await createContact(req.body);
    return sendResponse(res, 200, "Contact form submitted successfully");
  } catch (err) {
    logger?.error(
      `❌Failed to submit contact form ${req?.body?.email}: ${err.message}`
    );
    return sendResponse(res, 500, "Failed to submit contact form");
  }
};

export const getContact = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  try {
    const totalContacts = await Contact.count();

    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber
    });

    return res.status(200).json({
      message: "Contacts fetched successfully",
      totalPages: Math.ceil(totalContacts / limitNumber),
      currentPage: pageNumber,
      data: contacts,
    });
  } catch (error) {
    logger?.error(`❌Failed to fetch contact form : ${error.message}`);
    return sendResponse(res, 500, "Failed to fetch contact details");
  }
};

export const deletContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Contact.destroy({ where: { id } });
    if (deleted === 0) {
      return sendResponse(res, 404, "Contact not found");
    }
    return sendResponse(res, 204, "Contact Delete successfully.!");
  } catch (error) {
    logger?.error(`❌Failed to delete contact form : ${error.message}`);
    return sendResponse(res, 500, "Failed to delete contact details");
  }
};

export const handleTestimonialUpload = async (req, res) => {
  logger.info("ℹ️ TESTIMONIAL API HIT");
  const { name, comment } = req.body;
  const image = req.file?.path;

  const { error } = testimonialValidator({ name, comment, image });

  if (error) {
    logger?.warn(
      `⚠️ testimonial Validation error: ${error.details[0]?.message}`
    );

    return res.status(400).json({
      message: "Validation Error",
      error: error.details[0].message,
    });
  }

  try {
    await createTestimonial({ name, comment, image });
    return sendResponse(res, 201, "Testimonial created successfully");
  } catch (err) {
    logger?.error(`❌Failed to save testimonial ${name}: ${error.message}`);
    return sendResponse(res, 500, "Failed to save testimonial", error);
  }
};

export const getTestimonialUpload = async (req, res) => {
  const { page = 1, limit = 10, status = "approved" } = req.query;
  //
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  try {
    const filter = { isApproved: status };
    const totalContacts = await Testimonial.count({ where: filter });

    const contacts = await Testimonial.findAll({
      where: filter,
      order: [['createdAt', 'DESC']], // descending order
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber
    });

    return res.status(200).json({
      message: "Testimonial fetched successfully",
      totalPages: Math.ceil(totalContacts / limitNumber),
      currentPage: pageNumber,
      data: contacts,
    });
  } catch (error) {
    logger?.error(`❌Failed to fetch testimonial details : ${error.message}`);
    return sendResponse(res, 500, "Failed to fetch testimonial details");
  }
};

export const rejectedTestimonialUpload = async (req, res) => {
  const { id } = req.params;
  try {
    const [affectedRows] = await Testimonial.update(
      { isApproved: "rejected" },
      { where: { id } }
    );
    if (affectedRows === 0) {
      return sendResponse(res, 404, "Testimonial not found");
    }
    return sendResponse(res, 200, "Updated...!");
  } catch (error) {
    logger?.error(`❌Failed to reject testimonial : ${error.message}`);
    return sendResponse(res, 500, "Failed to reject testimonial");
  }
};
export const approvedTestimonialUpload = async (req, res) => {
  const { id } = req.params;
  try {
    const [affectedRows] = await Testimonial.update(
      { isApproved: "approved" },
      { where: { id } }
    );
    if (affectedRows === 0) {
      return sendResponse(res, 404, "Testimonial not found");
    }
    return sendResponse(res, 200, "Updated...!");
  } catch (error) {
    logger?.error(`❌Failed to approved testimonial : ${error.message}`);
    return sendResponse(res, 500, "Failed to approved testimonial");
  }
};

export const submitPrayerRequest = async (req, res) => {

  logger.info("ℹ️ PRAYER REQUEST API HIT");
  const { error } = validatePrayerRequest(req.body);
  if (error) {
    logger?.warn(
      `⚠️ prayer request Validation error: ${error.details[0]?.message}`
    );

    return res.status(400).json({
      message: "Validation Error",
      error: error.details[0].message,
    });
  }

  try {
    await createPrayerRequest(req.body);
    return sendResponse(res, 200, "Prayer request submitted successfully");
  } catch (err) {
    logger?.error(`❌Failed to submit prayer request : ${err.message}`);
    return sendResponse(res, 500, "Failed to submit prayer request", err);
  }
};

export const getPrayerRequest = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const searchQuery = search.trim().toLowerCase();
  try {
    const query = searchQuery
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${searchQuery}%` } },
            { forWhom: { [Op.like]: `%${searchQuery}%` } },
            { prayerType: { [Op.like]: `%${searchQuery}%` } },
            { language: { [Op.like]: `%${searchQuery}%` } },
            { city: { [Op.like]: `%${searchQuery}%` } },
            { mobile: { [Op.like]: `%${searchQuery}%` } },
            { message: { [Op.like]: `%${searchQuery}%` } },
          ],
        }
      : {};

    const total = await PrayerRequest.count({ where: query });

    const results = await PrayerRequest.findAll({
      where: query,
      order: [['createdAt', 'DESC']],
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber
    });

    return res.status(200).json({
      message: "Prayer requests fetched successfully",
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber,
      data: results,
    });
  } catch (err) {
    logger?.error(`❌ Error fetching prayer requests: ${err.message}`);
    return sendResponse(res, 500, " Error fetching prayer requests:", err);
  }
};

export const markAsPrayed = async (req, res) => {
  const { id } = req.params;

  try {
    const [affectedRows] = await PrayerRequest.update(
      { isPrayer: true },
      { where: { id } }
    );

    if (affectedRows === 0) return sendResponse(res, 404, "Prayer request not found");

    const updated = await PrayerRequest.findByPk(id);

    return res.status(200).json({
      message: "Prayer request marked as prayed",
      data: updated,
    });
  } catch (error) {
    logger?.error(`❌Error marking as prayed: ${error.message}`);
    return sendResponse(res, 500, "Error marking as prayed:", error);
  }
};

export const deletePrayerRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PrayerRequest.destroy({ where: { id } });

    if (deleted === 0) return sendResponse(res, 404, "Prayer request not found");

    return res.status(200).json({
      message: "Prayer request deleted successfully",
    });
  } catch (error) {
    logger?.error(`❌Error deleting prayer request: ${error.message}`);
    return sendResponse(res, 500, "Error deleting prayer request:", error);
  }
};

// blog
export const createBlogWithImage = async (req, res) => {
  try {
    const { title, author, description, category, location, date } = req.body;

    const image = req.file ? req.file.filename : "";

    const saved = await Blog.create({
      title,
      author,
      description,
      category,
      location,
      image,
      date: date,
    });
    res.status(201).json({ message: "Blog created successfully", blog: saved.toJSON() });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  const { page = 1, limit = 100, search = "" } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const searchQuery = search.trim().toLowerCase();

  try {
    const query = searchQuery
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${searchQuery}%` } },
            { author: { [Op.iLike]: `%${searchQuery}%` } },
            { description: { [Op.iLike]: `%${searchQuery}%` } },
            { category: { [Op.iLike]: `%${searchQuery}%` } },
            { location: { [Op.iLike]: `%${searchQuery}%` } },
          ],
        }
      : {};

    const total = await Blog.count({ where: query });
    const blogs = await Blog.findAll({
      where: query,
      order: [['createdAt', 'DESC']],
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber
    });

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    logger?.error(`❌ Error fetching blogs ${error.message}`);
    return sendResponse(res, 500, "Error fetching blogs", error);
  }
};

export const getBlogsThroughWebPage = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const searchQuery = search.trim().toLowerCase();

  try {
    const query = searchQuery
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${searchQuery}%` } },
            { author: { [Op.like]: `%${searchQuery}%` } },
            { description: { [Op.like]: `%${searchQuery}%` } },
            { category: { [Op.like]: `%${searchQuery}%` } },
            { location: { [Op.like]: `%${searchQuery}%` } },
          ],
        }
      : {};

    const total = await Blog.count({ where: query });
    const blogs = await Blog.findAll({
      where: query,
      order: [['createdAt', 'DESC']],
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber
    });

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    logger?.error(`❌ Error fetching blogs ${error.message}`);
    return sendResponse(res, 500, "Error fetching blogs", error);
  }
};
export const deleteBlogs = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.destroy({ where: { id } });

    if (!blog) {
      return sendResponse(res, 200, "Blog not found");
    }

    return res
      .status(200)
      .json({ status: true, message: "Blog deleted successfully" });
  } catch (error) {
    logger?.error(`❌ Error deleting blog: ${error.message}`);
    return sendResponse(res, 500, "Error deleting blog:", error);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, description, category, date, location } = req.body;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.update({
      title,
      author,
      description,
      category,
      date,
      location,
      image: req.file ? req.file.filename : blog.image
    });

    res.status(200).json({ message: "Blog updated successfully", blog: blog.toJSON() });
  } catch (err) {
    logger?.error(`❌ Edit Blog Error: ${err.message}`);
    return sendResponse(res, 500, "Edit Blog Error:", err);
  }
};

export const postEvent = async (req, res) => {
  logger.info("ℹ️ EVENT API HIT", req.body);
  try {
    const {
      eventName,
      date,
      description,
      eventType,
      startTime,
      endTime,
      location,
    } = req.body;

    if (
      !eventName ||
      !date ||
      !description ||
      !eventType ||
      !startTime ||
      !endTime ||
      !location
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      eventName,
      date,
      description,
      eventType,
      startTime,
      endTime,
      location,
      image: req.file ? req.file.filename : null,
    });
    res.status(201).json({ message: "Event created successfully", event: event.toJSON() });
  } catch (err) {
    logger?.error(`❌ Edit Event Error: ${err.message}`);
    return sendResponse(res, 500, "Edit Event Error:", err);
  }
};

export const getEvents = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const searchQuery = search.trim().toLowerCase();

  try {
    // Build search query on relevant fields
    const query = searchQuery
      ? {
          [Op.or]: [
            { eventName: { [Op.iLike]: `%${searchQuery}%` } },
            { description: { [Op.iLike]: `%${searchQuery}%` } },
            { eventType: { [Op.iLike]: `%${searchQuery}%` } },
            { location: { [Op.iLike]: `%${searchQuery}%` } },
          ],
        }
      : {};

    const total = await Event.count({ where: query });
    const events = await Event.findAll({
      where: query,
      order: [['createdAt', 'DESC']],
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber
    });

    // Return paginated results with metadata
    res.status(200).json({
      message: "Events fetched successfully",
      data: events,
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber,
    });
  } catch (err) {
    console.error(`❌ Error fetching events: ${err.message}`);
    res
      .status(500)
      .json({ message: "Error fetching events", error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.destroy({ where: { id } });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      eventName,
      date,
      description,
      eventType,
      startTime,
      endTime,
      location,
    } = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.update({
      eventName,
      date,
      description,
      eventType,
      startTime,
      endTime,
      location,
      image: req.file ? req.file.filename : event.image
    });

    res.status(200).json({ message: "Event updated successfully", event: event.toJSON() });
  } catch (err) {
    logger?.error(`❌ Edit Event Error: ${err.message}`);
    return sendResponse(res, 500, "Edit Event Error", err);
  }
};

export const getEventWithSuggestions = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Get the main event
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // For suggestions, get 3 random events excluding current
    const suggestions = await Event.findAll({
      where: { id: { [Op.ne]: id } },
      order: sequelize.literal('RAND()'),
      limit: 3
    });

    // Step 3: Return both
    res.status(200).json({
      event: event.toJSON(),
      suggestions: suggestions.map(s => s.toJSON()),
    });
  } catch (error) {
    logger?.error(`❌ Error Fetvhing event ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const submitDonation = async (req, res) => {
  const { amount, fullName, email, mobile, purpose } = req.body;

  try {
    const donation = await Donation.create({
      amount: amount,
      fullName,
      email,
      mobile,
      purpose,
      paymentStatus: "completed",
    });

    res.status(201).json({ 
      success: true, 
      message: "Donation recorded successfully", 
      donationId: donation.id 
    });
  } catch (error) {
    logger?.error(`❌ Error Submitting Donation: ${error.message}`);
    res.status(500).json({ error: "Failed to record donation" });
  }
};

export const createOrder = async (req, res) => {
  const { amount, fullName, email, mobile, purpose, adCount, tvChannel } =
    req.body;

  console.log(amount, fullName, email, mobile, purpose);

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);

    await Donation.create({
      amount: amount,
      fullName,
      email,
      mobile,
      purpose,
      orderId: order.id,
      paymentStatus: "pending",
      adCount,
      tvChannel,
    });

    res.json({ orderId: order.id });
  } catch (error) {
    // console.error("Error creating order:", error);
    logger?.error(`❌ Error Creating Order ${error.message}`);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    const hmac = createHmac("sha256", process.env.YOUR_RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    const paymentData = await Donation.findOne({
      where: { orderId: razorpay_order_id }
    });

    if (generatedSignature === razorpay_signature) {
      if (paymentData) {
        await paymentData.update({
          paymentStatus: "completed",
          paymentId: razorpay_payment_id
        });
      }
      return res.status(200).json({ success: true });
    } else {
      if (paymentData) {
        await paymentData.update({
          paymentStatus: "failed",
          paymentId: razorpay_payment_id
        });
      }
      res.status(400).json({ success: false });
    }
  } catch (error) {
    logger?.error(`❌ Payment Process Error: ${error.message}`);
    res.status(500).json({ error: "Failed To process payment" });
  }
};

export const getAllCount = async (req, res) => {
  try {
    const galleryImageCount = await GalleryImage.count();

    const donations = await Donation.count();

    const completedPrayer = await PrayerRequest.count({
      where: { isPrayer: true }
    });

    const pendingPrayer = await PrayerRequest.count({
      where: { isPrayer: false }
    });

    const prayerRequestCount = pendingPrayer + completedPrayer;

    const eventCount = await Event.count();

    return res.status(200).send({
      images: galleryImageCount,
      donations: donations,
      prayerrequests: prayerRequestCount,
      events: eventCount,
      completedPrayer,
      pendingPrayer,
    });
  } catch (error) {
    logger?.error(`❌ Get Count Error: ${error.message}`);
    return sendResponse(res, 500, "Edit Event Error", err);
  }
};

export const getContributions = async (req, res) => {
  try {
    const data = await Donation.findAll();

    return res.status(200).send(data);
  } catch (error) {
    logger?.error(`❌ Get Dontations Error: ${error.message}`);
    return sendResponse(res, 500, "Get Dontations Error", err);
  }
};
export const getNotifications = async (req, res) => {
  try {
    const recentContacts = await Contact.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    const recentPrayers = await PrayerRequest.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    const recentDonations = await Donation.findAll({
      limit: 5,
      where: { paymentStatus: 'completed' },
      order: [['createdAt', 'DESC']]
    });

    const notifications = [
      ...recentContacts.map(c => ({
        id: `contact-${c.id}`,
        message: `New message from ${c.firstName}: ${c.subject}`,
        type: 'contact',
        time: c.createdAt,
        unread: true
      })),
      ...recentPrayers.map(p => ({
        id: `prayer-${p.id}`,
        message: `New prayer request from ${p.name}`,
        type: 'prayer',
        time: p.createdAt,
        unread: !p.isPrayer
      })),
      ...recentDonations.map(d => ({
        id: `donation-${d.id}`,
        message: `New contribution of $${d.amount} from ${d.fullName}`,
        type: 'donation',
        time: d.createdAt,
        unread: true
      }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

    return res.status(200).json(notifications);
  } catch (error) {
    logger?.error(`❌ Get Notifications Error: ${error.message}`);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
