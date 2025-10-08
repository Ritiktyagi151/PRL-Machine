const express = require("express");
const Footer = require("../models/Footer");
const router = express.Router();

/**
 * @route   GET /api/footer
 * @desc    Get footer data
 */
router.get("/", async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer();
      await footer.save();
    }
    res.status(200).json(footer);
  } catch (error) {
    console.error("Error fetching footer:", error);
    res.status(500).json({ message: "Server error fetching footer data" });
  }
});

/**
 * @route   POST /api/footer
 * @desc    Create footer data (only if needed manually)
 */
router.post("/", async (req, res) => {
  try {
    const existingFooter = await Footer.findOne();
    if (existingFooter) {
      return res
        .status(400)
        .json({ message: "Footer data already exists. Use PUT to update." });
    }
    const footer = new Footer(req.body);
    await footer.save();
    res.status(201).json({ message: "Footer created successfully", footer });
  } catch (error) {
    console.error("Error creating footer:", error);
    res.status(500).json({ message: "Server error creating footer data" });
  }
});

/**
 * @route   PUT /api/footer
 * @desc    Update footer data
 */
router.put("/", async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer(req.body);
    } else {
      footer.set(req.body);
    }
    await footer.save();
    res.status(200).json({ message: "Footer updated successfully", footer });
  } catch (error) {
    console.error("Error updating footer:", error);
    res.status(500).json({ message: "Server error updating footer data" });
  }
});

/**
 * @route   DELETE /api/footer
 * @desc    Delete footer data
 */
router.delete("/", async (req, res) => {
  try {
    await Footer.deleteMany();
    res.status(200).json({ message: "Footer data deleted successfully" });
  } catch (error) {
    console.error("Error deleting footer:", error);
    res.status(500).json({ message: "Server error deleting footer data" });
  }
});

module.exports = router;
