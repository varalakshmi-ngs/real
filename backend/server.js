import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

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

// import { pubClient } from "./redis/redis-publisher.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*", // Allow requests from this origin
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.use(errorHandler);

const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL database connected successfully!");
    await sequelize.sync({ alter: true });
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

app.use("/auth", AuthRoute);
app.use("/web", WebRoute);

app.use("/home", HomePageRoute);
app.use("/about", AboutRoute);
app.use("/gallery", GalleryRoute);
app.use("/magazine", MagazineRoute);

app.use("/youtube-data", YoutubeRoute);
app.use("/services", ServiceRoute);
