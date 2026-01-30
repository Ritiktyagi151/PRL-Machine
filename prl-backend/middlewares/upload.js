const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 1. Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // __dirname use karne se Linux server/PM2 par path mismatch nahi hota
    const uploadPath = path.join(__dirname, "../uploads/");

    // Safety check: Agar folder delete ho jaye toh auto-create kar dega
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Unique ID generation
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // File extension extract karein
    const ext = path.extname(file.originalname).toLowerCase();

    // Filename se spaces hatana aur lowercase karna best practice hai
    const nameWithoutExt = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""); // Sirf alphanumeric characters allow karein

    cb(null, `${uniqueSuffix}-${nameWithoutExt}${ext}`);
  },
});

// 2. File Filter & Limits
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|webp|jfif|avif/;

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }

    // Custom error message
    cb(
      new Error("Error: Only images (jpeg, jpg, png, webp, avif) are allowed!"),
    );
  },
});

module.exports = upload;
