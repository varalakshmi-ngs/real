import { DataTypes } from "sequelize";
import { sequelize } from "./config/database.js";

export const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

export const Contact = sequelize.define("Contact", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  mobile: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});

export const Testimonial = sequelize.define("Testimonial", {
  image: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: false },
  isApproved: { type: DataTypes.ENUM("initiall", "approved", "rejected"), defaultValue: "initiall" },
});

export const PrayerRequest = sequelize.define("PrayerRequest", {
  name: { type: DataTypes.STRING, allowNull: false },
  forWhom: { type: DataTypes.STRING, allowNull: false },
  prayerType: { type: DataTypes.STRING, allowNull: false },
  language: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  mobile: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  isPrayer: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export const Donation = sequelize.define("Donation", {
  fullName: { type: DataTypes.STRING },
  mobile: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  amount: { type: DataTypes.DECIMAL(10, 2) },
  purpose: { type: DataTypes.STRING },
  orderId: { type: DataTypes.STRING },
  paymentId: { type: DataTypes.STRING },
  paymentStatus: { type: DataTypes.ENUM("pending", "completed", "failed"), defaultValue: "pending" },
  tvChannel: { type: DataTypes.STRING },
  adCount: { type: DataTypes.INTEGER },
});

export const Event = sequelize.define("Event", {
  eventName: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  eventType: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.STRING, allowNull: false },
  endTime: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
});

export const GalleryCategory = sequelize.define("GalleryCategory", {
  title: { type: DataTypes.STRING, allowNull: false },
});

export const GalleryImage = sequelize.define("GalleryImage", {
  image: { type: DataTypes.STRING, allowNull: false },
});

export const HomePage = sequelize.define("HomePage", {
  heroTitle: { type: DataTypes.STRING },
  heroSubText: { type: DataTypes.TEXT },
  heroButtonText: { type: DataTypes.STRING },
  heroButtonLink: { type: DataTypes.STRING },
  heroImage: { type: DataTypes.STRING },
  pastorName: { type: DataTypes.STRING },
  pastorDescription: { type: DataTypes.TEXT },
  pastorImage: { type: DataTypes.STRING },
  latestHeading: { type: DataTypes.STRING },
  latestDescription: { type: DataTypes.TEXT },
  latestHostName: { type: DataTypes.STRING },
  latestTitle: { type: DataTypes.STRING },
  latestYoutubeLink: { type: DataTypes.STRING },
  latestThumbnailImage: { type: DataTypes.STRING },
  morningService: { type: DataTypes.STRING },
  eveningService: { type: DataTypes.STRING },
  sundaySchool: { type: DataTypes.STRING },
});

export const Video = sequelize.define("Video", {
  youtubeLink: { type: DataTypes.STRING, allowNull: false },
  speakerName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  subText: { type: DataTypes.STRING, allowNull: false },
  thumbnailImage: { type: DataTypes.STRING, allowNull: false },
});

export const WeekendProgram = sequelize.define("WeekendProgram", {
  title: { type: DataTypes.STRING, allowNull: false },
  subText: { type: DataTypes.TEXT, allowNull: false },
  buttonText: { type: DataTypes.STRING, allowNull: false },
  youtubeLink: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
});

export const AboutPage = sequelize.define("AboutPage", {
  heroTitle: { type: DataTypes.STRING },
  heroSubText: { type: DataTypes.TEXT },
  heroImage: { type: DataTypes.STRING },
  pastorName: { type: DataTypes.STRING },
  pastorTitle: { type: DataTypes.STRING },
  pastorDescription: { type: DataTypes.TEXT },
  pastorImage: { type: DataTypes.STRING },
});

export const TeamMember = sequelize.define("TeamMember", {
  name: { type: DataTypes.STRING },
  designation: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
});

export const SocialLink = sequelize.define("SocialLink", {
  facebook: { type: DataTypes.STRING },
  instagram: { type: DataTypes.STRING },
  youtube: { type: DataTypes.STRING },
  twitter: { type: DataTypes.STRING },
});

export const Magazine = sequelize.define("Magazine", {
  pdf: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  subTitle: { type: DataTypes.STRING },
});

export const Service = sequelize.define("Service", {
  day: { type: DataTypes.STRING, allowNull: false, unique: true },
  department: { type: DataTypes.STRING, allowNull: false },
  service1: { type: DataTypes.STRING, allowNull: false },
  service2: { type: DataTypes.STRING },
});

GalleryCategory.hasMany(GalleryImage, { foreignKey: { name: "categoryId", allowNull: true }, as: "images", onDelete: "SET NULL" });
GalleryImage.belongsTo(GalleryCategory, { foreignKey: { name: "categoryId", allowNull: true }, as: "category" });

HomePage.hasMany(Video, { foreignKey: "homePageId", as: "videos" });
Video.belongsTo(HomePage, { foreignKey: "homePageId", as: "homePage" });

HomePage.hasMany(WeekendProgram, { foreignKey: "homePageId", as: "weekendPrograms" });
WeekendProgram.belongsTo(HomePage, { foreignKey: "homePageId", as: "homePage" });

AboutPage.hasMany(TeamMember, { foreignKey: "aboutPageId", as: "teamMembers" });
TeamMember.belongsTo(AboutPage, { foreignKey: "aboutPageId", as: "aboutPage" });

export const databaseModels = {
  User,
  Contact,
  Testimonial,
  PrayerRequest,
  Donation,
  Event,
  GalleryCategory,
  GalleryImage,
  HomePage,
  Video,
  WeekendProgram,
  AboutPage,
  TeamMember,
  SocialLink,
  Magazine,
  Service,
};
