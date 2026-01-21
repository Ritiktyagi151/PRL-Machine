const express = require("express");
const router = express.Router();
const path = require("path");

// 🔹 FIX: Path issues ko khatam karne ke liye try-catch ya direct sahi path
// Check karein aapka folder 'middleware' hai ya 'middlewares'
const upload = require("../middlewares/upload"); 

const {
  getBlogs,
  getBlogBySlug, 
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// ✅ 1. Sabhi blogs fetch karne ke liye
router.get("/", getBlogs);

// ✅ 2. Blog details slug (Title) ke hisaab se (SEO Friendly)
// URL: localhost:5173/blogs/your-blog-title
router.get("/:slug", getBlogBySlug);

// ✅ 3. Naya blog banane ke liye (Multer Image upload logic)
router.post("/", upload.single("image"), createBlog);

// ✅ 4. Blog update karne ke liye (ID use karna safe hai update ke liye)
router.put("/:id", upload.single("image"), updateBlog);

// ✅ 5. Blog delete karne ke liye
router.delete("/:id", deleteBlog);

module.exports = router;