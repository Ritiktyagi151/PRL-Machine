const express = require("express");
const router = express.Router();
const { getConfig, updateConfig } = require("../controllers/siteConfigController");

// GET /api/site-config -> Settings get karne ke liye
router.get("/", getConfig);

// PUT /api/site-config -> Settings update karne ke liye
router.put("/", updateConfig);

module.exports = router;