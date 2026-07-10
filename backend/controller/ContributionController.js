import { ContributionPage, SupportItem, DonationAmount, DonationPurpose } from "../models.js";
import logger from "../utils/logger.js";
import { sendResponse } from "../utils/sendResponse.js";

// Helper to seed/initialize default data
const ensureDefaultContributionData = async () => {
  try {
    const page = await ContributionPage.findByPk(1);
    if (!page) {
      console.log("Seeding default Contribution Page data...");
      
      // Create page
      await ContributionPage.create({
        id: 1,
        heroHeadingLine1: "Every contribution matters,",
        heroHeadingHighlight: "every act of giving transforms lives.",
        heroDescription: "Your generosity helps provide vital support, extend outreach efforts, and share the message of Christ with those who need it most.",
        heroButtonGiveNow: "Give Now",
        heroButtonLearnMore: "Learn More",
        
        servingHeading: "Serving with Love",
        servingDescription: "Together we can bring hope, compassion, and support to communities in need.",
        servingImage: "/images/give-now-header.png",
        
        supportImage: "/images/give-now-support.png",
        
        waysLabel: "Support With Love",
        waysHeading: "Ways to Give",
        
        formImage: "/images/GiveNowWaysToGive.png",
        formLabel: "Real Temple Church",
        formHeading: "Every Gift Changes Lives",
        formDescription: "Your generosity empowers missions, supports outreach, and brings hope to families around the world.",
        
        bankAccountName: "D. SURESH",
        bankAccountNumber: "50100286369360",
        bankIfsc: "HDFC0001990",
        bankBranch: "HAYATNAGAR",
      });

      // Create support items
      await SupportItem.bulkCreate([
        {
          contributionPageId: 1,
          title: "Community Outreach",
          description: "At Real Temple Church, every gift has purpose. Your faithful giving enables us to carry the light of Christ far and wide—touching lives, restoring hope, and building the Kingdom of God.",
          icon: "/images/bible-icon.png",
          order: 0,
        },
        {
          contributionPageId: 1,
          title: "Global Missions",
          description: "Support our missionaries as they build schools, dig wells, and share the Gospel across 12 nations. Every mission trip changes lives—both for those who go and those who receive.",
          icon: "/images/bible-icon.png",
          order: 1,
        },
        {
          contributionPageId: 1,
          title: "Church Growth",
          description: "Your support allows us to expand our ministries, maintain church facilities, and create life-changing worship experiences. You are helping others grow deeper in faith.",
          icon: "/images/bible-icon.png",
          order: 2,
        },
      ]);

      // Create donation amounts
      await DonationAmount.bulkCreate([
        { contributionPageId: 1, amount: 50 },
        { contributionPageId: 1, amount: 100 },
        { contributionPageId: 1, amount: 200 },
        { contributionPageId: 1, amount: 500 },
        { contributionPageId: 1, amount: 2000 },
      ]);

      // Create donation purposes
      await DonationPurpose.bulkCreate([
        { contributionPageId: 1, name: "Community Outreach", value: "community-outreach" },
        { contributionPageId: 1, name: "Global Missions", value: "global-missions" },
        { contributionPageId: 1, name: "Church Growth", value: "church-growth" },
      ]);

      console.log("✅ Default Contribution Page data seeded successfully!");
    }
  } catch (err) {
    console.error("❌ Error seeding default contribution data:", err);
  }
};

export const getContributionData = async (req, res) => {
  try {
    await ensureDefaultContributionData();
    const data = await ContributionPage.findByPk(1, {
      include: [
        { model: SupportItem, as: "supportItems" },
        { model: DonationAmount, as: "donationAmounts" },
        { model: DonationPurpose, as: "donationPurposes" },
      ],
      order: [
        [{ model: SupportItem, as: "supportItems" }, "order", "ASC"],
        [{ model: DonationAmount, as: "donationAmounts" }, "amount", "ASC"],
      ],
    });
    return res.status(200).json(data);
  } catch (error) {
    logger?.error(`Failed to fetch contribution data: ${error.message}`);
    return sendResponse(res, 500, "Failed to fetch contribution data", error);
  }
};

// Update hero section
export const updateHeroSection = async (req, res) => {
  try {
    const { heroHeadingLine1, heroHeadingHighlight, heroDescription, heroButtonGiveNow, heroButtonLearnMore } = req.body;
    const page = await ContributionPage.findByPk(1);
    if (!page) return sendResponse(res, 404, "Contribution Page not found");

    await page.update({
      heroHeadingLine1,
      heroHeadingHighlight,
      heroDescription,
      heroButtonGiveNow,
      heroButtonLearnMore,
    });
    return res.status(200).json({ message: "Hero section updated successfully", data: page });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update hero section", error);
  }
};

// Update serving section
export const updateServingSection = async (req, res) => {
  try {
    const { servingHeading, servingDescription } = req.body;
    const image = req.file?.path;
    const page = await ContributionPage.findByPk(1);
    if (!page) return sendResponse(res, 404, "Contribution Page not found");

    const updates = { servingHeading, servingDescription };
    if (image) updates.servingImage = image;

    await page.update(updates);
    return res.status(200).json({ message: "Serving with Love section updated successfully", data: page });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update serving section", error);
  }
};

// Update support matters image
export const updateSupportImage = async (req, res) => {
  try {
    const image = req.file?.path;
    if (!image) return sendResponse(res, 400, "No image uploaded");
    const page = await ContributionPage.findByPk(1);
    if (!page) return sendResponse(res, 404, "Contribution Page not found");

    await page.update({ supportImage: image });
    return res.status(200).json({ message: "Support image updated successfully", data: page });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update support image", error);
  }
};

// Manage support items
export const addSupportItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    const icon = "/images/bible-icon.png"; // Default icon
    const page = await ContributionPage.findByPk(1);
    if (!page) return sendResponse(res, 404, "Contribution Page not found");

    const lastItem = await SupportItem.findOne({ order: [["order", "DESC"]] });
    const nextOrder = lastItem ? lastItem.order + 1 : 0;

    const item = await SupportItem.create({
      title,
      description,
      icon,
      order: nextOrder,
      contributionPageId: 1,
    });
    return res.status(201).json({ message: "Support item added successfully", data: item });
  } catch (error) {
    return sendResponse(res, 500, "Failed to add support item", error);
  }
};

export const updateSupportItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const item = await SupportItem.findByPk(id);
    if (!item) return sendResponse(res, 404, "Support item not found");

    await item.update({ title, description });
    return res.status(200).json({ message: "Support item updated successfully", data: item });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update support item", error);
  }
};

export const deleteSupportItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await SupportItem.findByPk(id);
    if (!item) return sendResponse(res, 404, "Support item not found");

    await item.destroy();
    return res.status(200).json({ message: "Support item deleted successfully" });
  } catch (error) {
    return sendResponse(res, 500, "Failed to delete support item", error);
  }
};

// Update ways to give texts
export const updateWaysSection = async (req, res) => {
  try {
    const { waysLabel, waysHeading } = req.body;
    const page = await ContributionPage.findByPk(1);
    if (!page) return sendResponse(res, 404, "Contribution Page not found");

    await page.update({ waysLabel, waysHeading });
    return res.status(200).json({ message: "Ways section details updated successfully", data: page });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update ways section details", error);
  }
};

// Manage purpose options
export const addPurposeOption = async (req, res) => {
  try {
    const { name, value } = req.body;
    const purpose = await DonationPurpose.create({
      name,
      value,
      contributionPageId: 1,
    });
    return res.status(201).json({ message: "Purpose option added successfully", data: purpose });
  } catch (error) {
    return sendResponse(res, 500, "Failed to add purpose option", error);
  }
};

export const deletePurposeOption = async (req, res) => {
  try {
    const { id } = req.params;
    const purpose = await DonationPurpose.findByPk(id);
    if (!purpose) return sendResponse(res, 404, "Purpose option not found");

    await purpose.destroy();
    return res.status(200).json({ message: "Purpose option deleted successfully" });
  } catch (error) {
    return sendResponse(res, 500, "Failed to delete purpose option", error);
  }
};

// Manage donation amount options
export const addAmountOption = async (req, res) => {
  try {
    const { amount } = req.body;
    const amt = await DonationAmount.create({
      amount: parseInt(amount, 10),
      contributionPageId: 1,
    });
    return res.status(201).json({ message: "Amount option added successfully", data: amt });
  } catch (error) {
    return sendResponse(res, 500, "Failed to add amount option", error);
  }
};

export const deleteAmountOption = async (req, res) => {
  try {
    const { id } = req.params;
    const amt = await DonationAmount.findByPk(id);
    if (!amt) return sendResponse(res, 404, "Amount option not found");

    await amt.destroy();
    return res.status(200).json({ message: "Amount option deleted successfully" });
  } catch (error) {
    return sendResponse(res, 500, "Failed to delete amount option", error);
  }
};

// Update donation form side image/content
export const updateFormSideSection = async (req, res) => {
  try {
    const { formLabel, formHeading, formDescription } = req.body;
    const image = req.file?.path;
    const page = await ContributionPage.findByPk(1);
    if (!page) return sendResponse(res, 404, "Contribution Page not found");

    const updates = { formLabel, formHeading, formDescription };
    if (image) updates.formImage = image;

    await page.update(updates);
    return res.status(200).json({ message: "Form side content updated successfully", data: page });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update form side content", error);
  }
};

// Update bank details
export const updateBankDetails = async (req, res) => {
  try {
    const { bankAccountName, bankAccountNumber, bankIfsc, bankBranch } = req.body;
    const page = await ContributionPage.findByPk(1);
    if (!page) return sendResponse(res, 404, "Contribution Page not found");

    await page.update({
      bankAccountName,
      bankAccountNumber,
      bankIfsc,
      bankBranch,
    });
    return res.status(200).json({ message: "Bank details updated successfully", data: page });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update bank details", error);
  }
};
