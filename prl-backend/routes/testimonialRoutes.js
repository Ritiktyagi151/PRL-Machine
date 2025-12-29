const express = require("express");
const router = express.Router();
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
router.post("/", saveTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

// Stats Endpoints
router.get("/data/stats", getStats);
router.post("/data/stats", updateStats);

module.exports = router;
