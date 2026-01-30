const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");

// Aapka connectDB
const connectDB = require("./config/db");

// 1. Multer aur Path import karein
const multer = require("multer");

dotenv.config();
connectDB();

const app = express();

// 2. UPLOADS FOLDER SETUP: Absolute Path use karein
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 3. SECURITY & CORS (Same as yours)
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

// 4. STATIC FOLDER
app.use("/uploads", express.static(uploadDir));

// 5. UPDATED MULTER CONFIG: Absolute path fix
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Relative "uploads/" ki jagah absolute uploadDir use karein
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// 6. UPDATED UPLOAD ENDPOINT: Localhost hata diya
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  // Frontend par display ke liye path bhejien, database mein sirf filename save karein
  res.json({
    success: true,
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});

// 7. ROUTES SETUP (Same as yours)
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/navbar", require("./routes/navbarRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/aluminum-machines", require("./routes/aluminummachineRoutes"));
app.use("/api/upvcmachines", require("./routes/upvcmachineRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/site-config", require("./routes/siteConfigRoutes"));

// 8. BASE ROUTE
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 PRL-Machine API is running successfully...",
    environment: process.env.NODE_ENV,
    storage_path: uploadDir,
  });
});

// 10. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("💥 Global Error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
  