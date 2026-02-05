const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Sabse pehle 'uploads' folder ka absolute path define karein
// Ye path prl-backend ke root me 'uploads' folder ko point karega
const uploadDir = path.resolve(__dirname, "..", "uploads");

// Sync check: Agar folder nahi hai toh auto-create karein (Linux permissions ke liye zaroori)
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ Uploads directory created at:", uploadDir);
  } catch (err) {
    console.error("❌ Error creating upload directory:", err);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Production par hamesha absolute path bhejien
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();

    // Filename cleaning: Spaces aur special characters ko "-" se replace karein
    const cleanName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-") // Sirf numbers aur letters allow karein
      .replace(/-+/g, "-"); // Double dashes hataein

    cb(null, `${uniqueSuffix}-${cleanName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (Production par 5MB kabhi kam pad jati hai)
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|jfif|avif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(
      new Error("Error: Only image files (jpeg, jpg, png, webp) are allowed!"),
    );
  },
});

module.exports = upload;
