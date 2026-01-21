const express = require("express");
const router = express.Router();
// Centralized upload middleware yahan bhi add kiya
const upload = require("../middlewares/upload"); 

const {
  getAllTestimonials,
  saveTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getStats,
  updateStats,
} = require("../controllers/testimonialController");

// Testimonials CRUD
router.get("/", getAllTestimonials);

// FIX: Yahan upload middleware add kar diya hai
router.post("/", upload.single("image"), saveTestimonial);

// Update ke liye bhi image upload allow kiya
router.put("/:id", upload.single("image"), updateTestimonial);

router.delete("/:id", deleteTestimonial);

// Stats Endpoints
router.get("/data/stats", getStats);
router.post("/data/stats", updateStats);

module.exports = router;