const express = require("express");
const router = express.Router();
// Aapke folder structure ke hisaab se 'middlewares' sahi path hai
const upload = require("../middlewares/upload"); 

const {
  getBlogs,
  getBlogBySlug, 
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Sabhi blogs fetch karna
router.get("/", getBlogs);

// Blog details by slug
router.get("/:slug", getBlogBySlug);

// Naya blog (Image upload ke sath)
router.post("/", upload.single("image"), createBlog);

// Blog update (Image change karne ke option ke sath)
router.put("/:id", upload.single("image"), updateBlog);

// Blog delete
router.delete("/:id", deleteBlog);

module.exports = router;