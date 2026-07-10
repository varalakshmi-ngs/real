import { SocialLink } from "../models.js";
import logger from "../utils/logger.js";
import { sendResponse } from "../utils/sendResponse.js";

// Helper to seed/initialize default data
const ensureDefaultSocialLinks = async () => {
  try {
    const link = await SocialLink.findByPk(1);
    if (!link) {
      console.log("Seeding default Social Link data...");
      await SocialLink.create({
        id: 1,
        youtube: "https://www.youtube.com/@REALTEMPLE",
        whatsapp: "https://wa.me/917399993536",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://x.com",
        linkedin: "",
        email: "rgwm.withds@gmail.com",
        phone: "+91 73999 93536",
        address: "REAL TEMPLE, LB Nagar, Hyderabad, India",
        mapLocation: "Real Temple Church (The Real Church)",
      });
      console.log("✅ Default Social Link data seeded successfully!");
    } else {
      // If fields are missing in existing record, populate default values
      let needsUpdate = false;
      if (link.email === undefined || link.email === null) {
        link.email = "rgwm.withds@gmail.com";
        needsUpdate = true;
      }
      if (link.phone === undefined || link.phone === null) {
        link.phone = "+91 73999 93536";
        needsUpdate = true;
      }
      if (link.address === undefined || link.address === null) {
        link.address = "REAL TEMPLE, LB Nagar, Hyderabad, India";
        needsUpdate = true;
      }
      if (link.mapLocation === undefined || link.mapLocation === null) {
        link.mapLocation = "Real Temple Church (The Real Church)";
        needsUpdate = true;
      }
      if (needsUpdate) {
        await link.save();
        console.log("✅ Populated missing contact info fields in existing record!");
      }
    }
  } catch (err) {
    console.error("❌ Error seeding default social links:", err);
  }
};

export const getSocialLinks = async (req, res) => {
  try {
    await ensureDefaultSocialLinks();
    const links = await SocialLink.findByPk(1);
    return res.status(200).json(links);
  } catch (error) {
    logger?.error(`Failed to fetch social links: ${error.message}`);
    return sendResponse(res, 500, "Failed to fetch social links", error);
  }
};

export const updateSocialLinks = async (req, res) => {
  try {
    let { youtube, whatsapp, facebook, instagram, twitter, linkedin, email, phone, address, mapLocation } = req.body;
    
    // Auto-format WhatsApp if it is a phone number
    if (whatsapp) {
      whatsapp = whatsapp.trim();
      if (!whatsapp.startsWith("http://") && !whatsapp.startsWith("https://")) {
        // Strip everything except digits
        const digits = whatsapp.replace(/[^0-9]/g, "");
        if (digits) {
          whatsapp = `https://wa.me/${digits}`;
        }
      }
    }

    const links = await SocialLink.findByPk(1);
    if (!links) return sendResponse(res, 404, "Social Links record not found");

    await links.update({
      youtube: youtube || "",
      whatsapp: whatsapp || "",
      facebook: facebook || "",
      instagram: instagram || "",
      twitter: twitter || "",
      linkedin: linkedin || "",
      email: email || "",
      phone: phone || "",
      address: address || "",
      mapLocation: mapLocation || "",
    });

    return res.status(200).json({ message: "Social links and contact info updated successfully", data: links });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update social links", error);
  }
};
