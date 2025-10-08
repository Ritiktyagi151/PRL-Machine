const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("./config/db"); // Maan kar chal rahe hain ki aapke paas db connection file hai

// Load env
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Security headers
app.use(helmet());

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

// ======================= Routes =======================
// Maujooda Routes
app.use("/api/navbar", require("./routes/navbarRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/aluminum-machines", require("./routes/aluminummachineRoutes"));
app.use("/api/upvcmachines", require("./routes/upvcmachineRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Contact Page ke liye Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/site-config", require("./routes/siteConfigRoutes")); // Naya route

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