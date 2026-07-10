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
import ContributionRoute from "./routes/ContributionRoute.js";
import SocialRoute from "./routes/SocialRoute.js";

import errorHandler from "./middlewares/errorHandle.js";

const app = express();

app.set("trust proxy", true);

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
    frameguard: false,
    contentSecurityPolicy: false,
  })
);

// ================= RATE LIMIT =================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per 15 minutes
  message:
    "Too many requests from this IP, please try again later.",
  skip: (req) => req.method === "GET" || req.method === "OPTIONS",
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

app.use("/contribution", ContributionRoute);
app.use("/social", SocialRoute);

// ================= ERROR HANDLER =================

app.use(errorHandler);

// ================= SERVER =================

const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("✅ MySQL database connected successfully!");

    await sequelize.sync();

    // Ensure family columns exist in about_pages table
    try {
      const queryInterface = sequelize.getQueryInterface();
      const tableInfo = await queryInterface.describeTable("about_pages");
      
      if (!tableInfo.family_title) {
        console.log("Adding family_title column to about_pages...");
        await sequelize.query("ALTER TABLE about_pages ADD COLUMN family_title VARCHAR(255);");
      }
      if (!tableInfo.family_description) {
        console.log("Adding family_description column to about_pages...");
        await sequelize.query("ALTER TABLE about_pages ADD COLUMN family_description TEXT;");
      }
      if (!tableInfo.family_image) {
        console.log("Adding family_image column to about_pages...");
        await sequelize.query("ALTER TABLE about_pages ADD COLUMN family_image VARCHAR(255);");
      }
      console.log("✅ Verified and ensured family columns in about_pages table.");
    } catch (dbErr) {
      console.error("⚠️ Failed to ensure family columns exist in about_pages:", dbErr);
    }

    // Ensure pastorName column exists in LatestMessages table
    try {
      const queryInterface = sequelize.getQueryInterface();
      let tableName = "LatestMessages";
      const tables = await queryInterface.showAllTables();
      if (tables.includes("latestmessages")) {
        tableName = "latestmessages";
      } else if (tables.includes("LatestMessages")) {
        tableName = "LatestMessages";
      } else if (tables.includes("latest_messages")) {
        tableName = "latest_messages";
      }
      
      const tableInfo = await queryInterface.describeTable(tableName);
      if (!tableInfo.pastor_name) {
        console.log(`Adding pastor_name column to ${tableName}...`);
        await sequelize.query(`ALTER TABLE ${tableName} ADD COLUMN pastor_name VARCHAR(255);`);
      }
      if (tableInfo.host_name && tableInfo.host_name.allowNull === false) {
        console.log(`Modifying host_name column in ${tableName} to allow NULL...`);
        await sequelize.query(`ALTER TABLE ${tableName} MODIFY COLUMN host_name VARCHAR(255) NULL;`);
      }
      console.log(`✅ Verified and ensured pastor_name and host_name columns in ${tableName} table.`);
    } catch (dbErr) {
      console.error("⚠️ Failed to ensure pastor_name or host_name columns exist/allow NULL in LatestMessages:", dbErr);
    }

    // Ensure whatsapp and linkedin columns exist in SocialLinks table
    try {
      const queryInterface = sequelize.getQueryInterface();
      let socialTableName = "social_links";
      const tables = await queryInterface.showAllTables();
      if (tables.includes("sociallinks")) {
        socialTableName = "sociallinks";
      } else if (tables.includes("SocialLinks")) {
        socialTableName = "SocialLinks";
      } else if (tables.includes("social_links")) {
        socialTableName = "social_links";
      }

      const socialTableInfo = await queryInterface.describeTable(socialTableName);
      if (!socialTableInfo.whatsapp) {
        console.log(`Adding whatsapp column to ${socialTableName}...`);
        await sequelize.query(`ALTER TABLE ${socialTableName} ADD COLUMN whatsapp VARCHAR(255);`);
      }
      if (!socialTableInfo.linkedin) {
        console.log(`Adding linkedin column to ${socialTableName}...`);
        await sequelize.query(`ALTER TABLE ${socialTableName} ADD COLUMN linkedin VARCHAR(255);`);
      }
      if (!socialTableInfo.email) {
        console.log(`Adding email column to ${socialTableName}...`);
        await sequelize.query(`ALTER TABLE ${socialTableName} ADD COLUMN email VARCHAR(255);`);
      }
      if (!socialTableInfo.phone) {
        console.log(`Adding phone column to ${socialTableName}...`);
        await sequelize.query(`ALTER TABLE ${socialTableName} ADD COLUMN phone VARCHAR(255);`);
      }
      if (!socialTableInfo.address) {
        console.log(`Adding address column to ${socialTableName}...`);
        await sequelize.query(`ALTER TABLE ${socialTableName} ADD COLUMN address TEXT;`);
      }
      if (!socialTableInfo.map_location) {
        console.log(`Adding map_location column to ${socialTableName}...`);
        await sequelize.query(`ALTER TABLE ${socialTableName} ADD COLUMN map_location VARCHAR(255);`);
      }
      console.log(`✅ Verified and ensured whatsapp, linkedin, email, phone, address, and map_location columns in ${socialTableName} table.`);
    } catch (dbErr) {
      console.error("⚠️ Failed to ensure whatsapp or linkedin columns in SocialLinks table:", dbErr);
    }

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