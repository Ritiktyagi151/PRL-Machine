const UpvcMachine = require("../models/upvcmachine");
const mongoose = require("mongoose");

// 🔹 File upload handler (Relative URL format)
exports.handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }
    // Frontend ko 'url' key bhejna zaroori hai
    res.json({
      success: true,
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createMachine = async (req, res) => {
  try {
    const machine = await UpvcMachine.create(req.body);
    res.status(201).json(machine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMachines = async (req, res) => {
  try {
    const machines = await UpvcMachine.find().sort({ createdAt: -1 });
    res.json(machines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMachine = async (req, res) => {
  try {
    const { identifier } = req.params;
    const machine = await UpvcMachine.findOne({
      $or: [
        { id: identifier },
        { code: identifier },
        {
          _id: mongoose.Types.ObjectId.isValid(identifier)
            ? identifier
            : new mongoose.Types.ObjectId(),
        },
      ],
    });
    if (!machine) return res.status(404).json({ message: "Machine not found" });
    res.json(machine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMachine = async (req, res) => {
  try {
    const { identifier } = req.params;
    const query = {
      $or: [
        { id: identifier },
        { code: identifier },
        {
          _id: mongoose.Types.ObjectId.isValid(identifier)
            ? identifier
            : new mongoose.Types.ObjectId(),
        },
      ],
    };
    const machine = await UpvcMachine.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });
    if (!machine) return res.status(404).json({ message: "Not found" });
    res.json(machine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMachine = async (req, res) => {
  try {
    const { identifier } = req.params;
    const query = {
      $or: [
        { id: identifier },
        { code: identifier },
        {
          _id: mongoose.Types.ObjectId.isValid(identifier)
            ? identifier
            : new mongoose.Types.ObjectId(),
        },
      ],
    };
    const machine = await UpvcMachine.findOneAndDelete(query);
    if (!machine) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
