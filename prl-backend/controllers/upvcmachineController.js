const UpvcMachine = require("../models/upvcmachine");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4|mov|avi|wmv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png) and videos (mp4, mov, avi, wmv) are allowed"));
  },
});

// Multer middleware setup
exports.uploadFiles = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "videos", maxCount: 10 },
]);

// File upload handler
exports.handleFileUpload = async (req, res) => {
  try {
    let uploadedFiles = [];
    if (req.files.images) uploadedFiles = uploadedFiles.concat(req.files.images);
    if (req.files.videos) uploadedFiles = uploadedFiles.concat(req.files.videos);

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ message: "No valid files were uploaded." });
    }

    const urls = uploadedFiles.map((file) => `/uploads/${file.filename}`);
    res.json({ urls });
  } catch (err) {
    console.error("File upload error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Create
exports.createMachine = async (req, res) => {
  try {
    const machine = await UpvcMachine.create(req.body);
    res.status(201).json(machine);
  } catch (err) {
    console.error("Create machine error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all
exports.getMachines = async (req, res) => {
  try {
    const machines = await UpvcMachine.find();
    res.json(machines);
  } catch (err) {
    console.error("Get machines error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================================================
// UPDATED: Get one by custom 'id', 'code' or '_id'
// ============================================================================
exports.getMachine = async (req, res) => {
  try {
    const { identifier } = req.params;

    const machine = await UpvcMachine.findOne({
      $or: [
        { id: identifier }, // Priority 1: Custom string ID (SEO Friendly)
        { code: identifier }, // Priority 2: Machine Code
        { _id: mongoose.Types.ObjectId.isValid(identifier) ? identifier : new mongoose.Types.ObjectId() } // Priority 3: Mongo DB Object ID
      ],
    });

    if (!machine) return res.status(404).json({ message: "Machine not found" });
    res.json(machine);
  } catch (err) {
    console.error("Get machine error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update Machine Logic
exports.updateMachine = async (req, res) => {
  try {
    const { identifier } = req.params;

    const query = {
      $or: [
        { id: identifier },
        { code: identifier },
        { _id: mongoose.Types.ObjectId.isValid(identifier) ? identifier : new mongoose.Types.ObjectId() }
      ],
    };

    const machine = await UpvcMachine.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });

    if (!machine) return res.status(404).json({ message: "Not found" });
    res.json(machine);
  } catch (err) {
    console.error("Update machine error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Delete Machine Logic
exports.deleteMachine = async (req, res) => {
  try {
    const { identifier } = req.params;

    const query = {
      $or: [
        { id: identifier },
        { code: identifier },
        { _id: mongoose.Types.ObjectId.isValid(identifier) ? identifier : new mongoose.Types.ObjectId() }
      ],
    };

    const machine = await UpvcMachine.findOneAndDelete(query);
    if (!machine) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete machine error:", err);
    res.status(500).json({ message: err.message });
  }
};