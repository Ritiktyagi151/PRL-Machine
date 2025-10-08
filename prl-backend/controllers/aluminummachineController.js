const AluminumMachine = require("../models/aluminummachine");
const mongoose = require("mongoose");

// Helper function to check if a string is a valid ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Add new machine
exports.createMachine = async (req, res) => {
  try {
    const { name, description, images, videos, specifications, technicalDrawing, technicalDrawingFront, technicalDrawingSide, faq, code, id, inStock } = req.body;
    
    if (!name || !code || !id) {
      return res.status(400).json({ success: false, message: "ID, Name, and Code are required" });
    }

    // Check for duplicate id or code
    const existing = await AluminumMachine.findOne({ $or: [{ id }, { code }] });
    if (existing) {
      return res.status(400).json({ success: false, message: "ID or Code already exists" });
    }

    const machine = new AluminumMachine({
      id, // Custom id
      name,
      description,
      images,
      videos,
      specifications,
      technicalDrawing,
      technicalDrawingFront,
      technicalDrawingSide,
      faq,
      code,
      inStock,
    });

    await machine.save();
    console.log("Created machine with ID:", id, "Data:", machine);
    res.status(201).json(machine);
  } catch (error) {
    console.error("Create Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: `Error creating machine: ${error.message}`, error });
  }
};

// Get all machines
exports.getMachines = async (req, res) => {
  try {
    const machines = await AluminumMachine.find();
    console.log("Fetched all machines:", machines.length);
    res.json(machines);
  } catch (error) {
    console.error("Fetch Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: `Error fetching machines: ${error.message}`, error });
  }
};

// Get single machine by id
exports.getMachineById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Fetching machine with ID:", id);
    const query = isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const machine = await AluminumMachine.findOne(query);
    if (!machine) {
      console.log("Machine not found for ID:", id);
      return res.status(404).json({ success: false, message: "Machine not found" });
    }
    res.json(machine);
  } catch (error) {
    console.error("Fetch by ID Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: `Error fetching machine: ${error.message}`, error });
  }
};

// Update machine by id
exports.updateMachine = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Updating machine with ID:", id, "Payload:", req.body);
    const query = isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const machine = await AluminumMachine.findOneAndUpdate(
      query,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!machine) {
      console.log("Machine not found for update, ID:", id);
      return res.status(404).json({ success: false, message: "Machine not found" });
    }
    console.log("Updated machine:", machine);
    res.json(machine);
  } catch (error) {
    console.error("Update Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: `Error updating machine: ${error.message}`, error });
  }
};

// Delete machine by id
exports.deleteMachine = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting machine with ID:", id);
    const query = isValidObjectId(id) ? { $or: [{ id }, { _id: id }] } : { id };
    const machine = await AluminumMachine.findOneAndDelete(query);
    if (!machine) {
      console.log("Machine not found for deletion, ID:", id);
      return res.status(404).json({ success: false, message: "Machine not found" });
    }
    console.log("Deleted machine:", machine);
    res.json({ success: true, message: "Machine deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: `Error deleting machine: ${error.message}`, error });
  }
};

// Get single machine by code
exports.getMachineByCode = async (req, res) => {
  try {
    console.log("Fetching machine with code:", req.params.code);
    const machine = await AluminumMachine.findOne({ code: req.params.code });
    if (!machine) {
      console.log("Machine not found for code:", req.params.code);
      return res.status(404).json({ success: false, message: "Machine not found" });
    }
    res.json(machine);
  } catch (error) {
    console.error("Fetch by Code Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: `Error fetching machine: ${error.message}`, error });
  }
};