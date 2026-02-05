const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // Aapka updated middleware jisme video/pdf allowed hai
const {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
  getMachineByCode,
} = require("../controllers/aluminummachineController");

/**
 * 1. FILE UPLOAD ENDPOINT
 * Yeh route Cloudinary ke bajaye server ke local 'uploads/' folder mein
 * images, videos aur PDFs ko save karega.
 */
router.post("/upload-file", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Relative path return kar rahe hain jo DB mein save hoga
    // Frontend iske aage VITE_API_BASE_URL (http://domain.com) jod lega
    res.json({
      success: true,
      message: "File uploaded successfully to server",
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * 2. CRUD ROUTES
 */
router.post("/", createMachine); // Add new machine
router.get("/", getMachines); // Get all machines
router.get("/code/:code", getMachineByCode); // Get machine by code (SEO/Frontend slug)
router.get("/:id", getMachineById); // Get machine by id
router.put("/:id", updateMachine); // Update machine details
router.delete("/:id", deleteMachine); // Delete machine and documentation

module.exports = router;
