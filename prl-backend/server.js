const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const fs = require("fs");

const connectDB = require("./config/db");

// Load env
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// 1. UPLOADS FOLDER SETUP: Auto-create folder if missing
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. SECURITY & CORS: Cross-Origin Resource Policy 'false' is must for images
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 3. LOGGING & PARSING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 4. STATIC FOLDER: Serving images to browser
// Important: Make sure this path is correct for both local and VPS
app.use("/uploads", express.static(uploadDir));

// 5. MULTER CONFIGURATION (For Blog/Testimonial Uploads)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Unique name with timestamp to avoid overwrite
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// 6. DIRECT UPLOAD ENDPOINT (Optional - for manual uploads)
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({
    url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
  });
});

// 7. ROUTES SETUP
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/navbar", require("./routes/navbarRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/aluminum-machines", require("./routes/aluminummachineRoutes"));
app.use("/api/upvcmachines", require("./routes/upvcmachineRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/site-config", require("./routes/siteConfigRoutes"));

// 8. HEALTH CHECK & BASE ROUTE
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 PRL-Machine API is running successfully...",
    environment: process.env.NODE_ENV,
    storage_path: uploadDir,
  });
});

// 9. 404 HANDLER
app.use((req, res) =>
  res.status(404).json({ success: false, message: "❌ Route not found" }),
);

// 10. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("💥 Global Error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 11. START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} at http://localhost:${PORT}`,
  );
});
