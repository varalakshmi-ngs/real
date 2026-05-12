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
import ServiceRoute from "./routes/ServiceRoute.js";

import errorHandler from "./middlewares/errorHandle.js";

// import { pubClient } from "./redis/redis-publisher.js";

// CORS configuration
const defaultOrigins = [
  "http://localhost:3000", 
  "http://localhost:5173",
  "https://realtemple-admin.nuhvin.com",
  "https://realtemple.nuhvin.com"
];

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGIN 
      ? [...defaultOrigins, ...process.env.CORS_ORIGIN.split(",").map((url) => url.trim())]
      : defaultOrigins;
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization,X-Requested-With,Accept,Origin",
  optionsSuccessStatus: 200,
};

const app = express();
app.set("trust proxy", true);

app.use(cors(corsOptions));

// Security middleware - configure helmet to not interfere with CORS
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests for static files
  })
);

// Standard CORS handling is now managed by the cors package above.
app.use((req, res, next) => {
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json());

// Static file serving with explicit CORS headers
app.use("/uploads", express.static("uploads"));

// app.use(errorHandler);

const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL database connected successfully!");
    await sequelize.sync(); 
    
    const port = process.env.PORT || 4000;
    server.listen(port, "0.0.0.0", () =>
      console.log(`🚀 Server listening on port ${port} .....!`)
    );
  } catch (error) {
    console.error("❌ Unable to connect to MySQL database:", error);
    process.exit(1);
  }
};

process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("🌊 Unhandled Rejection at:", promise, "reason:", reason);
});

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

app.use("/services", ServiceRoute);

app.use(errorHandler);

export default app;
