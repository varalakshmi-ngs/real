import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import "dotenv/config";
import { sequelize } from "./config/database.js";
import AuthRoute from "./routes/auth-route.js";
import WebRoute from "./routes/web-site-route.js";

import HomePageRoute from "./routes/HomePageRoute.js";
import AboutRoute from "./routes/AboutRoute.js";
import GalleryRoute from "./routes/GalleryRoute.js";
import MagazineRoute from "./routes/MagazineRoute.js";

import YoutubeRoute from "./routes/YoutubeRoute.js";
import ServiceRoute from "./routes/ServiceRoute.js";

import errorHandler from "./middlewares/errorHandle.js";

// import { pubClient } from "./redis/redis-publisher.js";

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [], // Allow specific origins from env only
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Remove manual CORS headers as cors middleware handles it

// app.use(errorHandler);

const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL database connected successfully!");
    await sequelize.sync(); // Remove alter: true for production safety
    server.listen(process.env.PORT, "0.0.0.0", () =>
      console.log(`Server listening on ${process.env.PORT} .....!`)
    );
  } catch (error) {
    console.error("❌ Unable to connect to MySQL database:", error);
  }
};

startServer();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome....!" });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/auth", AuthRoute);
app.use("/web", WebRoute);

app.use("/home", HomePageRoute);
app.use("/about", AboutRoute);
app.use("/gallery", GalleryRoute);
app.use("/magazine", MagazineRoute);

app.use("/youtube-data", YoutubeRoute);
app.use("/services", ServiceRoute);

app.use(errorHandler);

module.exports = app;
