const UpvcMachine = require("../models/upvcmachine");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose"); // Added mongoose for identifier check

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4|mov|avi|wmv/; // Added more video formats
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png) and videos (mp4, mov, avi, wmv) are allowed"));
  },
});

// ============================================================================
// FIX #1: Corrected the Multer middleware.
// Instead of upload.array("files"), we use upload.fields() to accept
// form fields named "images" and "videos", as sent by the frontend.
// ============================================================================
exports.uploadFiles = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 10 }
]);

// ============================================================================
// FIX #2: Corrected the file upload handler.
// Since upload.fields() produces an object (e.g., { images: [], videos: [] }),
// we must correctly process this object to get all file URLs.
// ============================================================================
exports.handleFileUpload = async (req, res) => {
  try {
    // req.files will be an object like: { images: [ ... ], videos: [ ... ] }
    let uploadedFiles = [];
    if (req.files.images) {
      uploadedFiles = uploadedFiles.concat(req.files.images);
    }
    if (req.files.videos) {
      uploadedFiles = uploadedFiles.concat(req.files.videos);
    }

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ message: "No valid files were uploaded." });
    }

    // Map the collected files to their public URLs
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

// Get one by _id or code
exports.getMachine = async (req, res) => {
  try {
    const { identifier } = req.params;
    const query = mongoose.Types.ObjectId.isValid(identifier)
      ? { _id: identifier }
      : { code: identifier };
    const machine = await UpvcMachine.findOne(query);
    if (!machine) return res.status(404).json({ message: "Not found" });
    res.json(machine);
  } catch (err) {
    console.error("Get machine error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateMachine = async (req, res) => {
  try {
    const { identifier } = req.params;
    const query = mongoose.Types.ObjectId.isValid(identifier)
      ? { _id: identifier }
      : { code: identifier };
    const machine = await UpvcMachine.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true, // It's good practice to run validators on update
    });
    if (!machine) return res.status(404).json({ message: "Not found" });
    res.json(machine);
  } catch (err) {
    console.error("Update machine error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteMachine = async (req, res) => {
  try {
    const { identifier } = req.params;
    const query = mongoose.Types.ObjectId.isValid(identifier)
      ? { _id: identifier }
      : { code: identifier };
    const machine = await UpvcMachine.findOneAndDelete(query);
    if (!machine) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete machine error:", err);
    res.status(500).json({ message: err.message });
  }
};