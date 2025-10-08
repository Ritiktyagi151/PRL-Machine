const express = require("express");
const router = express.Router();
const { submitContact, exportContacts } = require("../controllers/contactController");

// POST /api/contact -> Naya contact form submit karne ke liye
router.post("/", submitContact);

// GET /api/contact/export -> Sabhi contacts ko Excel mein download karne ke liye
router.get("/export", exportContacts);

module.exports = router;