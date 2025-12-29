const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer"); // Image upload ke liye

const connectDB = require("./config/db");

// Load env
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Uploaded images ko frontend par dikhane ke liye zaroori hai
  })
);

// Logger only in dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ======================= Image Upload Logic (Multer) =======================
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Ensure ye folder exist karta ho
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Image Upload Endpoint (Directly in server or move to routes)
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({
    url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
  });
});

// ======================= Routes =======================
app.use("/api/navbar", require("./routes/navbarRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/aluminum-machines", require("./routes/aluminummachineRoutes"));
app.use("/api/upvcmachines", require("./routes/upvcmachineRoutes"));

// --- NAYE ROUTES: Testimonial aur Stats ---
app.use("/api/testimonials", require("./routes/testimonialRoutes")); // Testimonial CRUD
app.use("/api/stats", require("./routes/testimonialRoutes")); // Stats bhi isi file mein handle honge

// Contact & Site Config
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/site-config", require("./routes/siteConfigRoutes"));

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "✅ API is running...",
  });
});

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: "❌ Route not found" })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Error:", err.stack || err);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Server error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} at http://localhost:${PORT}`
  );
});
