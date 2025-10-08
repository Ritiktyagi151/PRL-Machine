const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getNavbar,
  createNavbar,
  updateNavbar,
  deleteNavbar,
  getAllNavbars,
  uploadLogo, // ✅ Import the new controller function
} = require("../controllers/navbarController");

const router = express.Router();

// --- Multer Configuration for File Upload ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure 'uploads/' directory exists
  },
  filename: function (req, file, cb) {
    // Create a unique filename to prevent overwrites
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "logo-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
// --- End of Multer Configuration ---

// 📌 CRUD Routes
router.get("/", getNavbar);
router.get("/all", getAllNavbars);
router.post("/", createNavbar);
router.put("/", updateNavbar);
router.delete("/", deleteNavbar);

// ✨ NEW: Route for handling logo upload
// The upload.single('file') middleware processes the file named 'file' from the form
router.post("/upload-logo", upload.single("file"), uploadLogo);

module.exports = router;