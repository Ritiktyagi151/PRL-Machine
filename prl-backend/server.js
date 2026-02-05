const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const multer = require("multer");

// DB Connection
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/**
 * 1. UPLOADS FOLDER SETUP
 * Production par path resolution ke liye path.resolve use karna safe hota hai.
 * Ye hamesha backend ke root mein 'uploads' folder ko point karega.
 */
const uploadDir = path.resolve(__dirname, "uploads");

// Ensure directory exists with correct permissions
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * 2. MIDDLEWARES & SECURITY
 */
app.use(morgan("dev"));

// Helmet config: Cross-Origin-Resource-Policy ko false karna zaroori hai
// taaki frontend aapki images load kar sake.
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

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/**
 * 3. STATIC FILES SERVING
 * Isse http://yourdomain.com/uploads/filename.jpg access ho payegi
 */
app.use("/uploads", express.static(uploadDir));

/**
 * 4. MULTER STORAGE CONFIGURATION
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Check again if folder exists before saving (Production safety)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Filename se spaces aur special chars hatana zaroori hai production ke liye
    const cleanFileName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, uniqueSuffix + "-" + cleanFileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB Limit (Recommended for production)
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|jfif|avif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpg, jpeg, png, webp, avif)!"));
    }
  },
});

/**
 * 5. UPLOAD ENDPOINT
 */
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  // Return filename to save in DB and relative URL for frontend
  res.json({
    success: true,
    message: "Image uploaded successfully",
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});

/**
 * 6. ROUTES SETUP
 */
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/navbar", require("./routes/navbarRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/aluminum-machines", require("./routes/aluminummachineRoutes"));
app.use("/api/upvcmachines", require("./routes/upvcmachineRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/site-config", require("./routes/siteConfigRoutes"));

/**
 * 7. BASE ROUTE
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 PRL-Machine API is running successfully...",
    environment: process.env.NODE_ENV || "development",
    storage_path: uploadDir,
  });
});

/**
 * 8. GLOBAL ERROR HANDLER
 */
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
