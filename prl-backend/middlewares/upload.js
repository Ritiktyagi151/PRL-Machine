const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * 1. UPLOADS FOLDER SETUP
 * path.resolve se hamesha backend root ke 'uploads' folder ka absolute path milega.
 */
const uploadDir = path.resolve(__dirname, "..", "uploads");

// Directory check aur creation (Linux server permissions ke liye zaroori)
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ Uploads directory created at:", uploadDir);
  } catch (err) {
    console.error("❌ Error creating upload directory:", err);
  }
}

/**
 * 2. STORAGE CONFIGURATION
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Production par hamesha absolute path bhejien taaki file sahi jagah save ho
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();

    // Filename cleaning: Spaces aur special characters ko "-" se replace karein
    const cleanName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    cb(null, `${uniqueSuffix}-${cleanName}${ext}`);
  },
});

/**
 * 3. MULTI-TYPE FILE FILTER
 */
const upload = multer({
  storage,
  limits: {
    // Limit ko 50MB kiya gaya hai taaki heavy videos aur brochures upload ho sakein
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // Allowed extensions: Images, Videos, aur PDFs
    const filetypes = /jpeg|jpg|png|webp|jfif|avif|mp4|webm|pdf/;

    // Extension aur MimeType dono check karein security ke liye
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }

    // Agar format match nahi karta toh error bhejien
    cb(
      new Error(
        "Error: Only Images (jpg, png, etc.), Videos (mp4, webm), and PDFs are allowed!",
      ),
    );
  },
});

module.exports = upload;
