import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "path";

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

const app = express();

app.set("trust proxy", 1);

// ================= CORS =================

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",

  "https://realtemple.com",
  "https://www.realtemple.com",

  "https://admin.realtemple.com",

  "https://backend.realtemple.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGIN
      ? [
          ...defaultOrigins,
          ...process.env.CORS_ORIGIN.split(",").map((url) =>
            url.trim()
          ),
        ]
      : defaultOrigins;

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
};

app.use(cors(corsOptions));

// ================= HELMET =================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// ================= RATE LIMIT =================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// ================= BODY PARSER =================

app.use(bodyParser.json({ limit: "30mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(express.json());

// ================= STATIC UPLOADS =================

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ================= ROUTES =================

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome....!",
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", AuthRoute);

app.use("/web", WebRoute);

app.use("/home", HomePageRoute);

app.use("/about", AboutRoute);

app.use("/gallery", GalleryRoute);

app.use("/magazine", MagazineRoute);

app.use("/services", ServiceRoute);

// ================= ERROR HANDLER =================

app.use(errorHandler);

// ================= SERVER =================

const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("✅ MySQL database connected successfully!");

    await sequelize.sync();

    const port = process.env.PORT || 4000;

    server.listen(port, "0.0.0.0", () => {
      console.log(
        `🚀 Server listening on port ${port} .....!`
      );
    });
  } catch (error) {
    console.error(
      "❌ Unable to connect to MySQL database:",
      error
    );

    process.exit(1);
  }
};

process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "🌊 Unhandled Rejection at:",
    promise,
    "reason:",
    reason
  );
});

startServer();

export default app;